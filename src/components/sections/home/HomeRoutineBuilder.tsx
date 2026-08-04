"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_ROUTINE_INTERACTIVE } from "@/content/home-story";
import { cn } from "@/lib/utils";

/**
 * Interactive routine builder preview — concern → morning → night.
 */
export function HomeRoutineBuilder({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copy = HOME_ROUTINE_INTERACTIVE;
  const [active, setActive] = useState(0);
  const step = copy.steps[active] ?? copy.steps[0];

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-routine-heading"
      className={cn(
        "relative overflow-hidden",
        "bg-[linear-gradient(155deg,var(--color-pearl)_0%,var(--color-canvas)_40%,var(--color-blush)_100%)]",
        className,
      )}
      reveal={false}
    >
      <Container width="content">
        <div className="grid items-center gap-12 laptop:grid-cols-[0.95fr_1.05fr] laptop:gap-16">
          <div>
            <p className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
              {copy.eyebrow}
            </p>
            <h2
              id="home-routine-heading"
              className="mt-4 max-w-md font-display text-h1 font-light italic tracking-[-0.02em] text-foreground"
            >
              {copy.title}
            </h2>
            <p className="mt-5 max-w-md text-base font-light leading-[1.75] text-foreground-secondary">
              {copy.description}
            </p>

            <ol className="mt-10 space-y-3" aria-label="Routine steps">
              {copy.steps.map((s, index) => {
                const isActive = index === active;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-card border px-5 py-4 text-left transition-all duration-280",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                        isActive
                          ? "border-power-pink bg-canvas shadow-elev2"
                          : "border-border-subtle bg-canvas/50 hover:border-border-default hover:bg-canvas",
                      )}
                    >
                      <span
                        className={cn(
                          "font-sans text-overline font-medium tracking-[0.14em]",
                          isActive ? "text-power-pink" : "text-foreground-muted",
                        )}
                      >
                        {s.number}
                      </span>
                      <span className="font-display text-xl font-light italic text-foreground">
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <Button asChild size="lg" className="mt-10">
              <Link href={copy.cta.href}>{copy.cta.label}</Link>
            </Button>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden rounded-card border border-border-subtle bg-canvas p-8 shadow-elev2 tablet:min-h-[26rem] tablet:p-12">
            <div
              className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-pink-mist/70 blur-2xl"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col justify-center"
              >
                <p className="font-sans text-overline font-medium uppercase tracking-[0.18em] text-power-pink">
                  Step {step.number}
                </p>
                <h3 className="mt-5 font-display text-3xl font-light italic tracking-[-0.02em] text-foreground tablet:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-6 max-w-md text-base font-light leading-[1.8] text-foreground-secondary">
                  {step.body}
                </p>
                <div className="mt-10 flex gap-2" aria-hidden="true">
                  {copy.steps.map((_, i) => (
                    <span
                      key={copy.steps[i].id}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors duration-280",
                        i <= active ? "bg-power-pink" : "bg-border-subtle",
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
