/**
 * Search service — local index today; Predictive Search / Storefront search tomorrow.
 *
 * Shopify: predictiveSearch, search query with product filters.
 * Map via `mapStorefrontSearch`.
 */

import { getSearchDiscovery, searchStore } from "@/data/search";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";
import { searchCatalog, type SearchResult } from "@/lib/search";

function assertLiveNotWired(): never {
  throw new CommerceError(
    "NOT_CONNECTED",
    "Shopify search is configured but Storefront transport is not implemented yet.",
  );
}

export function searchService(query: string, limit = 40) {
  if (isShopifyLive()) assertLiveNotWired();
  return searchStore(query, limit);
}

/** UI search (drawer + /search page) — returns existing SearchResult[]. */
export function searchCatalogService(query: string, limit = 8): SearchResult[] {
  if (isShopifyLive()) assertLiveNotWired();
  return searchCatalog(query, limit);
}

export function getSearchDiscoveryService() {
  return getSearchDiscovery();
}
