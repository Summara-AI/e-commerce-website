"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDP_PURCHASE } from "@/content/pdp";
import type { ProductPageData, ProductVariant } from "@/lib/products";
import { useCart } from "@/components/cart/cart-context";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
type ProductStickyBarProps = {
  product: ProductPageData;
  variant: ProductVariant;
  quantity: number;
  /** When false, bar is hidden (purchase block in view) */
  visible: boolean;
  className?: string;
};

/**
 * Sticky ATC bar — appears after scrolling past the purchase block.
 */
export function ProductStickyBar({
  product,
  variant,
  quantity,
  visible,
  className,
}: ProductStickyBarProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const soldOut = !variant.availableForSale;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (visible) root.dataset.stickyPurchase = "true";
    else delete root.dataset.stickyPurchase;
    return () => {
      delete root.dataset.stickyPurchase;
    };
  }, [mounted, visible]);

  if (!mounted) return null;

  const addToCart = async () => {
    if (soldOut) {
      toast.info("We’ll notify you", "Back-in-stock alerts connect with Shopify next.");
      return;
    }
    setAdding(true);
    try {
      await new Promise((r) => setTimeout(r, 250));
      addItem({
        handle: product.handle,
        title: product.title,
        href: product.href,
        imageAlt: product.media[0]?.alt ?? product.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        availableForSale: variant.availableForSale,
        variantTitle: variant.title,
        quantity,
        merchandiseId: variant.id,
      });
      toast.success("Added to bag", `${quantity} × ${product.title}`);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      role="region"
      aria-label="Quick add to bag"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[1015] border-t border-border-subtle bg-surface/95 backdrop-blur-md",
        "pb-[env(safe-area-inset-bottom)] transition-transform duration-320 ease-standard",
        "motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none",
        className,
      )}
      data-shopify-block="sticky-buy-bar"
      data-sticky-purchase={visible ? "true" : "false"}
    >
      <div className="mx-auto flex max-w-content items-center gap-3 px-4 py-3 tablet:gap-4 tablet:px-6 laptop:px-8 desktop:px-12">
        <div
          className={cn(
            "hidden h-12 w-12 shrink-0 rounded-badge bg-surface-soft tablet:block",
            "bg-[linear-gradient(160deg,var(--bg-page)_0%,var(--color-accent-muted)_100%)]",
          )}
          role="img"
          aria-label={product.media[0]?.alt ?? product.title}
          data-image-spec="pdp-sticky-thumb"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{product.title}</p>
          <p className="text-caption text-foreground-secondary">
            {variant.price.formatted}
            {soldOut ? " · Sold out" : ""}
          </p>
        </div>

        <Button
          type="button"
          size="md"
          className="shrink-0"
          loading={adding}
          onClick={addToCart}
        >
          {soldOut ? (
            PDP_PURCHASE.notifyMe
          ) : (
            <>
              <ShoppingBag className="hidden tablet:inline" aria-hidden="true" />
              <span className="tablet:hidden">Add</span>
              <span className="hidden tablet:inline">{PDP_PURCHASE.addToCart}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
