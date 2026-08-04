import { authErrorMessage } from "../messages";
import { isStrongPassword } from "../password";
import type {
  AuthProvider,
  LoginResult,
  RecoverResult,
  RegisterResult,
} from "../types";

/**
 * Local scaffold — validates form shape so UI ships before Shopify credentials.
 */
export const localAuthProvider: AuthProvider = {
  id: "local",
  async login({ email, password, rememberMe }): Promise<LoginResult> {
    await new Promise((r) => setTimeout(r, 480));

    if (password === "wrong") {
      return {
        ok: false,
        code: "INCORRECT_PASSWORD",
        error: authErrorMessage("INCORRECT_PASSWORD"),
      };
    }

    if (email.includes("notfound")) {
      return {
        ok: false,
        code: "ACCOUNT_NOT_FOUND",
        error: authErrorMessage("ACCOUNT_NOT_FOUND"),
      };
    }

    if (password.length < 6) {
      return {
        ok: false,
        code: "VALIDATION",
        error: authErrorMessage("VALIDATION"),
      };
    }

    const expiresAt = new Date(
      Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000,
    ).toISOString();

    return {
      ok: true,
      redirectTo: "/account",
      session: {
        accessToken: `local_${Buffer.from(email).toString("base64url")}`,
        expiresAt,
        email,
        rememberMe: Boolean(rememberMe),
        provider: "local",
      },
    };
  },

  async register(input): Promise<RegisterResult> {
    await new Promise((r) => setTimeout(r, 560));

    if (input.email.includes("exists") || input.email.includes("taken")) {
      return {
        ok: false,
        code: "EMAIL_EXISTS",
        error: authErrorMessage("EMAIL_EXISTS"),
      };
    }

    if (!isStrongPassword(input.password)) {
      return {
        ok: false,
        code: "WEAK_PASSWORD",
        error: authErrorMessage("WEAK_PASSWORD"),
      };
    }

    const autoLoggedIn = input.autoLogin !== false;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session = autoLoggedIn
      ? {
          accessToken: `local_${Buffer.from(input.email).toString("base64url")}`,
          expiresAt,
          email: input.email,
          customerId: `local-customer-${Date.now()}`,
          rememberMe: true,
          provider: "local" as const,
        }
      : null;

    return {
      ok: true,
      email: input.email,
      session,
      autoLoggedIn,
      redirectTo: "/account",
    };
  },

  async recover({ email }): Promise<RecoverResult> {
    await new Promise((r) => setTimeout(r, 420));

    if (email.includes("notfound") || email.includes("missing")) {
      return {
        ok: false,
        code: "ACCOUNT_NOT_FOUND",
        error: authErrorMessage("ACCOUNT_NOT_FOUND"),
      };
    }

    if (email.includes("ratelimit") || email.includes("throttle")) {
      return {
        ok: false,
        code: "TOO_MANY_ATTEMPTS",
        error: authErrorMessage("TOO_MANY_ATTEMPTS"),
      };
    }

    return {
      ok: true,
      email,
    };
  },
};
