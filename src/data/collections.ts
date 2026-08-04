/**
 * Collections data source — Shopify Collection later.
 */

import type { CatalogCollection } from "@/lib/catalog";
import {
  getAllCollectionHandles,
  getCollectionPage,
  type CollectionPageData,
} from "@/lib/collections";
import {
  FEATURED_COLLECTIONS,
  MERCH_COLLECTIONS,
  PRODUCT_CATEGORIES,
} from "@/lib/catalog";

export type StoreCollection = CatalogCollection;

export function getAllCollections(): StoreCollection[] {
  return [...MERCH_COLLECTIONS, ...FEATURED_COLLECTIONS, ...PRODUCT_CATEGORIES];
}

export function getCollectionByHandle(handle: string): CollectionPageData | null {
  return getCollectionPage(handle);
}

export function getCollectionHandles(): string[] {
  return getAllCollectionHandles();
}
