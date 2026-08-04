"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { FrequentlyBoughtTogether } from "@/lib/product-recommendations";
import { useCart } from "@/components/cart/cart-context";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
type ProductFbtProps = {
  fbt: FrequentlyBoughtTogether;
  className?: string;
};

/**
 * Frequently bought together — curated complements + combined pricing.
 */
export function ProductFrequentlyBoughtTogether({ fbt, className }: ProductFbtProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const addAll = async () => {
    setAdding(true);
    try {
      await new Promise((r) => setTimeout(r, 250));
      fbt.items.forEach(({ product }) => {
        addItem({
          handle: product.handle,
          title: product.title,
          href: product.href,
          imageAlt: product.imageAlt,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          availableForSale: product.availableForSale,
        });
      });
      toast.success(
        "Added to bag",
        `${fbt.items.length} items · ${fbt.combinedPrice.formatted}`,
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-fbt-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="frequently-bought-together"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-fbt-heading"
          eyebrow="Pair together"
          title="Frequently bought together"
          description="Complementary steps from the verified catalogue — add when you’re ready."
        />

        <div className="mt-10 grid gap-10 laptop:mt-12 laptop:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] laptop:items-end laptop:gap-12">
          <ul className="flex flex-col gap-6 tablet:flex-row tablet:flex-wrap tablet:items-stretch tablet:gap-4">
            {fbt.items.map((item, index) => (
              <li key={item.product.id} className="flex min-w-0 flex-1 items-stretch gap-4">
                {index > 0 ? (
                  <span
                    className="hidden self-center text-power-pink tablet:inline-flex"
                    aria-hidden="true"
                  >
                    <Plus className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                ) : null}
                <article className="flex min-w-0 flex-1 gap-4 rounded-card border border-border-subtle bg-canvas p-4 shadow-elev1">
                  <Link
                    href={item.product.href}
                    className={cn(
                      "relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-card bg-blush tablet:w-24",
                      "bg-[linear-gradient(160deg,var(--bg-page),var(--color-accent-muted))]",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                    )}
                    aria-label={item.product.title}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                      {item.role === "main" ? "This product" : "Pairs with"}
                    </p>
                    <h3 className="mt-1 text-sm font-medium leading-snug text-foreground">
                      <Link href={item.product.href} className="hover:text-power-pink">
                        {item.product.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {item.product.price.formatted}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="rounded-card border border-border-subtle bg-surface p-6">
            <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
              Combined
            </p>
            <p className="mt-2 font-display text-2xl font-light text-foreground">
              {fbt.combinedPrice.formatted}
            </p>
            {fbt.compareAtCombined ? (
              <p className="mt-1 text-sm text-foreground-muted line-through">
                {fbt.compareAtCombined.formatted}
              </p>
            ) : null}
            {fbt.savings ? (
              <p className="mt-2 text-sm font-medium text-power-pink">
                Save {fbt.savings.formatted} vs listed compares
              </p>
            ) : null}
            <Button
              type="button"
              className="mt-6 w-full"
              size="lg"
              loading={adding}
              onClick={addAll}
            >
              <ShoppingBag aria-hidden="true" />
              Add all to bag
            </Button>
            <p className="mt-3 text-caption text-foreground-muted">
              Shopify cart / dynamic bundles connect next.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
