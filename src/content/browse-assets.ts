/**
 * Image specs — collection browse / filters / search results.
 * Product packshots remain in catalog-assets + collection-assets.
 */

export const BROWSE_IMAGE_SPECS = [
  {
    name: "search-result-product-thumb",
    purpose: "Search results list thumbnail",
    aspect: "1:1",
    desktop: "160×160 (retina 320)",
    tablet: "128×128",
    mobile: "96×96",
    format: "AVIF/WebP",
    compression: "q 75–85; lazy load below fold",
  },
  {
    name: "search-result-packshot-grid",
    purpose: "Search results product grid packshot (reuse PDP/card master)",
    aspect: "4:5",
    desktop: "900×1125",
    tablet: "700×875",
    mobile: "600×750",
    format: "AVIF/WebP",
    compression: "q 80–90; priority only first 2",
  },
  {
    name: "filter-empty-illustration",
    purpose: "Optional empty-filter illustration (prefer CSS/empty state without art)",
    aspect: "1:1",
    desktop: "240×240",
    tablet: "200×200",
    mobile: "160×160",
    format: "SVG preferred",
    compression: "n/a for SVG; soft celadon stroke",
  },
] as const;
