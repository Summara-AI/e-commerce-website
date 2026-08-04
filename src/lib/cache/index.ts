/**
 * Cache tag helpers + revalidation entry points for Shopify data.
 * Wire to Storefront webhooks / Admin app routes in a later phase.
 */

import { CACHE_TAG } from "@/lib/shopify/constants";
import { revalidatePath, revalidateTag } from "next/cache";

export { CACHE_TAG };

/** Default ISR windows (seconds) — tune per environment */
export const REVALIDATE = {
  homepage: 60,
  product: 120,
  collection: 120,
  navigation: 300,
  contentPage: 600,
  searchSuggestions: 60,
  /** Never cache authenticated customer payloads in shared Data Cache */
  customer: false as const,
  /** Cart is per-session — no shared tag cache */
  cart: false as const,
} as const;

export function revalidateProduct(handle: string) {
  revalidateTag(CACHE_TAG.product(handle));
  revalidateTag(CACHE_TAG.products);
  revalidateTag(CACHE_TAG.catalog);
  revalidatePath(`/products/${handle}`);
}

export function revalidateCollection(handle: string) {
  revalidateTag(CACHE_TAG.collection(handle));
  revalidateTag(CACHE_TAG.collections);
  revalidateTag(CACHE_TAG.catalog);
  revalidatePath(`/collections/${handle}`);
}

export function revalidateMenus() {
  revalidateTag(CACHE_TAG.menus);
  revalidatePath("/", "layout");
}

export function revalidateHomepage() {
  revalidateTag(CACHE_TAG.homepage);
  revalidatePath("/");
}

export function revalidateCatalog() {
  revalidateTag(CACHE_TAG.catalog);
  revalidateTag(CACHE_TAG.products);
  revalidateTag(CACHE_TAG.collections);
}
