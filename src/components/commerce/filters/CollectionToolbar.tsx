"use client";

import { CollectionFilterDrawer } from "@/components/commerce/filters/CollectionFilterDrawer";
import { CollectionSortSelect } from "@/components/commerce/filters/CollectionSortSelect";
import type { BrowseFacets, FilterState, SortValue } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type CollectionToolbarProps = {
  state: FilterState;
  facets: BrowseFacets;
  resultCount: number;
  totalWithoutFilters: number;
  onSortChange: (sort: SortValue) => void;
  onApplyDraft: (next: FilterState) => void;
  onReset: () => void;
  className?: string;
};

/**
 * Result count + sort + mobile filter entry.
 */
export function CollectionToolbar({
  state,
  facets,
  resultCount,
  totalWithoutFilters,
  onSortChange,
  onApplyDraft,
  onReset,
  className,
}: CollectionToolbarProps) {
  const filtered = resultCount !== totalWithoutFilters;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border-subtle pb-5 tablet:flex-row tablet:items-center tablet:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <CollectionFilterDrawer
          state={state}
          facets={facets}
          onApply={onApplyDraft}
          onReset={onReset}
        />
        <p className="text-sm text-foreground-secondary" aria-live="polite">
          {filtered ? (
            <>
              <span className="font-medium text-foreground">{resultCount}</span>
              {" of "}
              {totalWithoutFilters} products
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">{resultCount}</span>
              {resultCount === 1 ? " product" : " products"}
            </>
          )}
        </p>
      </div>

      <CollectionSortSelect value={state.sort} onChange={onSortChange} />
    </div>
  );
}
