/**
 * Store settings — Shopify Shop / theme settings mapping later.
 */

export const SITE_SETTINGS = {
  name: "Korean Skin Lab",
  legalName: "Korean Skin Lab",
  url: "https://koreanskinlab.pk",
  locale: "en_PK",
  currency: "PKR" as const,
  country: "PK",
  description:
    "100% authentic Korean skincare for Pakistan. Verified products, thoughtfully curated routines, and a calmer way to shop K-beauty.",
  /** Prefer raster 1200×630 for social crawlers — replace with brand OG art when ready */
  defaultOgImage: "/og-default.png",
  email: "Support@koreanskinlab.pk",
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
