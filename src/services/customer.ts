/**
 * Customer / order account service — local scaffold today; Customer Accounts tomorrow.
 *
 * Prefer Shopify Customer Account API for new work; legacy Storefront customer
 * access tokens remain in auth providers until migration.
 */

import {
  DEFAULT_PROFILE,
  getScaffoldOrders,
} from "@/lib/account-seed";
import type {
  CustomerOrder,
  CustomerProfile,
} from "@/lib/account-types";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

function assertLiveNotWired(feature: string): never {
  throw new CommerceError(
    "NOT_CONNECTED",
    `Shopify ${feature} is not wired yet.`,
  );
}

export function getCustomerProfileService(): CustomerProfile {
  if (isShopifyLive()) assertLiveNotWired("customer profile");
  return { ...DEFAULT_PROFILE };
}

export function listCustomerOrdersService(): CustomerOrder[] {
  if (isShopifyLive()) assertLiveNotWired("orders");
  return getScaffoldOrders();
}

export function getCustomerOrderService(orderId: string): CustomerOrder | null {
  if (isShopifyLive()) assertLiveNotWired("order detail");
  return getScaffoldOrders().find((o) => o.id === orderId) ?? null;
}
