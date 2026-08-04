"use client";

import Link from "next/link";
import { Headphones, Lock, Package, ShieldCheck } from "lucide-react";
import type { AppliedDiscount } from "@/components/cart/DiscountCode";
import { DiscountCode } from "@/components/cart/DiscountCode";
import { ShippingProgress } from "@/components/cart/ShippingProgress";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CART_PAGE_COPY, CART_PAGE_TRUST } from "@/content/cart-page";
import { cn } from "@/lib/utils";

const TRUST_ICONS = {
  lock: Lock,
  shield: ShieldCheck,
  headphones: Headphones,
  package: Package,
} as const;

type CartPageSummaryProps = {
  discount: AppliedDiscount | null;
  onDiscountChange: (discount: AppliedDiscount | null) => void;
  className?: string;
};

export function CartPageSummary({
  discount,
  onDiscountChange,
  className,
}: CartPageSummaryProps) {
  const { subtotal, savings, compareAtSubtotal, isHydrated, itemCount, lines } =
    useCart();

  const subtotalAmount = lines.reduce(
    (sum, l) => sum + l.price.amount * l.quantity,
    0,
  );

  if (!isHydrated) {
    return (
      <aside
        className={cn("space-y-4 rounded-card border border-border-subtle bg-surface p-5", className)}
        aria-busy="true"
        aria-label="Loading order summary"
      >
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "rounded-card border border-border-subtle bg-surface p-5 shadow-elev1",
        "laptop:sticky laptop:top-[calc(var(--announcement-height)+var(--header-height-sticky)+1rem)]",
        className,
      )}
      aria-labelledby="cart-order-summary-heading"
      data-shopify-block="cart-order-summary"
    >
      <h2
        id="cart-order-summary-heading"
        className="font-display text-xl font-light text-foreground"
      >
        Order summary
      </h2>

      <div className="mt-5">
        <ShippingProgress subtotalAmount={subtotalAmount} />
      </div>

      <div className="mt-5">
        <DiscountCode value={discount} onChange={onDiscountChange} />
      </div>

      <dl className="mt-6 space-y-3 border-t border-border-subtle pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="min-w-0 text-foreground-secondary">
            {CART_PAGE_COPY.subtotal} · {itemCount}{" "}
            {itemCount === 1 ? CART_PAGE_COPY.itemSingular : CART_PAGE_COPY.itemPlural}
          </dt>
          <dd className="shrink-0 font-medium text-foreground">{subtotal.formatted}</dd>
        </div>

        {compareAtSubtotal ? (
          <div className="flex justify-between gap-4 text-foreground-muted">
            <dt className="min-w-0">Listed compares</dt>
            <dd className="shrink-0 line-through">{compareAtSubtotal.formatted}</dd>
          </div>
        ) : null}

        {savings ? (
          <div className="flex justify-between gap-4 text-power-pink">
            <dt className="min-w-0">{CART_PAGE_COPY.savings}</dt>
            <dd className="shrink-0 font-medium">{savings.formatted}</dd>
          </div>
        ) : null}

        <div className="flex justify-between gap-4 text-foreground-muted">
          <dt className="min-w-0">{CART_PAGE_COPY.shipping}</dt>
          <dd className="shrink-0">{CART_PAGE_COPY.shippingValue}</dd>
        </div>

        <div className="flex justify-between gap-4 text-foreground-muted">
          <dt>{CART_PAGE_COPY.tax}</dt>
          <dd>{CART_PAGE_COPY.taxValue}</dd>
        </div>

        {discount ? (
          <div className="flex justify-between gap-4 text-power-pink">
            <dt>
              {CART_PAGE_COPY.discount} · {discount.code}
            </dt>
            <dd className="font-medium">
              {discount.amount != null
                ? `−Rs.${discount.amount.toLocaleString("en-PK")}`
                : CART_PAGE_COPY.discountPending}
            </dd>
          </div>
        ) : (
          <div className="flex justify-between gap-4 text-foreground-muted">
            <dt>{CART_PAGE_COPY.discount}</dt>
            <dd>—</dd>
          </div>
        )}

        <div className="flex justify-between gap-4 border-t border-border-subtle pt-4 text-base">
          <dt className="font-medium text-foreground">{CART_PAGE_COPY.total}</dt>
          <dd className="font-medium text-foreground">
            {subtotal.formatted}
            <span className="mt-1 block text-caption font-normal text-foreground-muted">
              Before shipping & tax
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2">
        <Button asChild size="lg" className="w-full rounded-full">
          <Link href="/checkout">{CART_PAGE_COPY.checkout}</Link>
        </Button>
        <Button asChild variant="text" className="w-full justify-center">
          <Link href="/collections/all">{CART_PAGE_COPY.continueShopping}</Link>
        </Button>
      </div>

      <ul className="mt-6 space-y-3 border-t border-border-subtle pt-5">
        {CART_PAGE_TRUST.map(({ id, title, description, icon }) => {
          const Icon = TRUST_ICONS[icon];
          return (
            <li key={id} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-badge bg-surface-soft text-power-pink">
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="mt-0.5 text-caption leading-relaxed text-foreground-secondary">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-caption leading-relaxed text-foreground-muted">
        {CART_PAGE_COPY.returnsNote}{" "}
        <Link
          href={CART_PAGE_COPY.returnsHref}
          className="font-medium text-power-pink underline-offset-4 hover:underline"
        >
          {CART_PAGE_COPY.returnsCta}
        </Link>
      </p>
    </aside>
  );
}
