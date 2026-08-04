import { getShopifyConfig } from "@/lib/shopify/config";
import { getNewsletterConfig } from "../config";
import { newsletterErrorMessage } from "../messages";
import type { NewsletterProvider, NewsletterSubscribeResult } from "../types";

const CUSTOMER_CREATE_WITH_MARKETING = /* GraphQL */ `
  mutation NewsletterCustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        emailMarketingConsent {
          marketingState
        }
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

function resolveAdminGraphqlEndpoint(): string | null {
  const override = getNewsletterConfig().shopifyCustomers.endpoint;
  if (override) return override;

  const { storeDomain, apiVersion } = getShopifyConfig();
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  if (!storeDomain || !adminToken) return null;

  return `https://${storeDomain}/admin/api/${apiVersion}/graphql.json`;
}

function mapShopifyUserError(message: string, code?: string | null): NewsletterSubscribeResult {
  const haystack = `${code ?? ""} ${message}`.toLowerCase();

  if (
    haystack.includes("taken") ||
    haystack.includes("already") ||
    haystack.includes("exists") ||
    code === "TAKEN"
  ) {
    return {
      ok: false,
      code: "ALREADY_SUBSCRIBED",
      error: newsletterErrorMessage("ALREADY_SUBSCRIBED"),
      provider: "shopify_customers",
    };
  }

  if (haystack.includes("email") || haystack.includes("invalid")) {
    return {
      ok: false,
      code: "INVALID_EMAIL",
      error: newsletterErrorMessage("INVALID_EMAIL"),
      provider: "shopify_customers",
    };
  }

  return {
    ok: false,
    code: "NETWORK",
    error: newsletterErrorMessage("NETWORK"),
    provider: "shopify_customers",
  };
}

/**
 * Shopify Customers — creates / updates customer with email marketing consent.
 * Requires SHOPIFY_ADMIN_ACCESS_TOKEN (server-only).
 */
export const shopifyCustomersProvider: NewsletterProvider = {
  id: "shopify_customers",
  async subscribe({ email, consent, tags }): Promise<NewsletterSubscribeResult> {
    const endpoint = resolveAdminGraphqlEndpoint();
    const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

    if (!endpoint || !adminToken) {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "shopify_customers",
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
        body: JSON.stringify({
          query: CUSTOMER_CREATE_WITH_MARKETING,
          variables: {
            input: {
              email,
              tags: ["newsletter", consent.source, ...(tags ?? [])].filter(Boolean),
              emailMarketingConsent: {
                marketingState: "SUBSCRIBED",
                marketingOptInLevel: consent.marketingOptInLevel,
                consentUpdatedAt: consent.consentUpdatedAt,
              },
            },
          },
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        return {
          ok: false,
          code: "NETWORK",
          error: newsletterErrorMessage("NETWORK"),
          provider: "shopify_customers",
        };
      }

      const json = (await response.json()) as {
        data?: {
          customerCreate?: {
            customer?: { id: string; email: string } | null;
            userErrors?: { field?: string[]; message: string; code?: string }[];
          };
        };
        errors?: { message: string }[];
      };

      if (json.errors?.length) {
        return {
          ok: false,
          code: "NETWORK",
          error: newsletterErrorMessage("NETWORK"),
          provider: "shopify_customers",
        };
      }

      const payload = json.data?.customerCreate;
      const userError = payload?.userErrors?.[0];

      if (userError) {
        // Existing customer — attempt marketing consent update path later;
        // surface as already subscribed for clear UX.
        return mapShopifyUserError(userError.message, userError.code);
      }

      if (!payload?.customer?.email) {
        return {
          ok: false,
          code: "NETWORK",
          error: newsletterErrorMessage("NETWORK"),
          provider: "shopify_customers",
        };
      }

      return {
        ok: true,
        email: payload.customer.email,
        provider: "shopify_customers",
      };
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "shopify_customers",
      };
    }
  },
};
