/**
 * Collection service — seed today; Storefront Collection + products connection tomorrow.
 *
 * Shopify: `collection(handle:)`, filters, sortKey, pagination cursors.
 * Map via `mapStorefrontCollection` → `projectCollectionPage`.
 */

import { getAllCollections, getCollectionByHandle } from "@/data/collections";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";
import {
  getAllCollectionHandles,
  getCollectionPage,
  type CollectionPageData,
} from "@/lib/collections";
import type { CatalogCollection } from "@/lib/catalog";

function assertLiveNotWired(feature: string): never {
  throw new CommerceError(
    "NOT_CONNECTED",
    `Shopify ${feature} is configured but Storefront transport is not implemented yet.`,
  );
}

export function listCollectionsService() {
  if (isShopifyLive()) assertLiveNotWired("collections");
  return getAllCollections();
}

export function getCollectionService(handle: string) {
  if (isShopifyLive()) assertLiveNotWired("collection");
  const collection = getCollectionByHandle(handle);
  if (!collection) {
    throw new CommerceError("NOT_FOUND", `Collection not found: ${handle}`);
  }
  return collection;
}

export function getCollectionHandlesService(): string[] {
  return getAllCollectionHandles();
}

/** PLP view model — stable UI contract. */
export function getCollectionPageService(handle: string): CollectionPageData | null {
  if (isShopifyLive()) assertLiveNotWired("collection page");
  return getCollectionPage(handle);
}

/** Collection cards for shop landing / rails. */
export function listCollectionCardsService(): CatalogCollection[] {
  if (isShopifyLive()) assertLiveNotWired("collection cards");
  return getAllCollections();
}
