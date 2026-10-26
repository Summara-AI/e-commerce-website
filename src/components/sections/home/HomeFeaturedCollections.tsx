"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CollectionCard } from "@/components/commerce/CollectionCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_FEATURED_COLLECTIONS_COPY } from "@/content/home-story";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import {
  FEATURED_COLLECTIONS,
  MERCH_COLLECTIONS,
  PRODUCT_CATEGORIES,
  type CatalogCollection,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const SHOP_ALL: CatalogCollection = {
  id: "shop-all",
  handle: "all",
  title: "Shop All",
  href: "/collections/all",
  description: "The full verified SCYN catalogue.",
  imageAlt: "Shop all collection editorial — asset pending",
  featured: true,
};

/** Dynamic collection rail — merch + concerns + type paths + Shop All */
function getHomeCollections(): CatalogCollection[] {
  const seen = new Set<string>();
  const list: CatalogCollection[] = [];
  for (const c of [
    ...MERCH_COLLECTIONS,
    SHOP_ALL,
    ...FEATURED_COLLECTIONS,
    ...PRODUCT_CATEGORIES,
  ]) {
    if (seen.has(c.handle)) continue;
    seen.add(c.handle);
    list.push(c);
  }
  return list;
}

/**
 * Curated collections — premium horizontal gallery carousel.
 * Same navigation language as Most Loved products.
 */
export function HomeFeaturedCollections({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copy = HOME_FEATURED_COLLECTIONS_COPY;
  const collections = getHomeCollections();
  const rail = useHorizontalRail({ scrollDuration: 450 });

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-featured-collections-heading"
      className={cn(
        "bg-[linear-gradient(180deg,var(--color-blush)_0%,var(--color-canvas)_40%,var(--color-pearl)_100%)]",
        className,
      )}
    >
      <Container width="content">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="home-featured-collections-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
            size="large"
          />
          <Button asChild variant="text" className="self-start shrink-0">
            <Link href={copy.viewAll.href}>{copy.viewAll.label}</Link>
          </Button>
        </div>
      </Container>

      <div className="relative mt-14 tablet:mt-16 desktop:mt-20">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-10 bg-gradient-to-r from-pearl/70 to-transparent laptop:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-16 bg-gradient-to-l from-pearl/80 to-transparent tablet:block desktop:w-24"
          aria-hidden="true"
        />

        <ul
          ref={rail.ref}
          tabIndex={0}
          role="list"
          aria-label="Curated collections carousel"
          className={cn(
            "relative z-0 flex w-full flex-nowrap snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
            "scrollbar-hide touch-pan-x [-webkit-overflow-scrolling:touch]",
            "cursor-grab select-none active:cursor-grabbing",
            "gap-4 tablet:gap-5 desktop:gap-6",
            "scroll-pl-4 tablet:scroll-pl-6",
            "laptop:scroll-pl-[max(2rem,calc((100vw-1200px)/2+2rem))]",
            "desktop:scroll-pl-[max(3rem,calc((100vw-1200px)/2+3rem))]",
            "pl-4 pr-4 pb-6 tablet:pl-6 tablet:pr-6 tablet:pb-8",
            "laptop:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] laptop:pr-6",
            "desktop:pl-[max(3rem,calc((100vw-1200px)/2+3rem))] desktop:pr-10",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus",
            "[&[data-dragging=true]]:cursor-grabbing [&[data-dragging=true]_a]:pointer-events-none [&[data-dragging=true]_button]:pointer-events-none",
          )}
        >
          {collections.map((collection, index) => (
            <motion.li
              key={collection.id}
              data-rail-item
              className={cn(
                "min-w-0 shrink-0 grow-0 snap-start",
                "w-[min(86vw,20.5rem)] tablet:w-[26rem] laptop:w-[30rem] desktop:w-[34rem]",
              )}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 24, scale: 0.97 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.68,
                delay: reduceMotion ? 0 : Math.min(index, 4) * 0.07,
                ease,
              }}
            >
              <CollectionCard
                collection={collection}
                variant="gallery"
                ctaLabel="Explore"
                sizes="(max-width: 767px) 86vw, (max-width: 1023px) 416px, (max-width: 1279px) 480px, 544px"
              />
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
