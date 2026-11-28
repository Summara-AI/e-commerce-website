"use client";

import { CollectionFilterDrawer } from "@/components/commerce/filters/CollectionFilterDrawer";
import {
  SORT_OPTIONS,
  type BrowseFacets,
  type FilterState,
  type SortValue,
} from "@/lib/collection-filters";
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
        <label className="ml-auto flex items-center gap-2">
          <span className="text-caption font-medium text-foreground">Sort by</span>
          <select
            value={state.sort}
            onChange={(event) =>
              onApplyDraft({
                ...state,
                sort: event.target.value as SortValue,
                page: 1,
              })
            }
            className="min-h-11 rounded-input border border-border-subtle bg-canvas px-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            {SORT_OPTIONS.filter((option) => !option.disabled).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
