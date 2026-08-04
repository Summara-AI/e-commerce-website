/**
 * Checkout handoff service — single integration point for "Continue to Checkout".
 *
 * Shopify: use `cart.checkoutUrl` from Cart API only.
 * Do not use a static env checkout URL in production once Cart API is live.
 * Preview mode remains for local UX review when no checkoutUrl exists.
 */

import {
  beginShopifyCheckout,
  type CheckoutDraft,
  type OrderPreview,
} from "@/lib/checkout";
import { isShopifyLive } from "@/lib/commerce/mode";

export type CheckoutHandoffResult = {
  href: string;
  mode: "shopify" | "preview";
};

/**
 * Resolve checkout redirect.
 * When live: prefer `checkoutUrl` from Cart API (`getCartCheckoutUrlService`).
 */
export async function resolveCheckoutHandoffService(input: {
  /** Shopify Cart.checkoutUrl — primary production path */
  checkoutUrl?: string | null;
  draft: CheckoutDraft;
  preview: OrderPreview;
}): Promise<CheckoutHandoffResult> {
  // Future: if isShopifyLive() && !input.checkoutUrl → fetch cart and require checkoutUrl
  void isShopifyLive;
  return beginShopifyCheckout(input);
}
