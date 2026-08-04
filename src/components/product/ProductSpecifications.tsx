import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

type ProductSpecificationsProps = {
  education: ProductEducation;
  className?: string;
};

/**
 * Clean product specifications table — verified fields only.
 */
export function ProductSpecifications({
  education,
  className,
}: ProductSpecificationsProps) {
  if (!education.specs.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-specs-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-specifications"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-specs-heading"
          eyebrow="Specifications"
          title="Product details"
          description="Clear facts for confident choosing — shelf life and storage appear when verified on packaging metafields."
        />

        <dl className="mt-10 divide-y divide-border-subtle border-y border-border-subtle tablet:mt-12">
          {education.specs.map((spec) => (
            <div
              key={spec.id}
              className="grid gap-2 py-5 tablet:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] tablet:gap-8"
            >
              <dt className="text-sm font-medium text-foreground">{spec.label}</dt>
              <dd className="text-sm leading-relaxed text-foreground-secondary">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
