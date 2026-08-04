/**
 * Product service — seed today; Storefront Product queries tomorrow.
 *
 * Shopify: `product(handle:)`, `products`, productRecommendations.
 * Map via `mapStorefrontProduct` → `projectProductPage` / `projectCatalogProduct`.
 */

import { getAllProducts, getProductHandles } from "@/data/products";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";
import type { CatalogProduct } from "@/lib/catalog";
import {
  getAllProductHandles,
  getProductPage,
  type ProductPageData,
} from "@/lib/products";
import { getRelatedProducts } from "@/lib/product-recommendations";
import { ALL_PRODUCTS } from "@/lib/collections";

function assertLiveNotWired(feature: string): never {
  throw new CommerceError(
    "NOT_CONNECTED",
    `Shopify ${feature} is configured but Storefront transport is not implemented yet.`,
  );
}

/** Raw seed product list (admin/sitemap). Prefer page/catalog projectors for UI. */
export function listProductsService() {
  if (isShopifyLive()) assertLiveNotWired("products");
  return getAllProducts();
}

export function getProductService(handle: string) {
  if (isShopifyLive()) assertLiveNotWired("product");
  const product = getAllProducts().find((p) => p.handle === handle);
  if (!product) {
    throw new CommerceError("NOT_FOUND", `Product not found: ${handle}`);
  }
  return product;
}

export function getProductHandlesService(): string[] {
  if (isShopifyLive()) {
    // Future: lightweight handles query or cache tags
    return getProductHandles();
  }
  return getAllProductHandles();
}

/** PDP view model — stable UI contract. */
export function getProductPageService(handle: string): ProductPageData | null {
  if (isShopifyLive()) assertLiveNotWired("product page");
  return getProductPage(handle);
}

/** Catalog cards for grids / wishlist resolution. */
export function listCatalogProductsService(): CatalogProduct[] {
  if (isShopifyLive()) assertLiveNotWired("catalog products");
  return ALL_PRODUCTS;
}

export function getRelatedProductsService(handle: string, limit = 4): CatalogProduct[] {
  if (isShopifyLive()) {
    // Future: productRecommendations Storefront query
    assertLiveNotWired("recommendations");
  }
  return getRelatedProducts(handle, limit);
}
