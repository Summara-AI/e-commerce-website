"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewsletterForm } from "@/hooks/use-newsletter-form";
import type { NewsletterSubscribeResult, NewsletterSource } from "@/lib/newsletter";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  className?: string;
  variant?: "footer" | "inline" | "card";
  heading?: string;
  description?: string;
  source?: NewsletterSource;
  /** Optional override — defaults to newsletterSignupAction (Shopify-ready) */
  onSubscribe?: (input: {
    email: string;
    acceptsMarketing: true;
    consentUpdatedAt: string;
    source: NewsletterSource;
  }) => Promise<NewsletterSubscribeResult | void> | NewsletterSubscribeResult | void;
};

/**
 * Shared newsletter form — Footer / Coming Soon.
 * Same subscribe API as HomeNewsletter; provider swap is env-only.
 */
export function NewsletterForm({
  className,
  variant = "footer",
  heading = "Stay in the loop",
  description = "New arrivals, routine tips, and authenticity updates — calm and infrequent.",
  source,
  onSubscribe,
}: NewsletterFormProps) {
  const form = useNewsletterForm({
    source: source ?? (`newsletter-${variant}` as NewsletterSource),
    onSubscribe,
    optimistic: true,
  });
  const showCopy = Boolean(heading || description);

  if (form.isSuccess) {
    return (
      <div
        className={cn(
          "rounded-card border border-border-subtle bg-success-bg px-4 py-5 text-success",
          className,
        )}
        role="status"
        aria-live="polite"
        id={form.statusId}
      >
        <p className="inline-flex items-center gap-2 font-display text-lg font-light italic text-foreground">
          <Check className="h-4 w-4 text-power-pink" strokeWidth={1.75} aria-hidden="true" />
          {form.copy.successTitle}
        </p>
        <p className="mt-1 text-sm text-foreground-secondary">{form.copy.successBody}</p>
      </div>
    );
  }

  return (
    <div className={cn(variant === "card" && "rounded-card border border-border-subtle bg-surface p-5", className)}>
      {heading ? (
        <h3
          className={cn(
            "text-foreground",
            variant === "footer"
              ? "font-display text-xl font-light italic"
              : "text-base font-medium",
          )}
        >
          {heading}
        </h3>
      ) : null}
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{description}</p>
      ) : null}

      <form
        onSubmit={form.onSubmit}
        className={cn("space-y-3", showCopy && "mt-4")}
        noValidate
        aria-busy={form.isSubmitting || undefined}
      >
        <input type="hidden" name="acceptsMarketing" value={form.consentFields.acceptsMarketing} />
        <input type="hidden" name="customer[accepts_marketing]" value="true" />
        <input type="hidden" name="marketing_consent" value={form.consentFields.marketingConsent} />
        <input type="hidden" name="consent_updated_at" value={form.consentFields.consentUpdatedAt} />
        <input type="hidden" name="consent_source" value={form.consentFields.consentSource} />
        <input type="hidden" name="form_type" value="customer" />

        <div className="space-y-2">
          <Label htmlFor={form.fieldId} className="visually-hidden">
            {form.copy.emailLabel}
          </Label>
          <div className={cn("flex flex-col gap-2", variant !== "card" && "tablet:flex-row")}>
            <Input
              id={form.fieldId}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder={form.copy.emailPlaceholder}
              value={form.email}
              onChange={(e) => form.onEmailChange(e.target.value)}
              error={Boolean(form.error)}
              aria-invalid={Boolean(form.error) || undefined}
              aria-describedby={form.error ? form.errorId : undefined}
              aria-required="true"
              disabled={form.isSubmitting}
              className="tablet:flex-1"
            />
            <Button
              type="submit"
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
              className="tablet:shrink-0"
            >
              {form.copy.submitLabel}
            </Button>
          </div>
          {form.error ? (
            <p id={form.errorId} className="text-caption text-destructive" role="alert" aria-live="assertive">
              {form.error}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
