"use server";

/**
 * Server Actions inventory — Phase 11B stubs.
 * Cart/wishlist still client-local; these define the future mutation surface.
 */

import { CommerceError } from "@/lib/api/errors";

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string };

function notConnected(feature: string): ActionResult<never> {
  return {
    ok: false,
    error: `${feature} is not connected to Shopify yet (Phase 11B).`,
    code: "NOT_CONNECTED",
  };
}

/** Add line — will call cartLinesAdd */
export async function addToCartAction(_input: {
  merchandiseId: string;
  quantity: number;
  cartId?: string;
}): Promise<ActionResult<{ cartId: string }>> {
  void _input;
  return notConnected("Cart");
}

/** Update line quantity */
export async function updateCartLineAction(_input: {
  cartId: string;
  lineId: string;
  quantity: number;
}): Promise<ActionResult> {
  void _input;
  return notConnected("Cart");
}

/** Remove line */
export async function removeCartLineAction(_input: {
  cartId: string;
  lineId: string;
}): Promise<ActionResult> {
  void _input;
  return notConnected("Cart");
}

/** Apply discount codes */
export async function applyDiscountCodesAction(_input: {
  cartId: string;
  codes: string[];
}): Promise<ActionResult> {
  void _input;
  return notConnected("Cart discounts");
}

/** Cart note */
export async function updateCartNoteAction(_input: {
  cartId: string;
  note: string;
}): Promise<ActionResult> {
  void _input;
  return notConnected("Cart note");
}

export type { CommerceError };
