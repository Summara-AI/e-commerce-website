/**
 * Image specifications — Shop landing (`/collections/all`).
 * Collection / product packshot specs also in catalog-assets.ts.
 */

export const SHOP_IMAGE_SPECS = [
  {
    name: "shop-hero-banner",
    purpose: "Shop landing editorial banner / atmosphere behind hero copy",
    aspect: "16:9 desktop · 3:2 tablet · 4:5 mobile crop",
    desktop: "2400×1350",
    tablet: "1600×1067",
    mobile: "1080×1350",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; soft porcelain lab mood; no baked-in text; eager if LCP",
  },
  {
    name: "category-{handle}",
    purpose: "Product-type category card media",
    aspect: "5:4",
    desktop: "1000×800",
    tablet: "800×640",
    mobile: "640×512",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; product still-life or texture; quiet negative space",
  },
  {
    name: "merch-collection-{handle}",
    purpose: "Featured merchandising collection tiles (best sellers, new, bundles)",
    aspect: "4:5",
    desktop: "900×1125",
    tablet: "700×875",
    mobile: "600×750",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; editorial lifestyle or curated flat-lay",
  },
  {
    name: "concern-collection-{handle}",
    purpose: "Skin-concern collection cards on shop landing",
    aspect: "4:5",
    desktop: "900×1125",
    tablet: "700×875",
    mobile: "600×750",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; matches homepage collection tiles for asset reuse",
  },
  {
    name: "discovery-pathway-{id}",
    purpose: "Optional atmospheric strip for discovery pathways (optional; can stay CSS-only)",
    aspect: "3:2",
    desktop: "1200×800",
    tablet: "900×600",
    mobile: "720×480",
    format: "AVIF/WebP",
    compression: "q 70–78; secondary priority — lazy load",
  },
] as const;
