/**
 * Wishlist service — guest localStorage + Shopify customer metafield sync later.
 * Reusable sort/filter/merge helpers for the premium wishlist experience.
 */

import type { CatalogProduct } from "@/lib/catalog";
import {
  createEmptyWishlist,
  WISHLIST_STORAGE_KEY,
  WISHLIST_SYNC_STRATEGY,
  type WishlistState,
} from "@/data/wishlist";

export type WishlistAvailability = "in_stock" | "low_stock" | "out_of_stock";

export type WishlistSort =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "best_sellers"
  | "alphabetical";

export type WishlistFilters = {
  query: string;
  category: string | "all";
  brand: string | "all";
  availability: WishlistAvailability | "all";
};

export const WISHLIST_SORT_OPTIONS: { value: WishlistSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "best_sellers", label: "Best Sellers" },
  { value: "alphabetical", label: "Alphabetical" },
];

export const DEFAULT_WISHLIST_FILTERS: WishlistFilters = {
  query: "",
  category: "all",
  brand: "all",
  availability: "all",
};

const KNOWN_BRANDS = [
  "Haruharu Wonder",
  "HARUHARU Wonder",
  "Haruharu",
  "DERMAL",
  "Dermal",
  "Escargot",
  "Lacto Cica",
] as const;

/** Brand label for filters — Shopify vendor field later */
export function getProductBrand(product: CatalogProduct): string {
  const title = product.title;
  for (const brand of KNOWN_BRANDS) {
    if (title.toLowerCase().startsWith(brand.toLowerCase())) {
      if (brand.toLowerCase().startsWith("haruharu")) return "Haruharu Wonder";
      if (brand.toLowerCase().startsWith("dermal")) return "DERMAL";
      if (brand.toLowerCase().startsWith("escargot")) return "Escargot";
      if (brand.toLowerCase().startsWith("lacto")) return "Lacto Cica";
      return brand;
    }
  }
  const first = title.split(/\s+/)[0];
  return first || "Korean Skin Lab";
}

/**
 * Availability for wishlist UI.
 * Shopify: map inventoryQuantity / inventoryPolicy when Storefront connects.
 */
export function getWishlistAvailability(
  product: CatalogProduct,
): WishlistAvailability {
  if (!product.availableForSale) return "out_of_stock";
  // Soft low-stock cue until inventoryQuantity is available
  if (product.badges?.includes("sale")) return "low_stock";
  return "in_stock";
}

export const AVAILABILITY_LABEL: Record<WishlistAvailability, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
};

export function resolveWishlistProducts(
  handles: string[],
  catalog: CatalogProduct[],
): CatalogProduct[] {
  const byHandle = new Map(catalog.map((p) => [p.handle, p]));
  return handles
    .map((h) => byHandle.get(h))
    .filter((p): p is CatalogProduct => Boolean(p));
}

export function sortWishlistProducts(
  products: CatalogProduct[],
  sort: WishlistSort,
  handleOrder: string[],
): CatalogProduct[] {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) => handleOrder.indexOf(a.handle) - handleOrder.indexOf(b.handle),
      );
    case "price_asc":
      return list.sort((a, b) => a.price.amount - b.price.amount);
    case "price_desc":
      return list.sort((a, b) => b.price.amount - a.price.amount);
    case "best_sellers":
      return list.sort((a, b) => {
        const aBest = a.badges?.includes("bestseller") ? 0 : 1;
        const bBest = b.badges?.includes("bestseller") ? 0 : 1;
        return aBest - bBest || a.title.localeCompare(b.title);
      });
    case "alphabetical":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return list;
  }
}

export function filterWishlistProducts(
  products: CatalogProduct[],
  filters: WishlistFilters,
): CatalogProduct[] {
  const q = filters.query.trim().toLowerCase();
  return products.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.description} ${getProductBrand(p)} ${p.productType ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.category !== "all" && p.productType !== filters.category) {
      return false;
    }
    if (filters.brand !== "all" && getProductBrand(p) !== filters.brand) {
      return false;
    }
    if (
      filters.availability !== "all" &&
      getWishlistAvailability(p) !== filters.availability
    ) {
      return false;
    }
    return true;
  });
}

export function buildWishlistFacets(products: CatalogProduct[]) {
  const categories = Array.from(
    new Set(products.map((p) => p.productType).filter(Boolean) as string[]),
  ).sort();
  const brands = Array.from(new Set(products.map(getProductBrand))).sort();
  return { categories, brands };
}

/** Union merge — guest handles win order first, then customer extras */
export function mergeWishlistHandles(
  guestHandles: string[],
  customerHandles: string[],
  maxItems = WISHLIST_SYNC_STRATEGY.maxItems,
): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const h of [...guestHandles, ...customerHandles]) {
    if (seen.has(h)) continue;
    seen.add(h);
    merged.push(h);
    if (merged.length >= maxItems) break;
  }
  return merged;
}

export function readGuestWishlist(): WishlistState {
  if (typeof window === "undefined") return createEmptyWishlist();
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return createEmptyWishlist();
    const parsed = JSON.parse(raw) as string[] | WishlistState;
    if (Array.isArray(parsed)) {
      return {
        handles: parsed,
        updatedAt: new Date().toISOString(),
        syncStatus: "local",
      };
    }
    return {
      ...createEmptyWishlist(),
      ...parsed,
      handles: parsed.handles ?? [],
    };
  } catch {
    return createEmptyWishlist();
  }
}

export {
  createEmptyWishlist,
  WISHLIST_STORAGE_KEY,
  WISHLIST_SYNC_STRATEGY,
};
export type { WishlistState };
