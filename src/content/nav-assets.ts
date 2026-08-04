/**
 * Navigation imagery specs — produce before launch polish.
 */

export const NAV_IMAGE_SPECS = [
  {
    name: "mega-promo-starter-kit",
    purpose: "Shop mega menu promotional tile",
    aspect: "4:5",
    desktop: "480×600",
    tablet: "n/a",
    mobile: "n/a (text-only in drawer)",
    format: "AVIF/WebP + JPG fallback",
    compression: "q 72–80; no baked-in text",
  },
  {
    name: "search-product-thumb-{handle}",
    purpose: "Predictive search product/bundle thumbnails",
    aspect: "1:1",
    desktop: "128×128 display (serve 256)",
    tablet: "112×112",
    mobile: "96×96",
    format: "WebP",
    compression: "q 70–80; consistent packshot crop",
  },
] as const;
