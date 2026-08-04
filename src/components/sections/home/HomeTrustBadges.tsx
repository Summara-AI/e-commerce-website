"use client";

import { ShieldCheck, Plane, Sparkles, Truck, Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_TRUST_BADGES } from "@/content/home-story";
import { cn } from "@/lib/utils";

const ICONS = {
  authentic: ShieldCheck,
  korea: Plane,
  selected: Sparkles,
  delivery: Truck,
  secure: Lock,
} as const;

/**
 * Trust badges — premium card row positioned before footer.
 */
export function HomeTrustBadges({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      spacing="default"
      aria-labelledby="home-trust-heading"
      className={cn("bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-pearl)_100%)]", className)}
      reveal={false}
    >
      <Container width="max">
        <h2 id="home-trust-heading" className="visually-hidden">
          Why shop with Korean Skin Lab
        </h2>
        <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5 laptop:grid-cols-5">
          {HOME_TRUST_BADGES.map((badge, index) => {
            const Icon = ICONS[badge.id as keyof typeof ICONS] ?? ShieldCheck;
            return (
              <motion.li
                key={badge.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "group rounded-card border border-border-subtle bg-canvas/90 px-5 py-6 text-center",
                  "shadow-[0_8px_24px_-20px_rgba(17,17,17,0.35)] transition-[transform,box-shadow,background-color] duration-320",
                  "hover:-translate-y-1 hover:bg-canvas hover:shadow-[0_18px_32px_-22px_rgba(17,17,17,0.45)]",
                  "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush text-power-pink shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 motion-reduce:group-hover:scale-100">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-medium tracking-[0.01em] text-foreground">
                  {badge.title}
                </p>
                <p className="mt-1.5 text-caption font-light leading-relaxed text-foreground-muted">
                  {badge.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
