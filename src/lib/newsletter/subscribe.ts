import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { getNewsletterProvider } from "./providers";
import { newsletterErrorMessage } from "./messages";
import type {
  NewsletterMarketingConsent,
  NewsletterProviderId,
  NewsletterSubscribeInput,
  NewsletterSubscribeResult,
  NewsletterSource,
} from "./types";

function buildConsent(
  source: NewsletterSource,
  consentUpdatedAt?: string,
): NewsletterMarketingConsent {
  return {
    acceptsMarketing: true,
    consentUpdatedAt: consentUpdatedAt ?? new Date().toISOString(),
    marketingOptInLevel: "SINGLE_OPT_IN",
    source,
  };
}

/**
 * Server-side newsletter subscribe — single entry for actions/services.
 * Swap NEWSLETTER_PROVIDER (or endpoint env vars) without changing callers.
 */
export async function subscribeNewsletter(
  input: NewsletterSubscribeInput,
  options?: { provider?: NewsletterProviderId },
): Promise<NewsletterSubscribeResult> {
  const provider = getNewsletterProvider(options?.provider);
  const email = normalizeEmail(input.email ?? "");
  const source = (input.source ?? "home-newsletter") as NewsletterSource;

  if (!isValidEmail(email)) {
    return {
      ok: false,
      code: "INVALID_EMAIL",
      error: newsletterErrorMessage("INVALID_EMAIL"),
      provider: provider.id,
    };
  }

  if (input.acceptsMarketing === false) {
    return {
      ok: false,
      code: "VALIDATION",
      error: newsletterErrorMessage("VALIDATION"),
      provider: provider.id,
    };
  }

  const consent = buildConsent(source, input.consentUpdatedAt);

  try {
    return await provider.subscribe({
      ...input,
      email,
      source,
      acceptsMarketing: true,
      consent,
    });
  } catch {
    return {
      ok: false,
      code: "NETWORK",
      error: newsletterErrorMessage("NETWORK"),
      provider: provider.id,
    };
  }
}
