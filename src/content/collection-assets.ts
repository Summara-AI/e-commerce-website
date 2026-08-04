/**
 * Image specifications — Collection PLP.
 */

export const COLLECTION_IMAGE_SPECS = [
  {
    name: "collection-hero-{handle}",
    purpose: "Collection banner / editorial hero atmosphere",
    aspect: "21:9 desktop · 3:1 tablet · 16:9 mobile crop",
    desktop: "2400×1028 (retina master 4800×2056)",
    tablet: "1600×533",
    mobile: "1080×608",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80; soft light; no text in frame; eager if LCP",
    retina: "Serve 1x/2x srcset; prefer AVIF at 2x with careful q",
  },
  {
    name: "product-{handle}-main",
    purpose: "Primary packshot in collection product cards",
    aspect: "4:5",
    desktop: "1200×1500 (retina up to 1600×2000)",
    tablet: "900×1125",
    mobile: "700×875",
    format: "AVIF/WebP; PNG master optional",
    compression: "q 80–90; consistent catalog angle and margin",
    retina: "2x for card display ~400–500 CSS px wide",
  },
  {
    name: "product-{handle}-hover",
    purpose: "Secondary product card image on hover (future)",
    aspect: "4:5",
    desktop: "1200×1500",
    tablet: "900×1125",
    mobile: "700×875",
    format: "AVIF/WebP",
    compression: "q 78–88; lifestyle or alternate angle; lazy until hover intent",
    retina: "Match primary packshot density",
  },
  {
    name: "bundle-{handle}-flatlay",
    purpose: "Bundle / kit card media on bundles collection",
    aspect: "3:2",
    desktop: "1800×1200",
    tablet: "1400×933",
    mobile: "1080×720",
    format: "AVIF/WebP + JPG",
    compression: "q 75–85",
    retina: "2x for featured tiles",
  },
] as const;
