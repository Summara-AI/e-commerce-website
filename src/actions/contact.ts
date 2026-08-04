"use server";

import type { ActionResult } from "./cart";
import { submitContactService } from "@/services/contact";
import { toUserFacingMessage } from "@/lib/api/errors";

/**
 * Contact form action — delivery via `submitContactService`.
 * Future: Resend / Formspree / Shopify Forms (configure env, no UI change).
 */
export async function contactFormAction(input: {
  name: string;
  email: string;
  message: string;
  topic?: string;
}): Promise<ActionResult> {
  try {
    await submitContactService(input);
    return { ok: true, data: undefined };
  } catch (error) {
    return {
      ok: false,
      error: toUserFacingMessage(error, "Please complete all required fields."),
      code: "VALIDATION",
    };
  }
}
