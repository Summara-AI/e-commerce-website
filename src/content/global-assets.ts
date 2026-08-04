/**
 * Global component imagery specs — produce assets before launch polish.
 */

export const GLOBAL_IMAGE_SPECS = [
  {
    name: "footer-payment-icons",
    purpose: "Accepted payment methods in footer",
    aspect: "horizontal strip",
    desktop: "~240×24",
    tablet: "~200×20",
    mobile: "~180×18",
    format: "SVG sprite preferred",
    compression: "n/a for SVG",
  },
  {
    name: "trust-icon-set",
    purpose: "Optional custom trust icons (Lucide used until then)",
    aspect: "1:1",
    desktop: "40×40",
    tablet: "40×40",
    mobile: "36×36",
    format: "SVG",
    compression: "n/a",
  },
  {
    name: "empty-state-illustration",
    purpose: "Empty cart / wishlist / 404 soft illustration",
    aspect: "1:1",
    desktop: "240×240",
    tablet: "200×200",
    mobile: "160×160",
    format: "SVG or WebP",
    compression: "q 75 if raster",
  },
  {
    name: "newsletter-ambient",
    purpose: "Optional newsletter card atmosphere (not required)",
    aspect: "16:9",
    desktop: "960×540",
    tablet: "800×450",
    mobile: "n/a text-only",
    format: "WebP",
    compression: "q 70–75; very soft",
  },
] as const;
