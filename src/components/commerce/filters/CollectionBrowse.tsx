"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ActiveFilterChips } from "@/components/commerce/filters/ActiveFilterChips";
import { CollectionFilterSidebar } from "@/components/commerce/filters/CollectionFilterSidebar";
import { CollectionToolbar } from "@/components/commerce/filters/CollectionToolbar";
import { InfiniteScrollTrigger } from "@/components/commerce/filters/InfiniteScrollTrigger";
import { BundleCard } from "@/components/commerce/BundleCard";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { EmptyNoFilterMatches } from "@/components/common/EmptyState";
import { Pagination } from "@/components/ui/pagination";
import type { CatalogBundle, CatalogProduct } from "@/lib/catalog";
import {
  buildFacets,
  buildFilterChips,
  bundlesAsFilterable,
  countActiveFilters,
  defaultFilterState,
  enrichProducts,
  filterProducts,
  hrefForBrowsePage,
  paginateProducts,
  parseFilterParams,
  removeChip,
  serializeFilterParams,
  sortProducts,
  toggleFilter,
  type FilterChip,
  type FilterState,
  type SortValue,
} from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

/** Boutique catalogues: numbered pages. Set true only for very large result sets. */
const USE_INFINITE_SCROLL = false;

type CollectionBrowseProps = {
  products: CatalogProduct[];
  bundles?: CatalogBundle[];
  className?: string;
};

/**
 * Full browse experience — filters, sort, chips, count, pagination.
 * URL-synced for Shopify filter query compatibility.
 */
export function CollectionBrowse({ products, bundles = [], className }: CollectionBrowseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(
    () => parseFilterParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const catalog = useMemo(() => {
    const enriched = enrichProducts(products);
    return bundles.length ? [...enriched, ...bundlesAsFilterable(bundles)] : enriched;
  }, [products, bundles]);

  const facets = useMemo(() => buildFacets(catalog), [catalog]);

  const filtered = useMemo(
    () => sortProducts(filterProducts(catalog, state), state.sort),
    [catalog, state],
  );

  const pageData = useMemo(
    () => paginateProducts(filtered, state.page),
    [filtered, state.page],
  );

  const chips = useMemo(() => buildFilterChips(state), [state]);
  const activeCount = countActiveFilters(state);

  const pushState = useCallback(
    (next: FilterState) => {
      const params = serializeFilterParams(next);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const onToggle = useCallback(
    (
      group:
        | "categories"
        | "concerns"
        | "ingredients"
        | "productTypes"
        | "priceRanges"
        | "availability"
        | "kind",
      value: string,
    ) => {
      pushState(toggleFilter(state, group, value));
    },
    [pushState, state],
  );

  const onFeaturedChange = useCallback(
    (featured: boolean) => {
      pushState({ ...state, featured, page: 1 });
    },
    [pushState, state],
  );

  const onSortChange = useCallback(
    (sort: SortValue) => {
      pushState({ ...state, sort, page: 1 });
    },
    [pushState, state],
  );

  const onReset = useCallback(() => {
    pushState(defaultFilterState({ sort: state.sort }));
  }, [pushState, state.sort]);

  const onRemoveChip = useCallback(
    (chip: FilterChip) => {
      pushState(removeChip(state, chip));
    },
    [pushState, state],
  );

  const pageItems = pageData.items;
  const pageBundles = pageItems.filter((p) => p.kind === "bundle");
  const pageProducts = pageItems.filter((p) => p.kind === "single");
  const bundleCards = bundles.filter((b) => pageBundles.some((p) => p.handle === b.handle));

  return (
    <div className={cn("flex gap-10 desktop:gap-14", className)}>
      <CollectionFilterSidebar
        state={state}
        facets={facets}
        onToggle={onToggle}
        onFeaturedChange={onFeaturedChange}
        onReset={onReset}
      />

      <div className="min-w-0 flex-1">
        <CollectionToolbar
          state={state}
          facets={facets}
          resultCount={pageData.total}
          totalWithoutFilters={catalog.length}
          onSortChange={onSortChange}
          onApplyDraft={pushState}
          onReset={onReset}
        />

        <ActiveFilterChips
          chips={chips}
          onRemove={onRemoveChip}
          onClearAll={onReset}
          className="mt-5"
        />

        {pageData.total === 0 ? (
          <EmptyNoFilterMatches
            className="mt-10"
            onClearFilters={activeCount > 0 ? onReset : undefined}
          />
        ) : (
          <>
            {pageData.total > 0 && pageData.totalPages > 1 ? (
              <p className="mt-5 text-caption text-foreground-muted">
                Showing {pageData.from}–{pageData.to} of {pageData.total}
              </p>
            ) : null}

            <div className="mt-8 space-y-10">
              {bundleCards.length ? (
                <ul
                  className={cn(
                    "grid grid-cols-1 gap-x-4 gap-y-12 min-[380px]:grid-cols-2",
                    "tablet:grid-cols-2 tablet:gap-x-6 tablet:gap-y-14",
                    pageProducts.length === 0 && "laptop:grid-cols-2 laptop:gap-x-8 laptop:gap-y-16",
                  )}
                >
                  {bundleCards.map((bundle, index) => (
                    <li key={bundle.id} className="min-w-0">
                      <BundleCard bundle={bundle} priority={index < 2} />
                    </li>
                  ))}
                </ul>
              ) : null}

              {pageProducts.length ? (
                <ProductGrid
                  products={pageProducts}
                  priorityCount={pageData.page === 1 ? 4 : 0}
                  columns={{ tablet: 2, laptop: 3, desktop: 3 }}
                />
              ) : null}
            </div>

            {!USE_INFINITE_SCROLL ? (
              <Pagination
                className="mt-14"
                currentPage={pageData.page}
                totalPages={pageData.totalPages}
                hrefForPage={(page) => hrefForBrowsePage(pathname, state, page)}
              />
            ) : (
              <InfiniteScrollTrigger
                enabled
                hasMore={pageData.page < pageData.totalPages}
                onLoadMore={() => pushState({ ...state, page: state.page + 1 })}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
