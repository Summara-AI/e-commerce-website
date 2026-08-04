"use client";

import { FilterPanel } from "@/components/commerce/filters/FilterPanel";
import { Button } from "@/components/ui/button";
import type { BrowseFacets, FilterState } from "@/lib/collection-filters";
import { countActiveFilters } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type ToggleGroup =
  | "categories"
  | "concerns"
  | "ingredients"
  | "productTypes"
  | "priceRanges"
  | "availability"
  | "kind";

type CollectionFilterSidebarProps = {
  state: FilterState;
  facets: BrowseFacets;
  onToggle: (group: ToggleGroup, value: string) => void;
  onFeaturedChange: (featured: boolean) => void;
  onReset: () => void;
  className?: string;
};

/**
 * Desktop / laptop sticky filter sidebar.
 */
export function CollectionFilterSidebar({
  state,
  facets,
  onToggle,
  onFeaturedChange,
  onReset,
  className,
}: CollectionFilterSidebarProps) {
  const active = countActiveFilters(state);

  return (
    <aside
      className={cn("hidden w-56 shrink-0 laptop:block desktop:w-64", className)}
      aria-label="Product filters"
    >
      <div className="sticky top-28 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-light text-foreground">Filters</h2>
          {active > 0 ? (
            <Button type="button" variant="text" size="sm" onClick={onReset}>
              Reset
            </Button>
          ) : null}
        </div>
        <FilterPanel
          state={state}
          facets={facets}
          onToggle={onToggle}
          onFeaturedChange={onFeaturedChange}
          idPrefix="desktop-filter"
        />
      </div>
    </aside>
  );
}
