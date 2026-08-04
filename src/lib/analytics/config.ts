/**
 * Analytics integration points — no vendor SDKs installed (Phase 11B).
 * Wire scripts only after cookie consent + env IDs.
 */

export type AnalyticsProviderId =
  | "ga4"
  | "gtm"
  | "meta"
  | "tiktok"
  | "pinterest"
  | "clarity";

export type AnalyticsConsent = "unknown" | "accepted" | "essential";

/** Standard ecommerce event names — map to each pixel in 11C */
export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  viewItem: "view_item",
  viewItemList: "view_item_list",
  addToCart: "add_to_cart",
  removeFromCart: "remove_from_cart",
  beginCheckout: "begin_checkout",
  search: "search",
  addToWishlist: "add_to_wishlist",
  signUp: "sign_up",
  newsletter: "newsletter_subscribe",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Public env IDs only (NEXT_PUBLIC_*). Never put secrets here.
 */
export function getAnalyticsConfig() {
  return {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "",
    gtmContainerId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
    pinterestTagId: process.env.NEXT_PUBLIC_PINTEREST_TAG_ID ?? "",
    clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  };
}

export function hasAnyAnalyticsConfigured(): boolean {
  const c = getAnalyticsConfig();
  return Boolean(
    c.ga4MeasurementId ||
      c.gtmContainerId ||
      c.metaPixelId ||
      c.tiktokPixelId ||
      c.pinterestTagId ||
      c.clarityProjectId,
  );
}
