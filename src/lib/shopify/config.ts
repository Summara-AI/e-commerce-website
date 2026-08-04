/**
 * Environment-backed Shopify config.
 * Reads process.env only — never hardcode tokens.
 */

export type ShopifyConfig = {
  /** Feature gate — must be true before any network call */
  enabled: boolean;
  storeDomain: string;
  storefrontToken: string;
  apiVersion: string;
  /** Optional Admin API — never expose to client */
  adminTokenPresent: boolean;
  customerAccountClientId: string;
  storefrontHostname: string;
};

const DEFAULT_API_VERSION = "2025-01";

/**
 * Resolve config from env. Safe to call on server; do not import in Client Components
 * with secret values (use public domain/version only on client if needed).
 */
export function getShopifyConfig(): ShopifyConfig {
  const storeDomain = (process.env.SHOPIFY_STORE_DOMAIN ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
  const enabled =
    process.env.SHOPIFY_STOREFRONT_ENABLED === "true" &&
    Boolean(storeDomain) &&
    Boolean(storefrontToken);

  return {
    enabled,
    storeDomain,
    storefrontToken,
    apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION ?? DEFAULT_API_VERSION,
    adminTokenPresent: Boolean(process.env.SHOPIFY_ADMIN_ACCESS_TOKEN),
    customerAccountClientId: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID ?? "",
    storefrontHostname: storeDomain || "your-store.myshopify.com",
  };
}

export function isShopifyConfigured(): boolean {
  return getShopifyConfig().enabled;
}

/**
 * Throw when live Shopify is not ready — keeps accidental integration from shipping.
 */
export function assertShopifyReady(): ShopifyConfig {
  const config = getShopifyConfig();
  if (!config.enabled) {
    throw new Error(
      "[shopify] Storefront is not connected. Set SHOPIFY_STOREFRONT_ENABLED=true and credentials, or keep using seed data façades.",
    );
  }
  return config;
}
