import { ShieldCheck, Headphones, Lock, Package } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PDP_PURCHASE_CONFIDENCE } from "@/content/pdp-trust";
import { cn } from "@/lib/utils";

const ICONS = {
  shield: ShieldCheck,
  headphones: Headphones,
  lock: Lock,
  package: Package,
} as const;

type ProductPurchaseConfidenceProps = {
  className?: string;
};

/**
 * Closing trust blocks — verified brand positioning only.
 */
export function ProductPurchaseConfidence({ className }: ProductPurchaseConfidenceProps) {
  return (
    <Section
      spacing="lux"
      aria-labelledby="pdp-confidence-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-purchase-confidence"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-confidence-heading"
          align="center"
          className="mx-auto"
          eyebrow="Confidence"
          title="Shop with a quieter mind"
          description="Trust cues drawn from how Korean Skin Lab actually operates — authenticity, support, and careful curation."
        />

        <ul className="mt-12 grid gap-10 tablet:grid-cols-2 laptop:mt-14 laptop:grid-cols-4 laptop:gap-8">
          {PDP_PURCHASE_CONFIDENCE.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="text-center tablet:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-badge bg-surface text-power-pink">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
