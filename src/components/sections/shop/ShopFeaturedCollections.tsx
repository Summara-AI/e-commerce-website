"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CollectionCard } from "@/components/commerce/CollectionCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SHOP_FEATURED_COLLECTIONS } from "@/content/shop";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import { MERCH_COLLECTIONS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Featured collections — horizontal merch rail with side arrows.
 */
export function ShopFeaturedCollections({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const rail = useHorizontalRail({ scrollDuration: 450 });

  return (
    <Section
      id="shop-featured-collections"
      spacing="default"
      aria-labelledby="shop-collections-heading"
      className={cn("bg-page", className)}
    >
      <Container width="content">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="shop-collections-heading"
            eyebrow={SHOP_FEATURED_COLLECTIONS.eyebrow}
            title={SHOP_FEATURED_COLLECTIONS.title}
            description={SHOP_FEATURED_COLLECTIONS.description}
          />
          <Button asChild variant="text" className="self-start tablet:self-auto">
            <Link href="/collections/all">Shop all</Link>
          </Button>
        </div>
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
          aria-label="Featured collections carousel"
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
          {MERCH_COLLECTIONS.map((collection, index) => (
            <motion.li
              key={collection.id}
              data-rail-item
              className={cn(
                "min-w-0 shrink-0 grow-0 snap-start",
                "w-[min(82vw,20rem)] tablet:w-[24rem] laptop:w-[28rem] desktop:w-[30rem]",
                "min-h-[24rem]",
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
              <CollectionCard collection={collection} size="large" />
            </motion.li>
          ))}

          <li className="w-3 shrink-0 grow-0 snap-end tablet:w-5" aria-hidden="true" />
        </ul>

        <HorizontalRailNav
          label="collections"
          onPrev={rail.scrollPrev}
          onNext={rail.scrollNext}
          canScrollPrev={rail.canScrollPrev}
          canScrollNext={rail.canScrollNext}
        />
      </div>
    </Section>
  );
}
