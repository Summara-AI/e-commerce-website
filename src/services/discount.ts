/**
 * Discount service — intent-only today; Cart API cartDiscountCodesUpdate tomorrow.
 *
 * Never reduce totals client-side. Authoritative amounts come from Shopify Cart.
 */

import { isDemoCommerce } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

export type DiscountValidationResult = {
  code: string;
  /** null until Cart API returns allocation */
  amount: number | null;
  status: "accepted_intent" | "applied" | "rejected";
  message: string;
};

export async function validateDiscountCodeService(
  code: string,
  _cartId?: string | null,
): Promise<DiscountValidationResult> {
  void _cartId;
  const trimmed = code.trim();
  if (!trimmed) {
    throw new CommerceError("VALIDATION", "Enter a discount code.");
  }

  const normalized = trimmed.toUpperCase();

  // Future: cartDiscountCodesUpdate + read cart.discountAllocations
  if (!isDemoCommerce()) {
    throw new CommerceError(
      "NOT_CONNECTED",
      "Discount codes require a live Shopify cart.",
    );
  }

  return {
    code: normalized,
    amount: null,
    status: "accepted_intent",
    message: "Code saved for checkout (preview).",
  };
}
