"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CategoryCard } from "@/components/commerce/CategoryCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SHOP_CATEGORIES } from "@/content/shop";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import { PRODUCT_CATEGORIES } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Featured product-type categories — horizontal rail with side arrows.
 */
export function ShopFeaturedCategories({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const rail = useHorizontalRail({ scrollDuration: 450 });

  return (
    <Section
      id="shop-categories"
      spacing="default"
      aria-labelledby="shop-categories-heading"
      className={cn("bg-surface-soft", className)}
    >
      <Container width="content">
        <SectionHeading
          id="shop-categories-heading"
          eyebrow={SHOP_CATEGORIES.eyebrow}
          title={SHOP_CATEGORIES.title}
          description={SHOP_CATEGORIES.description}
        />
      </Container>

      <div className="relative mt-10 tablet:mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-10 bg-gradient-to-r from-surface-soft/80 to-transparent laptop:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-16 bg-gradient-to-l from-surface-soft/90 to-transparent tablet:block desktop:w-24"
          aria-hidden="true"
        />

        <ul
          ref={rail.ref}
          tabIndex={0}
          role="list"
          aria-label="Product categories carousel"
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
          {PRODUCT_CATEGORIES.map((category, index) => (
            <motion.li
              key={category.id}
              data-rail-item
              className={cn(
                "min-w-0 shrink-0 grow-0 snap-start",
                "w-[min(78vw,18rem)] tablet:w-[22rem] laptop:w-[24rem] desktop:w-[26rem]",
              )}
              initial={
                reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : Math.min(index, 4) * 0.06,
                ease,
              }}
            >
              <CategoryCard category={category} />
            </motion.li>
          ))}

          <li className="w-3 shrink-0 grow-0 snap-end tablet:w-5" aria-hidden="true" />
        </ul>

        <HorizontalRailNav
          label="categories"
          onPrev={rail.scrollPrev}
          onNext={rail.scrollNext}
          canScrollPrev={rail.canScrollPrev}
          canScrollNext={rail.canScrollNext}
        />
      </div>
    </Section>
  );
}
