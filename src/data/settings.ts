/**
 * Store settings — Shopify Shop / theme settings mapping later.
 */

export const SITE_SETTINGS = {
  name: "SCYN",
  legalName: "SCYN",
  tagline: "Skincare You Need.",
  url: "https://koreanskinlab.pk",
  locale: "en_PK",
  currency: "PKR" as const,
  country: "PK",
  description:
    "SCYN — 100% authentic Korean skincare for Pakistan. Verified products, thoughtfully curated routines, and a calmer way to shop K-beauty.",
  /** Raster 1200×630 social card built from the official SCYN complete lockup */
  defaultOgImage: "/og-default.png",
  email: "syncpk@gmail.com",
  phone: "+92 327 7560880",
  phoneHref: "tel:+923277560880",
  whatsappHref: "https://wa.me/923277560880",
  address: {
    street: "Sector N, DHA Phase 6",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    country: "PK",
    formatted: "Sector N, DHA Phase 6, Lahore, Pakistan",
  },
  hours: "Mon–Sat 9:00 AM – 10:00 PM · Sun 10:00 AM – 6:00 PM",
  /** Replace with official brand profile URLs before launch */
  sameAs: [] as string[],
} as const;

export type SiteSettings = typeof SITE_SETTINGS;
