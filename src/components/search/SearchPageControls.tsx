"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { pushRecentSearch } from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchFiltersReadyProps = {
  query: string;
  className?: string;
};

/**
 * Search input + future-ready filter shell for /search.
 * Product filters connect when Storefront API faceting is live.
 */
export function SearchPageControls({ query, className }: SearchFiltersReadyProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(query);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setValue(query);
  }, [query]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = value.trim();
    if (next) pushRecentSearch(next);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set("q", next);
      else params.delete("q");
      router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <form
        onSubmit={onSubmit}
        role="search"
        className="flex flex-col gap-2 tablet:flex-row"
        data-shopify-block="search-form"
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="search-page-input" className="visually-hidden">
            Search products and collections
          </Label>
          <Input
            id="search-page-input"
            type="search"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products, collections, guides…"
            autoComplete="off"
            disabled={isPending}
          />
        </div>
        <Button type="submit" loading={isPending} className="tablet:shrink-0">
          Search
        </Button>
      </form>


    </div>
  );
}
