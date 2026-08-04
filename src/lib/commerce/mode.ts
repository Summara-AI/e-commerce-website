/**
 * Commerce runtime mode — seed/demo today, Shopify live after transport (Phase C).
 * UI must not branch on this for layout; services/actions use it for data source only.
 */

import { canUseShopifyNetwork } from "@/lib/shopify/client";
import { getShopifyConfig } from "@/lib/shopify/config";

/** True when Storefront network is enabled and transport is live. */
export function isShopifyLive(): boolean {
  return canUseShopifyNetwork();
}

/**
 * Demo commerce surfaces (fake discount success, track-order heuristic, local auth).
 * Always true until Shopify Cart/Orders/Customer are connected.
 * Set NEXT_PUBLIC_DEMO_COMMERCE=false only after live QA passes.
 */
export function isDemoCommerce(): boolean {
  if (isShopifyLive()) return false;
  if (process.env.NEXT_PUBLIC_DEMO_COMMERCE === "false") return false;
  return true;
}

/** Credentials present but transport not yet implemented — for ops dashboards. */
export function isShopifyConfiguredPendingTransport(): boolean {
  return getShopifyConfig().enabled && !canUseShopifyNetwork();
}
