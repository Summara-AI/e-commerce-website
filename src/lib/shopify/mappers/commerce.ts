/**
 * Cart / customer / search Storefront mappers — integration contracts.
 */

import type { CustomerAddress, CustomerOrder, CustomerProfile, SearchResponse, ShopifyCart } from "@/types";

/** Shopify: Cart → ShopifyCart (lines, cost, discountCodes, checkoutUrl). */
export function mapStorefrontCart(_node: unknown): ShopifyCart {
  void _node;
  throw new Error("[mappers/cart] Wire when Cart API is live.");
}

/** Shopify: Customer → CustomerProfile. Prefer Customer Account API when migrating. */
export function mapStorefrontCustomer(_node: unknown): CustomerProfile {
  void _node;
  throw new Error("[mappers/customer] Wire when customer queries are live.");
}

/** Shopify: MailingAddress → CustomerAddress. */
export function mapStorefrontAddress(_node: unknown): CustomerAddress {
  void _node;
  throw new Error("[mappers/address] Wire when customer address API is live.");
}

/** Shopify: Order → CustomerOrder (Customer Account / Storefront order). */
export function mapStorefrontOrder(_node: unknown): CustomerOrder {
  void _node;
  throw new Error("[mappers/order] Wire when order queries are live.");
}

/**
 * Shopify: predictiveSearch / search → SearchResponse.
 * Normalize products, collections, pages, queries.
 */
export function mapStorefrontSearch(_payload: unknown): SearchResponse {
  void _payload;
  throw new Error("[mappers/search] Wire when Predictive Search / search API is live.");
}
