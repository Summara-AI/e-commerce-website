import { Badge } from "@/components/ui/badge";
import type { ProductPageData, ProductVariant } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductInfoProps = {
  product: ProductPageData;
  variant: ProductVariant;
  className?: string;
};

/**
 * Product title, pricing, availability, badges, short description.
 */
export function ProductInfo({ product, variant, className }: ProductInfoProps) {
  const onSale = Boolean(variant.compareAtPrice);
  const soldOut = !variant.availableForSale;

  const statusBadge = soldOut
    ? ({ variant: "outline" as const, label: "Sold out" })
    : product.badges?.includes("sale") && onSale
      ? ({ variant: "sale" as const, label: "Sale" })
      : product.badges?.includes("new")
        ? ({ variant: "new" as const, label: "New" })
        : product.badges?.includes("bestseller")
          ? ({ variant: "celadon" as const, label: "Best seller" })
          : null;

  return (
    <div className={cn("flex flex-col", className)} data-shopify-block="product-info">
      {product.productType ? (
        <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {product.productType}
        </p>
      ) : null}

      <h1
        id="pdp-title"
        className={cn(
          "font-display text-h1 font-light italic tracking-[-0.02em] text-foreground",
          product.productType ? "mt-3" : undefined,
        )}
      >
        {product.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Product badges">
        {statusBadge ? (
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        ) : null}
        {product.kind === "bundle" ? <Badge variant="default">Kit</Badge> : null}
        {!soldOut ? <Badge variant="authentic">100% Authentic</Badge> : null}
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <p className="font-display text-2xl font-light tracking-[-0.01em] text-foreground tablet:text-3xl">
          {variant.price.formatted}
        </p>
        {variant.compareAtPrice ? (
          <p className="text-lg font-light text-foreground-muted line-through">
            {variant.compareAtPrice.formatted}
          </p>
        ) : null}
      </div>

      <p
        className={cn(
          "mt-3 text-sm font-medium",
          soldOut ? "text-foreground-muted" : "text-success",
        )}
        aria-live="polite"
      >
        {soldOut ? "Sold out" : "In stock"}
      </p>

      <p className="mt-5 max-w-xl text-base font-light leading-[1.7] text-foreground-secondary">
        {product.description}
      </p>

      {product.ratingPlaceholder ? (
        <p className="mt-4 text-caption text-foreground-muted" aria-label="Reviews coming soon">
          <span aria-hidden="true">☆☆☆☆☆</span>
          <span className="ml-1.5">Reviews soon</span>
        </p>
      ) : null}
    </div>
  );
}
