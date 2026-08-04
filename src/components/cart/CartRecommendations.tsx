"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getCartUpsellProducts,
  useCart,
} from "@/components/cart/cart-context";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { cn } from "@/lib/utils";

type CartRecommendationsProps = {
  className?: string;
};

/**
 * Complementary products — Embla on mobile/tablet, grid on laptop+.
 * Swap source for Shopify Product Recommendations API later.
 */
export function CartRecommendations({ className }: CartRecommendationsProps) {
  const { lines, isHydrated } = useCart();
  const handles = lines.map((l) => l.handle);
  const products = getCartUpsellProducts(handles, 4);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!isHydrated) {
    return (
      <Section
        spacing="default"
        className={cn("bg-surface-soft", className)}
        aria-busy="true"
        aria-label="Loading recommendations"
      >
        <Container width="content">
          <Skeleton className="h-8 w-48" />
          <div className="mt-10 grid grid-cols-2 gap-4 laptop:grid-cols-4">
            <Skeleton className="aspect-[4/5] w-full rounded-card" />
            <Skeleton className="aspect-[4/5] w-full rounded-card" />
            <Skeleton className="hidden aspect-[4/5] w-full rounded-card tablet:block" />
            <Skeleton className="hidden aspect-[4/5] w-full rounded-card laptop:block" />
          </div>
        </Container>
      </Section>
    );
  }

  if (!products.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="cart-recommend-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="cart-recommendations"
    >
      <Container width="content">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="cart-recommend-heading"
            eyebrow={CART_PAGE_COPY.recommendEyebrow}
            title={CART_PAGE_COPY.recommendTitle}
            description={CART_PAGE_COPY.recommendDescription}
          />
          <div className="flex gap-2 self-start laptop:hidden">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous recommendations"
              className="inline-flex h-11 w-11 items-center justify-center rounded-badge border border-border-subtle text-foreground hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next recommendations"
              className="inline-flex h-11 w-11 items-center justify-center rounded-badge border border-border-subtle text-foreground hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-10 -mx-4 overflow-hidden px-4 py-1 laptop:hidden" ref={emblaRef}>
          <ul className="flex gap-5">
            {products.map((product) => (
              <li
                key={product.id}
                className="min-w-0 shrink-0 grow-0 basis-[min(100%,16rem)]"
                data-image-spec="cart-page-recommend-card"
              >
                <ProductCard product={product} density="compact" />
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-10 hidden gap-6 laptop:mt-12 laptop:grid laptop:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} data-image-spec="cart-page-recommend-card">
              <ProductCard product={product} density="compact" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
