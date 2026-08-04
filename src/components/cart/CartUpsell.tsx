"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart, getCartUpsellBundles, getCartUpsellProducts } from "@/components/cart/cart-context";
import { CART_COPY } from "@/content/cart";
import { cn } from "@/lib/utils";

type CartUpsellProps = {
  onNavigate?: () => void;
  className?: string;
};

/**
 * Compact cart upsell — related products + kits (Shopify Recommendations later).
 */
export function CartUpsell({ onNavigate, className }: CartUpsellProps) {
  const { lines, addItem, isHydrated } = useCart();
  const handles = lines.map((l) => l.handle);
  const products = getCartUpsellProducts(handles, 2);
  const bundles = getCartUpsellBundles(1);

  if (!isHydrated) {
    return (
      <div className={cn("space-y-4", className)} aria-busy="true" aria-label="Loading recommendations">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-20 w-full rounded-card" />
        <Skeleton className="h-20 w-full rounded-card" />
      </div>
    );
  }

  if (!products.length && !bundles.length) return null;

  return (
    <div className={cn("space-y-4", className)} data-shopify-block="cart-upsell">
      <p className="font-sans text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
        {CART_COPY.upsellTitle}
      </p>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id}>
            <article className="flex gap-4 rounded-card border border-border-subtle/80 bg-blush/30 p-3.5 transition-colors duration-280 hover:bg-blush/55">
              <Link
                href={product.href}
                onClick={onNavigate}
                className={cn(
                  "aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-badge border border-border-subtle",
                  "bg-[linear-gradient(160deg,var(--color-pearl),var(--color-pink-mist))]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                )}
                aria-label={product.title}
                data-image-spec="cart-upsell-thumb"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <Link
                  href={product.href}
                  onClick={onNavigate}
                  className="line-clamp-2 font-display text-base font-light italic leading-snug text-foreground transition-colors hover:text-power-pink"
                >
                  {product.title}
                </Link>
                <p className="mt-1.5 text-caption font-medium text-foreground-secondary">
                  {product.price.formatted}
                </p>
                <button
                  type="button"
                  className={cn(
                    "mt-2.5 self-start text-caption font-medium text-power-pink",
                    "link-underline underline-offset-[4px]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  )}
                  onClick={() =>
                    addItem({
                      handle: product.handle,
                      title: product.title,
                      href: product.href,
                      imageAlt: product.imageAlt,
                      price: product.price,
                      compareAtPrice: product.compareAtPrice,
                      availableForSale: product.availableForSale,
                    })
                  }
                >
                  Quick add
                </button>
              </div>
            </article>
          </li>
        ))}
        {bundles.map((bundle) => (
          <li key={bundle.id}>
            <article className="flex gap-4 rounded-card border border-border-subtle/80 bg-pearl/60 p-3.5">
              <Link
                href={bundle.href}
                onClick={onNavigate}
                className={cn(
                  "aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-badge border border-border-subtle",
                  "bg-[linear-gradient(145deg,var(--color-blush),var(--color-pearl))]",
                )}
                aria-label={bundle.title}
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-power-pink">
                  Bundle
                </p>
                <Link
                  href={bundle.href}
                  onClick={onNavigate}
                  className="mt-1 line-clamp-2 font-display text-base font-light italic leading-snug text-foreground hover:text-power-pink"
                >
                  {bundle.title}
                </Link>
                <p className="mt-1.5 text-caption font-medium text-foreground-secondary">
                  {bundle.price.formatted}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
