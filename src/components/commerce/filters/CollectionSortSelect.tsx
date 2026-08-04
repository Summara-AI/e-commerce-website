"use client";

import { SORT_OPTIONS, type SortValue } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type CollectionSortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
  className?: string;
  id?: string;
};

/**
 * Premium sort control — Shopify collection sort keys later.
 */
export function CollectionSortSelect({
  value,
  onChange,
  className,
  id = "collection-sort",
}: CollectionSortSelectProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label htmlFor={id} className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
        Sort
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className={cn(
          "h-11 min-w-[11rem] rounded-sm border border-border-subtle bg-surface px-3 text-sm font-medium text-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
            {opt.disabled ? " (soon)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
