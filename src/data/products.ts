/**
 * Products data source — local seed today; Shopify Product / ProductVariant later.
 */

import type { CatalogProduct } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { getAllProductHandles, getProductPage } from "@/lib/products";
import type { ProductPageData } from "@/lib/products";

export type StoreProduct = CatalogProduct;

export function getAllProducts(): StoreProduct[] {
  return ALL_PRODUCTS;
}

export function getProductByHandle(handle: string): ProductPageData | null {
  return getProductPage(handle);
}

export function getProductHandles(): string[] {
  return getAllProductHandles();
}
