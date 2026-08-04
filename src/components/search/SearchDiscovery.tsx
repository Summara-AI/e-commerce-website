"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { FEATURED_COLLECTIONS } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { getRecentSearches, POPULAR_SEARCHES, pushRecentSearch } from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchDiscoveryProps = {
  className?: string;
};

/**
 * Empty-query search discovery — recent searches, trending products, popular categories.
 */
export function SearchDiscovery({ className }: SearchDiscoveryProps) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(getRecentSearches(6));
  }, []);

  const trending = ALL_PRODUCTS.filter((p) => p.availableForSale).slice(0, 4);
  const categories = FEATURED_COLLECTIONS.slice(0, 6);

  return (
    <div className={cn("space-y-12", className)} data-shopify-block="search-discovery">
      <header className="space-y-2">
        <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          Discover
        </p>
        <h2 className="font-display text-h2 font-light text-foreground">
          Search authentic K-beauty
        </h2>
        <p className="max-w-xl text-sm text-foreground-secondary">
          Try a product, concern, or brand — or start from what’s trending.
        </p>
      </header>

      {recent.length ? (
        <section aria-labelledby="recent-searches-heading">
          <h3 id="recent-searches-heading" className="font-display text-xl font-light text-foreground">
            Recent searches
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {recent.map((q) => (
              <li key={q}>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/search?q=${encodeURIComponent(q)}`}>{q}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="popular-searches-heading">
        <h3 id="popular-searches-heading" className="font-display text-xl font-light text-foreground">
          Popular searches
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((q) => (
            <li key={q}>
              <Link
                href={`/search?q=${encodeURIComponent(q)}`}
                onClick={() => pushRecentSearch(q)}
                className="inline-flex min-h-11 items-center rounded-button bg-pearl px-4 text-sm font-medium text-ink transition-colors hover:bg-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {q}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="trending-products-heading">
        <h3 id="trending-products-heading" className="font-display text-xl font-light text-foreground">
          Trending products
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-4 tablet:gap-6">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} density="compact" />
          ))}
        </div>
      </section>

      <section aria-labelledby="popular-categories-heading">
        <h3 id="popular-categories-heading" className="font-display text-xl font-light text-foreground">
          Popular categories
        </h3>
        <ul className="mt-4 grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
          {categories.map((collection) => (
            <li key={collection.id}>
              <Link
                href={collection.href}
                className="flex min-h-14 items-center justify-between rounded-card border border-border-subtle bg-canvas px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-default hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              >
                {collection.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
