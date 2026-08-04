/**
 * Shipping progress helpers — driven only by theme / Shopify settings.
 */

import {
  CART_SHIPPING_PROGRESS_SETTINGS,
  type ShippingProgressSettings,
} from "@/content/cart-page";
import { formatPkr } from "@/lib/catalog";

export type ShippingProgressState =
  | { kind: "inactive"; settings: ShippingProgressSettings }
  | {
      kind: "progress";
      settings: ShippingProgressSettings;
      threshold: number;
      subtotal: number;
      remaining: number;
      progress: number;
      remainingFormatted: string;
      unlocked: boolean;
    };

export function getShippingProgressState(
  subtotalAmount: number,
  settings: ShippingProgressSettings = CART_SHIPPING_PROGRESS_SETTINGS,
): ShippingProgressState {
  const threshold = settings.freeShippingThreshold;

  if (!settings.enabled || threshold == null || threshold <= 0) {
    return { kind: "inactive", settings };
  }

  const remaining = Math.max(0, threshold - subtotalAmount);
  const unlocked = remaining === 0;
  const progress = Math.min(1, Math.max(0, subtotalAmount / threshold));

  return {
    kind: "progress",
    settings,
    threshold,
    subtotal: subtotalAmount,
    remaining,
    progress,
    remainingFormatted: formatPkr(remaining).formatted,
    unlocked,
  };
}
