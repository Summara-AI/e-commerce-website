"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { MediaImage } from "@/components/common/MediaImage";
import { Container } from "@/components/layout/Container";
import { HOME_HERO_LUXURY } from "@/content/home-story";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic split hero — staggered copy reveal + layered photography depth.
 */
export function HomeHero({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copy = HOME_HERO_LUXURY;

  return (
    <section
      aria-labelledby="home-hero-heading"
      className={cn(
        "relative isolate overflow-hidden lux-atmosphere",
        "bg-[linear-gradient(140deg,var(--color-canvas)_0%,var(--color-blush)_45%,var(--color-pearl)_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,224,239,0.55)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-[40%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(242,236,228,0.7)_0%,transparent_70%)] blur-3xl" />
      </div>

      <Container width="max" className="relative py-16 tablet:py-24 laptop:py-28 desktop:py-32">
        <div className="grid items-center gap-14 laptop:grid-cols-2 laptop:gap-12 desktop:gap-20">
          <div className="relative z-[1] max-w-xl">
            <motion.p
              className="font-sans text-overline font-medium uppercase tracking-[0.2em] text-power-pink"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              {copy.eyebrow}
            </motion.p>
            <motion.h1
              id="home-hero-heading"
              className="mt-5 font-display text-hero font-light italic tracking-[-0.03em] text-foreground tablet:mt-6 desktop:text-display"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease }}
            >
              {copy.headline}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-base font-light leading-[1.8] text-foreground-secondary tablet:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.16, ease }}
            >
              {copy.support}
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.24, ease }}
            >
              <ButtonGroup className="mt-10 tablet:mt-12" stackedOnMobile>
                <Button asChild size="lg">
                  <Link href={copy.primaryCta.href}>{copy.primaryCta.label}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={copy.secondaryCta.href}>{copy.secondaryCta.label}</Link>
                </Button>
              </ButtonGroup>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-lg laptop:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.12, ease }}
            aria-hidden="true"
          >
            <div className="relative aspect-[4/5] w-full tablet:aspect-[5/6] laptop:aspect-[4/5]">
              <motion.div
                className="absolute -right-4 top-[8%] h-28 w-28 rounded-full bg-pink-mist/80 blur-[2px] tablet:h-36 tablet:w-36"
                animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -left-6 bottom-[18%] h-20 w-20 rounded-full border border-soft-pink/40 bg-canvas/40"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              <div className="lux-media-zoom absolute inset-[4%_6%_12%_10%] overflow-hidden rounded-card border border-border-subtle bg-blush shadow-float">
                <MediaImage
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 46vw"
                  spec="hero-lux-primary"
                  className="scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pearl/40 via-transparent to-transparent" />
              </div>

              <motion.div
                className="absolute bottom-[4%] left-[0%] z-[2] w-[42%] overflow-hidden rounded-card border border-border-subtle bg-canvas shadow-elev3"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative aspect-[4/5]">
                  <MediaImage alt="" fill sizes="200px" spec="hero-lux-packshot" />
                </div>
              </motion.div>

              <motion.div
                className="absolute right-[0%] top-[6%] z-[2] w-[36%] overflow-hidden rounded-card border border-border-subtle bg-canvas/95 shadow-elev2 lux-glass"
                animate={reduceMotion ? undefined : { y: [0, 9, 0] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
              >
                <div className="relative aspect-square">
                  <MediaImage alt="" fill sizes="160px" spec="hero-lux-texture" />
                </div>
              </motion.div>

              <div className="absolute inset-x-[10%] bottom-0 h-14 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(42,26,34,0.07)_0%,transparent_70%)] blur-md" />
            </div>
            <span className="visually-hidden">
              Premium Korean skincare editorial composition — photography pending
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
