/**
 * Contact service — validates + acknowledges today; deliver via provider tomorrow.
 *
 * Future: Resend / Formspree / Shopify Forms / CRM inbox.
 * Never claim success in production without a configured provider.
 */

import { isDemoCommerce } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  topic?: string;
};

export type ContactResult = {
  ok: true;
  /** demo | delivered — UI may ignore */
  mode: "demo" | "delivered";
};

export async function submitContactService(
  input: ContactPayload,
): Promise<ContactResult> {
  if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
    throw new CommerceError("VALIDATION", "Please complete all required fields.");
  }

  if (input.message.trim().length < 10) {
    throw new CommerceError(
      "VALIDATION",
      "Please share a little more detail so we can help.",
    );
  }

  // Future provider switch (RESEND_API_KEY / CONTACT_INBOX_EMAIL / Shopify Forms)
  if (!isDemoCommerce() && !process.env.RESEND_API_KEY && !process.env.CONTACT_INBOX_EMAIL) {
    throw new CommerceError(
      "NOT_CONNECTED",
      "Contact delivery is not configured yet.",
    );
  }

  // Demo / local: acknowledge without delivery
  return { ok: true, mode: "demo" };
}
