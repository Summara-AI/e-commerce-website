/**
 * Wishlist architecture — guest localStorage; customer metafield sync later.
 * Persistence lives in account-context today; this module documents the contract.
 */

import type { WishlistState } from "@/types";

export type { WishlistState } from "@/types";

export const WISHLIST_STORAGE_KEY = "ksl-wishlist-v1";

export function createEmptyWishlist(): WishlistState {
  return {
    handles: [],
    productIds: [],
    updatedAt: new Date().toISOString(),
    syncStatus: "local",
  };
}

/**
 * Sync strategy:
 * 1. Guest → localStorage only (`syncStatus: "local"`) via account-context
 * 2. Login → merge local handles with customer metafield (`mergeWishlistHandles`)
 * 3. Authenticated → Customer Account API / wishlist app; local as cache
 * 4. Logout → keep local snapshot; stop remote writes
 *
 * Helpers live in `@/lib/wishlist` (sort, filter, availability, merge).
 */
export const WISHLIST_SYNC_STRATEGY = {
  guestStorage: "localStorage",
  customerMetafield: { namespace: "ksl", key: "wishlist" },
  mergeOnLogin: "union" as const,
  maxItems: 100,
};
