import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NOT_FOUND_PAGE } from "@/content/utility-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: NOT_FOUND_PAGE.description,
  path: "/404",
  noIndex: true,
});

/**
 * Global 404 — premium editorial empty with shopping CTAs.
 */
export default function NotFound() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="not-found-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {NOT_FOUND_PAGE.eyebrow}
        </p>
        <div data-image-spec="utility-404-editorial">
          <EmptyState
            title={NOT_FOUND_PAGE.title}
            description={NOT_FOUND_PAGE.description}
            actionLabel={NOT_FOUND_PAGE.primaryLabel}
            actionHref={NOT_FOUND_PAGE.primaryHref}
            titleAs="h1"
            titleId="not-found-heading"
          />
        </div>
        <div className="mt-2 flex justify-center gap-4">
          <Button asChild variant="text">
            <Link href={NOT_FOUND_PAGE.secondaryHref}>{NOT_FOUND_PAGE.secondaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
