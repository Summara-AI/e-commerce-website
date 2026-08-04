import type { NewsletterProviderId } from "./types";

/**
 * Newsletter provider selection — change endpoint/provider here only.
 * UI components never import provider internals.
 */
export function getNewsletterProviderId(): NewsletterProviderId {
  const raw = (process.env.NEWSLETTER_PROVIDER ?? "local").trim().toLowerCase();

  if (
    raw === "shopify_customers" ||
    raw === "shopify_email" ||
    raw === "klaviyo" ||
    raw === "local"
  ) {
    return raw;
  }

  return "local";
}

export function getNewsletterConfig() {
  return {
    provider: getNewsletterProviderId(),
    klaviyo: {
      privateApiKey: process.env.KLAVIYO_PRIVATE_API_KEY ?? "",
      publicKey: process.env.KLAVIYO_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY ?? "",
      listId: process.env.KLAVIYO_LIST_ID ?? "",
      /** Override Klaviyo subscribe endpoint if needed */
      endpoint:
        process.env.KLAVIYO_SUBSCRIBE_ENDPOINT ??
        "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    },
    shopifyEmail: {
      /**
       * Shopify Email / Forms endpoint or custom App Proxy URL.
       * Replace this alone when switching to Shopify Email.
       */
      endpoint: process.env.SHOPIFY_EMAIL_SUBSCRIBE_ENDPOINT ?? "",
    },
    shopifyCustomers: {
      /**
       * Optional override for Admin GraphQL URL.
       * Defaults to https://{SHOPIFY_STORE_DOMAIN}/admin/api/{version}/graphql.json
       */
      endpoint: process.env.SHOPIFY_CUSTOMERS_SUBSCRIBE_ENDPOINT ?? "",
    },
  };
}
