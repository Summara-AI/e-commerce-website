/**
 * Customer / account models — Customer Account API mapping target.
 * Implementation today: localStorage scaffold (`account-context`).
 */

import type { MoneyV2 } from "./product";

export type CustomerProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptsMarketing?: boolean;
  createdAt?: string;
};

export type CustomerAddress = {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
};

export type OrderStatus =
  | "unfulfilled"
  | "partial"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export type OrderLineItem = {
  id: string;
  title: string;
  variantTitle?: string;
  handle?: string;
  href?: string;
  quantity: number;
  price: MoneyV2;
  imageAlt?: string;
  imageSrc?: string;
};

export type OrderTimelineStep = {
  id: string;
  label: string;
  completed: boolean;
  at?: string;
};

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string;
  fulfillmentStatus?: OrderStatus;
  status: OrderStatus;
  subtotal: MoneyV2;
  total: MoneyV2;
  shippingAddress?: CustomerAddress;
  lineItems: OrderLineItem[];
  timeline?: OrderTimelineStep[];
  trackingUrl?: string;
  invoiceUrl?: string;
};

/**
 * Wishlist — guest: localStorage; logged-in: Customer metafield / wishlist app.
 */
export type WishlistState = {
  handles: string[];
  productIds?: string[];
  updatedAt?: string;
  syncStatus: "local" | "pending" | "synced" | "error";
};

export type RecentlyViewedState = {
  handles: string[];
  maxItems: number;
  updatedAt?: string;
};

export type CustomerAccountModel = {
  isAuthenticated: boolean;
  profile: CustomerProfile | null;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  wishlist: WishlistState;
  recentlyViewed: RecentlyViewedState;
  /** Future loyalty / rewards */
  rewards?: {
    points?: number;
    tier?: string;
    enabled: boolean;
  };
};
