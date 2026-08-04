/**
 * Shopify integration foundation.
 * No Storefront API calls until Phase C transport is implemented.
 * Enable only when SHOPIFY_STOREFRONT_ENABLED=true AND client transport is live.
 */

export {
  getShopifyConfig,
  isShopifyConfigured,
  assertShopifyReady,
  type ShopifyConfig,
} from "./config";

export {
  STOREFRONT_API_VERSION_DEFAULT,
  SHOPIFY_MENU_HANDLES,
  CACHE_TAG,
} from "./constants";

export { shopifyFetch, ShopifyNotConnectedError, ShopifyRequestError } from "./client";

export { shopifyImageUrl, shopifyImageSrcSetHints } from "./images";

export { metadataFromShopifySeo } from "./seo";

export type { ShopifyFetchOptions } from "./client";

export * from "./mappers";
