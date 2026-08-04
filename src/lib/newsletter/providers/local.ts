import type { NewsletterProvider, NewsletterSubscribeResult } from "../types";
import { newsletterErrorMessage } from "../messages";

/**
 * Local / offline provider — validates shape + consent so UI can ship before Shopify.
 * Swap NEWSLETTER_PROVIDER to activate a live endpoint.
 */
export const localNewsletterProvider: NewsletterProvider = {
  id: "local",
  async subscribe({ email }): Promise<NewsletterSubscribeResult> {
    // Soft latency so loading / optimistic UI can be felt in development
    await new Promise((resolve) => setTimeout(resolve, 320));

    if (!email.includes("@")) {
      return {
        ok: false,
        code: "INVALID_EMAIL",
        error: newsletterErrorMessage("INVALID_EMAIL"),
        provider: "local",
      };
    }

    return {
      ok: true,
      email,
      provider: "local",
    };
  },
};
