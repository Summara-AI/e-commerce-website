"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "@/components/commerce/ProductCard";
import { HorizontalRailNav } from "@/components/common/HorizontalRailNav";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SHOP_DISCOVERY } from "@/content/shop";
import { useHorizontalRail } from "@/hooks/use-horizontal-rail";
import { BEST_SELLERS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const MAX_BEST_SELLERS = 6;

type ShopProductDiscoveryProps = {
  className?: string;
  /** Teaser count — full grid ships later */
  productLimit?: number;
};

/**
 * Product discovery intro — pathways + best-seller horizontal rail.
 */
export function ShopProductDiscovery({
  className,
  productLimit = MAX_BEST_SELLERS,
}: ShopProductDiscoveryProps) {
  const reduceMotion = useReducedMotion();
  const rail = useHorizontalRail({ scrollDuration: 450 });
  const products = BEST_SELLERS.filter((p) => p.availableForSale).slice(
    0,
    Math.min(productLimit, MAX_BEST_SELLERS),
  );

  return (
    <Section
      id="shop-discovery"
      spacing="default"
      aria-labelledby="shop-discovery-heading"
      className={cn("bg-surface-soft", className)}
    >
      <Container width="content">
        <SectionHeading
          id="shop-discovery-heading"
          eyebrow={SHOP_DISCOVERY.eyebrow}
          title={SHOP_DISCOVERY.title}
          description={SHOP_DISCOVERY.description}
        />

        <ul className="mt-10 grid gap-6 tablet:mt-12 tablet:grid-cols-2 tablet:gap-6">
          {SHOP_DISCOVERY.pathways.map((path) => (
            <li key={path.id}>
              <article className="group flex h-full flex-col border-t border-border-subtle pt-6">
                <h3 className="font-display text-xl font-light tracking-[-0.01em] text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">
                  {path.description}
                </p>
                <Link
                  href={path.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  {path.cta}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <div className="mt-16 tablet:mt-20">
        <Container width="content">
          <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
            <h3 className="font-display text-2xl font-light tracking-[-0.01em] text-foreground">
              {SHOP_DISCOVERY.productsHeading}
            </h3>
            <Button asChild variant="secondary" className="self-start tablet:self-auto">
              <Link href={SHOP_DISCOVERY.productsCta.href}>
                {SHOP_DISCOVERY.productsCta.label}
              </Link>
            </Button>
          </div>
        </Container>

        <div className="relative mt-8">
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
            aria-label="Best sellers carousel"
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
            {products.map((product, index) => (
              <motion.li
                key={product.id}
                data-rail-item
                className={cn(
                  "min-w-0 shrink-0 grow-0 snap-start",
                  "w-[min(78vw,16rem)] tablet:w-[18rem] laptop:w-[20rem] desktop:w-[22rem]",
                )}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : Math.min(index, 5) * 0.05,
                  ease,
                }}
              >
                <ProductCard product={product} priority={index < 2} density="compact" />
              </motion.li>
            ))}

            <li className="w-3 shrink-0 grow-0 snap-end tablet:w-5" aria-hidden="true" />
          </ul>

          <HorizontalRailNav
            label="best sellers"
            onPrev={rail.scrollPrev}
            onNext={rail.scrollNext}
            canScrollPrev={rail.canScrollPrev}
            canScrollNext={rail.canScrollNext}
          />
        </div>
      </div>
    </Section>
  );
}
