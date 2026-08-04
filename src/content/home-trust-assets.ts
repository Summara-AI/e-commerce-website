/**
 * Image specs for homepage trust / story / bundles phase.
 */

export const HOME_TRUST_IMAGE_SPECS = [
  {
    name: "bundle-starter-kit",
    purpose: "K-Beauty Starter Kit feature media",
    type: "Product flat-lay / lifestyle",
    aspect: "3:2",
    desktop: "1800×1200",
    tablet: "1400×933",
    mobile: "1080×720",
    crop: "Show all inclusions clearly; labels readable; calm surface",
    format: "AVIF/WebP + JPG",
    compression: "q 75–85",
  },
  {
    name: "bundle-am-trio",
    purpose: "K-Glow AM Trio feature media",
    type: "Product flat-lay",
    aspect: "3:2",
    desktop: "1800×1200",
    tablet: "1400×933",
    mobile: "1080×720",
    crop: "Morning ritual mood; three products balanced",
    format: "AVIF/WebP + JPG",
    compression: "q 75–85",
  },
  {
    name: "brand-story-editorial",
    purpose: "Brand story lifestyle / founding atmosphere",
    type: "Editorial lifestyle",
    aspect: "3:4",
    desktop: "1200×1600",
    tablet: "900×1200",
    mobile: "800×1000",
    crop: "Quiet, trustworthy mood — Korea sourcing or soft ritual; no promo stickers",
    format: "AVIF/WebP + JPG",
    compression: "q 72–80",
  },
] as const;
