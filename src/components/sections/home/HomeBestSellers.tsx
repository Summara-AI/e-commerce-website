"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/commerce/ProductCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_BEST_SELLERS_COPY } from "@/content/home-story";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import { ALL_PRODUCTS } from "@/lib/collections";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const MAX_PRODUCTS = 6;

/**
 * Most loved — premium horizontal product carousel.
 * Drag · trackpad · swipe · keyboard · frosted arrows. One-card scroll snap.
 */
export function HomeBestSellers({ className }: { className?: string }) {
  const copy = HOME_BEST_SELLERS_COPY;
  const products = ALL_PRODUCTS.slice(0, MAX_PRODUCTS);
  const reduceMotion = useReducedMotion();
  const rail = useHorizontalRail({ scrollDuration: 450 });

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-best-sellers-heading"
      className={cn(
        "bg-[linear-gradient(180deg,var(--color-blush)_0%,var(--color-canvas)_55%)]",
        className,
      )}
    >
      <Container width="content">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="home-best-sellers-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <Button asChild variant="text" className="self-start tablet:self-auto">
            <Link href={copy.viewAll.href}>{copy.viewAll.label}</Link>
          </Button>
        </div>
      </Container>

      <div className="relative mt-14 tablet:mt-16">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-10 bg-gradient-to-r from-canvas/70 to-transparent laptop:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-16 bg-gradient-to-l from-canvas/80 to-transparent tablet:block desktop:w-24"
          aria-hidden="true"
        />

        <ul
          ref={rail.ref}
          tabIndex={0}
          role="list"
          aria-label="Most loved products carousel"
          className={cn(
            "relative z-0 flex w-full flex-nowrap snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
            "scrollbar-hide touch-pan-x [-webkit-overflow-scrolling:touch]",
            "cursor-grab select-none active:cursor-grabbing",
            "gap-[18px] tablet:gap-6 desktop:gap-8",
            "scroll-pl-4 tablet:scroll-pl-6 laptop:scroll-pl-[max(2rem,calc((100vw-1200px)/2+2rem))] desktop:scroll-pl-[max(3rem,calc((100vw-1200px)/2+3rem))]",
            "pl-4 pr-4 pb-8 tablet:pl-6 tablet:pr-6 tablet:pb-10",
            "laptop:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] laptop:pr-8",
            "desktop:pl-[max(3rem,calc((100vw-1200px)/2+3rem))] desktop:pr-12",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus",
            "[&[data-dragging=true]]:cursor-grabbing [&[data-dragging=true]_a]:pointer-events-none [&[data-dragging=true]_button]:pointer-events-none",
          )}
        >
          {products.map((product, index) => (
            <motion.li
              key={product.id}
              data-rail-item
              className={cn(
                "min-w-0 shrink-0 grow-0 snap-start",
                "w-[290px] tablet:w-[360px] desktop:w-[420px]",
              )}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 28, scale: 0.96 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : Math.min(index, 5) * 0.06,
                ease,
              }}
            >
              <ProductCard
                product={product}
                emphasis="lux"
                priority={false}
                sizes="(max-width: 767px) 290px, (max-width: 1279px) 360px, 420px"
              />
            </motion.li>
          ))}

          <li
            className="w-2 shrink-0 grow-0 snap-end tablet:w-4"
            aria-hidden="true"
          />
        </ul>

        <HorizontalRailNav
          label="products"
          onPrev={rail.scrollPrev}
          onNext={rail.scrollNext}
          canScrollPrev={rail.canScrollPrev}
          canScrollNext={rail.canScrollNext}
        />
      </div>
    </Section>
  );
}
