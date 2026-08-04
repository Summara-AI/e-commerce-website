"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterPanel } from "@/components/commerce/filters/FilterPanel";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  countActiveFilters,
  defaultFilterState,
  toggleFilter,
  type BrowseFacets,
  type FilterState,
} from "@/lib/collection-filters";

type ToggleGroup =
  | "categories"
  | "concerns"
  | "ingredients"
  | "productTypes"
  | "priceRanges"
  | "availability"
  | "kind";

type CollectionFilterDrawerProps = {
  state: FilterState;
  facets: BrowseFacets;
  onApply: (next: FilterState) => void;
  onReset: () => void;
};

/**
 * Full-height mobile / tablet filter drawer with draft + Apply.
 */
export function CollectionFilterDrawer({
  state,
  facets,
  onApply,
  onReset,
}: CollectionFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(state);
  const active = countActiveFilters(state);
  const draftCount = countActiveFilters(draft);

  useEffect(() => {
    if (open) setDraft(state);
  }, [open, state]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button" variant="secondary" size="sm" className="laptop:hidden">
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Filters
          {active > 0 ? (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-power-pink px-1.5 text-[11px] font-medium text-foreground-on-primary">
              {active}
            </span>
          ) : null}
        </Button>
      </DrawerTrigger>

      <DrawerContent side="left" className="w-[min(100%,22rem)] tablet:w-[min(100%,24rem)]">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Refine this collection. Apply when you’re ready.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          <FilterPanel
            state={draft}
            facets={facets}
            idPrefix="mobile-filter"
            onToggle={(group: ToggleGroup, value: string) => {
              setDraft((prev) => toggleFilter(prev, group, value));
            }}
            onFeaturedChange={(featured) =>
              setDraft((prev) => ({ ...prev, featured, page: 1 }))
            }
          />
        </div>

        <DrawerFooter className="sticky bottom-0 flex flex-col gap-2 tablet:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="w-full tablet:flex-1"
            onClick={() => {
              setDraft(defaultFilterState({ sort: state.sort }));
              onReset();
              setOpen(false);
            }}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="w-full tablet:flex-1"
            onClick={() => {
              onApply(draft);
              setOpen(false);
            }}
          >
            Apply filters{draftCount > 0 ? ` (${draftCount})` : ""}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
