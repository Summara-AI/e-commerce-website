"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CatalogProduct } from "@/lib/catalog";
import {
  productsFromHandles,
  pushRecentlyViewed,
  readRecentlyViewedHandles,
} from "@/lib/product-recommendations";
import { cn } from "@/lib/utils";

type ProductRecentlyViewedProps = {
  currentHandle: string;
  className?: string;
};

/**
 * Recently viewed — localStorage now; Shopify customer data later.
 */
export function ProductRecentlyViewed({
  currentHandle,
  className,
}: ProductRecentlyViewedProps) {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [ready, setReady] = useState(false);
  const [emblaRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  useEffect(() => {
    pushRecentlyViewed(currentHandle);
    const handles = readRecentlyViewedHandles(currentHandle);
    setProducts(productsFromHandles(handles).slice(0, 6));
    setReady(true);
  }, [currentHandle]);

  if (!ready) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-recent-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="recently-viewed"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-recent-heading"
          eyebrow="History"
          title="Recently viewed"
          description="Your browsing path on this device — Shopify customer history can replace this later."
        />

        {!products.length ? (
          <p className="mt-10 max-w-md text-sm leading-relaxed text-foreground-secondary">
            Products you explore will appear here — start with related picks above, then return as
            your ritual takes shape.
          </p>
        ) : (
          <div className="mt-10 overflow-hidden" ref={emblaRef}>
            <ul className="flex gap-5 tablet:gap-6">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="min-w-0 shrink-0 grow-0 basis-[min(100%,15rem)] tablet:basis-[min(100%,16rem)] laptop:basis-[calc((100%-4.5rem)/4)]"
                >
                  <ProductCard product={product} density="compact" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
