import { Droplets, Sparkles, ShieldCheck, Sun, Leaf, Moon } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { EducationBenefit, ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

const MARKS = {
  drop: Droplets,
  spark: Sparkles,
  shield: ShieldCheck,
  sun: Sun,
  leaf: Leaf,
  moon: Moon,
} as const;

type ProductBenefitsProps = {
  education: ProductEducation;
  className?: string;
};

function BenefitRow({
  benefit,
  index,
}: {
  benefit: EducationBenefit;
  index: number;
}) {
  const Icon = MARKS[benefit.mark];
  return (
    <article
      className={cn(
        "grid gap-6 border-t border-border-subtle py-8 first:border-t-0 first:pt-0",
        "tablet:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)] tablet:items-start tablet:gap-8",
      )}
    >
      <p className="font-display text-3xl font-light text-power-pink/50" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="flex items-start gap-4">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-badge bg-surface-soft text-power-pink">
          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-light tracking-[-0.01em] text-foreground">
          {benefit.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground-secondary tablet:pt-1">
        {benefit.description}
      </p>
    </article>
  );
}

/**
 * Editorial benefits — numbered rows, not a loud icon grid.
 */
export function ProductBenefits({ education, className }: ProductBenefitsProps) {
  if (!education.benefits.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-benefits-heading"
      className={cn("bg-page", className)}
      data-shopify-section="product-benefits"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-benefits-heading"
          eyebrow="Benefits"
          title="What this formula is for"
          description="Highlights drawn from the product listing — calm and clear."
        />
        <div className="mt-10 tablet:mt-12">
          {education.benefits.map((benefit, index) => (
            <BenefitRow key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
