"use client";

import Link from "next/link";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CartLine } from "@/components/cart/cart-context";
import { useAccountOptional } from "@/components/account/account-context";
import { Skeleton } from "@/components/ui/skeleton";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type CartPageLineItemProps = {
  line: CartLine;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  busy?: boolean;
  priority?: boolean;
  index?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function CartPageLineItem({
  line,
  onUpdateQuantity,
  onRemove,
  busy,
  priority,
  index = 0,
}: CartPageLineItemProps) {
  const reduceMotion = useReducedMotion();
  const account = useAccountOptional();
  const wishlisted = account?.isWishlisted(line.handle) ?? false;
  const lineTotal = line.price.amount * line.quantity;
  const inStock = line.availableForSale;

  const toggleWishlist = () => {
    if (!account) {
      toast.info("Wishlist", "Sign in to save pieces to your wishlist.");
      return;
    }
    account.toggleWishlist(line.handle);
    toast.success(
      wishlisted ? "Removed from Wishlist" : "Saved to wishlist",
      line.title,
    );
  };

  return (
    <motion.article
      className={cn(
        "grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border-subtle py-6",
        "tablet:grid-cols-[7.5rem_1fr] tablet:gap-6",
        "laptop:grid-cols-[8.5rem_minmax(0,1fr)_auto] laptop:items-start",
        busy && "opacity-60",
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : index * 0.05,
        ease,
      }}
      data-cart-line={line.id}
      data-product-handle={line.handle}
      data-shopify-line={line.merchandiseId}
    >
      <Link
        href={line.href}
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-badge bg-surface-soft",
          "bg-[linear-gradient(160deg,var(--bg-page),var(--color-accent-muted))]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
        aria-label={line.title}
        data-image-spec="cart-page-line-thumb"
        data-image-priority={priority ? "true" : undefined}
      />

      <div className="min-w-0 laptop:pr-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            <h2 className="text-base font-medium leading-snug text-foreground tablet:text-lg">
              <Link
                href={line.href}
                className="line-clamp-2 break-words hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {line.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">{line.variantTitle}</p>
          </div>
          <p className="shrink-0 text-base font-medium text-foreground laptop:hidden">
            Rs.{lineTotal.toLocaleString("en-PK")}
          </p>
        </div>

        <p
          className={cn(
            "mt-2 text-caption font-medium",
            inStock ? "text-power-pink" : "text-destructive",
          )}
        >
          {inStock ? CART_PAGE_COPY.inStock : CART_PAGE_COPY.soldOut}
        </p>

        <p className="mt-1 text-caption text-foreground-muted">
          Estimated delivery · 3–5 business days
        </p>

        {line.compareAtPrice ? (
          <p className="mt-2 text-sm text-foreground-secondary">
            <span className="font-medium text-foreground">{line.price.formatted}</span>
            <span className="ml-2 line-through text-foreground-muted">
              {line.compareAtPrice.formatted}
            </span>
            <span className="ml-1 text-foreground-muted">each</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-foreground-secondary">
            {line.price.formatted} each
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-badge border border-border-subtle bg-surface">
            <button
              type="button"
              aria-label={`Decrease quantity for ${line.title}`}
              disabled={busy}
              onClick={() => onUpdateQuantity(line.id, line.quantity - 1)}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-power-pink disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus active:scale-95"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <span
              className="min-w-10 text-center text-sm font-medium tabular-nums"
              aria-live="polite"
            >
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity for ${line.title}`}
              disabled={busy || line.quantity >= 10}
              onClick={() => onUpdateQuantity(line.id, line.quantity + 1)}
              className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-power-pink disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-pressed={wishlisted}
            aria-label={
              wishlisted
                ? `Remove ${line.title} from wishlist`
                : `Save ${line.title} to wishlist`
            }
            className={cn(
              "inline-flex h-11 items-center gap-1.5 rounded-badge px-3 text-caption font-medium",
              "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
              wishlisted
                ? "text-power-pink"
                : "text-foreground-secondary hover:text-power-pink",
            )}
          >
            <Heart
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              fill={wishlisted ? "currentColor" : "none"}
              aria-hidden="true"
            />
            Wishlist
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => onRemove(line.id)}
            aria-label={`${CART_PAGE_COPY.remove} ${line.title}`}
            className="inline-flex h-11 items-center gap-1.5 rounded-badge px-3 text-caption font-medium text-foreground-secondary hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {CART_PAGE_COPY.remove}
          </button>
        </div>
      </div>

      <p className="hidden text-right text-lg font-medium text-foreground laptop:block">
        Rs.{lineTotal.toLocaleString("en-PK")}
      </p>
    </motion.article>
  );
}

export function CartPageLineSkeleton() {
  return (
    <div
      className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border-subtle py-6 tablet:grid-cols-[7.5rem_1fr]"
      aria-hidden="true"
    >
      <Skeleton className="aspect-[4/5] w-full rounded-badge" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-11 w-36" />
      </div>
    </div>
  );
}
