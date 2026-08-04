"use client";

import { ProductCard } from "@/components/commerce/ProductCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductRelatedProps = {
  products: CatalogProduct[];
  className?: string;
};

/**
 * Related products — horizontal rail with side arrows on all breakpoints.
 */
export function ProductRelated({ products, className }: ProductRelatedProps) {
  const rail = useHorizontalRail({ scrollDuration: 450 });

  if (!products.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-related-heading"
      className={cn("bg-page", className)}
      data-shopify-section="related-products"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-related-heading"
          eyebrow="Related"
          title="Related products"
          description="Curated peers from the same Korean Skin Lab edit — not a noisy catalogue dump."
        />
      </Container>

      <div className="relative mt-10 tablet:mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-10 bg-gradient-to-r from-page/80 to-transparent laptop:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-16 bg-gradient-to-l from-page/90 to-transparent tablet:block desktop:w-24"
          aria-hidden="true"
        />

        <ul
          ref={rail.ref}
          tabIndex={0}
          role="list"
          aria-label="Related products carousel"
          className={cn(
            "relative z-0 flex w-full flex-nowrap snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
            "scrollbar-hide touch-pan-x [-webkit-overflow-scrolling:touch]",
            "cursor-grab select-none active:cursor-grabbing",
            "gap-5 tablet:gap-6 desktop:gap-7",
            "scroll-pl-4 tablet:scroll-pl-6",
            "laptop:scroll-pl-[max(2rem,calc((100vw-1200px)/2+2rem))]",
            "desktop:scroll-pl-[max(3rem,calc((100vw-1200px)/2+3rem))]",
            "pl-4 pr-4 pb-6 tablet:pl-6 tablet:pr-6 tablet:pb-8",
            "laptop:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] laptop:pr-8",
            "desktop:pl-[max(3rem,calc((100vw-1200px)/2+3rem))] desktop:pr-10",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus",
            "[&[data-dragging=true]]:cursor-grabbing [&[data-dragging=true]_a]:pointer-events-none [&[data-dragging=true]_button]:pointer-events-none",
          )}
        >
          {products.map((product) => (
            <li
              key={product.id}
              data-rail-item
              className={cn(
                "min-w-0 shrink-0 grow-0 snap-start",
                "w-[min(78vw,16rem)] tablet:w-[18rem] laptop:w-[20rem] desktop:w-[22rem]",
              )}
            >
              <ProductCard product={product} density="compact" />
            </li>
          ))}

          <li className="w-3 shrink-0 grow-0 snap-end tablet:w-5" aria-hidden="true" />
        </ul>

        <HorizontalRailNav
          label="related products"
          onPrev={rail.scrollPrev}
          onNext={rail.scrollNext}
          canScrollPrev={rail.canScrollPrev}
          canScrollNext={rail.canScrollNext}
        />
      </div>
    </Section>
  );
}
