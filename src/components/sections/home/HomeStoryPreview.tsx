"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MediaImage } from "@/components/common/MediaImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_STORY_PREVIEW } from "@/content/home-story";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Our story preview — offset editorial composition (image bleeds past copy column).
 */
export function HomeStoryPreview({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copy = HOME_STORY_PREVIEW;

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-story-preview-heading"
      className={cn("lux-atmosphere overflow-hidden bg-blush/40", className)}
    >
      <Container width="content">
        <div className="relative grid items-center gap-12 laptop:grid-cols-12 laptop:gap-6">
          <motion.div
            className="relative z-[1] order-1 laptop:col-span-5 laptop:col-start-1"
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.64, ease }}
          >
            <p className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
              {copy.eyebrow}
            </p>
            <h2
              id="home-story-preview-heading"
              className="mt-4 max-w-md font-display text-h1 font-light italic tracking-[-0.02em] text-foreground"
            >
              {copy.title}
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-[1.8] text-foreground-secondary">
              {copy.body}
            </p>
            <Link
              href={copy.cta.href}
              className={cn(
                "group/story mt-10 inline-flex items-center gap-2 text-sm font-medium text-power-pink",
                "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat",
                "transition-[background-size,gap] duration-320 ease-out hover:gap-3 hover:bg-[length:100%_1px]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                "motion-reduce:transition-none",
              )}
            >
              {copy.cta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-280 group-hover/story:translate-x-1 motion-reduce:group-hover:translate-x-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          <motion.div
            className="relative order-2 laptop:col-span-7 laptop:col-start-6"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease }}
          >
            <div className="pointer-events-none absolute -left-6 top-10 hidden h-40 w-40 rounded-full bg-pink-mist/70 blur-2xl laptop:block" aria-hidden="true" />
            <div className="lux-frame lux-media-zoom relative aspect-[4/5] shadow-elev3 laptop:-ml-8 laptop:aspect-[5/6]">
              <MediaImage
                alt={copy.media.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                spec={copy.media.id}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
