"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useNewsletterForm } from "@/hooks/use-newsletter-form";
import { HOME_NEWSLETTER } from "@/content/home-closing";
import type { NewsletterSubscribeResult, NewsletterSource } from "@/lib/newsletter";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type HomeNewsletterProps = {
  className?: string;
  /**
   * Optional override — return a NewsletterSubscribeResult for typed errors,
   * or void on success. Defaults to Shopify-ready newsletterSignupAction.
   */
  onSubscribe?: (input: {
    email: string;
    acceptsMarketing: true;
    consentUpdatedAt: string;
    source: NewsletterSource;
  }) => Promise<NewsletterSubscribeResult | void> | NewsletterSubscribeResult | void;
};

/**
 * Luxury newsletter — Shopify Customers / Email / Klaviyo ready.
 * UI unchanged; provider swap is env-only via NEWSLETTER_PROVIDER.
 */
export function HomeNewsletter({ className, onSubscribe }: HomeNewsletterProps) {
  const reduceMotion = useReducedMotion();
  const form = useNewsletterForm({
    source: "home-newsletter",
    onSubscribe,
    optimistic: true,
  });

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-newsletter-heading"
      className={cn("relative overflow-hidden", className)}
      reveal={false}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-pearl)_0%,var(--color-blush)_40%,var(--color-pink-mist)_75%,var(--color-canvas)_100%)]" />
        <motion.div
          className="absolute left-[5%] top-[20%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,224,239,0.55)_0%,transparent_70%)] blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[8%] right-[8%] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(239,232,224,0.7)_0%,transparent_70%)] blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <Container width="narrow">
        <motion.div
          className="relative mx-auto max-w-[34rem] overflow-hidden rounded-card border border-border-subtle bg-canvas/70 px-6 py-14 text-center shadow-elev2 backdrop-blur-[2px] tablet:px-12 tablet:py-16"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-sans text-overline font-medium uppercase tracking-[0.2em] text-power-pink">
            {HOME_NEWSLETTER.eyebrow}
          </p>
          <h2
            id="home-newsletter-heading"
            className="mt-5 font-display text-h2 font-light italic tracking-[-0.02em] text-foreground desktop:text-h1"
          >
            {HOME_NEWSLETTER.title}
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-sm font-light leading-[1.8] text-foreground-secondary tablet:text-base">
            {HOME_NEWSLETTER.description}
          </p>

          <AnimatePresence mode="wait">
            {form.isSuccess ? (
              <motion.div
                key="ok"
                id={form.statusId}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease }}
                className="mt-10"
                role="status"
                aria-live="polite"
              >
                <motion.span
                  className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-mist text-power-pink"
                  initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.05, ease }}
                >
                  <Check className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </motion.span>
                <p className="mt-4 font-display text-2xl font-light italic text-foreground">
                  {form.copy.successTitle}
                </p>
                <p className="mt-2 text-sm font-light text-foreground-muted">
                  {form.copy.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={form.onSubmit}
                noValidate
                className="mx-auto mt-10 max-w-md space-y-4"
                initial={false}
                aria-busy={form.isSubmitting || undefined}
              >
                {/* Shopify / Klaviyo marketing consent — hidden, always enabled */}
                <input type="hidden" name="acceptsMarketing" value={form.consentFields.acceptsMarketing} />
                <input type="hidden" name="customer[accepts_marketing]" value="true" />
                <input type="hidden" name="marketing_consent" value={form.consentFields.marketingConsent} />
                <input type="hidden" name="consent_updated_at" value={form.consentFields.consentUpdatedAt} />
                <input type="hidden" name="consent_source" value={form.consentFields.consentSource} />
                <input type="hidden" name="form_type" value="customer" />

                <label htmlFor={form.fieldId} className="visually-hidden">
                  {form.copy.emailLabel}
                </label>
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <input
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
                    disabled={form.isSubmitting}
                    onFocus={() => form.setFocused(true)}
                    onBlur={() => form.setFocused(false)}
                    onChange={(e) => form.onEmailChange(e.target.value)}
                    aria-invalid={Boolean(form.error) || undefined}
                    aria-describedby={form.error ? form.errorId : undefined}
                    aria-required="true"
                    className={cn(
                      "h-16 w-full rounded-input border bg-blush/40 px-6 text-base font-light text-foreground",
                      "placeholder:text-foreground-nav",
                      "transition-[border-color,box-shadow,background-color,transform] duration-300 ease-out",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      "disabled:cursor-not-allowed disabled:opacity-70",
                      form.error
                        ? "border-destructive"
                        : form.focused
                          ? "border-power-pink bg-canvas shadow-[0_0_0_4px_rgba(228,19,111,0.12)]"
                          : "border-border-subtle hover:border-border-default hover:bg-canvas/80 hover:shadow-elev1",
                    )}
                  />
                </motion.div>
                {form.error ? (
                  <p
                    id={form.errorId}
                    className="text-left text-caption text-destructive"
                    role="alert"
                    aria-live="assertive"
                  >
                    {form.error}
                  </p>
                ) : null}
                <motion.div
                  whileHover={reduceMotion || form.isSubmitting ? undefined : { y: -1 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full transition-transform duration-300"
                    loading={form.isSubmitting}
                    disabled={form.isSubmitting}
                  >
                    {form.copy.submitLabel}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
