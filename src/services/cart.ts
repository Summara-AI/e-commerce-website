/**
 * Cart service — client localStorage today; Shopify Cart API tomorrow.
 *
 * Shopify: cartCreate, cartLinesAdd/Update/Remove, cartDiscountCodesUpdate,
 * cartBuyerIdentityUpdate. Persist cart id; expose cart.checkoutUrl.
 */

import { createEmptyCart, getCartShippingProgress } from "@/data/cart";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";
import type { AddToCartInput, ShopifyCart } from "@/types";

function assertLiveNotWired(feature: string): never {
  throw new CommerceError(
    "NOT_CONNECTED",
    `Shopify ${feature} is configured but Cart API transport is not implemented yet.`,
  );
}

export function getCartBootstrapService() {
  if (isShopifyLive()) assertLiveNotWired("cart");
  return {
    cart: createEmptyCart(),
    shippingProgress: getCartShippingProgress(0),
  };
}

/** Future: cartCreate + linesAdd. UI keeps calling cart-context until wired. */
export async function createCartWithLineService(
  _input: AddToCartInput,
): Promise<ShopifyCart> {
  void _input;
  assertLiveNotWired("cartCreate");
}

/** Future: return cart.checkoutUrl for handoff. */
export async function getCartCheckoutUrlService(
  _cartId: string,
): Promise<string | null> {
  void _cartId;
  if (isShopifyLive()) assertLiveNotWired("cart checkoutUrl");
  return null;
}
