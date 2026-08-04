import { getShopifyConfig } from "@/lib/shopify/config";
import { authErrorMessage } from "../messages";
import type {
  AuthProvider,
  LoginResult,
  RecoverResult,
  RegisterResult,
} from "../types";

const CUSTOMER_ACCESS_TOKEN_CREATE = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_RECOVER = /* GraphQL */ `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

function mapLoginUserError(code?: string | null, message?: string): LoginResult {
  const hay = `${code ?? ""} ${message ?? ""}`.toLowerCase();

  if (hay.includes("unidentified") || code === "UNIDENTIFIED_CUSTOMER") {
    return {
      ok: false,
      code: "ACCOUNT_NOT_FOUND",
      error: authErrorMessage("ACCOUNT_NOT_FOUND"),
    };
  }

  if (hay.includes("password") || code === "INVALID") {
    return {
      ok: false,
      code: "INCORRECT_PASSWORD",
      error: authErrorMessage("INCORRECT_PASSWORD"),
    };
  }

  if (hay.includes("throttle") || hay.includes("too many") || code === "TOO_MANY_REQUESTS") {
    return {
      ok: false,
      code: "TOO_MANY_ATTEMPTS",
      error: authErrorMessage("TOO_MANY_ATTEMPTS"),
    };
  }

  return {
    ok: false,
    code: "INVALID_CREDENTIALS",
    error: authErrorMessage("INVALID_CREDENTIALS"),
  };
}

function mapRegisterUserError(code?: string | null, message?: string): RegisterResult {
  const hay = `${code ?? ""} ${message ?? ""}`.toLowerCase();

  if (
    hay.includes("taken") ||
    hay.includes("already") ||
    hay.includes("exists") ||
    code === "TAKEN" ||
    code === "CUSTOMER_DISABLED"
  ) {
    return {
      ok: false,
      code: "EMAIL_EXISTS",
      error: authErrorMessage("EMAIL_EXISTS"),
    };
  }

  if (hay.includes("password") || code === "TOO_SHORT" || code === "INVALID") {
    return {
      ok: false,
      code: "WEAK_PASSWORD",
      error: authErrorMessage("WEAK_PASSWORD"),
    };
  }

  if (hay.includes("throttle") || hay.includes("too many")) {
    return {
      ok: false,
      code: "TOO_MANY_ATTEMPTS",
      error: authErrorMessage("TOO_MANY_ATTEMPTS"),
    };
  }

  return {
    ok: false,
    code: "SERVER_UNAVAILABLE",
    error: authErrorMessage("SERVER_UNAVAILABLE"),
  };
}

function storefrontEndpoint() {
  const config = getShopifyConfig();
  if (!config.enabled) return null;
  return {
    url: `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`,
    token: config.storefrontToken,
  };
}

async function createAccessToken(
  endpoint: { url: string; token: string },
  email: string,
  password: string,
  rememberMe: boolean,
): Promise<LoginResult> {
  const response = await fetch(endpoint.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": endpoint.token,
    },
    body: JSON.stringify({
      query: CUSTOMER_ACCESS_TOKEN_CREATE,
      variables: { input: { email, password } },
    }),
    cache: "no-store",
  });

  if (response.status === 429) {
    return {
      ok: false,
      code: "TOO_MANY_ATTEMPTS",
      error: authErrorMessage("TOO_MANY_ATTEMPTS"),
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      code: "SERVER_UNAVAILABLE",
      error: authErrorMessage("SERVER_UNAVAILABLE"),
    };
  }

  const json = (await response.json()) as {
    data?: {
      customerAccessTokenCreate?: {
        customerAccessToken?: { accessToken: string; expiresAt: string } | null;
        customerUserErrors?: { code?: string; message: string }[];
      };
    };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    return {
      ok: false,
      code: "SERVER_UNAVAILABLE",
      error: authErrorMessage("SERVER_UNAVAILABLE"),
    };
  }

  const payload = json.data?.customerAccessTokenCreate;
  const userError = payload?.customerUserErrors?.[0];
  if (userError) return mapLoginUserError(userError.code, userError.message);

  const token = payload?.customerAccessToken;
  if (!token?.accessToken) {
    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      error: authErrorMessage("INVALID_CREDENTIALS"),
    };
  }

  return {
    ok: true,
    redirectTo: "/account",
    session: {
      accessToken: token.accessToken,
      expiresAt: token.expiresAt,
      email,
      rememberMe,
      provider: "shopify_storefront",
    },
  };
}

/**
 * Shopify Storefront — customerCreate + customerAccessTokenCreate.
 * New Customer Account API (OAuth) can replace this provider later without UI changes.
 */
export const shopifyStorefrontAuthProvider: AuthProvider = {
  id: "shopify_storefront",

  async login({ email, password, rememberMe }): Promise<LoginResult> {
    const endpoint = storefrontEndpoint();
    if (!endpoint) {
      return {
        ok: false,
        code: "SERVER_UNAVAILABLE",
        error: authErrorMessage("SERVER_UNAVAILABLE"),
      };
    }

    try {
      return await createAccessToken(endpoint, email, password, Boolean(rememberMe));
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: authErrorMessage("NETWORK"),
      };
    }
  },

  async register(input): Promise<RegisterResult> {
    const endpoint = storefrontEndpoint();
    if (!endpoint) {
      return {
        ok: false,
        code: "SERVER_UNAVAILABLE",
        error: authErrorMessage("SERVER_UNAVAILABLE"),
      };
    }

    try {
      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": endpoint.token,
        },
        body: JSON.stringify({
          query: CUSTOMER_CREATE,
          variables: {
            input: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              password: input.password,
              acceptsMarketing: Boolean(input.acceptsMarketing),
            },
          },
        }),
        cache: "no-store",
      });

      if (response.status === 429) {
        return {
          ok: false,
          code: "TOO_MANY_ATTEMPTS",
          error: authErrorMessage("TOO_MANY_ATTEMPTS"),
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      const json = (await response.json()) as {
        data?: {
          customerCreate?: {
            customer?: { id: string; email: string } | null;
            customerUserErrors?: { code?: string; message: string }[];
          };
        };
        errors?: { message: string }[];
      };

      if (json.errors?.length) {
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      const payload = json.data?.customerCreate;
      const userError = payload?.customerUserErrors?.[0];
      if (userError) {
        return mapRegisterUserError(userError.code, userError.message);
      }

      if (!payload?.customer?.email) {
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      const autoLogin = input.autoLogin !== false;
      if (!autoLogin) {
        return {
          ok: true,
          email: payload.customer.email,
          session: null,
          autoLoggedIn: false,
          redirectTo: "/account/login",
        };
      }

      const tokenResult = await createAccessToken(
        endpoint,
        input.email,
        input.password,
        true,
      );

      if (!tokenResult.ok) {
        // Account created but auto-login failed — still success, send to login
        return {
          ok: true,
          email: payload.customer.email,
          session: null,
          autoLoggedIn: false,
          redirectTo: "/account/login",
        };
      }

      return {
        ok: true,
        email: payload.customer.email,
        session: {
          ...tokenResult.session,
          customerId: payload.customer.id,
        },
        autoLoggedIn: true,
        redirectTo: "/account",
      };
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: authErrorMessage("NETWORK"),
      };
    }
  },

  async recover({ email }): Promise<RecoverResult> {
    const endpoint = storefrontEndpoint();
    if (!endpoint) {
      return {
        ok: false,
        code: "SERVER_UNAVAILABLE",
        error: authErrorMessage("SERVER_UNAVAILABLE"),
      };
    }

    try {
      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": endpoint.token,
        },
        body: JSON.stringify({
          query: CUSTOMER_RECOVER,
          variables: { email },
        }),
        cache: "no-store",
      });

      if (response.status === 429) {
        return {
          ok: false,
          code: "TOO_MANY_ATTEMPTS",
          error: authErrorMessage("TOO_MANY_ATTEMPTS"),
        };
      }

      if (!response.ok) {
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      const json = (await response.json()) as {
        data?: {
          customerRecover?: {
            customerUserErrors?: { code?: string; message: string }[];
          };
        };
        errors?: { message: string }[];
      };

      if (json.errors?.length) {
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      const userError = json.data?.customerRecover?.customerUserErrors?.[0];
      if (userError) {
        const hay = `${userError.code ?? ""} ${userError.message}`.toLowerCase();
        if (
          hay.includes("not found") ||
          hay.includes("unidentified") ||
          userError.code === "UNIDENTIFIED_CUSTOMER"
        ) {
          return {
            ok: false,
            code: "ACCOUNT_NOT_FOUND",
            error: authErrorMessage("ACCOUNT_NOT_FOUND"),
          };
        }
        if (
          hay.includes("throttle") ||
          hay.includes("too many") ||
          userError.code === "TOO_MANY_REQUESTS"
        ) {
          return {
            ok: false,
            code: "TOO_MANY_ATTEMPTS",
            error: authErrorMessage("TOO_MANY_ATTEMPTS"),
          };
        }
        return {
          ok: false,
          code: "SERVER_UNAVAILABLE",
          error: authErrorMessage("SERVER_UNAVAILABLE"),
        };
      }

      // Empty userErrors = Shopify accepted the recover request
      return { ok: true, email };
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: authErrorMessage("NETWORK"),
      };
    }
  },
};
