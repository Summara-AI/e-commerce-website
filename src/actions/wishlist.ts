"use server";

import type { ActionResult } from "./cart";

/** Sync guest wishlist handles → customer metafield when authenticated */
export async function syncWishlistAction(_input: {
  productHandles: string[];
}): Promise<ActionResult<{ synced: number }>> {
  void _input;
  return {
    ok: false,
    error: "Wishlist sync is not connected to Shopify yet (Phase 11B).",
    code: "NOT_CONNECTED",
  };
}
