import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { getAuthConfig } from "./config";
import { authErrorMessage } from "./messages";
import { getAuthProvider } from "./providers";
import type { AuthProviderId, LoginInput, LoginResult } from "./types";

/**
 * Server-side login — UI calls loginAction → loginCustomer → Shopify provider.
 */
export async function loginCustomer(
  input: LoginInput,
  options?: { provider?: AuthProviderId },
): Promise<LoginResult> {
  const provider = getAuthProvider(options?.provider);
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";

  if (!isValidEmail(email) || password.length < 1) {
    return {
      ok: false,
      code: "VALIDATION",
      error: authErrorMessage("VALIDATION"),
    };
  }

  try {
    const result = await provider.login({
      email,
      password,
      rememberMe: Boolean(input.rememberMe),
    });

    if (result.ok) {
      return {
        ...result,
        redirectTo: result.redirectTo || getAuthConfig().successRedirect,
      };
    }

    return result;
  } catch {
    return {
      ok: false,
      code: "NETWORK",
      error: authErrorMessage("NETWORK"),
    };
  }
}
