"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useAccount } from "@/components/account/account-context";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { ACCOUNT_COPY } from "@/content/account";
import type { CustomerOrder } from "@/lib/account-types";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Premium order history — Shopify Orders API ready list experience.
 */
export function OrdersPageView() {
  const reduceMotion = useReducedMotion();
  const { isHydrated, orders } = useAccount();

  if (!isHydrated) {
    return (
      <AccountShell
        title={ACCOUNT_COPY.ordersTitle}
        description={ACCOUNT_COPY.ordersDescription}
        breadcrumbLabel="Orders"
      >
        <div className="space-y-4" aria-busy="true" aria-label="Loading orders">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-40 w-full rounded-card" />
          <Skeleton className="h-40 w-full rounded-card" />
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell
      title={ACCOUNT_COPY.ordersTitle}
      description={ACCOUNT_COPY.ordersDescription}
      breadcrumbLabel="Orders"
    >
      {!orders.length ? (
        <OrdersEmptyState />
      ) : (
        <div data-shopify-block="order-list">
          <p
            className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
            aria-live="polite"
          >
            {ACCOUNT_COPY.orderCountLabel(orders.length)}
          </p>

          <ul className="mt-6 space-y-4 tablet:space-y-5">
            {orders.map((order, index) => (
              <motion.li
                key={order.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease,
                }}
              >
                <OrderCard order={order} />
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </AccountShell>
  );
}

function OrderCard({ order }: { order: CustomerOrder }) {
  const itemCount = order.lineItems.reduce((n, l) => n + l.quantity, 0);
  const thumbs = order.lineItems.slice(0, 4);
  const hasTracking = Boolean(order.trackingUrl || order.trackingNumber);

  return (
    <article
      className={cn(
        "rounded-card border border-border-subtle bg-canvas/80 p-5 tablet:p-6",
        "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)]",
        "transition-[transform,box-shadow] duration-320",
        "hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(17,17,17,0.36)]",
        "motion-reduce:transform-none",
      )}
      data-order-id={order.id}
      data-order-source={order.source}
      data-fulfillment-status={order.fulfillmentStatus}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-medium text-foreground">{order.number}</h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-2 text-sm font-light text-foreground-secondary">
            {formatDate(order.processedAt)}
            <span className="mx-2 text-border-subtle" aria-hidden="true">
              ·
            </span>
            {ACCOUNT_COPY.itemsLabel(itemCount)}
          </p>
        </div>
        <p className="text-base font-medium text-foreground">{order.total.formatted}</p>
      </div>

      <dl className="mt-5 grid gap-3 tablet:grid-cols-3">
        <MetaRow
          label={ACCOUNT_COPY.paymentMethodTitle}
          value={order.paymentMethod ?? order.financialStatus}
        />
        <MetaRow label="Fulfillment" value={order.fulfillmentStatus} />
        {order.estimatedDelivery ? (
          <MetaRow
            label={ACCOUNT_COPY.estimatedDeliveryLabel}
            value={formatDate(order.estimatedDelivery)}
          />
        ) : (
          <MetaRow label="Tracking" value={order.trackingNumber ?? "—"} />
        )}
      </dl>

      <div className="mt-5 flex items-center gap-3">
        <ul className="flex -space-x-2" aria-label="Products in this order">
          {thumbs.map((line) => (
            <li
              key={line.id}
              className="relative h-12 w-10 overflow-hidden rounded-sm border border-canvas bg-blush ring-2 ring-canvas"
            >
              <MediaImage
                src={line.imageSrc}
                alt={line.imageAlt}
                sizes="40px"
                spec="account-order-line-thumb"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        {order.lineItems.length > 4 ? (
          <span className="text-caption text-foreground-muted">
            +{order.lineItems.length - 4}
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-2 tablet:flex-row tablet:flex-wrap">
        <Button asChild className="min-h-11 rounded-full tablet:min-h-10">
          <Link href={`/account/orders/${order.id}`}>
            {ACCOUNT_COPY.orderDetails}
          </Link>
        </Button>
        {hasTracking ? (
          <Button asChild variant="secondary" className="min-h-11 rounded-full tablet:min-h-10">
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
          variant="text"
          className="min-h-11 tablet:min-h-10"
          title={ACCOUNT_COPY.reorderHint}
          onClick={() => toast.info(ACCOUNT_COPY.buyAgain, ACCOUNT_COPY.reorderHint)}
        >
          {ACCOUNT_COPY.buyAgain}
        </Button>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-light text-foreground-secondary">{value}</dd>
    </div>
  );
}

function OrdersEmptyState() {
  return (
    <div
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center"
      data-shopify-block="orders-empty"
    >
      <div
        className="relative mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] border border-border-subtle bg-blush"
        aria-hidden="true"
        data-image-spec="account-empty-illustration"
      >
        <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_0%,rgba(255,245,249,0.7)_45%,transparent_80%)]" />
        <Package className="relative h-10 w-10 text-power-pink" strokeWidth={1.25} />
      </div>
      <h2 className="font-display text-3xl font-light italic text-foreground">
        {ACCOUNT_COPY.ordersEmptyTitle}
      </h2>
      <p className="mt-3 text-base font-light leading-relaxed text-foreground-secondary">
        {ACCOUNT_COPY.ordersEmptyDescription}
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 tablet:w-auto tablet:flex-row">
        <Button asChild className="min-h-11 rounded-full">
          <Link href={ACCOUNT_COPY.continueHref}>{ACCOUNT_COPY.ordersEmptyCta}</Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11 rounded-full">
          <Link href={ACCOUNT_COPY.ordersEmptySecondaryHref}>
            {ACCOUNT_COPY.ordersEmptySecondary}
          </Link>
        </Button>
      </div>
    </div>
  );
}
