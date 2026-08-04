/**
 * API layer barrel — commerce errors + future Shopify health checks.
 */

export {
  CommerceError,
  isNotFoundError,
  type ApiErrorCode,
} from "./errors";

/**
 * Placeholder for synthetic Shopify health (Admin heartbeat / Storefront __typename).
 * Always reports seed mode in Phase 11B.
 */
export function getCommerceBackendStatus(): {
  mode: "seed" | "shopify";
  healthy: boolean;
  message: string;
} {
  return {
    mode: "seed",
    healthy: true,
    message: "Using local seed façades — Shopify network disabled (Phase 11B).",
  };
}
