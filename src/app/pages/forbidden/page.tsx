import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ERROR_403_PAGE } from "@/content/utility-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Access restricted",
  description: ERROR_403_PAGE.description,
  path: "/pages/forbidden",
  noIndex: true,
});

/**
 * 403 utility — path avoids reserved status-code collisions.
 */
export default function ForbiddenPage() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="forbidden-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {ERROR_403_PAGE.eyebrow}
        </p>
        <div data-image-spec="utility-error-mark">
          <EmptyState
            title={ERROR_403_PAGE.title}
            description={ERROR_403_PAGE.description}
            actionLabel={ERROR_403_PAGE.primaryLabel}
            actionHref={ERROR_403_PAGE.primaryHref}
          />
        </div>
        <h1 id="forbidden-heading" className="visually-hidden">
          {ERROR_403_PAGE.title}
        </h1>
        <div className="mt-2 flex justify-center">
          <Button asChild variant="text">
            <Link href={ERROR_403_PAGE.secondaryHref}>{ERROR_403_PAGE.secondaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
