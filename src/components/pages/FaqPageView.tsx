"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  FAQ_PAGE,
  type FaqCategoryId,
} from "@/content/faq";
import { cn } from "@/lib/utils";

/**
 * Searchable FAQ — categories, accordion, empty state. Shopify metaobject ready.
 */
export function FaqPageView({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategoryId | "all">("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!deferredQuery) return true;
      const hay = `${item.question} ${item.answer}`.toLowerCase();
      return hay.includes(deferredQuery);
    });
  }, [category, deferredQuery]);

  return (
    <div className={cn("space-y-8", className)} data-shopify-section="faq-page">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="faq-search" className="visually-hidden">
            Search FAQ
          </Label>
          <Input
            id="faq-search"
            type="search"
            name="q"
            placeholder={FAQ_PAGE.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            aria-controls="faq-results"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="FAQ categories"
        >
          <CategoryChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All"
          />
          {FAQ_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
              label={cat.label}
            />
          ))}
        </div>
      </div>

      <div id="faq-results" aria-live="polite">
        {!filtered.length ? (
          <div data-image-spec="faq-empty-illustration">
            <EmptyState
              title={FAQ_PAGE.emptyTitle}
              description={FAQ_PAGE.emptyDescription}
              actionLabel={FAQ_PAGE.contactCta.label}
              actionHref={FAQ_PAGE.contactCta.href}
              className="py-10"
            />
          </div>
        ) : (
          <Accordion type="multiple" className="w-full">
            {filtered.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <p className="text-sm text-foreground-secondary">
        Still stuck?{" "}
        <Link
          href={FAQ_PAGE.contactCta.href}
          className="font-medium text-foreground underline-offset-4 hover:text-power-pink hover:underline"
        >
          {FAQ_PAGE.contactCta.label}
        </Link>
      </p>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "outline"}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm",
        active && "border-border-focus",
      )}
    >
      {label}
    </Button>
  );
}
