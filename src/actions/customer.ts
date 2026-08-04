"use server";

import type { ActionResult } from "./cart";

export async function updateCustomerProfileAction(_input: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}): Promise<ActionResult> {
  void _input;
  return {
    ok: false,
    error: "Customer profile updates require Customer Account API (Phase 11C+).",
    code: "NOT_CONNECTED",
  };
}

export async function createCustomerAddressAction(_input: Record<string, string>): Promise<ActionResult> {
  void _input;
  return {
    ok: false,
    error: "Address create requires Customer Account API (Phase 11C+).",
    code: "NOT_CONNECTED",
  };
}
