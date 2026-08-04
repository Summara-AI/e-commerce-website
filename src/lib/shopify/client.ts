/**
 * Storefront GraphQL transport stub.
 *
 * Phase C: implement POST to `https://{shop}/api/{version}/graphql.json`
 * with Storefront token, then flip `canUseShopifyNetwork` to respect config.enabled.
 * Until then services keep returning seed data via `isShopifyLive() === false`.
 */

import { assertShopifyReady, getShopifyConfig } from "./config";

export class ShopifyNotConnectedError extends Error {
  readonly code = "SHOPIFY_NOT_CONNECTED" as const;

  constructor(message = "Shopify Storefront API is not connected yet.") {
    super(message);
    this.name = "ShopifyNotConnectedError";
  }
}

export class ShopifyRequestError extends Error {
  readonly code = "SHOPIFY_REQUEST_ERROR" as const;
  readonly status?: number;
  readonly errors?: unknown;

  constructor(message: string, options?: { status?: number; errors?: unknown }) {
    super(message);
    this.name = "ShopifyRequestError";
    this.status = options?.status;
    this.errors = options?.errors;
  }
}

export type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  /** Cache tags for Next.js Data Cache */
  tags?: string[];
  revalidate?: number | false;
  /** Abort / timeout (ms) — applied when live */
  timeoutMs?: number;
};

/**
 * Future Storefront POST helper.
 * Currently always throws — do not call from UI. Services use seed until this is live.
 */
export async function shopifyFetch<TData>(_options: ShopifyFetchOptions): Promise<TData> {
  const config = getShopifyConfig();

  if (!config.enabled) {
    throw new ShopifyNotConnectedError(
      "Keep using `@/services` seed façades until Storefront transport is implemented.",
    );
  }

  assertShopifyReady();
  throw new ShopifyNotConnectedError(
    "Shopify fetch transport is scaffolded but not implemented. Complete Phase C.",
  );
}

/**
 * Soft check for services that fall back to seed data.
 * Phase C: `return getShopifyConfig().enabled` after shopifyFetch is implemented.
 */
export function canUseShopifyNetwork(): boolean {
  return false;
}
