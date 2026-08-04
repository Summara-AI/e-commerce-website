import type { NewsletterProvider, NewsletterProviderId } from "../types";
import { getNewsletterProviderId } from "../config";
import { localNewsletterProvider } from "./local";
import { shopifyCustomersProvider } from "./shopify-customers";
import { shopifyEmailProvider } from "./shopify-email";
import { klaviyoProvider } from "./klaviyo";

const PROVIDERS: Record<NewsletterProviderId, NewsletterProvider> = {
  local: localNewsletterProvider,
  shopify_customers: shopifyCustomersProvider,
  shopify_email: shopifyEmailProvider,
  klaviyo: klaviyoProvider,
};

/** Resolve active provider — UI never calls this directly. */
export function getNewsletterProvider(
  override?: NewsletterProviderId,
): NewsletterProvider {
  const id = override ?? getNewsletterProviderId();
  return PROVIDERS[id] ?? localNewsletterProvider;
}

export {
  localNewsletterProvider,
  shopifyCustomersProvider,
  shopifyEmailProvider,
  klaviyoProvider,
};
