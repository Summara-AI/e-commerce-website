"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { BrowseFacets, FilterState } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type FilterPanelProps = {
  state: FilterState;
  facets: BrowseFacets;
  onToggle: (
    group:
      | "categories"
      | "concerns"
      | "ingredients"
      | "productTypes"
      | "priceRanges"
      | "availability"
      | "kind",
    value: string,
  ) => void;
  onFeaturedChange: (featured: boolean) => void;
  idPrefix?: string;
  className?: string;
};

function FilterCheckbox({
  id,
  label,
  count,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-sm py-2 text-sm text-foreground hover:text-power-pink"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded-sm border-border-default accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      />
      <span className="flex-1 leading-snug">{label}</span>
      {typeof count === "number" ? (
        <span className="text-caption text-foreground-muted">{count}</span>
      ) : null}
    </label>
  );
}

/**
 * Shared filter accordion — desktop sidebar + mobile drawer.
 * Shopify: options from collection filters / productTags.
 */
export function FilterPanel({
  state,
  facets,
  onToggle,
  onFeaturedChange,
  idPrefix = "filter",
  className,
}: FilterPanelProps) {
  const defaultOpen = [
    facets.categories.length ? "category" : null,
    facets.concerns.length ? "concern" : null,
    facets.productTypes.length ? "type" : null,
    "price",
    "availability",
  ].filter(Boolean) as string[];

  return (
    <div className={cn("w-full", className)}>
      <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
        {facets.categories.length ? (
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.categories.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-cat-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.categories.includes(opt.id)}
                      onChange={() => onToggle("categories", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.concerns.length ? (
          <AccordionItem value="concern">
            <AccordionTrigger>Skin concern</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.concerns.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-concern-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.concerns.includes(opt.id)}
                      onChange={() => onToggle("concerns", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.ingredients.length ? (
          <AccordionItem value="ingredient">
            <AccordionTrigger>Ingredient</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.ingredients.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-ing-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.ingredients.includes(opt.id)}
                      onChange={() => onToggle("ingredients", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.productTypes.length ? (
          <AccordionItem value="type">
            <AccordionTrigger>Product type</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.productTypes.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-type-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.productTypes.includes(opt.id)}
                      onChange={() => onToggle("productTypes", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.priceRanges.length ? (
          <AccordionItem value="price">
            <AccordionTrigger>Price range</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.priceRanges.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-price-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.priceRanges.includes(opt.id)}
                      onChange={() => onToggle("priceRanges", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.availability.length ? (
          <AccordionItem value="availability">
            <AccordionTrigger>Availability</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.availability.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-avail-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.availability.includes(opt.id)}
                      onChange={() => onToggle("availability", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.hasFeatured ? (
          <AccordionItem value="featured">
            <AccordionTrigger>Featured</AccordionTrigger>
            <AccordionContent>
              <FilterCheckbox
                id={`${idPrefix}-featured`}
                label="Best sellers only"
                checked={state.featured}
                onChange={() => onFeaturedChange(!state.featured)}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {facets.kind.length > 1 ? (
          <AccordionItem value="kind">
            <AccordionTrigger>Bundle / single</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-0.5">
                {facets.kind.map((opt) => (
                  <li key={opt.id}>
                    <FilterCheckbox
                      id={`${idPrefix}-kind-${opt.id}`}
                      label={opt.label}
                      count={opt.count}
                      checked={state.kind.includes(opt.id)}
                      onChange={() => onToggle("kind", opt.id)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  );
}
