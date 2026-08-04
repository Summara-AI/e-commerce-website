"use client";

import Link from "next/link";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { CartLine } from "@/components/cart/cart-context";
import { CART_COPY } from "@/content/cart";
import { cn } from "@/lib/utils";

type CartLineItemProps = {
  line: CartLine;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  busy?: boolean;
};

export function CartLineItem({
  line,
  onUpdateQuantity,
  onRemove,
  busy,
}: CartLineItemProps) {
  const lineTotal = line.price.amount * line.quantity;

  return (
    <article
      className={cn(
        "flex gap-5 border-b border-border-subtle py-7 first:pt-1 last:border-b-0",
        busy && "pointer-events-none opacity-55",
      )}
      data-cart-line={line.id}
      data-product-handle={line.handle}
    >
      <Link
        href={line.href}
        className={cn(
          "relative aspect-[4/5] w-[5.25rem] shrink-0 overflow-hidden rounded-badge border border-border-subtle",
          "bg-[linear-gradient(160deg,var(--color-blush)_0%,var(--color-pearl)_55%,var(--color-pink-mist)_100%)]",
          "shadow-elev1 transition-transform duration-280 ease-out hover:scale-[1.02]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "motion-reduce:hover:scale-100 tablet:w-24",
        )}
        aria-label={line.title}
        data-image-spec="cart-line-thumb"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 pr-1">
            <h3 className="font-display text-lg font-light italic leading-snug tracking-[-0.01em] text-foreground">
              <Link
                href={line.href}
                className="transition-colors duration-200 hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {line.title}
              </Link>
            </h3>
            <p className="mt-2 text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
              {line.variantTitle}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-medium tracking-[0.01em] text-foreground">
              Rs.{lineTotal.toLocaleString("en-PK")}
            </p>
            {line.compareAtPrice ? (
              <p className="mt-1.5 text-caption text-foreground-muted line-through">
                {line.compareAtPrice.formatted}
              </p>
            ) : (
              <p className="mt-1.5 text-caption font-light text-foreground-secondary">
                {line.price.formatted} each
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div
            className={cn(
              "inline-flex items-center rounded-badge border border-border-subtle bg-blush/50",
              "shadow-elev1 transition-[border-color,box-shadow] duration-280",
              "hover:border-border-default hover:bg-canvas",
            )}
          >
            <button
              type="button"
              aria-label={`Decrease quantity for ${line.title}`}
              disabled={busy}
              onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-l-badge text-foreground",
                "transition-[color,background-color,transform] duration-200 ease-out",
                "hover:bg-pink-mist/80 hover:text-power-pink active:scale-95",
                "disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                "motion-reduce:active:scale-100",
              )}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <span
              className="min-w-9 select-none text-center text-sm font-medium tabular-nums text-foreground"
              aria-live="polite"
            >
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity for ${line.title}`}
              disabled={busy || line.quantity >= 10}
              onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-r-badge text-foreground",
                "transition-[color,background-color,transform] duration-200 ease-out",
                "hover:bg-pink-mist/80 hover:text-power-pink active:scale-95",
                "disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                "motion-reduce:active:scale-100",
              )}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <button
            type="button"
            disabled
            title="Save for later — wishlist connects next"
            aria-label={`${CART_COPY.saveForLater} ${line.title} (coming soon)`}
            className="inline-flex h-11 items-center gap-1.5 rounded-badge px-3 text-caption font-medium text-foreground-muted disabled:opacity-45"
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {CART_COPY.saveForLater}
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => onRemove(line.id)}
            aria-label={`${CART_COPY.remove} ${line.title}`}
            className={cn(
              "inline-flex h-11 items-center gap-1.5 rounded-badge px-3 text-caption font-medium text-foreground-secondary",
              "transition-colors duration-200 ease-out hover:text-destructive",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            )}
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {CART_COPY.remove}
          </button>
        </div>
      </div>
    </article>
  );
}

export function CartLineSkeleton() {
  return (
    <div className="flex gap-5 border-b border-border-subtle py-7" aria-hidden="true">
      <Skeleton className="aspect-[4/5] w-[5.25rem] shrink-0 rounded-badge tablet:w-24" />
      <div className="flex-1 space-y-3 pt-1">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="mt-4 h-10 w-32 rounded-badge" />
      </div>
    </div>
  );
}
