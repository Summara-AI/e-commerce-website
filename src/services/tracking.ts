/**
 * Order tracking service — demo heuristic today; AfterShip / Parcel Panel / 17Track tomorrow.
 *
 * Shopify: order lookup by name + email (Customer Account) or tracking app webhook.
 */

import { isDemoCommerce } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

export type TrackOrderInput = {
  orderNumber: string;
  email: string;
};

export type TrackOrderResult = {
  found: boolean;
  statusLabel?: string;
  trackingUrl?: string;
  carrier?: string;
};

export async function trackOrderService(
  input: TrackOrderInput,
): Promise<TrackOrderResult> {
  const orderNumber = input.orderNumber.trim();
  const email = input.email.trim();
  if (!orderNumber || !email) {
    throw new CommerceError("VALIDATION", "Enter your order number and email.");
  }

  // Future: AfterShip / Parcel Panel / Shopify order status page
  if (!isDemoCommerce()) {
    throw new CommerceError(
      "NOT_CONNECTED",
      "Order tracking is not connected yet.",
    );
  }

  // Demo only — any order number with 3+ digits "succeeds"
  const digits = orderNumber.replace(/\D/g, "");
  if (digits.length >= 3) {
    return {
      found: true,
      statusLabel: "In transit (preview)",
      carrier: "Demo carrier",
    };
  }

  return { found: false };
}
