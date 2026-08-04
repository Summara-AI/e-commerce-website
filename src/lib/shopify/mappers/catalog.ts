/**
 * Storefront → domain mappers.
 * Implement bodies when `shopifyFetch` goes live; signatures are the integration contract.
 */

import type {
  ImageResource,
  ProductMetafields,
  ProductVariant,
  ShopifyCollection,
  ShopifyProduct,
} from "@/types";
import type { MoneyV2 } from "@/types/product";

/** Minimal Storefront money node */
export type SfMoney = { amount: string; currencyCode: string };

/** Minimal Storefront image node */
export type SfImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export function mapMoney(node: SfMoney | null | undefined): MoneyV2 | null {
  if (!node?.amount) return null;
  const amount = node.amount;
  const currencyCode = node.currencyCode || "PKR";
  const numeric = Number(amount);
  const formatted =
    currencyCode === "PKR"
      ? `Rs. ${Number.isFinite(numeric) ? numeric.toLocaleString("en-PK") : amount}`
      : `${currencyCode} ${amount}`;
  return { amount, currencyCode, formatted };
}

/**
 * Shopify: Product.featuredImage / media nodes → ImageResource.
 * Use with `shopifyImageUrl()` for CDN transforms.
 */
export function mapImage(
  node: SfImage | null | undefined,
  id = "image",
): ImageResource | null {
  if (!node?.url) return null;
  return {
    id,
    url: node.url,
    altText: node.altText ?? "",
    width: node.width ?? undefined,
    height: node.height ?? undefined,
  };
}

/**
 * Shopify: ProductVariant → domain variant.
 * Resolve selectedOptions, quantityAvailable, currentlyNotInStock, price/compareAtPrice.
 */
export function mapVariant(_node: unknown): ProductVariant {
  void _node;
  throw new Error(
    "[mappers/variant] Wire when Storefront ProductVariant queries are live.",
  );
}

/**
 * Shopify: inventory fields → sellable state for UI badges.
 * Never invent low-stock from sale badges.
 */
export function mapInventory(input: {
  availableForSale: boolean;
  quantityAvailable?: number | null;
  currentlyNotInStock?: boolean;
}): {
  availableForSale: boolean;
  quantityAvailable: number | null;
  lowStock: boolean;
  label: "in_stock" | "low_stock" | "out_of_stock" | "preorder";
} {
  const qty = input.quantityAvailable ?? null;
  if (!input.availableForSale) {
    return {
      availableForSale: false,
      quantityAvailable: qty,
      lowStock: false,
      label: input.currentlyNotInStock ? "preorder" : "out_of_stock",
    };
  }
  const lowStock = typeof qty === "number" && qty > 0 && qty <= 5;
  return {
    availableForSale: true,
    quantityAvailable: qty,
    lowStock,
    label: lowStock ? "low_stock" : "in_stock",
  };
}

/**
 * Shopify: Product metafields (namespace ksl) → ProductMetafields.
 * Parse JSON safely; fall back to empty when invalid.
 */
export function mapProductMetafields(_nodes: unknown): ProductMetafields {
  void _nodes;
  return {};
}

/**
 * Shopify: Storefront Product → ShopifyProduct canonical model.
 */
export function mapStorefrontProduct(_node: unknown): ShopifyProduct {
  void _node;
  throw new Error(
    "[mappers/product] Wire when Storefront product queries are live.",
  );
}

/**
 * Shopify: Storefront Collection → ShopifyCollection canonical model.
 */
export function mapStorefrontCollection(_node: unknown): ShopifyCollection {
  void _node;
  throw new Error(
    "[mappers/collection] Wire when Storefront collection queries are live.",
  );
}
