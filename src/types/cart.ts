/**
 * Cart models — Shopify Cart / CartLine mapping target.
 * Implementation today: client localStorage (`cart-context`).
 */

import type { MoneyV2, ImageResource } from "./product";

export type CartDiscountApplication = {
  id: string;
  title: string;
  value: MoneyV2 | { percentage: number };
  targetType: "line" | "order" | "shipping";
};

export type CartLineModel = {
  id: string;
  /** Shopify Merchandise GID (ProductVariant) */
  merchandiseId: string;
  handle: string;
  title: string;
  variantTitle?: string;
  href: string;
  imageAlt: string;
  image?: ImageResource;
  quantity: number;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  availableForSale: boolean;
  /** Bundle parent / line attributes */
  attributes?: { key: string; value: string }[];
  sellingPlanAllocation?: { name: string; priceAdjustments?: string };
};

export type CartRecommendation = {
  id: string;
  handle: string;
  title: string;
  href: string;
  price: MoneyV2;
  imageAlt: string;
  imageSrc?: string;
};

export type CartShippingProgress = {
  threshold: MoneyV2;
  currentSubtotal: MoneyV2;
  remaining: MoneyV2;
  percentComplete: number;
  qualifies: boolean;
  message: string;
};

/**
 * Full cart resource — Shopify Cart (+ upsells / notes configured in theme).
 */
export type ShopifyCart = {
  id?: string;
  checkoutUrl?: string;
  note?: string;
  lines: CartLineModel[];
  lineCount: number;
  itemCount: number;
  subtotal: MoneyV2;
  compareAtSubtotal?: MoneyV2;
  savings?: MoneyV2;
  total?: MoneyV2;
  discounts: CartDiscountApplication[];
  discountCodes: string[];
  giftCardCodes?: string[];
  shippingProgress?: CartShippingProgress;
  recommendations?: CartRecommendation[];
  attributes?: { key: string; value: string }[];
  updatedAt?: string;
};

export type AddToCartInput = {
  merchandiseId?: string;
  handle: string;
  title: string;
  variantTitle?: string;
  href: string;
  imageAlt: string;
  image?: ImageResource;
  quantity?: number;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  availableForSale: boolean;
  attributes?: { key: string; value: string }[];
};
