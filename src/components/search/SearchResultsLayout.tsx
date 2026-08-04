import Link from "next/link";
import { EmptySearch } from "@/components/common/EmptyState";
import { SearchResultsSkeleton } from "@/components/common/Loading";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import type { SearchResult } from "@/lib/search";
import { ALL_PRODUCTS } from "@/lib/collections";
import { cn } from "@/lib/utils";

type SearchResultsLayoutProps = {
  query: string;
  results: SearchResult[];
  loading?: boolean;
  className?: string;
  /** Optional collection-scoped framing */
  collectionLabel?: string;
};

/**
 * Reusable search results layout — global /search + collection-scoped reuse.
 * Suggestions reserved for a later predictive panel.
 */
export function SearchResultsLayout({
  query,
  results,
  loading,
  className,
  collectionLabel,
}: SearchResultsLayoutProps) {
  if (loading) {
    return <SearchResultsSkeleton />;
  }

  if (!query.trim()) {
    return (
      <div className={cn("py-10 text-center", className)}>
        <p className="font-display text-xl font-light text-foreground">Search the catalogue</p>
        <p className="mt-2 text-sm text-foreground-secondary">
          Try a product name, concern, or brand — then refine in collections.
        </p>
      </div>
    );
  }

  if (!results.length) {
    return <EmptySearch query={query} />;
  }

  const productHandles = new Set(
    results.filter((r) => r.type === "product" || r.type === "bundle").map((r) => {
      const parts = r.href.split("/");
      return parts[parts.length - 1];
    }),
  );

  const gridProducts = ALL_PRODUCTS.filter((p) => productHandles.has(p.handle));

  const pagesAndCollections = results.filter(
    (r) => r.type === "collection" || r.type === "page",
  );

  return (
    <div className={cn("space-y-12", className)}>
      <header className="space-y-2">
        <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {collectionLabel ? `Search in ${collectionLabel}` : "Search results"}
        </p>
        <h2 className="font-display text-h2 font-light tracking-[-0.01em] text-foreground">
          Results for “{query}”
        </h2>
        <p className="text-sm text-foreground-secondary" aria-live="polite">
          {results.length} {results.length === 1 ? "match" : "matches"}
        </p>
      </header>

      {gridProducts.length ? (
        <section aria-labelledby="search-products-heading">
          <h2
            id="search-products-heading"
            className="mb-6 font-display text-xl font-light text-foreground"
          >
            Products
          </h2>
          <ProductGrid
            products={gridProducts}
            columns={{ tablet: 3, laptop: 4, desktop: 4 }}
            priorityCount={2}
          />
        </section>
      ) : null}

      {pagesAndCollections.length ? (
        <section aria-labelledby="search-links-heading">
          <h2
            id="search-links-heading"
            className="mb-4 font-display text-xl font-light text-foreground"
          >
            Collections & guides
          </h2>
          <ul className="divide-y divide-border-subtle border-y border-border-subtle">
            {pagesAndCollections.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 py-4 text-sm font-medium text-foreground transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  <span>
                    {item.title}
                    {item.subtitle ? (
                      <span className="mt-0.5 block text-caption font-medium text-foreground-muted">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
