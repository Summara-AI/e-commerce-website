/** Shared Shopify constants — no secrets */

export const STOREFRONT_API_VERSION_DEFAULT = "2025-01";

/** Menu handles — must match docs/shopify/MENUS.md */
export const SHOPIFY_MENU_HANDLES = {
  main: "main-menu",
  mobile: "mobile-menu",
  announcement: "announcement-bar",
  footerShop: "footer-shop",
  footerSupport: "footer-support",
  footerBrand: "footer-brand",
  footerLegal: "footer-legal",
} as const;

/**
 * Next.js cache tags for `revalidateTag` / `unstable_cache`.
 * Use with fetch `next: { tags: [...] }` when live Shopify lands.
 */
export const CACHE_TAG = {
  catalog: "shopify:catalog",
  products: "shopify:products",
  product: (handle: string) => `shopify:product:${handle}`,
  collections: "shopify:collections",
  collection: (handle: string) => `shopify:collection:${handle}`,
  menus: "shopify:menus",
  homepage: "shopify:homepage",
  search: "shopify:search",
  recommendations: "shopify:recommendations",
  metaobjects: "shopify:metaobjects",
  pages: "shopify:pages",
} as const;
