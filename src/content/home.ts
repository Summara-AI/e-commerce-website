/**
 * Homepage above-the-fold content — Shopify section-settings ready later.
 * Messaging adapted from koreanskinlab.pk authenticity positioning.
 */

export const HOME_HERO = {
  brand: "Korean Skin Lab",
  headline: "Authentic Korean skincare, thoughtfully curated.",
  support:
    "Verified products sourced from trusted Korean brands — for calmer routines and results you can trust in Pakistan.",
  primaryCta: {
    label: "Shop best sellers",
    href: "/collections/best-sellers",
  },
  secondaryCta: {
    label: "Find your routine",
    href: "/pages/routine-builder",
  },
} as const;

export const HOME_QUICK_ENTRIES = [
  {
    id: "all",
    label: "Shop All",
    description: "Browse the full collection",
    href: "/collections/all",
  },
  {
    id: "best",
    label: "Best Sellers",
    description: "Most-loved essentials",
    href: "/collections/best-sellers",
  },
  {
    id: "bundles",
    label: "Bundles",
    description: "Complete routines, curated",
    href: "/collections/bundles",
  },
  {
    id: "routine",
    label: "Routine Builder",
    description: "Start with a simple path",
    href: "/pages/routine-builder",
  },
] as const;

/**
 * IMAGE SPEC — Home hero media (hero-home-01)
 *
 * Purpose: Full-bleed atmospheric hero — product ritual / porcelain laboratory mood
 * Type: Lifestyle / editorial photography (not collage, not inset card)
 * Aspect: Desktop 16:9 · Tablet ~3:2 · Mobile 4:5 (portrait crop)
 * Desktop: 2400×1350 (serve srcset 1440 / 1920 / 2400)
 * Laptop: 2000×1125
 * Tablet: 1600×1000
 * Mobile: 1080×1350
 * Safe zone: keep subject in center 60%; leave left/lower third quieter for type on desktop
 * Cropping: face/product not under announcement+header; no text baked into image
 * Format: AVIF/WebP + JPG fallback · q 72–80 · eager LCP load
 * Alt: Descriptive once asset exists (e.g. “Soft daylight skincare ritual with Korean essences”)
 */
export const HOME_HERO_MEDIA = {
  id: "hero-home-01",
  alt: "Premium Korean skincare atmosphere — final photography pending",
  aspectDesktop: "16 / 9",
  aspectMobile: "4 / 5",
} as const;
