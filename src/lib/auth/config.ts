import type { AuthProviderId } from "./types";

/**
 * Auth provider selection — swap endpoint/provider without touching UI.
 * shopify_storefront → CustomerAccessTokenCreate (Storefront API)
 */
export function getAuthProviderId(): AuthProviderId {
  const raw = (process.env.AUTH_PROVIDER ?? "local").trim().toLowerCase();
  if (raw === "shopify_storefront" || raw === "local") return raw;
  return "local";
}

export function getAuthConfig() {
  return {
    provider: getAuthProviderId(),
    /** Post-login destination */
    successRedirect: "/account",
    guestHref: "/collections/all",
    registerHref: "/account/register",
    recoverHref: "/account/recover",
    /** Session cookie */
    cookieName: process.env.AUTH_SESSION_COOKIE ?? "ksl_customer_session",
    /** Remember me extends persistence */
    sessionMaxAgeDays: 7,
    rememberMaxAgeDays: 30,
  };
}
