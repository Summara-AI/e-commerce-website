"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { memo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/common/MediaImage";
import type { CatalogProduct } from "@/lib/catalog";
import { getProductGallery } from "@/lib/product-galleries";
import {
  AVAILABILITY_LABEL,
  getProductBrand,
  getWishlistAvailability,
} from "@/lib/wishlist";
import { toast } from "@/lib/toast";
import { useAccountOptional } from "@/components/account/account-context";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
  density?: "default" | "compact";
  /** Stronger hover / image zoom for editorial product rails */
  emphasis?: "default" | "lux";
  priority?: boolean;
  sizes?: string;
  /** Show rating placeholder row (Shopify reviews later) */
  showRating?: boolean;
  /** Show In Stock / Low Stock / Out of Stock */
  showAvailability?: boolean;
  /** Show brand / vendor eyebrow above type */
  showBrand?: boolean;
  /** Primary commerce CTA label */
  addLabel?: string;
};

/**
 * Premium product card — editorial commerce unit with calm micro-motion.
 */
export const ProductCard = memo(function ProductCard({
  product,
  className,
  density = "default",
  emphasis = "default",
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  showRating = false,
  showAvailability = false,
  showBrand = false,
  addLabel = "Add to bag",
}: ProductCardProps) {
  const { addItem } = useCart();
  const account = useAccountOptional();
  const wishlisted = account?.isWishlisted(product.handle) ?? false;
  const [adding, setAdding] = useState(false);
  const [hoverImageReady, setHoverImageReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const onSale = Boolean(product.compareAtPrice);
  const availability = getWishlistAvailability(product);
  const soldOut = availability === "out_of_stock";
  const lowStock = availability === "low_stock";
  const brand = getProductBrand(product);
  const gallery = getProductGallery(product.handle);
  const hoverImageSrc = gallery.length > 1 ? gallery[1] : undefined;

  const marketingBadge =
    product.badges?.includes("sale") && onSale
      ? ({ variant: "sale" as const, label: "Sale" })
      : product.badges?.includes("new")
        ? ({ variant: "new" as const, label: "New" })
        : product.badges?.includes("bestseller")
          ? ({ variant: "celadon" as const, label: "Best Seller" })
          : null;

  const statusBadges = soldOut
    ? [{ variant: "outline" as const, label: "Sold out" }]
    : [
        ...(marketingBadge ? [marketingBadge] : []),
        ...(lowStock
          ? [{ variant: "sale" as const, label: "Low Stock" as const }]
          : []),
      ];

  const toggleWishlist = () => {
    if (account) {
      account.toggleWishlist(product.handle);
      toast.success(
        wishlisted ? "Removed from Wishlist" : "Saved to wishlist",
      );
      return;
    }
    toast.info("Wishlist", "Wishlist connects with your account next.");
  };

  const addToCart = async () => {
    if (soldOut) {
      toast.info(
        "We’ll notify you",
        "Back-in-stock alerts connect with Shopify next.",
      );
      return;
    }
    setAdding(true);
    try {
      await new Promise((r) => setTimeout(r, 250));
      addItem({
        handle: product.handle,
        title: product.title,
        href: product.href,
        imageAlt: product.imageAlt,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        availableForSale: product.availableForSale,
      });
      toast.success("Added to bag", product.title);
    } finally {
      setAdding(false);
    }
  };

  const lux = emphasis === "lux";

  return (
    <motion.article
      className={cn(
        "group relative flex h-full flex-col",
        soldOut && "opacity-90",
        className,
      )}
      whileHover={
        reduceMotion
          ? undefined
          : lux
            ? { y: -12, scale: 1.02 }
            : { y: -6 }
      }
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      data-product-handle={product.handle}
      data-available={product.availableForSale}
      data-availability={availability}
      data-quick-view-ready="true"
      onMouseEnter={() => {
        if (hoverImageSrc) setHoverImageReady(true);
      }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-card border border-border-subtle bg-blush",
          "transition-shadow duration-320 ease-out",
          lux
            ? "shadow-elev1 group-hover:shadow-elev3"
            : "group-hover:shadow-elev3",
          "motion-reduce:group-hover:shadow-none",
        )}
      >
        <Link
          href={product.href}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          aria-label={product.title}
          data-quick-view-trigger
        >
          <div
            className="relative aspect-[4/5] w-full overflow-hidden bg-blush"
            data-image-priority={priority ? "true" : undefined}
          >
            <MediaImage
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              priority={priority}
              sizes={sizes}
              className={cn(
                "media-fade-in transition-transform duration-500 ease-out will-change-transform",
                lux
                  ? "group-hover:scale-[1.06]"
                  : "group-hover:scale-[1.04]",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                hoverImageSrc && "transition-opacity duration-320 group-hover:opacity-0",
              )}
              spec="product-card-packshot"
            />
            {hoverImageSrc && hoverImageReady ? (
              <MediaImage
                src={hoverImageSrc}
                alt=""
                fill
                sizes={sizes}
                aria-hidden
                className={cn(
                  "media-fade-in object-cover opacity-0 transition-all duration-320 ease-out",
                  "group-hover:opacity-100 group-hover:scale-[1.04]",
                  lux && "group-hover:scale-[1.06]",
                  "motion-reduce:opacity-0 motion-reduce:group-hover:opacity-0 motion-reduce:group-hover:scale-100",
                )}
                spec="product-card-packshot-alt"
              />
            ) : null}
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-[1] flex max-w-[calc(100%-3.5rem)] flex-wrap gap-1.5">
          {statusBadges.map((badge) => (
            <Badge
              key={badge.label}
              variant={badge.variant}
              className="px-2 py-0.5 text-[0.65rem]"
            >
              {badge.label}
            </Badge>
          ))}
          {!soldOut ? (
            <Badge variant="authentic" className="px-2 py-0.5 text-[0.65rem]">
              Authentic
            </Badge>
          ) : null}
        </div>

        <button
          type="button"
          onClick={toggleWishlist}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-2.5 top-2.5 z-[1] inline-flex h-11 w-11 items-center justify-center rounded-badge",
            "bg-canvas text-ink shadow-elev1",
            "transition-[opacity,color,transform] duration-200 ease-out",
            "hover:text-power-pink active:scale-[0.98]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            "opacity-100",
            !wishlisted &&
              "laptop:opacity-0 laptop:group-hover:opacity-100 laptop:group-focus-within:opacity-100",
            "motion-reduce:opacity-100",
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform duration-280",
              wishlisted && "scale-110 text-power-pink",
            )}
            strokeWidth={1.5}
            fill={wishlisted ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          density === "compact" ? "pt-4" : "pt-5",
        )}
      >
        {showBrand ? (
          <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-nav">
            {brand}
          </p>
        ) : product.productType ? (
          <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-nav">
            {product.productType}
          </p>
        ) : null}

        <h3
          className={cn(
            "font-display font-light italic leading-snug tracking-[-0.01em] text-foreground",
            showBrand || product.productType ? "mt-2" : "mt-0",
            density === "compact" ? "text-base" : "text-lg tablet:text-xl",
          )}
        >
          <Link
            href={product.href}
            className="transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            {product.title}
          </Link>
        </h3>

        {showRating ? (
          <div
            className="mt-2 flex items-center gap-1.5 text-power-pink"
            aria-label="Reviews coming soon"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 opacity-40"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            ))}
            <span className="text-caption font-light text-foreground-muted">
              Reviews soon
            </span>
          </div>
        ) : null}

        <div
          className={cn(
            "mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1",
            "transition-opacity duration-320 group-hover:opacity-90",
          )}
        >
          <p className="font-sans text-sm font-medium tracking-[0.01em] text-foreground">
            {product.price.formatted}
          </p>
          {product.compareAtPrice ? (
            <p className="font-sans text-sm font-light text-foreground-muted line-through">
              {product.compareAtPrice.formatted}
            </p>
          ) : null}
        </div>

        {showAvailability ? (
          <p
            className={cn(
              "mt-2 text-caption font-medium uppercase tracking-[0.08em]",
              soldOut
                ? "text-destructive"
                : lowStock
                  ? "text-power-pink"
                  : "text-emerald-800",
            )}
          >
            {AVAILABILITY_LABEL[availability]}
          </p>
        ) : null}

        {density === "default" ? (
          <p className="mt-3 line-clamp-2 font-sans text-sm font-light leading-relaxed text-foreground-secondary">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Button
            type="button"
            size="sm"
            className={cn(
              "w-full min-h-11",
              lux &&
                "transition-transform duration-320 ease-out group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0",
            )}
            loading={adding}
            onClick={addToCart}
            aria-label={
              soldOut
                ? `Notify me when ${product.title} is back in stock`
                : `Add ${product.title} to bag`
            }
          >
            {soldOut ? (
              "Notify Me"
            ) : (
              <>
                <ShoppingBag aria-hidden="true" />
                {addLabel}
              </>
            )}
          </Button>
          <Button
            asChild
            variant="text"
            size="sm"
            className={cn(
              "w-full justify-center font-medium min-h-10",
              lux &&
                "transition-transform duration-320 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0",
            )}
          >
            <Link href={product.href}>View Product</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
});

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse space-y-4 motion-reduce:animate-none",
        className,
      )}
      aria-hidden="true"
    >
      <div className="aspect-[4/5] rounded-card bg-blush" />
      <div className="h-3 w-1/3 rounded-badge bg-pink-mist" />
      <div className="h-5 w-4/5 rounded-badge bg-pink-mist" />
      <div className="h-4 w-1/4 rounded-badge bg-pink-mist" />
    </div>
  );
}
