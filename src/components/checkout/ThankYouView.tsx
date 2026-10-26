"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, FileText, Package } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { THANK_YOU_COPY } from "@/content/checkout";
import { BEST_SELLERS } from "@/lib/catalog";
import { readOrderPreview, type OrderPreview } from "@/lib/checkout";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Premium thank-you / order confirmation.
 * Shopify can redirect here after payment; preview mode works without Cart API.
 */
export function ThankYouView() {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState<OrderPreview | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrder(readOrderPreview());
    setHydrated(true);
  }, []);

  const recommended = BEST_SELLERS.slice(0, 4);

  if (!hydrated) {
    return (
      <Section spacing="lux" aria-busy="true">
        <Container width="content">
          <div className="mx-auto h-40 max-w-lg animate-pulse rounded-card bg-blush" />
        </Container>
      </Section>
    );
  }

  return (
    <Section
      spacing="lux"
      aria-labelledby="thank-you-heading"
      className="bg-[linear-gradient(180deg,var(--color-blush)_0%,var(--color-canvas)_45%)]"
      data-shopify-section="order-confirmation"
    >
      <Container width="content">
        <div className="relative mx-auto max-w-2xl text-center">
          <SuccessMark reduceMotion={Boolean(reduceMotion)} />

          {!reduceMotion ? <SubtleConfetti /> : null}

          <p className="mt-8 text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
            {THANK_YOU_COPY.eyebrow}
          </p>
          <h1
            id="thank-you-heading"
            className="mt-3 font-display text-h1 font-light italic tracking-[-0.02em] text-foreground"
          >
            {THANK_YOU_COPY.title}
          </h1>
          <p className="mt-4 text-base font-light leading-relaxed text-foreground-secondary">
            {THANK_YOU_COPY.support}
          </p>

          {order?.preview ? (
            <p className="mt-4 text-caption text-foreground-muted">
              {THANK_YOU_COPY.demoNote}
            </p>
          ) : null}

          {order ? (
            <dl className="mt-8 grid gap-4 rounded-card border border-border-subtle bg-canvas/80 p-5 text-left tablet:grid-cols-2">
              <div>
                <dt className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                  {THANK_YOU_COPY.orderLabel}
                </dt>
                <dd className="mt-1 text-lg font-medium text-foreground">
                  {order.orderNumber}
                </dd>
              </div>
              <div>
                <dt className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                  {THANK_YOU_COPY.etaLabel}
                </dt>
                <dd className="mt-1 text-lg font-medium text-foreground">
                  {order.delivery.eta}
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 tablet:flex-row tablet:justify-center">
            <Button asChild className="min-h-12 rounded-full">
              <Link href={THANK_YOU_COPY.trackHref}>
                <Package className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {THANK_YOU_COPY.trackCta}
              </Link>
            </Button>
            <Button asChild variant="secondary" className="min-h-12 rounded-full">
              <Link href={THANK_YOU_COPY.continueHref}>
                {THANK_YOU_COPY.continueCta}
              </Link>
            </Button>
            <Button
              type="button"
              variant="text"
              className="min-h-12"
              onClick={() =>
                toast.info(THANK_YOU_COPY.invoiceCta, THANK_YOU_COPY.invoiceHint)
              }
            >
              <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {THANK_YOU_COPY.invoiceCta}
            </Button>
          </div>
        </div>

        {order ? (
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 laptop:grid-cols-2">
            <section className="rounded-card border border-border-subtle bg-canvas/80 p-5 tablet:p-6">
              <h2 className="font-display text-xl font-light italic text-foreground">
                {THANK_YOU_COPY.productsTitle}
              </h2>
              <ul className="mt-4 space-y-3">
                {order.lines.map((line) => (
                  <li key={line.id} className="flex justify-between gap-3 text-sm">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={line.href}
                        className="line-clamp-2 break-words font-medium text-foreground hover:text-power-pink"
                      >
                        {line.title}
                      </Link>
                      <p className="text-caption text-foreground-muted">
                        {line.variantTitle} · Qty {line.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium">{line.priceFormatted}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-border-subtle pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-foreground-secondary">Subtotal</dt>
                  <dd>{order.subtotalFormatted}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-foreground-secondary">Shipping</dt>
                  <dd>{order.shippingFormatted}</dd>
                </div>
                <div className="flex justify-between text-base font-medium">
                  <dt>Total</dt>
                  <dd>{order.totalFormatted}</dd>
                </div>
              </dl>
            </section>

            <div className="space-y-6">
              <section className="rounded-card border border-border-subtle bg-canvas/80 p-5 tablet:p-6">
                <h2 className="text-sm font-medium text-foreground">
                  {THANK_YOU_COPY.shippingTitle}
                </h2>
                <address className="mt-3 text-sm font-light not-italic leading-relaxed text-foreground-secondary">
                  {order.shipping.firstName} {order.shipping.lastName}
                  <br />
                  {order.shipping.address1}
                  {order.shipping.address2 ? (
                    <>
                      <br />
                      {order.shipping.address2}
                    </>
                  ) : null}
                  <br />
                  {order.shipping.city}, {order.shipping.province}{" "}
                  {order.shipping.zip}
                </address>
              </section>
              <section className="rounded-card border border-border-subtle bg-canvas/80 p-5 tablet:p-6">
                <h2 className="text-sm font-medium text-foreground">
                  {THANK_YOU_COPY.paymentTitle}
                </h2>
                <p className="mt-2 text-sm font-light text-foreground-secondary">
                  {order.payment.title}
                </p>
                <p className="mt-1 text-caption text-foreground-muted">
                  {order.delivery.title} · {order.delivery.priceLabel}
                </p>
              </section>
            </div>
          </div>
        ) : null}

        <section className="mt-16" aria-labelledby="thank-you-recs">
          <h2
            id="thank-you-recs"
            className="font-display text-2xl font-light italic text-foreground"
          >
            {THANK_YOU_COPY.recommendedTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-4 tablet:gap-6">
            {recommended.map((product, index) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  emphasis="lux"
                  density="compact"
                  priority={index < 2}
                />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  );
}

function SuccessMark({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-power-pink text-foreground-on-primary shadow-[0_20px_40px_-16px_rgba(228,19,111,0.55)]"
      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease }}
      aria-hidden="true"
    >
      <Check className="h-9 w-9" strokeWidth={1.75} />
    </motion.div>
  );
}

/** Soft pink petal confetti — calm, not childish */
function SubtleConfetti() {
  const petals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-24 h-40 w-full max-w-md -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((i) => (
        <span
          key={i}
          className={cn(
            "absolute h-2 w-2 rounded-full bg-power-pink/30",
            "animate-[ksl-ugc-drift_3.2s_ease-in-out_infinite]",
          )}
          style={{
            left: `${8 + ((i * 7) % 84)}%`,
            top: `${(i * 11) % 70}%`,
            animationDelay: `${i * 0.12}s`,
            opacity: 0.35 + (i % 3) * 0.15,
          }}
        />
      ))}
    </div>
  );
}
