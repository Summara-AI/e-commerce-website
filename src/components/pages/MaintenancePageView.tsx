"use client";

import { MinimalChrome } from "@/components/pages/MinimalChrome";
import { Button } from "@/components/ui/button";
import { MAINTENANCE_PAGE } from "@/content/utility-pages";
import { Logo } from "@/components/header/Logo";

/**
 * Premium branded maintenance experience — Shopify password / maintenance ready.
 */
export function MaintenancePageView() {
  return (
    <>
      <MinimalChrome />
      <div className="relative flex min-h-[100dvh] flex-col">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,var(--color-canvas)_0%,var(--color-blush)_45%,var(--color-pink-mist)_100%)]"
          aria-hidden="true"
          data-image-spec="utility-maintenance-hero"
          data-placeholder="true"
        />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 text-center tablet:px-6">
          <div className="mb-10">
            <Logo />
          </div>
          <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
            {MAINTENANCE_PAGE.eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-h1 font-light italic tracking-[-0.02em] text-foreground">
            {MAINTENANCE_PAGE.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary">
            {MAINTENANCE_PAGE.description}
          </p>
          <p className="mt-6 text-sm text-foreground-muted">{MAINTENANCE_PAGE.hoursNote}</p>
          <div className="mt-8 flex flex-col items-center gap-3 tablet:flex-row">
            <Button asChild>
              <a href={`mailto:${MAINTENANCE_PAGE.email}`}>{MAINTENANCE_PAGE.email}</a>
            </Button>
            <Button asChild variant="secondary">
              <a
                href={MAINTENANCE_PAGE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {MAINTENANCE_PAGE.whatsappLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
