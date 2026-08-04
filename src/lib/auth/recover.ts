import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { authErrorMessage } from "./messages";
import { getAuthProvider } from "./providers";
import type { AuthProviderId, RecoverInput, RecoverResult } from "./types";

/**
 * Server-side password recovery — Shopify customerRecover.
 */
export async function recoverCustomer(
  input: RecoverInput,
  options?: { provider?: AuthProviderId },
): Promise<RecoverResult> {
  const provider = getAuthProvider(options?.provider);
  const email = normalizeEmail(input.email ?? "");

  if (!isValidEmail(email)) {
    return {
      ok: false,
      code: "VALIDATION",
      error: authErrorMessage("VALIDATION"),
    };
  }

  try {
    return await provider.recover({ email });
  } catch {
    return {
      ok: false,
      code: "NETWORK",
      error: authErrorMessage("NETWORK"),
    };
  }
}
