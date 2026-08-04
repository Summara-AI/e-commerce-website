"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OFFLINE_PAGE } from "@/content/utility-pages";

/**
 * Offline utility state — service worker / PWA ready.
 */
export default function OfflinePage() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="offline-heading">
      <Container width="narrow">
        <p className="text-center text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          {OFFLINE_PAGE.eyebrow}
        </p>
        <div data-image-spec="utility-error-mark">
          <EmptyState
            titleAs="h1"
            titleId="offline-heading"
            title={OFFLINE_PAGE.title}
            description={OFFLINE_PAGE.description}
            actionLabel={OFFLINE_PAGE.primaryLabel}
            onAction={() => window.location.reload()}
          />
        </div>
      </Container>
    </Section>
  );
}
