"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { PDP_PURCHASE } from "@/content/pdp";
import type { ProductOption, ProductPageData, ProductVariant } from "@/lib/products";
import { useCart } from "@/components/cart/cart-context";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
type ProductPurchaseProps = {
  product: ProductPageData;
  variant: ProductVariant;
  onVariantChange?: (variantId: string) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  purchaseAnchorRef?: React.RefObject<HTMLDivElement>;
  className?: string;
};

function VariantSelector({
  options,
  variants,
  selectedId,
  onChange,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedId: string;
  onChange: (variantId: string) => void;
}) {
  if (!options.length) {
    return (
      <div className="space-y-2" data-shopify-block="variant-selector">
        <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
          {PDP_PURCHASE.variantLabel}
        </p>
        <p className="text-sm text-foreground-secondary">
          One size / standard offering
          <span className="mt-1 block text-caption text-foreground-muted">
            Additional variants connect when Shopify options are configured.
          </span>
        </p>
        {/* Hidden select keeps form shape Shopify-ready */}
        <select
          className="visually-hidden"
          aria-hidden="true"
          tabIndex={-1}
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
        >
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-shopify-block="variant-selector">
      {options.map((option) => (
        <fieldset key={option.id}>
          <legend className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
            {option.name}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {option.values.map((value) => {
              const match = variants.find((v) => v.optionValues[option.name] === value);
              const selected = match?.id === selectedId;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!match?.availableForSale}
                  onClick={() => match && onChange(match.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-button border px-5 text-sm font-medium tracking-[0.02em]",
                    "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                    selected
                      ? "border-power-pink bg-power-pink text-foreground-on-primary shadow-elev1"
                      : "border-border-subtle bg-canvas text-foreground hover:border-border-default hover:bg-blush",
                    !match?.availableForSale && "opacity-40",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

/**
 * Purchase controls — qty, ATC, wishlist, buy-now placeholder, stock/shipping links.
 */
export function ProductPurchase({
  product,
  variant,
  onVariantChange,
  quantity,
  onQuantityChange,
  purchaseAnchorRef,
  className,
}: ProductPurchaseProps) {
  const qtyId = useId();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const soldOut = !variant.availableForSale;

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

  const buyNow = () => {
    toast.info("Buy now", PDP_PURCHASE.buyNowHint);
  };

  const toggleWishlist = () => {
    setWishlisted((v) => !v);
    toast.success(wishlisted ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <div
      ref={purchaseAnchorRef}
      className={cn("space-y-6 border-t border-border-subtle pt-6", className)}
      data-shopify-block="buy-buttons"
    >
      <VariantSelector
        options={product.options}
        variants={product.variants}
        selectedId={variant.id}
        onChange={(id) => onVariantChange?.(id)}
      />

      {product.includes?.length ? (
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
            Includes
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground-secondary">
            {product.includes.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-power-pink">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-2">
        <label
          htmlFor={qtyId}
          className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
        >
          {PDP_PURCHASE.quantityLabel}
        </label>
        <div className="inline-flex items-center overflow-hidden rounded-button border border-border-subtle bg-canvas shadow-elev1">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || soldOut}
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground hover:text-power-pink disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <input
            id={qtyId}
            type="number"
            min={1}
            max={10}
            value={quantity}
            disabled={soldOut}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isFinite(next)) return;
              onQuantityChange(Math.min(10, Math.max(1, next)));
            }}
            className="h-11 w-14 border-x border-border-subtle bg-transparent text-center text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= 10 || soldOut}
            onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground hover:text-power-pink disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <ButtonGroup stackedOnMobile className="w-full [&_button]:w-full tablet:[&_button]:w-auto">
        <Button
          type="button"
          size="lg"
          className="tablet:flex-1"
          loading={adding}
          onClick={addToCart}
        >
          {soldOut ? (
            PDP_PURCHASE.notifyMe
          ) : (
            <>
              <ShoppingBag aria-hidden="true" />
              {PDP_PURCHASE.addToCart}
            </>
          )}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="tablet:flex-1"
          disabled={soldOut}
          onClick={buyNow}
        >
          {PDP_PURCHASE.buyNow}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          aria-pressed={wishlisted}
          aria-label={wishlisted ? PDP_PURCHASE.wishlistSaved : PDP_PURCHASE.wishlistAdd}
          onClick={toggleWishlist}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={wishlisted ? "currentColor" : "none"}
            aria-hidden="true"
          />
          {wishlisted ? PDP_PURCHASE.wishlistSaved : PDP_PURCHASE.wishlistAdd}
        </Button>
      </ButtonGroup>

      <ul className="space-y-3 text-sm text-foreground-secondary">
        <li>
          <span className="font-medium text-foreground">Stock · </span>
          {soldOut ? PDP_PURCHASE.soldOut : PDP_PURCHASE.inStock}
        </li>
        <li>
          <span className="font-medium text-foreground">Shipping · </span>
          {PDP_PURCHASE.shippingSummary}{" "}
          <Link
            href={PDP_PURCHASE.shippingHref}
            className="font-medium text-power-pink underline-offset-4 hover:underline"
          >
            {PDP_PURCHASE.shippingCta}
          </Link>
        </li>
        <li>
          <span className="font-medium text-foreground">Returns · </span>
          {PDP_PURCHASE.returnsSummary}{" "}
          <Link
            href={PDP_PURCHASE.returnsHref}
            className="font-medium text-power-pink underline-offset-4 hover:underline"
          >
            {PDP_PURCHASE.returnsCta}
          </Link>
        </li>
      </ul>
    </div>
  );
}
