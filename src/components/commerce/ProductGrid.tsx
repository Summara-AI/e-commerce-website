import { ProductCard } from "@/components/commerce/ProductCard";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductGridColumns = 2 | 3 | 4 | 5;

type ProductGridProps = {
  products: CatalogProduct[];
  className?: string;
  /** Tablet+ column counts; mobile stays 2 */
  columns?: {
    tablet?: 2 | 3;
    laptop?: ProductGridColumns;
    desktop?: ProductGridColumns;
  };
  /** First N cards get priority for LCP imagery when assets exist */
  priorityCount?: number;
  density?: "default" | "compact";
  /** Shopify: pagination / infinite scroll mounts below — reserved */
  listId?: string;
};

const laptopCols: Record<ProductGridColumns, string> = {
  2: "laptop:grid-cols-2",
  3: "laptop:grid-cols-3",
  4: "laptop:grid-cols-4",
  5: "laptop:grid-cols-5",
};

const desktopCols: Record<ProductGridColumns, string> = {
  2: "desktop:grid-cols-2",
  3: "desktop:grid-cols-3",
  4: "desktop:grid-cols-4",
  5: "desktop:grid-cols-5",
};

/**
 * Flexible premium product grid — generous whitespace, Shopify PLP ready.
 */
export function ProductGrid({
  products,
  className,
  columns = { tablet: 3, laptop: 4, desktop: 4 },
  priorityCount = 4,
  density = "default",
  listId = "collection-product-grid",
}: ProductGridProps) {
  const tablet = columns.tablet ?? 3;
  const laptop = columns.laptop ?? 4;
  const desktop = columns.desktop ?? laptop;

  return (
    <ul
      id={listId}
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-12 min-[380px]:grid-cols-2",
        tablet === 3 ? "tablet:grid-cols-3" : "tablet:grid-cols-2",
        "tablet:gap-x-6 tablet:gap-y-14",
        laptopCols[laptop],
        desktopCols[desktop],
        "laptop:gap-x-8 laptop:gap-y-16",
        className,
      )}
      data-product-count={products.length}
    >
      {products.map((product, index) => (
        <li key={product.id} className="min-w-0">
          <ProductCard
            product={product}
            density={density}
            priority={index < priorityCount}
          />
        </li>
      ))}
    </ul>
  );
}
