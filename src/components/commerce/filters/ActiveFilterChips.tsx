"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilterChip } from "@/lib/collection-filters";
import { cn } from "@/lib/utils";

type ActiveFilterChipsProps = {
  chips: FilterChip[];
  onRemove: (chip: FilterChip) => void;
  onClearAll: () => void;
  className?: string;
};

/**
 * Active filter chips — remove one or clear all.
 */
export function ActiveFilterChips({
  chips,
  onRemove,
  onClearAll,
  className,
}: ActiveFilterChipsProps) {
  if (!chips.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <ul className="flex flex-wrap gap-2" aria-label="Active filters">
        {chips.map((chip) => (
          <li key={chip.id}>
            <button
              type="button"
              onClick={() => onRemove(chip)}
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-border-subtle bg-surface px-3 text-sm font-medium text-foreground",
                "transition-colors hover:border-border-default hover:text-power-pink",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
              )}
            >
              {chip.label}
              <X className="h-3.5 w-3.5 opacity-60" strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden">Remove {chip.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <Button type="button" variant="text" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
}
