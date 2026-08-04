/**
 * Wishlist service façade — guest localStorage today; customer metafield sync tomorrow.
 *
 * Shopify: customer metafield `ksl.wishlist` (list.product_reference).
 * Merge strategy: see `WISHLIST_SYNC_STRATEGY` in `@/data/wishlist`.
 */

export {
  WISHLIST_SORT_OPTIONS,
  DEFAULT_WISHLIST_FILTERS,
  AVAILABILITY_LABEL,
  getProductBrand,
  getWishlistAvailability,
  resolveWishlistProducts,
  filterWishlistProducts,
  sortWishlistProducts,
  buildWishlistFacets,
  mergeWishlistHandles,
  readGuestWishlist,
  createEmptyWishlist,
  WISHLIST_STORAGE_KEY,
  WISHLIST_SYNC_STRATEGY,
  type WishlistSort,
  type WishlistFilters,
  type WishlistAvailability,
  type WishlistState,
} from "@/lib/wishlist/service";

import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

/**
 * Future: pull/push wishlist GIDs for authenticated customer.
 * UI continues to use AccountProvider until this returns live data.
 */
export async function syncWishlistWithCustomerService(input: {
  customerAccessToken?: string;
  localHandles: string[];
}): Promise<string[]> {
  if (isShopifyLive()) {
    throw new CommerceError(
      "NOT_CONNECTED",
      "Wishlist customer metafield sync is not wired yet.",
    );
  }
  void input.customerAccessToken;
  return input.localHandles;
}
