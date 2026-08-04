"use client";

import Link from "next/link";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NETWORK_ERROR_PAGE } from "@/content/utility-pages";

/**
 * Network error utility — Shopify API / fetch failure ready.
 */
export default function NetworkErrorPage() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="network-error-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {NETWORK_ERROR_PAGE.eyebrow}
        </p>
        <div className="mt-6" data-image-spec="utility-error-mark">
          <ErrorState
            variant="network"
            titleAs="h1"
            titleId="network-error-heading"
            title={NETWORK_ERROR_PAGE.title}
            description={NETWORK_ERROR_PAGE.description}
            onRetry={() => window.location.reload()}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild variant="text">
            <Link href={NETWORK_ERROR_PAGE.secondaryHref}>
              {NETWORK_ERROR_PAGE.secondaryLabel}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
