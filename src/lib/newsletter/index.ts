/**
 * Newsletter module — Shopify Customers / Shopify Email / Klaviyo ready.
 *
 * UI → newsletterSignupAction / useNewsletterForm → subscribeNewsletter → provider
 * Change NEWSLETTER_PROVIDER or endpoint env vars only when connecting a live service.
 */

export type {
  NewsletterErrorCode,
  NewsletterMarketingConsent,
  NewsletterProvider,
  NewsletterProviderId,
  NewsletterSource,
  NewsletterSubscribeFailure,
  NewsletterSubscribeInput,
  NewsletterSubscribeResult,
  NewsletterSubscribeSuccess,
} from "./types";

export { NEWSLETTER_COPY, NEWSLETTER_ERROR_MESSAGES, newsletterErrorMessage } from "./messages";
export { getNewsletterConfig, getNewsletterProviderId } from "./config";
export { subscribeNewsletter } from "./subscribe";
export { getNewsletterProvider } from "./providers";
