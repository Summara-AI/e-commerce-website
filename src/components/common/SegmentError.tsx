"use client";

/**
 * Shared client error UI for route-level `error.tsx` segments.
 * Visual language matches the root app error boundary — no redesign.
 */

import { useEffect } from "react";
import Link from "next/link";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ERROR_500_PAGE } from "@/content/utility-pages";

type SegmentErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  /** Optional context for logging (e.g. "product") */
  scope?: string;
};

export function SegmentError({ error, reset, scope }: SegmentErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console -- intentional dev diagnostic
      console.error(scope ? `[${scope}]` : "[segment]", error);
    }
  }, [error, scope]);

  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="segment-error-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {ERROR_500_PAGE.eyebrow}
        </p>
        <div className="mt-6" data-image-spec="utility-error-mark">
          <ErrorState
            variant="server"
            title={ERROR_500_PAGE.title}
            description={ERROR_500_PAGE.description}
            onRetry={reset}
            titleAs="h1"
            titleId="segment-error-heading"
            className="text-center [&_h1]:font-display [&_h1]:text-2xl"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild variant="text">
            <Link href={ERROR_500_PAGE.secondaryHref}>{ERROR_500_PAGE.secondaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
