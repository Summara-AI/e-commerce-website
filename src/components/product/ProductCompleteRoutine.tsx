import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { RoutineStep } from "@/lib/product-recommendations";
import { cn } from "@/lib/utils";

type ProductCompleteRoutineProps = {
  steps: RoutineStep[];
  className?: string;
};

/**
 * Complete your routine — logical order using verified catalogue products.
 */
export function ProductCompleteRoutine({ steps, className }: ProductCompleteRoutineProps) {
  if (!steps.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-routine-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="complete-your-routine"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-routine-heading"
          eyebrow="Routine"
          title="Complete your routine"
          description="A calm path in order of use — products from the SCYN catalogue."
        />

        <ol className="mt-10 space-y-0 tablet:mt-12">
          {steps.map((step) => (
            <li
              key={step.id}
              className="grid gap-6 border-t border-border-subtle py-8 first:border-t-0 first:pt-0 laptop:grid-cols-[4rem_minmax(0,7rem)_minmax(0,1fr)_auto] laptop:items-center laptop:gap-8"
            >
              <p
                className="font-display text-3xl font-light text-power-pink/45"
                aria-hidden="true"
              >
                {String(step.step).padStart(2, "0")}
              </p>

              <div
                className={cn(
                  "aspect-[4/5] w-24 overflow-hidden rounded-card bg-blush laptop:w-full",
                  "bg-[linear-gradient(160deg,var(--bg-page),var(--color-accent-muted))]",
                )}
                role="img"
                aria-label={step.product.imageAlt}
                data-image-spec="pdp-routine-step-thumb"
              />

              <div className="min-w-0">
                <p className="text-caption font-medium uppercase tracking-[0.12em] text-power-pink">
                  {step.purpose}
                </p>
                <h3 className="mt-2 font-display text-xl font-light tracking-[-0.01em] text-foreground">
                  <Link href={step.product.href} className="hover:text-power-pink">
                    {step.product.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {step.explanation}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {step.product.price.formatted}
                </p>
              </div>

              <Button asChild variant="secondary" size="sm" className="self-start laptop:self-center">
                <Link href={step.product.href}>View product</Link>
              </Button>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
