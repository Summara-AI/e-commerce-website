import Link from "next/link";
import { BundleCard } from "@/components/commerce/BundleCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CatalogBundle } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductRecommendedBundlesProps = {
  bundles: CatalogBundle[];
  className?: string;
};

/**
 * Recommended kits from the live SCYN bundle catalogue.
 */
export function ProductRecommendedBundles({
  bundles,
  className,
}: ProductRecommendedBundlesProps) {
  if (!bundles.length) return null;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-bundles-heading"
      className={cn("bg-page", className)}
      data-shopify-section="recommended-bundles"
    >
      <Container width="content">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="pdp-bundles-heading"
            eyebrow="Kits"
            title="Recommended bundles"
            description="Complete paths already curated — starter and morning kits from SCYN."
          />
          <Button asChild variant="text" className="self-start tablet:self-auto">
            <Link href="/collections/bundles">View all kits</Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-8 laptop:mt-12 laptop:grid-cols-1 desktop:gap-10">
          {bundles.map((bundle) => (
            <li key={bundle.id}>
              <BundleCard bundle={bundle} variant="featured" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
