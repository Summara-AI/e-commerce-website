import { getNewsletterConfig } from "../config";
import { newsletterErrorMessage } from "../messages";
import type { NewsletterProvider, NewsletterSubscribeResult } from "../types";

/**
 * Shopify Email / Forms — POST to a configured subscribe endpoint.
 * Set SHOPIFY_EMAIL_SUBSCRIBE_ENDPOINT to your App Proxy / Forms handler.
 * Replacing that env var is enough to reconnect without UI changes.
 */
export const shopifyEmailProvider: NewsletterProvider = {
  id: "shopify_email",
  async subscribe({ email, consent, source }): Promise<NewsletterSubscribeResult> {
    const endpoint = getNewsletterConfig().shopifyEmail.endpoint;

    if (!endpoint) {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "shopify_email",
      };
    }

    try {
      const body = new URLSearchParams({
        email,
        "contact[email]": email,
        "customer[email]": email,
        "customer[accepts_marketing]": "true",
        acceptsMarketing: "true",
        marketing_consent: "true",
        consent_updated_at: consent.consentUpdatedAt,
        consent_source: consent.source,
        form_type: "customer",
        utf8: "✓",
        source: source ?? consent.source,
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body,
        cache: "no-store",
      });

      if (response.status === 409) {
        return {
          ok: false,
          code: "ALREADY_SUBSCRIBED",
          error: newsletterErrorMessage("ALREADY_SUBSCRIBED"),
          provider: "shopify_email",
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          code: "NETWORK",
          error: newsletterErrorMessage("NETWORK"),
          provider: "shopify_email",
        };
      }

      return {
        ok: true,
        email,
        provider: "shopify_email",
      };
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "shopify_email",
      };
    }
  },
};
