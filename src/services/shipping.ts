/**
 * Shipping estimates — content thresholds today; Shopify delivery profiles tomorrow.
 */

import { getShippingProgressState } from "@/lib/cart-shipping";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

export function getShippingProgressService(subtotalAmount: number) {
  return getShippingProgressState(subtotalAmount);
}

/**
 * Future: Storefront cartDeliveryGroups / Admin shipping rates for destination.
 */
export async function estimateShippingService(_input: {
  country: string;
  province?: string;
  zip?: string;
  cartId?: string;
}): Promise<{ amount: number; currencyCode: string; title: string }[]> {
  void _input;
  if (isShopifyLive()) {
    throw new CommerceError(
      "NOT_CONNECTED",
      "Shopify delivery rates are not wired yet.",
    );
  }
  return [];
}
