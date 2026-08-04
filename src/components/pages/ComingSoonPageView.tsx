"use client";

import { MinimalChrome } from "@/components/pages/MinimalChrome";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { COMING_SOON_PAGE } from "@/content/utility-pages";
import { Logo } from "@/components/header/Logo";

/**
 * Premium coming-soon landing — newsletter signup, Shopify launch ready.
 */
export function ComingSoonPageView() {
  return (
    <>
      <MinimalChrome />
      <div className="relative flex min-h-[100dvh] flex-col">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,var(--color-pink-mist)_0%,var(--color-canvas)_38%,var(--color-blush)_100%)]"
          aria-hidden="true"
          data-image-spec="utility-coming-soon-hero"
          data-placeholder="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-form flex-1 flex-col justify-center px-4 py-16 tablet:px-6">
          <div className="text-center">
            <Logo className="justify-center" />
            <p className="mt-10 text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
              {COMING_SOON_PAGE.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-h1 font-light italic tracking-[-0.02em] text-foreground">
              {COMING_SOON_PAGE.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              {COMING_SOON_PAGE.description}
            </p>
          </div>
          <div className="mt-10">
            <NewsletterForm
              variant="card"
              heading={COMING_SOON_PAGE.newsletterHeading}
              description={COMING_SOON_PAGE.newsletterDescription}
            />
          </div>
        </div>
      </div>
    </>
  );
}
