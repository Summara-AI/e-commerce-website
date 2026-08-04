"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_EDITORIAL_BANNER } from "@/content/home-story";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Authenticity — Rhode-style two-column editorial.
 * Desktop 45/55 · tablet 50/50 · mobile image-first stack.
 */
export function HomeEditorialBanner({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copy = HOME_EDITORIAL_BANNER;
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.12, 1.04, 1.08],
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.55, 1, 1, 0.92],
  );

  const titleWords = copy.title.split(" ");

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-editorial-heading"
      className={cn(
        "relative overflow-visible bg-[linear-gradient(165deg,var(--color-canvas)_0%,var(--color-pearl)_48%,var(--color-blush)_100%)]",
        className,
      )}
      reveal={false}
    >
      <Container width="content" className="relative">
        <div className="grid items-center gap-10 tablet:grid-cols-2 tablet:gap-8 laptop:grid-cols-[0.45fr_0.55fr] laptop:gap-10 desktop:gap-14">
          {/* Copy — left on desktop/tablet, below image on mobile */}
          <div className="order-2 tablet:order-1">
            <div className="mx-auto max-w-md tablet:mx-0 tablet:max-w-none laptop:max-w-[26rem] desktop:max-w-[28rem]">
              <motion.p
                className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: 0.02, ease }}
              >
                {copy.eyebrow}
              </motion.p>

              <h2
                id="home-editorial-heading"
                className="mt-4 font-display text-h2 font-light italic tracking-[-0.025em] text-foreground desktop:text-h1"
              >
                {titleWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="mr-[0.28em] inline-block last:mr-0"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.55,
                      delay: reduceMotion ? 0 : 0.08 + index * 0.05,
                      ease,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                className="mt-5 text-base font-light leading-[1.8] text-foreground-secondary"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : 0.12 + titleWords.length * 0.05,
                  ease,
                }}
              >
                {copy.body}
              </motion.p>

              <motion.div
                className="mt-9"
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : 0.22 + titleWords.length * 0.05,
                  ease,
                }}
              >
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className={cn(
                    "rounded-full px-9",
                    "shadow-[0_14px_32px_-14px_rgba(232,0,111,0.55)]",
                    "hover:shadow-[0_18px_40px_-12px_rgba(232,0,111,0.6)]",
                    "hover:brightness-100",
                  )}
                >
                  <Link href={copy.cta.href}>{copy.cta.label}</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Image — right on desktop/tablet, first on mobile; slightly overlaps section */}
          <motion.div
            ref={mediaRef}
            className={cn(
              "relative order-1 tablet:order-2",
              "tablet:translate-x-1 tablet:translate-y-2",
              "laptop:translate-x-2 laptop:translate-y-4",
              "desktop:translate-x-4 desktop:-translate-y-2",
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease }}
          >
            <div
              className="pointer-events-none absolute -left-8 top-1/4 hidden h-44 w-44 rounded-full bg-pink-mist/55 blur-3xl laptop:block"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-pearl/80 blur-2xl"
              aria-hidden="true"
            />

            <div
              className={cn(
                "relative overflow-hidden rounded-[1.35rem] border border-border-subtle bg-blush",
                "aspect-[4/5] shadow-[0_28px_60px_-28px_rgba(17,17,17,0.38)]",
                "tablet:rounded-[1.5rem] desktop:rounded-[1.75rem]",
                "laptop:-mr-2 desktop:-mr-4",
              )}
            >
              <motion.div
                className="absolute inset-[-12%] will-change-transform"
                style={{
                  y: imageY,
                  scale: imageScale,
                  opacity: imageOpacity,
                }}
              >
                <MediaImage
                  alt={copy.media.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 55vw"
                  spec={copy.media.id}
                  className="object-cover"
                />
              </motion.div>

              {/* Soft luxury wash over placeholder / photography */}
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0%,transparent_40%,rgba(247,242,244,0.18)_100%)]"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
