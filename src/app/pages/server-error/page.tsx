"use client";

import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ERROR_500_PAGE } from "@/content/utility-pages";

/**
 * Explicit 500 utility route — mirrors error boundary messaging.
 * Path avoids Next.js reserved /500 pages-router collision.
 */
export default function ServerErrorPage() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="server-error-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {ERROR_500_PAGE.eyebrow}
        </p>
        <div data-image-spec="utility-error-mark">
          <EmptyState
            titleAs="h1"
            titleId="server-error-heading"
            title={ERROR_500_PAGE.title}
            description={ERROR_500_PAGE.description}
            actionLabel={ERROR_500_PAGE.primaryLabel}
            onAction={() => window.location.reload()}
          />
        </div>
        <div className="mt-2 flex justify-center">
          <Button asChild variant="text">
            <Link href={ERROR_500_PAGE.secondaryHref}>{ERROR_500_PAGE.secondaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
