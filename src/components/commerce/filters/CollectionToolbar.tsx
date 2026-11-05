"use client";

import { CollectionFilterDrawer } from "@/components/commerce/filters/CollectionFilterDrawer";
import type { BrowseFacets, FilterState } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type CollectionToolbarProps = {
  state: FilterState;
  facets: BrowseFacets;
  resultCount: number;
  totalWithoutFilters: number;
  onApplyDraft: (next: FilterState) => void;
  onReset: () => void;
  className?: string;
};

/**
 * Result count + mobile filter entry.
 */
export function CollectionToolbar({
  state,
  facets,
  resultCount,
  totalWithoutFilters,
  onApplyDraft,
  onReset,
  className,
}: CollectionToolbarProps) {
  const filtered = resultCount !== totalWithoutFilters;

  return (
    <div
      className={cn(
        "border-b border-border-subtle pb-5",
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
    </div>
  );
}
