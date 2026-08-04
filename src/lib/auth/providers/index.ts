import type { AuthProvider, AuthProviderId } from "../types";
import { getAuthProviderId } from "../config";
import { localAuthProvider } from "./local";
import { shopifyStorefrontAuthProvider } from "./shopify-storefront";

const PROVIDERS: Record<AuthProviderId, AuthProvider> = {
  local: localAuthProvider,
  shopify_storefront: shopifyStorefrontAuthProvider,
};

export function getAuthProvider(override?: AuthProviderId): AuthProvider {
  const id = override ?? getAuthProviderId();
  return PROVIDERS[id] ?? localAuthProvider;
}

export { localAuthProvider, shopifyStorefrontAuthProvider };
