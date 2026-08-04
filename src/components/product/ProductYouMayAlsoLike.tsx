import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { YouMayAlsoLikeGroup } from "@/lib/product-recommendations";
import { cn } from "@/lib/utils";

type ProductYouMayAlsoLikeProps = {
  group: YouMayAlsoLikeGroup;
  className?: string;
};

/**
 * Secondary recommendation — concern / ingredient / ritual framing.
 */
export function ProductYouMayAlsoLike({ group, className }: ProductYouMayAlsoLikeProps) {
  if (!group.products.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-ymal-heading"
      className={cn("bg-page", className)}
      data-shopify-section="you-may-also-like"
      data-recommendation-engine="manual-curated"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-ymal-heading"
          eyebrow={group.eyebrow}
          title={group.title}
          description={group.description}
        />
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 tablet:mt-12 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-6">
          {group.products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} density="compact" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
