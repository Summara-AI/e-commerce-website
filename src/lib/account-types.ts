/**
 * Customer account models — Shopify Customer Account API / Storefront mapping later.
 */

import type { Money } from "@/lib/catalog";

export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type TimelineStep = {
  id: string;
  label: string;
  description?: string;
  /** ISO date when completed; undefined = upcoming */
  at?: string;
  complete: boolean;
  current?: boolean;
};

export type OrderLineItem = {
  id: string;
  handle: string;
  title: string;
  href: string;
  variantTitle: string;
  quantity: number;
  price: Money;
  imageAlt: string;
  imageSrc?: string;
};

export type CustomerAddress = {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault: boolean;
};

export type CustomerProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  /** Marketing email opt-in — Shopify customer marketing */
  acceptsMarketing: boolean;
  /** Transactional / order updates */
  acceptsOrderUpdates: boolean;
};

export type CustomerOrder = {
  id: string;
  number: string;
  processedAt: string;
  status: OrderStatus;
  financialStatus: string;
  fulfillmentStatus: string;
  paymentMethod?: string;
  estimatedDelivery?: string | null;
  subtotal: Money;
  shipping: Money | null;
  discount?: Money | null;
  tax: Money | null;
  total: Money;
  notes?: string | null;
  lineItems: OrderLineItem[];
  shippingAddress: CustomerAddress;
  billingAddress: CustomerAddress;
  timeline: TimelineStep[];
  /** Tracking connects with fulfillment later */
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  /** Invoice PDF connects with Shopify later */
  invoiceUrl?: string | null;
  /** Scaffold until Customer Accounts API */
  source?: "scaffold" | "shopify";
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

/** Visual tone for order status badges */
export const ORDER_STATUS_TONE: Record<
  OrderStatus,
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded"
> = {
  pending: "pending",
  processing: "processing",
  packed: "packed",
  shipped: "shipped",
  out_for_delivery: "out_for_delivery",
  delivered: "delivered",
  cancelled: "cancelled",
  refunded: "refunded",
};
