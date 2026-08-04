"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Headphones } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CART_COPY } from "@/content/cart";
import { cn } from "@/lib/utils";

const TRUST = [
  { id: "secure", label: "Secure Checkout", Icon: Lock },
  { id: "authentic", label: "100% Authentic", Icon: ShieldCheck },
  { id: "support", label: "Customer Support", Icon: Headphones },
] as const;

type CartSummaryProps = {
  onContinue: () => void;
  className?: string;
};

export function CartSummary({ onContinue, className }: CartSummaryProps) {
  const { subtotal, savings, compareAtSubtotal, isHydrated, itemCount } = useCart();

  if (!isHydrated) {
    return (
      <div className={cn("space-y-5", className)} aria-busy="true" aria-label="Loading totals">
        <Skeleton className="h-28 w-full rounded-card" />
        <Skeleton className="h-10 w-full rounded-badge" />
        <Skeleton className="h-14 w-full rounded-button" />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} data-shopify-block="cart-summary">
      {/* Totals card */}
      <div
        className={cn(
          "rounded-card border border-border-subtle px-5 py-5",
          "bg-[linear-gradient(165deg,var(--color-pearl)_0%,var(--color-blush)_55%,rgba(255,224,239,0.35)_100%)]",
          "shadow-elev1",
        )}
      >
        <dl className="space-y-3.5">
          <div className="flex items-baseline justify-between gap-6">
            <dt className="text-sm font-medium text-foreground">
              Subtotal
              <span className="ml-1.5 font-light text-foreground-muted">
                · {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </dt>
            <dd className="text-base font-medium tabular-nums tracking-[0.01em] text-foreground">
              {subtotal.formatted}
            </dd>
          </div>

          {compareAtSubtotal ? (
            <div className="flex items-baseline justify-between gap-6 text-caption text-foreground-muted">
              <dt>Listed compares</dt>
              <dd className="tabular-nums line-through">{compareAtSubtotal.formatted}</dd>
            </div>
          ) : null}

          {savings ? (
            <div className="flex items-baseline justify-between gap-6">
              <dt className="text-sm font-medium text-power-pink">{CART_COPY.savingsLabel}</dt>
              <dd className="text-sm font-medium tabular-nums text-power-pink">
                {savings.formatted}
              </dd>
            </div>
          ) : null}

          <div className="space-y-2 border-t border-border-subtle/80 pt-3.5">
            <div className="flex items-baseline justify-between gap-6 text-caption font-light text-foreground-muted">
              <dt>{CART_COPY.shippingEstimate}</dt>
              <dd>—</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 text-caption font-light text-foreground-muted">
              <dt>{CART_COPY.taxEstimate}</dt>
              <dd>—</dd>
            </div>
          </div>
        </dl>
      </div>

      {/* Trust pills */}
      <ul className="flex flex-wrap gap-2" aria-label="Shopping assurances">
        {TRUST.map(({ id, label, Icon }) => (
          <li key={id}>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-badge border border-border-subtle bg-canvas",
                "px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-foreground-secondary",
                "shadow-elev1 transition-[transform,box-shadow,border-color,color,background-color] duration-280 ease-out",
                "hover:-translate-y-0.5 hover:border-soft-pink/50 hover:bg-blush hover:text-foreground hover:shadow-elev2",
                "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
              )}
            >
              <Icon className="h-3 w-3 text-power-pink" strokeWidth={1.5} aria-hidden="true" />
              {label}
            </span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button asChild size="lg" className="h-[58px] w-full">
          <Link href="/checkout" onClick={onContinue}>
            {CART_COPY.checkout}
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="h-14 w-full bg-canvas/80">
          <Link href="/cart" onClick={onContinue}>
            {CART_COPY.viewCart}
          </Link>
        </Button>

        <Button
          type="button"
          variant="text"
          className="mx-auto mt-1 w-auto justify-center"
          onClick={onContinue}
        >
          {CART_COPY.continueShopping}
        </Button>
      </div>
    </div>
  );
}
