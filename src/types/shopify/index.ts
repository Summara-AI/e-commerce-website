/**
 * Shopify-specific type aliases & response envelopes.
 * Domain models stay in `@/types` to avoid duplication — re-export here for discoverability.
 */

export type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ProductVariant,
  ProductMetafields,
  MoneyV2,
  ImageResource,
  StoreMenu,
  StoreMenuLink,
  CustomerAccountModel,
  SearchResponse,
  ThemeSettings,
} from "@/types";

/** Opaque Storefront GID */
export type ShopifyGid = string & { readonly __brand: "ShopifyGid" };

/** Envelope used by future shopifyFetch */
export type StorefrontPayload<T> = {
  data?: T;
  errors?: { message: string; extensions?: Record<string, unknown> }[];
};

export type StorefrontConnection<T> = {
  nodes: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage?: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
};
