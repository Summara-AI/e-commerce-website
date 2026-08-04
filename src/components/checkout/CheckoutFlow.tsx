"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { LoginFloatingField } from "@/components/auth/LoginFloatingField";
import { useCart } from "@/components/cart/cart-context";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  CHECKOUT_COPY,
  CHECKOUT_STEPS,
  CHECKOUT_TRUST,
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS,
  type CheckoutStepId,
} from "@/content/checkout";
import { formatPkr } from "@/lib/catalog";
import {
  EMPTY_SHIPPING_FORM,
  readCheckoutDraft,
  validateCheckoutShipping,
  writeCheckoutDraft,
  type CheckoutDraft,
  type CheckoutShippingErrors,
  type CheckoutShippingForm,
} from "@/lib/checkout";
import { resolveCheckoutHandoffService } from "@/services/checkout";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const STEP_ORDER: CheckoutStepId[] = ["shipping", "delivery", "payment", "review"];

/**
 * Premium multi-step pre-checkout — preferences only.
 * Final CTA hands off to Shopify Checkout (or thank-you preview until connected).
 */
export function CheckoutFlow() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { lines, subtotal, isHydrated, itemCount, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStepId>("shipping");
  const [shipping, setShipping] = useState<CheckoutShippingForm>(EMPTY_SHIPPING_FORM);
  const [errors, setErrors] = useState<CheckoutShippingErrors>({});
  const [deliveryId, setDeliveryId] = useState(DELIVERY_OPTIONS[0].id);
  const [paymentId, setPaymentId] = useState("card");
  const [handoffLoading, setHandoffLoading] = useState(false);

  useEffect(() => {
    const draft = readCheckoutDraft();
    if (!draft) return;
    setShipping(draft.shipping);
    setDeliveryId(draft.deliveryId);
    setPaymentId(draft.paymentId);
  }, []);

  useEffect(() => {
    const draft: CheckoutDraft = {
      shipping,
      deliveryId,
      paymentId,
      updatedAt: new Date().toISOString(),
    };
    writeCheckoutDraft(draft);
  }, [shipping, deliveryId, paymentId]);

  const delivery = useMemo(
    () => DELIVERY_OPTIONS.find((d) => d.id === deliveryId) ?? DELIVERY_OPTIONS[0],
    [deliveryId],
  );
  const payment = useMemo(
    () => PAYMENT_OPTIONS.find((p) => p.id === paymentId) ?? PAYMENT_OPTIONS[0],
    [paymentId],
  );

  const shippingCost =
    delivery.id === "free_threshold" && subtotal.amount >= 5000
      ? 0
      : delivery.id === "free_threshold"
        ? DELIVERY_OPTIONS[0].priceAmount
        : delivery.priceAmount;

  const grandTotal = subtotal.amount + shippingCost;
  const stepIndex = STEP_ORDER.indexOf(step);

  const goNext = () => {
    if (step === "shipping") {
      const nextErrors = validateCheckoutShipping(shipping);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) return;
    }
    const next = STEP_ORDER[Math.min(stepIndex + 1, STEP_ORDER.length - 1)];
    setStep(next);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const goBack = () => {
    if (stepIndex === 0) {
      router.push("/cart");
      return;
    }
    setStep(STEP_ORDER[stepIndex - 1]);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handoff = async () => {
    setHandoffLoading(true);
    try {
      const draft: CheckoutDraft = {
        shipping,
        deliveryId,
        paymentId,
        updatedAt: new Date().toISOString(),
      };
      const result = await resolveCheckoutHandoffService({
        /** Shopify: pass cart.checkoutUrl from Cart API — sole production handoff */
        checkoutUrl: null,
        draft,
        preview: {
          orderNumber: `#KSL${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
          shipping,
          delivery: {
            id: delivery.id,
            title: delivery.title,
            eta: delivery.eta,
            priceLabel: shippingCost === 0 ? "Free" : formatPkr(shippingCost).formatted,
          },
          payment: { id: payment.id, title: payment.title },
          lines: lines.map((l) => ({
            id: l.id,
            title: l.title,
            variantTitle: l.variantTitle,
            quantity: l.quantity,
            priceFormatted: formatPkr(l.price.amount * l.quantity).formatted,
            href: l.href,
          })),
          subtotalFormatted: subtotal.formatted,
          shippingFormatted:
            shippingCost === 0 ? "Free" : formatPkr(shippingCost).formatted,
          totalFormatted: formatPkr(grandTotal).formatted,
          preview: true,
        },
      });

      if (result.mode === "shopify") {
        window.location.assign(result.href);
        return;
      }

      // Preview thank-you — clear local bag so the journey feels complete
      clearCart();
      router.push(result.href);
    } finally {
      setHandoffLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <Section spacing="tight" aria-busy="true" aria-label="Loading checkout">
        <Container width="content">
          <div className="mt-10 h-40 animate-pulse rounded-card bg-blush" />
        </Container>
      </Section>
    );
  }

  if (!lines.length) {
    return (
      <Section spacing="tight">
        <Container width="content" className="py-20 text-center">
          <h1 className="font-display text-h2 font-light italic text-foreground">
            {CHECKOUT_COPY.emptyTitle}
          </h1>
          <p className="mt-3 text-foreground-secondary">
            {CHECKOUT_COPY.emptyDescription}
          </p>
          <Button asChild className="mt-8 rounded-full">
            <Link href={CHECKOUT_COPY.continueShoppingHref}>
              {CHECKOUT_COPY.emptyCta}
            </Link>
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      spacing="tight"
      aria-labelledby="checkout-heading"
      data-shopify-section="checkout-preflight"
    >
      <Container width="content">
        <Breadcrumb
          items={[
            { label: "Bag", href: "/cart" },
            { label: CHECKOUT_COPY.title },
          ]}
        />

        <header className="mt-8 max-w-2xl">
          <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
            {CHECKOUT_COPY.eyebrow}
          </p>
          <h1
            id="checkout-heading"
            className="mt-3 font-display text-h1 font-light tracking-[-0.01em] text-foreground"
          >
            {CHECKOUT_COPY.title}
          </h1>
          <p className="mt-3 text-sm font-light text-foreground-secondary">
            {itemCount} {itemCount === 1 ? "item" : "items"} · {subtotal.formatted}
          </p>
        </header>

        <CheckoutStepper current={step} />

        <div className="mt-10 grid gap-10 laptop:grid-cols-[minmax(0,1fr)_22rem] desktop:grid-cols-[minmax(0,1fr)_24rem] desktop:gap-14">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
              >
                {step === "shipping" ? (
                  <ShippingStep
                    form={shipping}
                    errors={errors}
                    onChange={setShipping}
                    clearError={(key) =>
                      setErrors((e) => {
                        const next = { ...e };
                        delete next[key];
                        return next;
                      })
                    }
                  />
                ) : null}
                {step === "delivery" ? (
                  <DeliveryStep
                    selectedId={deliveryId}
                    onSelect={setDeliveryId}
                    subtotalAmount={subtotal.amount}
                  />
                ) : null}
                {step === "payment" ? (
                  <PaymentStep selectedId={paymentId} onSelect={setPaymentId} />
                ) : null}
                {step === "review" ? (
                  <ReviewStep
                    shipping={shipping}
                    deliveryTitle={delivery.title}
                    deliveryEta={delivery.eta}
                    deliveryPrice={
                      shippingCost === 0
                        ? "Free"
                        : formatPkr(shippingCost).formatted
                    }
                    paymentTitle={payment.title}
                    lines={lines}
                    subtotal={subtotal.formatted}
                    shippingCost={
                      shippingCost === 0
                        ? "Free"
                        : formatPkr(shippingCost).formatted
                    }
                    total={formatPkr(grandTotal).formatted}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-col gap-3 tablet:flex-row tablet:justify-between">
              <Button
                type="button"
                variant="secondary"
                className="min-h-12 rounded-full"
                onClick={goBack}
                disabled={handoffLoading}
              >
                {stepIndex === 0 ? CHECKOUT_COPY.backToCart : CHECKOUT_COPY.back}
              </Button>

              {step === "review" ? (
                <Button
                  type="button"
                  size="lg"
                  className="min-h-12 rounded-full"
                  loading={handoffLoading}
                  onClick={handoff}
                >
                  <Lock className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {handoffLoading
                    ? CHECKOUT_COPY.handoffLoading
                    : CHECKOUT_COPY.placeOrderShopify}
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  className="min-h-12 rounded-full"
                  onClick={goNext}
                >
                  {CHECKOUT_COPY.next}
                </Button>
              )}
            </div>

            {step === "review" ? (
              <p className="mt-4 text-caption leading-relaxed text-foreground-muted">
                {CHECKOUT_COPY.handoffNote}
              </p>
            ) : null}
          </div>

          <CheckoutAside
            lines={lines}
            subtotal={subtotal.formatted}
            shipping={
              step === "shipping"
                ? "Calculated next"
                : shippingCost === 0
                  ? "Free"
                  : formatPkr(shippingCost).formatted
            }
            total={
              step === "shipping"
                ? subtotal.formatted
                : formatPkr(grandTotal).formatted
            }
          />
        </div>
      </Container>
    </Section>
  );
}

function CheckoutStepper({ current }: { current: CheckoutStepId }) {
  const currentIndex = STEP_ORDER.indexOf(current);
  return (
    <ol
      className="mt-10 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      aria-label="Checkout progress"
    >
      {CHECKOUT_STEPS.map((s, index) => {
        const done = index < currentIndex;
        const active = s.id === current;
        return (
          <li key={s.id} className="flex min-w-[7.5rem] flex-none items-center gap-2 tablet:min-w-0 tablet:flex-1">
            <span
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-caption font-medium",
                done || active
                  ? "bg-power-pink text-foreground-on-primary"
                  : "bg-blush text-foreground-muted",
              )}
              aria-current={active ? "step" : undefined}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2} /> : index + 1}
            </span>
            <span
              className={cn(
                "truncate text-sm",
                active ? "font-medium text-foreground" : "text-foreground-muted",
              )}
            >
              <span className="tablet:hidden">{s.short}</span>
              <span className="hidden tablet:inline">{s.label}</span>
            </span>
            {index < CHECKOUT_STEPS.length - 1 ? (
              <span
                className={cn(
                  "mx-1 hidden h-px flex-1 tablet:block",
                  done ? "bg-power-pink/40" : "bg-border-subtle",
                )}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function ShippingStep({
  form,
  errors,
  onChange,
  clearError,
}: {
  form: CheckoutShippingForm;
  errors: CheckoutShippingErrors;
  onChange: (form: CheckoutShippingForm) => void;
  clearError: (key: keyof CheckoutShippingErrors) => void;
}) {
  const set = <K extends keyof CheckoutShippingForm>(
    key: K,
    value: CheckoutShippingForm[K],
  ) => {
    onChange({ ...form, [key]: value });
    if (key in errors) clearError(key as keyof CheckoutShippingErrors);
  };

  return (
    <div className="space-y-4" data-shopify-block="checkout-shipping">
      <h2 className="font-display text-2xl font-light italic text-foreground">
        Shipping information
      </h2>
      <div className="grid gap-4 tablet:grid-cols-2">
        <FieldError error={errors.firstName}>
          <LoginFloatingField
            name="firstName"
            label="First Name *"
            autoComplete="given-name"
            value={form.firstName}
            error={Boolean(errors.firstName)}
            onChange={(v) => set("firstName", v)}
          />
        </FieldError>
        <FieldError error={errors.lastName}>
          <LoginFloatingField
            name="lastName"
            label="Last Name *"
            autoComplete="family-name"
            value={form.lastName}
            error={Boolean(errors.lastName)}
            onChange={(v) => set("lastName", v)}
          />
        </FieldError>
      </div>
      <FieldError error={errors.email}>
        <LoginFloatingField
          name="email"
          type="email"
          label="Email *"
          autoComplete="email"
          value={form.email}
          error={Boolean(errors.email)}
          onChange={(v) => set("email", v)}
        />
      </FieldError>
      <FieldError error={errors.phone}>
        <LoginFloatingField
          name="phone"
          type="tel"
          label="Phone *"
          autoComplete="tel"
          inputMode="tel"
          value={form.phone}
          error={Boolean(errors.phone)}
          onChange={(v) => set("phone", v)}
        />
      </FieldError>
      <FieldError error={errors.address1}>
        <LoginFloatingField
          name="address1"
          label="Address Line 1 *"
          autoComplete="address-line1"
          value={form.address1}
          error={Boolean(errors.address1)}
          onChange={(v) => set("address1", v)}
        />
      </FieldError>
      <LoginFloatingField
        name="address2"
        label="Address Line 2 (Optional)"
        autoComplete="address-line2"
        required={false}
        value={form.address2}
        onChange={(v) => set("address2", v)}
      />
      <div className="grid gap-4 tablet:grid-cols-2">
        <FieldError error={errors.city}>
          <LoginFloatingField
            name="city"
            label="City *"
            autoComplete="address-level2"
            value={form.city}
            error={Boolean(errors.city)}
            onChange={(v) => set("city", v)}
          />
        </FieldError>
        <FieldError error={errors.province}>
          <LoginFloatingField
            name="province"
            label="Province / State *"
            autoComplete="address-level1"
            value={form.province}
            error={Boolean(errors.province)}
            onChange={(v) => set("province", v)}
          />
        </FieldError>
      </div>
      <div className="grid gap-4 tablet:grid-cols-2">
        <FieldError error={errors.zip}>
          <LoginFloatingField
            name="zip"
            label="Postal Code *"
            autoComplete="postal-code"
            value={form.zip}
            error={Boolean(errors.zip)}
            onChange={(v) => set("zip", v)}
          />
        </FieldError>
        <FieldError error={errors.country}>
          <LoginFloatingField
            name="country"
            label="Country *"
            autoComplete="country-name"
            value={form.country}
            error={Boolean(errors.country)}
            onChange={(v) => set("country", v)}
          />
        </FieldError>
      </div>
      <LoginFloatingField
        name="instructions"
        label={CHECKOUT_COPY.deliveryInstructions}
        required={false}
        value={form.instructions}
        onChange={(v) => set("instructions", v)}
      />
      <label className="flex cursor-pointer items-start gap-3 rounded-card border border-border-subtle bg-blush/25 p-4">
        <input
          type="checkbox"
          checked={form.saveAddress}
          onChange={(e) => set("saveAddress", e.target.checked)}
          className="mt-0.5 h-5 w-5 accent-[var(--color-power-pink)]"
        />
        <span className="text-sm font-light text-foreground">
          {CHECKOUT_COPY.saveAddress}
        </span>
      </label>
    </div>
  );
}

function DeliveryStep({
  selectedId,
  onSelect,
  subtotalAmount,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  subtotalAmount: number;
}) {
  return (
    <div className="space-y-4" data-shopify-block="checkout-delivery">
      <h2 className="font-display text-2xl font-light italic text-foreground">
        Delivery method
      </h2>
      <p className="text-sm font-light text-foreground-secondary">
        Final rates are confirmed inside Shopify Checkout for your destination.
      </p>
      <ul className="space-y-3" role="radiogroup" aria-label="Delivery method">
        {DELIVERY_OPTIONS.map((option) => {
          const selected = selectedId === option.id;
          const freeLocked =
            option.id === "free_threshold" && subtotalAmount < 5000;
          return (
            <li key={option.id}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={freeLocked}
                onClick={() => onSelect(option.id)}
                className={cn(
                  "flex w-full flex-col gap-2 rounded-card border p-5 text-left transition-[border-color,box-shadow,transform,background-color] duration-280",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  selected
                    ? "border-power-pink bg-pink-mist/40 shadow-[0_12px_32px_-24px_rgba(232,0,111,0.45)]"
                    : "border-border-subtle bg-canvas/80 hover:-translate-y-0.5 hover:border-border-default",
                  freeLocked && "cursor-not-allowed opacity-50 hover:translate-y-0",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {option.title}
                    </p>
                    {option.badge ? (
                      <span className="mt-1 inline-flex rounded-full bg-blush px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-power-pink">
                        {option.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {option.priceLabel}
                  </p>
                </div>
                <p className="text-sm font-light text-foreground-secondary">
                  {option.description}
                </p>
                <p className="text-caption text-foreground-muted">
                  Est. arrival · {option.eta}
                </p>
                {freeLocked ? (
                  <p className="text-caption text-power-pink">
                    Available when bag reaches Rs.5,000
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PaymentStep({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4" data-shopify-block="checkout-payment">
      <h2 className="font-display text-2xl font-light italic text-foreground">
        Payment method
      </h2>
      <p className="text-sm font-light text-foreground-secondary">
        {CHECKOUT_COPY.shopifyHandles}
      </p>
      <ul className="space-y-3" role="radiogroup" aria-label="Payment preference">
        {PAYMENT_OPTIONS.map((option) => {
          const selected = selectedId === option.id;
          return (
            <li key={option.id}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={!option.available}
                onClick={() => option.available && onSelect(option.id)}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-card border p-5 text-left transition-[border-color,box-shadow,transform] duration-280",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  selected
                    ? "border-power-pink bg-pink-mist/40"
                    : "border-border-subtle bg-canvas/80 hover:-translate-y-0.5",
                  !option.available && "cursor-not-allowed opacity-50",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-medium text-foreground">
                    {option.title}
                  </p>
                  {option.comingSoon ? (
                    <span className="text-caption text-foreground-muted">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <p className="text-sm font-light text-foreground-secondary">
                  {option.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-start gap-3 rounded-card border border-border-subtle bg-surface-soft/80 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-power-pink" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium text-foreground">
            {CHECKOUT_COPY.secureBadge}
          </p>
          <p className="mt-1 text-caption leading-relaxed text-foreground-secondary">
            Card details are entered only on Shopify’s PCI-compliant checkout —
            never on this page.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({
  shipping,
  deliveryTitle,
  deliveryEta,
  deliveryPrice,
  paymentTitle,
  lines,
  subtotal,
  shippingCost,
  total,
}: {
  shipping: CheckoutShippingForm;
  deliveryTitle: string;
  deliveryEta: string;
  deliveryPrice: string;
  paymentTitle: string;
  lines: ReturnType<typeof useCart>["lines"];
  subtotal: string;
  shippingCost: string;
  total: string;
}) {
  return (
    <div className="space-y-8" data-shopify-block="checkout-review">
      <h2 className="font-display text-2xl font-light italic text-foreground">
        {CHECKOUT_COPY.reviewTitle}
      </h2>

      <section>
        <h3 className="text-sm font-medium text-foreground">Products</h3>
        <ul className="mt-3 divide-y divide-border-subtle border-y border-border-subtle">
          {lines.map((line) => (
            <li key={line.id} className="flex justify-between gap-4 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 break-words font-medium text-foreground">{line.title}</p>
                <p className="text-foreground-muted">
                  {line.variantTitle} · Qty {line.quantity}
                </p>
              </div>
              <p className="shrink-0 font-medium">
                {formatPkr(line.price.amount * line.quantity).formatted}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6 tablet:grid-cols-2">
        <section className="rounded-card border border-border-subtle bg-canvas/80 p-5">
          <h3 className="text-sm font-medium text-foreground">Shipping address</h3>
          <address className="mt-3 text-sm font-light not-italic leading-relaxed text-foreground-secondary">
            {shipping.firstName} {shipping.lastName}
            <br />
            {shipping.address1}
            {shipping.address2 ? (
              <>
                <br />
                {shipping.address2}
              </>
            ) : null}
            <br />
            {shipping.city}, {shipping.province} {shipping.zip}
            <br />
            {shipping.country}
            <br />
            {shipping.phone}
            <br />
            {shipping.email}
          </address>
        </section>
        <section className="space-y-4">
          <div className="rounded-card border border-border-subtle bg-canvas/80 p-5">
            <h3 className="text-sm font-medium text-foreground">Delivery</h3>
            <p className="mt-2 text-sm text-foreground-secondary">
              {deliveryTitle} · {deliveryPrice}
            </p>
            <p className="mt-1 text-caption text-foreground-muted">{deliveryEta}</p>
          </div>
          <div className="rounded-card border border-border-subtle bg-canvas/80 p-5">
            <h3 className="text-sm font-medium text-foreground">Payment</h3>
            <p className="mt-2 text-sm text-foreground-secondary">{paymentTitle}</p>
          </div>
        </section>
      </div>

      <dl className="ml-auto max-w-sm space-y-2 text-sm">
        <div className="flex justify-between gap-6">
          <dt className="text-foreground-secondary">Subtotal</dt>
          <dd className="font-medium">{subtotal}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-foreground-secondary">Shipping</dt>
          <dd>{shippingCost}</dd>
        </div>
        <div className="flex justify-between gap-6 text-foreground-muted">
          <dt>Tax</dt>
          <dd>Calculated at Shopify Checkout</dd>
        </div>
        <div className="flex justify-between gap-6 border-t border-border-subtle pt-3 text-base">
          <dt className="font-medium text-foreground">Grand total</dt>
          <dd className="font-medium text-foreground">{total}</dd>
        </div>
      </dl>
    </div>
  );
}

function CheckoutAside({
  lines,
  subtotal,
  shipping,
  total,
}: {
  lines: ReturnType<typeof useCart>["lines"];
  subtotal: string;
  shipping: string;
  total: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-card border border-border-subtle bg-canvas/80 p-5 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)]",
        "laptop:sticky laptop:top-[calc(var(--announcement-height)+var(--header-height-sticky)+1rem)]",
      )}
    >
      <h2 className="font-display text-xl font-light italic text-foreground">
        Order summary
      </h2>
      <ul className="mt-4 max-h-48 space-y-3 overflow-y-auto">
        {lines.map((line) => (
          <li key={line.id} className="flex gap-3 text-sm">
            <div className="h-14 w-11 shrink-0 rounded-sm bg-blush" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-medium text-foreground">{line.title}</p>
              <p className="text-caption text-foreground-muted">
                Qty {line.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-border-subtle pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-foreground-secondary">Subtotal</dt>
          <dd className="font-medium">{subtotal}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-foreground-secondary">Shipping</dt>
          <dd>{shipping}</dd>
        </div>
        <div className="flex justify-between border-t border-border-subtle pt-3 text-base">
          <dt className="font-medium">Total</dt>
          <dd className="font-medium">{total}</dd>
        </div>
      </dl>
      <ul className="mt-5 space-y-2 border-t border-border-subtle pt-4">
        {CHECKOUT_TRUST.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-2 text-caption text-foreground-secondary"
          >
            <Lock className="h-3.5 w-3.5 text-power-pink" strokeWidth={1.5} />
            {t.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FieldError({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {error ? (
        <p className="mt-2 text-caption text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
