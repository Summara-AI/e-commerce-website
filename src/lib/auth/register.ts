import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { getAuthConfig } from "./config";
import { authErrorMessage } from "./messages";
import { isStrongPassword } from "./password";
import { getAuthProvider } from "./providers";
import type { AuthProviderId, RegisterInput, RegisterResult } from "./types";

/**
 * Server-side registration — UI → registerAction → registerCustomer → Shopify.
 */
export async function registerCustomer(
  input: RegisterInput,
  options?: { provider?: AuthProviderId },
): Promise<RegisterResult> {
  const provider = getAuthProvider(options?.provider);
  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";
  const confirmPassword = input.confirmPassword ?? "";

  if (!firstName || !lastName) {
    return { ok: false, code: "VALIDATION", error: authErrorMessage("VALIDATION") };
  }

  if (!isValidEmail(email)) {
    return { ok: false, code: "VALIDATION", error: authErrorMessage("VALIDATION") };
  }

  if (!isStrongPassword(password)) {
    return { ok: false, code: "WEAK_PASSWORD", error: authErrorMessage("WEAK_PASSWORD") };
  }

  if (password !== confirmPassword) {
    return {
      ok: false,
      code: "PASSWORD_MISMATCH",
      error: authErrorMessage("PASSWORD_MISMATCH"),
    };
  }

  if (!input.acceptsTerms) {
    return {
      ok: false,
      code: "TERMS_REQUIRED",
      error: authErrorMessage("TERMS_REQUIRED"),
    };
  }

  try {
    const result = await provider.register({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      acceptsMarketing: Boolean(input.acceptsMarketing),
      acceptsTerms: true,
      autoLogin: input.autoLogin !== false,
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
