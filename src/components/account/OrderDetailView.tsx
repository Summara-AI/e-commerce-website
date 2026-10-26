"use client";

import Link from "next/link";
import { Check, FileText, Headphones, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useAccount } from "@/components/account/account-context";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { ACCOUNT_COPY } from "@/content/account";
import {
  ORDER_STATUS_LABEL,
  type CustomerAddress,
  type CustomerOrder,
  type OrderLineItem,
  type TimelineStep,
} from "@/lib/account-types";
import { mailtoHref } from "@/lib/email";
import { FOOTER_CONTACT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string, withTime = false) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime
      ? { hour: "2-digit" as const, minute: "2-digit" as const }
      : {}),
  }).format(new Date(iso));
}

type OrderDetailViewProps = {
  orderId: string;
};

/**
 * Premium order detail — timeline, line items, addresses, totals.
 * Maps cleanly onto Shopify Customer Account / Orders API payloads.
 */
export function OrderDetailView({ orderId }: OrderDetailViewProps) {
  const reduceMotion = useReducedMotion();
  const { isHydrated, getOrder } = useAccount();
  const order = getOrder(orderId);

  if (!isHydrated) {
    return (
      <AccountShell title="Order" breadcrumbLabel="Orders">
        <div className="space-y-4" aria-busy="true" aria-label="Loading order">
          <Skeleton className="h-12 w-48 rounded-md" />
          <Skeleton className="h-56 w-full rounded-card" />
          <Skeleton className="h-64 w-full rounded-card" />
        </div>
      </AccountShell>
    );
  }

  if (!order) {
    return (
      <AccountShell title="Order" breadcrumbLabel="Orders">
        <EmptyState
          title="Order not found"
          description="This order isn’t available in your account."
          actionLabel="Back to orders"
          actionHref="/account/orders"
        />
      </AccountShell>
    );
  }

  const hasTracking = Boolean(order.trackingUrl || order.trackingNumber);

  return (
    <AccountShell
      showPageHeader={false}
      breadcrumbs={[
        { label: "Account", href: "/account" },
        { label: "Orders", href: "/account/orders" },
        { label: order.number },
      ]}
    >
      <div
        className="space-y-8 tablet:space-y-10"
        data-shopify-block="order-detail"
        data-order-id={order.id}
        data-order-source={order.source}
      >
        <motion.header
          className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-h2 font-light tracking-[-0.01em] text-foreground">
                {order.number}
              </h2>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="mt-3 text-base font-light leading-relaxed text-foreground-secondary">
              Placed {formatDate(order.processedAt, true)}
              <span className="mx-2 text-border-subtle" aria-hidden="true">
                ·
              </span>
              {ORDER_STATUS_LABEL[order.status]}
            </p>
          </div>

          <div className="flex flex-col gap-2 tablet:flex-row tablet:flex-wrap">
            {hasTracking ? (
              <Button asChild variant="secondary" className="min-h-11 rounded-full">
                <Link
                  href={order.trackingUrl ?? "/pages/track-order"}
                  aria-label={`${ACCOUNT_COPY.trackShipment} for ${order.number}`}
                >
                  {ACCOUNT_COPY.trackShipment}
                </Link>
              </Button>
            ) : null}
            <Button
              type="button"
              variant="secondary"
              className="min-h-11 rounded-full"
              onClick={() =>
                toast.info(ACCOUNT_COPY.downloadInvoice, ACCOUNT_COPY.invoicePlaceholder)
              }
            >
              <FileText className="mr-2 h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {ACCOUNT_COPY.downloadInvoice}
            </Button>
            <Button
              type="button"
              className="min-h-11 rounded-full"
              onClick={() => toast.info(ACCOUNT_COPY.buyAgain, ACCOUNT_COPY.reorderHint)}
            >
              {ACCOUNT_COPY.buyAgain}
            </Button>
          </div>
        </motion.header>

        <OrderTimeline steps={order.timeline} />

        <OrderLines lines={order.lineItems} />

        <div className="grid gap-6 laptop:grid-cols-2">
          <AddressBlock
            title={ACCOUNT_COPY.shippingAddressTitle}
            address={order.shippingAddress}
          />
          <AddressBlock
            title={ACCOUNT_COPY.billingAddressTitle}
            address={order.billingAddress}
          />
        </div>

        <div className="grid gap-6 laptop:grid-cols-2">
          <PaymentBlock order={order} />
          <OrderTotals order={order} />
        </div>

        {order.notes ? (
          <section
            className="rounded-card border border-border-subtle bg-canvas/80 p-5 tablet:p-6"
            aria-labelledby="order-notes-heading"
          >
            <h3
              id="order-notes-heading"
              className="text-sm font-medium text-foreground"
            >
              Order notes
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground-secondary">
              {order.notes}
            </p>
          </section>
        ) : null}

        <SupportBlock orderNumber={order.number} />
      </div>
    </AccountShell>
  );
}

function OrderTimeline({ steps }: { steps: TimelineStep[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="order-timeline-heading"
      className="rounded-card border border-border-subtle bg-canvas/80 p-5 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-7"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease }}
    >
      <h3
        id="order-timeline-heading"
        className="font-display text-xl font-light italic text-foreground"
      >
        {ACCOUNT_COPY.timelineTitle}
      </h3>
      <ol className="mt-6 space-y-0">
        {steps.map((step, index) => (
          <motion.li
            key={step.id}
            className="relative flex gap-4 pb-7 last:pb-0"
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : index * 0.08,
              ease,
            }}
          >
            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "absolute left-[0.8125rem] top-8 h-[calc(100%-0.75rem)] w-px",
                  step.complete ? "bg-power-pink/35" : "bg-border-subtle",
                )}
                aria-hidden="true"
              />
            ) : null}
            <span
              className={cn(
                "relative z-[1] mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-320",
                step.complete
                  ? "border-power-pink bg-pink-mist text-power-pink"
                  : "border-border-subtle bg-surface text-foreground-muted",
                step.current && "ring-4 ring-pink-mist/80",
              )}
              aria-hidden="true"
            >
              {step.complete ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  step.complete || step.current
                    ? "text-foreground"
                    : "text-foreground-muted",
                )}
              >
                {step.label}
                {step.current ? (
                  <span className="sr-only"> (current)</span>
                ) : null}
              </p>
              {step.description ? (
                <p className="mt-0.5 text-sm font-light text-foreground-secondary">
                  {step.description}
                </p>
              ) : null}
              {step.at ? (
                <p className="mt-1 text-caption text-foreground-muted">
                  {formatDate(step.at, true)}
                </p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}

function OrderLines({ lines }: { lines: OrderLineItem[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="order-products-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease }}
    >
      <h3
        id="order-products-heading"
        className="font-display text-xl font-light italic text-foreground"
      >
        {ACCOUNT_COPY.productsTitle}
      </h3>
      <ul className="mt-5 space-y-4">
        {lines.map((line, index) => (
          <motion.li
            key={line.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : index * 0.05,
              ease,
            }}
          >
            <article
              className={cn(
                "flex flex-col gap-4 rounded-card border border-border-subtle bg-canvas/80 p-4",
                "shadow-[0_10px_28px_-24px_rgba(17,17,17,0.28)]",
                "transition-[transform,box-shadow] duration-320",
                "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(17,17,17,0.34)]",
                "tablet:flex-row tablet:items-center tablet:p-5",
                "motion-reduce:transform-none",
              )}
            >
              <Link
                href={line.href}
                className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-sm bg-blush tablet:w-24"
                aria-label={line.title}
              >
                <MediaImage
                  src={line.imageSrc}
                  alt={line.imageAlt}
                  sizes="96px"
                  spec="account-order-line-thumb"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={line.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-power-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-power-pink/40"
                >
                  {line.title}
                </Link>
                <p className="mt-1 text-caption text-foreground-muted">
                  {line.variantTitle}
                </p>
                <p className="mt-2 text-sm font-light text-foreground-secondary">
                  Qty {line.quantity}
                  <span className="mx-2 text-border-subtle" aria-hidden="true">
                    ·
                  </span>
                  {line.price.formatted}
                </p>
              </div>

              <div className="flex flex-col gap-2 tablet:items-end">
                <p className="text-sm font-medium text-foreground">
                  Rs.{(line.price.amount * line.quantity).toLocaleString("en-PK")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="min-h-10 rounded-full"
                    onClick={() =>
                      toast.info(ACCOUNT_COPY.reorder, ACCOUNT_COPY.reorderHint)
                    }
                  >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    {ACCOUNT_COPY.reorder}
                  </Button>
                  <Button asChild variant="text" size="sm" className="min-h-10">
                    <Link href={line.href}>{ACCOUNT_COPY.viewProduct}</Link>
                  </Button>
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

function AddressBlock({
  title,
  address,
}: {
  title: string;
  address: CustomerAddress;
}) {
  return (
    <section className="rounded-card border border-border-subtle bg-canvas/80 p-5 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-6">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <address className="mt-3 text-sm font-light not-italic leading-relaxed text-foreground-secondary">
        {address.firstName} {address.lastName}
        <br />
        {address.address1}
        {address.address2 ? (
          <>
            <br />
            {address.address2}
          </>
        ) : null}
        <br />
        {address.city}, {address.province} {address.zip}
        <br />
        {address.country}
        {address.phone ? (
          <>
            <br />
            {address.phone}
          </>
        ) : null}
      </address>
    </section>
  );
}

function PaymentBlock({ order }: { order: CustomerOrder }) {
  return (
    <section
      className="rounded-card border border-border-subtle bg-canvas/80 p-5 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-6"
      aria-labelledby="payment-heading"
    >
      <h3 id="payment-heading" className="text-sm font-medium text-foreground">
        {ACCOUNT_COPY.paymentMethodTitle}
      </h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="min-w-0 font-light text-foreground-secondary">Method</dt>
          <dd className="shrink-0 text-right font-medium text-foreground">
            {order.paymentMethod ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="min-w-0 font-light text-foreground-secondary">Payment status</dt>
          <dd className="shrink-0 text-right font-medium text-foreground">{order.financialStatus}</dd>
        </div>
        {order.trackingNumber ? (
          <div className="flex justify-between gap-4">
            <dt className="min-w-0 font-light text-foreground-secondary">Tracking</dt>
            <dd className="min-w-0 shrink break-all text-right font-medium text-foreground">{order.trackingNumber}</dd>
          </div>
        ) : null}
        {order.estimatedDelivery ? (
          <div className="flex justify-between gap-4">
            <dt className="min-w-0 font-light text-foreground-secondary">
              {ACCOUNT_COPY.estimatedDeliveryLabel}
            </dt>
            <dd className="shrink-0 text-right font-medium text-foreground">
              {formatDate(order.estimatedDelivery)}
            </dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}

function OrderTotals({ order }: { order: CustomerOrder }) {
  return (
    <section
      className="rounded-card border border-border-subtle bg-canvas/80 p-5 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-6"
      aria-labelledby="order-summary-heading"
    >
      <h3
        id="order-summary-heading"
        className="text-sm font-medium text-foreground"
      >
        {ACCOUNT_COPY.summaryTitle}
      </h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-6">
          <dt className="min-w-0 font-light text-foreground-secondary">Subtotal</dt>
          <dd className="shrink-0 font-medium text-foreground">{order.subtotal.formatted}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="min-w-0 font-light text-foreground-secondary">Shipping</dt>
          <dd className="shrink-0 text-foreground-secondary">
            {order.shipping?.formatted ?? "—"}
          </dd>
        </div>
        {order.discount ? (
          <div className="flex justify-between gap-6">
            <dt className="min-w-0 font-light text-foreground-secondary">Discount</dt>
            <dd className="shrink-0 text-power-pink">−{order.discount.formatted}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-6">
          <dt className="min-w-0 font-light text-foreground-secondary">Tax</dt>
          <dd className="shrink-0 text-foreground-secondary">
            {order.tax?.formatted ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-6 border-t border-border-subtle pt-3 text-base">
          <dt className="min-w-0 font-medium text-foreground">Grand total</dt>
          <dd className="font-medium text-foreground">{order.total.formatted}</dd>
        </div>
      </dl>
    </section>
  );
}

function SupportBlock({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-border-subtle bg-surface-soft/80 p-5 tablet:flex-row tablet:items-center tablet:justify-between tablet:p-6">
      <div className="flex gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-canvas text-power-pink">
          <Headphones className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">
            {ACCOUNT_COPY.supportTitle}
          </p>
          <p className="mt-1 text-sm font-light text-foreground-secondary">
            WhatsApp or email with your order number.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="secondary" className="min-h-11 rounded-full">
          <a
            href={FOOTER_CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ACCOUNT_COPY.contactSupport}
          </a>
        </Button>
        <Button asChild variant="text" className="min-h-11">
          <a href={mailtoHref(FOOTER_CONTACT.email, orderNumber)}>
            Email support
          </a>
        </Button>
      </div>
    </div>
  );
}
