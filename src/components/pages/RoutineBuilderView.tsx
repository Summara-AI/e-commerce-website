"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useCart } from "@/components/cart/cart-context";
import { toast } from "@/lib/toast";
import {
  ROUTINE_BUILDER_PAGE,
  ROUTINE_CONCERNS,
  ROUTINE_GOALS,
  ROUTINE_TIMES,
  type RoutineConcernId,
  type RoutineGoalId,
  type RoutineTimeId,
} from "@/content/routine-builder";
import { buildRoutineRecommendations, concernLabel } from "@/lib/routine-builder";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

/**
 * Interactive routine builder — concern → goals → time → recommendations → add all.
 */
export function RoutineBuilderView() {
  const { addItem } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [concern, setConcern] = useState<RoutineConcernId | null>(null);
  const [goals, setGoals] = useState<RoutineGoalId[]>([]);
  const [time, setTime] = useState<RoutineTimeId | null>(null);
  const [adding, setAdding] = useState(false);

  const recommendations = useMemo(() => {
    if (!concern || !time) return [];
    return buildRoutineRecommendations(concern, goals, time);
  }, [concern, goals, time]);

  const toggleGoal = (id: RoutineGoalId) => {
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const addAll = async () => {
    setAdding(true);
    try {
      for (const stepItem of recommendations) {
        const p = stepItem.product;
        addItem({
          handle: p.handle,
          title: p.title,
          href: p.href,
          imageAlt: p.imageAlt,
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          availableForSale: p.availableForSale,
        });
      }
      toast.success("Routine added to bag", `${recommendations.length} products`);
    } finally {
      setAdding(false);
    }
  };

  const reset = () => {
    setStep(1);
    setConcern(null);
    setGoals([]);
    setTime(null);
  };

  return (
    <Section
      spacing="default"
      className="bg-page"
      aria-labelledby="routine-builder-heading"
      data-shopify-section="routine-builder"
      reveal={false}
    >
      <Container width="content">
        <Breadcrumb items={[{ label: "Routine Builder" }]} className="mb-8" />
        <SectionHeading
          id="routine-builder-heading"
          as="h1"
          eyebrow={ROUTINE_BUILDER_PAGE.eyebrow}
          title={ROUTINE_BUILDER_PAGE.title}
          description={ROUTINE_BUILDER_PAGE.description}
        />

        <ol className="mt-8 flex flex-wrap gap-2" aria-label="Progress">
          {(["Concern", "Goals", "Schedule", "Routine"] as const).map((label, i) => {
            const n = (i + 1) as Step;
            return (
              <li
                key={label}
                className={cn(
                  "rounded-badge border px-3 py-1.5 text-caption font-medium uppercase tracking-[0.08em]",
                  step === n
                    ? "border-power-pink bg-pink-mist text-power-pink"
                    : step > n
                      ? "border-border-subtle bg-pearl text-ink"
                      : "border-border-subtle text-foreground-nav",
                )}
              >
                {n}. {label}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 rounded-card border border-border-subtle bg-canvas p-6 tablet:p-8">
          {step === 1 ? (
            <fieldset>
              <legend className="font-display text-xl font-light text-foreground">
                What’s your primary skin concern?
              </legend>
              <div className="mt-6 grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
                {ROUTINE_CONCERNS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConcern(item.id)}
                    className={cn(
                      "rounded-card border p-4 text-left transition-[border-color,background-color,transform] duration-200 ease-out",
                      "hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      concern === item.id
                        ? "border-power-pink bg-pink-mist"
                        : "border-border-subtle bg-blush/40 hover:border-border-default",
                    )}
                  >
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="mt-1 block text-sm text-foreground-secondary">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button type="button" disabled={!concern} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend className="font-display text-xl font-light text-foreground">
                What are your routine goals?
              </legend>
              <p className="mt-2 text-sm text-foreground-secondary">Select one or more.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ROUTINE_GOALS.map((goal) => {
                  const selected = goals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleGoal(goal.id)}
                      className={cn(
                        "min-h-11 rounded-badge border px-4 text-sm font-medium transition-colors duration-200",
                        selected
                          ? "border-power-pink bg-power-pink text-foreground-on-primary"
                          : "border-border-subtle bg-canvas text-foreground-nav hover:text-ink",
                      )}
                    >
                      {goal.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between gap-3">
                <Button type="button" variant="pearl" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Continue
                </Button>
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset>
              <legend className="font-display text-xl font-light text-foreground">
                Morning, night, or both?
              </legend>
              <div className="mt-6 grid gap-3 tablet:grid-cols-3">
                {ROUTINE_TIMES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTime(item.id)}
                    className={cn(
                      "rounded-card border p-4 text-left transition-colors duration-200",
                      time === item.id
                        ? "border-power-pink bg-pink-mist"
                        : "border-border-subtle hover:border-border-default",
                    )}
                  >
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="mt-1 block text-sm text-foreground-secondary">{item.hint}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between gap-3">
                <Button type="button" variant="pearl" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!time}
                  onClick={() => setStep(4)}
                >
                  See recommendations
                </Button>
              </div>
            </fieldset>
          ) : null}

          {step === 4 ? (
            <div>
              <h2 className="font-display text-xl font-light text-foreground">
                Your routine summary
              </h2>
              <p className="mt-2 text-sm text-foreground-secondary">
                {concern ? concernLabel(concern) : ""}
                {goals.length ? ` · ${goals.length} goals` : ""}
                {time ? ` · ${ROUTINE_TIMES.find((t) => t.id === time)?.label}` : ""}
              </p>

              <ul className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
                {recommendations.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-1 py-4 tablet:flex-row tablet:items-center tablet:justify-between"
                  >
                    <div>
                      <p className="text-caption font-medium uppercase tracking-[0.08em] text-power-pink">
                        {item.slot}
                      </p>
                      <Link
                        href={item.product.href}
                        className="font-medium text-foreground transition-colors hover:text-power-pink"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-foreground-secondary">
                        {item.product.price.formatted}
                      </p>
                    </div>
                    <Button asChild variant="text" size="sm" className="justify-start tablet:justify-center">
                      <Link href={item.product.href}>View</Link>
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 tablet:flex-row tablet:justify-between">
                <Button type="button" variant="pearl" onClick={reset}>
                  Start over
                </Button>
                <div className="flex flex-col gap-3 tablet:flex-row">
                  <Button asChild variant="outline">
                    <Link href="/collections/bundles">Browse kits</Link>
                  </Button>
                  <Button type="button" loading={adding} onClick={addAll}>
                    Add all to bag
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
