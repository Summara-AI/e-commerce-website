import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

type ProductHowToUseProps = {
  education: ProductEducation;
  className?: string;
};

/**
 * Step-by-step application — morning/evening framing, tips, layering.
 */
export function ProductHowToUse({ education, className }: ProductHowToUseProps) {
  const { howTo } = education;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-howto-heading"
      className={cn("bg-page", className)}
      data-shopify-section="product-how-to-use"
    >
      <Container width="content">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="pdp-howto-heading"
            eyebrow="How to use"
            title="A calm application path"
            description="General guidance for this product type — always follow the authentic packaging."
          />
          {howTo.eyebrow || howTo.routine ? (
            <p className="text-caption font-medium uppercase tracking-[0.12em] text-power-pink">
              {[howTo.eyebrow, howTo.routine === "morning" ? "AM" : howTo.routine === "evening" ? "PM" : "AM · PM"]
                .filter(Boolean)
                .join(" · ")}
            </p>
          ) : null}
        </div>

        <ol className="mt-10 space-y-0 tablet:mt-12">
          {howTo.steps.map((step, index) => (
            <li
              key={step.id}
              className="grid gap-4 border-t border-border-subtle py-8 first:border-t-0 first:pt-0 tablet:grid-cols-[5rem_minmax(0,1fr)_minmax(0,8rem)] tablet:gap-8"
            >
              <p className="font-display text-3xl font-light text-power-pink/45" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-xl font-light tracking-[-0.01em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-secondary">
                  {step.description}
                </p>
              </div>
              <div
                className={cn(
                  "hidden aspect-square overflow-hidden rounded-card bg-pearl tablet:block",
                  "bg-[linear-gradient(150deg,var(--bg-page),var(--color-accent-muted))]",
                )}
                role="img"
                aria-label={`Application step ${index + 1} illustration — pending`}
                data-image-spec="pdp-howto-step"
              />
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 border-t border-border-subtle pt-10 tablet:grid-cols-3 tablet:gap-10">
          {howTo.frequency ? (
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Frequency
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {howTo.frequency}
              </p>
            </div>
          ) : null}
          {howTo.layering ? (
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Layering
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {howTo.layering}
              </p>
            </div>
          ) : null}
          {howTo.tips?.length ? (
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Tips
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-foreground-secondary">
                {howTo.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
