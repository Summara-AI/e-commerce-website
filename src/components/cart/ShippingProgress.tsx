"use client";

import Link from "next/link";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { getShippingProgressState } from "@/lib/cart-shipping";
import { cn } from "@/lib/utils";

type ShippingProgressProps = {
  subtotalAmount: number;
  className?: string;
};

/**
 * Premium shipping progress — threshold from Shopify / theme settings only.
 * Inactive when no verified free-shipping amount is configured.
 */
export function ShippingProgress({ subtotalAmount, className }: ShippingProgressProps) {
  const state = getShippingProgressState(subtotalAmount);

  if (state.kind === "inactive") {
    return (
      <div
        className={cn(
          "rounded-card border border-border-subtle bg-surface-soft px-4 py-4",
          className,
        )}
        data-shopify-block="shipping-progress"
        data-shipping-progress="inactive"
      >
        <p className="text-sm font-medium text-foreground">
          {CART_PAGE_COPY.progressInactiveTitle}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">
          {CART_PAGE_COPY.progressInactiveBody}
        </p>
        <p className="mt-3 text-sm text-foreground-secondary">
          {CART_PAGE_COPY.shippingNoteBody}{" "}
          <Link
            href={CART_PAGE_COPY.shippingNoteHref}
            className="font-medium text-power-pink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            {CART_PAGE_COPY.shippingNoteCta}
          </Link>
        </p>
      </div>
    );
  }

  const { progress, unlocked, remainingFormatted, settings } = state;
  const labelId = "cart-shipping-progress-label";

  return (
    <div
      className={cn(
        "rounded-card border border-border-subtle bg-surface-soft px-4 py-4",
        className,
      )}
      data-shopify-block="shipping-progress"
      data-shipping-progress={unlocked ? "unlocked" : "active"}
    >
      <div className="flex items-start justify-between gap-3">
        <p id={labelId} className="text-sm font-medium text-foreground">
          {settings.progressLabel ?? CART_PAGE_COPY.progressInactiveTitle}
        </p>
        {!unlocked ? (
          <p className="shrink-0 text-caption font-medium text-power-pink">
            {Math.round(progress * 100)}%
          </p>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">
        {unlocked
          ? (settings.unlockedMessage ?? CART_PAGE_COPY.progressUnlocked)
          : CART_PAGE_COPY.progressRemaining(remainingFormatted)}
      </p>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-blush"
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full rounded-full bg-celadon transition-[width] duration-320 ease-standard motion-reduce:transition-none"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
