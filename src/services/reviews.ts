/**
 * Reviews service — empty/placeholder today; Judge.me / Loox / Stamped tomorrow.
 *
 * Keep ProductReviews UI; swap provider behind this service only.
 */

import { getProductReviews, type ProductReview } from "@/content/pdp-trust";
import { isShopifyLive } from "@/lib/commerce/mode";

export type ReviewProviderId = "none" | "judgeme" | "loox" | "stamped" | "shopify";

export function getConfiguredReviewProvider(): ReviewProviderId {
  const raw = (process.env.NEXT_PUBLIC_REVIEWS_PROVIDER ?? "none").toLowerCase();
  if (raw === "judgeme" || raw === "loox" || raw === "stamped" || raw === "shopify") {
    return raw;
  }
  return "none";
}

/**
 * Returns reviews for a product handle.
 * Today: content scaffold (usually empty → “Reviews soon”).
 * Future: Judge.me / Loox API by product GID/handle.
 */
export async function getProductReviewsService(
  handle: string,
): Promise<ProductReview[]> {
  void isShopifyLive;
  void getConfiguredReviewProvider;
  // Future: switch on provider + product GID
  return getProductReviews(handle);
}
