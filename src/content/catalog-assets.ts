/**
 * Image specs for catalog + homepage discovery sections.
 */

export const CATALOG_IMAGE_SPECS = [
  {
    name: "collection-{handle}",
    purpose: "Featured collection editorial tile",
    type: "Editorial / lifestyle",
    aspect: "4:5 (primary) · featured large may use 3:4",
    desktop: "900×1125 (featured 1200×1500)",
    tablet: "700×875",
    mobile: "600×750",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; no text in frame; soft light",
  },
  {
    name: "product-{handle}-main",
    purpose: "Product card + PDP primary packshot",
    type: "Product packshot",
    aspect: "4:5",
    desktop: "1200×1500 display (serve up to 1600×2000)",
    tablet: "900×1125",
    mobile: "700×875",
    format: "WebP/AVIF; PNG master optional",
    compression: "q 80–90; consistent bg, angle, margin catalog-wide",
  },
] as const;
