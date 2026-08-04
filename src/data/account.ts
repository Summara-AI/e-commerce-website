/**
 * Customer account façade — scaffold seed today; Customer Account API later.
 * UI account context remains the runtime source until adapters land.
 */

import { DEFAULT_PROFILE } from "@/lib/account-seed";
import type { CustomerAccountModel } from "@/types";
import { createEmptyWishlist } from "@/data/wishlist";

export type {
  CustomerAccountModel,
  CustomerProfile,
  CustomerAddress,
  CustomerOrder,
} from "@/types";

export function getAccountScaffold(isAuthenticated = false): CustomerAccountModel {
  return {
    isAuthenticated,
    profile: isAuthenticated
      ? {
          id: DEFAULT_PROFILE.id,
          email: DEFAULT_PROFILE.email,
          firstName: DEFAULT_PROFILE.firstName,
          lastName: DEFAULT_PROFILE.lastName,
          phone: DEFAULT_PROFILE.phone,
          acceptsMarketing: DEFAULT_PROFILE.acceptsMarketing,
        }
      : null,
    addresses: [],
    orders: [],
    wishlist: createEmptyWishlist(),
    recentlyViewed: {
      handles: [],
      maxItems: 12,
      updatedAt: new Date().toISOString(),
    },
    rewards: {
      enabled: false,
    },
  };
}

/**
 * Future Customer Account routes (Hydrogen / headless).
 * Returns → Shopify status page / Returns app; Rewards → loyalty app (optional).
 */
export const ACCOUNT_ROUTE_MAP = {
  dashboard: "/account",
  login: "/account/login",
  register: "/account/register",
  recover: "/account/recover",
  orders: "/account/orders",
  orderDetail: "/account/orders/[orderId]",
  addresses: "/account/addresses",
  profile: "/account/profile",
  wishlist: "/wishlist",
  recentlyViewed: "/account/recently-viewed",
} as const;
