/**
 * Cart data contracts — localStorage cart today; Shopify Cart API later.
 * UI continues to use `@/components/cart/cart-context` until Phase 11B adapters land.
 */

import type { ShopifyCart, CartShippingProgress, MoneyV2 } from "@/types";
import {
  CART_PAGE_COPY,
  CART_SHIPPING_PROGRESS_SETTINGS,
} from "@/content/cart-page";
import { formatPkr } from "@/lib/catalog";

export type { ShopifyCart, CartShippingProgress, AddToCartInput, CartLineModel } from "@/types";

/** Placeholder empty cart — shape matches future Storefront Cart */
export function createEmptyCart(currencyCode = "PKR"): ShopifyCart {
  const zero: MoneyV2 = {
    amount: "0",
    currencyCode,
    formatted: formatPkr(0).formatted,
  };
  return {
    lines: [],
    lineCount: 0,
    itemCount: 0,
    subtotal: zero,
    discounts: [],
    discountCodes: [],
    giftCardCodes: [],
  };
}

/**
 * Free-shipping progress from theme / shop metafield (seed settings today).
 * Returns null when threshold is disabled (current brand-safe default).
 */
export function getCartShippingProgress(subtotalAmount: number): CartShippingProgress | null {
  const settings = CART_SHIPPING_PROGRESS_SETTINGS;
  const thresholdAmount = settings.freeShippingThreshold;
  if (!settings.enabled || thresholdAmount == null || thresholdAmount <= 0) {
    return null;
  }

  const remaining = Math.max(0, thresholdAmount - subtotalAmount);
  const percent = Math.min(100, Math.round((subtotalAmount / thresholdAmount) * 100));
  const qualifies = subtotalAmount >= thresholdAmount;
  const remainingFormatted = formatPkr(remaining).formatted;

  return {
    threshold: {
      amount: String(thresholdAmount),
      currencyCode: "PKR",
      formatted: formatPkr(thresholdAmount).formatted,
    },
    currentSubtotal: {
      amount: String(subtotalAmount),
      currencyCode: "PKR",
      formatted: formatPkr(subtotalAmount).formatted,
    },
    remaining: {
      amount: String(remaining),
      currencyCode: "PKR",
      formatted: remainingFormatted,
    },
    percentComplete: percent,
    qualifies,
    message: qualifies
      ? (settings.unlockedMessage ?? CART_PAGE_COPY.progressUnlocked)
      : CART_PAGE_COPY.progressRemaining(remainingFormatted),
  };
}
