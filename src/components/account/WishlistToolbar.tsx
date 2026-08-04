"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DEFAULT_WISHLIST_FILTERS,
  WISHLIST_SORT_OPTIONS,
  type WishlistAvailability,
  type WishlistFilters,
  type WishlistSort,
} from "@/lib/wishlist";
import { cn } from "@/lib/utils";

type WishlistToolbarProps = {
  sort: WishlistSort;
  filters: WishlistFilters;
  facets: { categories: string[]; brands: string[] };
  resultCount: number;
  totalCount: number;
  onSortChange: (sort: WishlistSort) => void;
  onFiltersChange: (filters: WishlistFilters) => void;
};

/**
 * Sticky wishlist controls — desktop inline filters, mobile slide-up drawer.
 */
export function WishlistToolbar({
  sort,
  filters,
  facets,
  resultCount,
  totalCount,
  onSortChange,
  onFiltersChange,
}: WishlistToolbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  const activeFilterCount = [
    filters.category !== "all",
    filters.brand !== "all",
    filters.availability !== "all",
    Boolean(filters.query.trim()),
  ].filter(Boolean).length;

  const openDrawer = () => {
    setDraft(filters);
    setDrawerOpen(true);
  };

  const applyDraft = () => {
    onFiltersChange(draft);
    setDrawerOpen(false);
  };

  const clearFilters = () => {
    onFiltersChange({ ...DEFAULT_WISHLIST_FILTERS });
    setDraft({ ...DEFAULT_WISHLIST_FILTERS });
  };

  return (
    <div
      className={cn(
        "sticky top-24 z-20 -mx-1 space-y-4 rounded-[1.25rem] border border-border-subtle bg-canvas/90 p-4 shadow-[0_12px_32px_-28px_rgba(17,17,17,0.28)] backdrop-blur-md",
        "tablet:p-5",
      )}
      data-shopify-block="wishlist-toolbar"
    >
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="text-sm font-light text-foreground-secondary" aria-live="polite">
          Showing{" "}
          <span className="font-medium text-foreground">{resultCount}</span>
          {resultCount !== totalCount ? (
            <>
              {" "}
              of <span className="font-medium text-foreground">{totalCount}</span>
            </>
          ) : null}{" "}
          {resultCount === 1 ? "item" : "items"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="min-h-11 rounded-full laptop:hidden"
            onClick={openDrawer}
            aria-label={
              activeFilterCount
                ? `Filters, ${activeFilterCount} active`
                : "Open filters"
            }
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Filters
            {activeFilterCount ? (
              <span className="ml-1 rounded-full bg-pink-mist px-1.5 text-[0.65rem] text-power-pink">
                {activeFilterCount}
              </span>
            ) : null}
          </Button>

          <div className="flex items-center gap-2">
            <label
              htmlFor="wishlist-sort"
              className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
            >
              Sort
            </label>
            <select
              id="wishlist-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as WishlistSort)}
              className={cn(
                "h-11 min-w-[11rem] rounded-sm border border-border-subtle bg-surface px-3 text-sm font-medium text-foreground",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
              )}
            >
              {WISHLIST_SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop inline filters */}
      <div className="hidden gap-3 laptop:grid laptop:grid-cols-[1fr_repeat(3,minmax(0,10rem))]">
        <SearchField
          id="wishlist-search"
          value={filters.query}
          onChange={(query) => onFiltersChange({ ...filters, query })}
        />
        <FilterSelect
          id="wishlist-category"
          label="Category"
          value={filters.category}
          options={facets.categories}
          onChange={(category) => onFiltersChange({ ...filters, category })}
        />
        <FilterSelect
          id="wishlist-brand"
          label="Brand"
          value={filters.brand}
          options={facets.brands}
          onChange={(brand) => onFiltersChange({ ...filters, brand })}
        />
        <AvailabilitySelect
          id="wishlist-availability"
          value={filters.availability}
          onChange={(availability) =>
            onFiltersChange({ ...filters, availability })
          }
        />
      </div>

      {activeFilterCount ? (
        <div className="hidden laptop:flex">
          <Button type="button" variant="text" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : null}

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent side="bottom" className="laptop:hidden">
          <DrawerHeader>
            <DrawerTitle>Filter wishlist</DrawerTitle>
            <DrawerDescription>
              Narrow saved pieces by category, brand, or availability.
            </DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4">
            <SearchField
              id="wishlist-search-mobile"
              value={draft.query}
              onChange={(query) => setDraft((d) => ({ ...d, query }))}
            />
            <FilterSelect
              id="wishlist-category-mobile"
              label="Category"
              value={draft.category}
              options={facets.categories}
              onChange={(category) => setDraft((d) => ({ ...d, category }))}
            />
            <FilterSelect
              id="wishlist-brand-mobile"
              label="Brand"
              value={draft.brand}
              options={facets.brands}
              onChange={(brand) => setDraft((d) => ({ ...d, brand }))}
            />
            <AvailabilitySelect
              id="wishlist-availability-mobile"
              value={draft.availability}
              onChange={(availability) =>
                setDraft((d) => ({ ...d, availability }))
              }
            />
          </div>
          <DrawerFooter className="flex shrink-0 flex-col gap-2 tablet:flex-row">
            <Button
              type="button"
              variant="secondary"
              className="min-h-11 rounded-full"
              onClick={() => {
                setDraft({ ...DEFAULT_WISHLIST_FILTERS });
                onFiltersChange({ ...DEFAULT_WISHLIST_FILTERS });
                setDrawerOpen(false);
              }}
            >
              Clear
            </Button>
            <Button
              type="button"
              className="min-h-11 rounded-full"
              onClick={applyDraft}
            >
              Apply filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function SearchField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search wishlist
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search within wishlist"
        className={cn(
          "h-11 w-full rounded-sm border border-border-subtle bg-surface px-3 pr-12 text-sm font-light text-foreground",
          "placeholder:text-foreground-muted",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
      />
      {value ? (
        <button
          type="button"
          className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-badge text-foreground-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      ) : null}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full rounded-sm border border-border-subtle bg-surface px-3 text-sm font-medium text-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
      >
        <option value="all">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function AvailabilitySelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: WishlistAvailability | "all";
  onChange: (v: WishlistAvailability | "all") => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
      >
        Availability
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) =>
          onChange(e.target.value as WishlistAvailability | "all")
        }
        className={cn(
          "h-11 w-full rounded-sm border border-border-subtle bg-surface px-3 text-sm font-medium text-foreground",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
      >
        <option value="all">All</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>
  );
}
