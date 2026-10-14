/**
 * Final homepage narrative — Brand Kit + questionnaire only.
 */

export const HOME_HERO_LUXURY = {
  eyebrow: "Korean Skin Lab",
  headline: "Authentic Korean skincare, quietly perfected.",
  support:
    "Verified formulas from Korea — curated for Pakistan with the calm confidence of a luxury ritual.",
  primaryCta: { label: "Shop bestsellers", href: "/collections/best-sellers" },
} as const;

export const HOME_TRUST_BADGES = [
  { id: "authentic", title: "100% Authentic", description: "Original Korean products only" },
  { id: "korea", title: "Imported from Korea", description: "Direct, careful sourcing" },
  { id: "selected", title: "Dermatologist Selected", description: "Thoughtfully curated formulas" },
  { id: "delivery", title: "Fast Pakistan Delivery", description: "Nationwide fulfilment" },
  { id: "secure", title: "Secure Checkout", description: "Protected every step" },
] as const;

export const HOME_FEATURED_COLLECTIONS_COPY = {
  eyebrow: "Collections",
  title: "Curated for real rituals",
  description: "Editorial edits — not endless catalogue noise.",
  viewAll: { label: "Shop all", href: "/collections/all" },
} as const;

export const HOME_BEST_SELLERS_COPY = {
  eyebrow: "Bestsellers",
  title: "Most loved, verified",
  description: "A quieter edit of formulas customers return to.",
  viewAll: { label: "View all", href: "/collections/best-sellers" },
} as const;

export const HOME_ROUTINE_INTERACTIVE = {
  eyebrow: "Ritual",
  title: "Build your Korean routine",
  description: "Three calm steps — concern, morning, night.",
  cta: { label: "Build my routine", href: "/pages/routine-builder" },
  steps: [
    {
      id: "concern",
      number: "01",
      title: "Choose your concern",
      body: "Dryness, sensitivity, clarity, protection — begin with what your skin asks for.",
    },
    {
      id: "morning",
      number: "02",
      title: "Shape your morning",
      body: "Cleanse, hydrate, and protect under SPF — a ritual that feels effortless.",
    },
    {
      id: "night",
      number: "03",
      title: "Complete your night",
      body: "Repair and replenish while skin recovers — never more steps than you need.",
    },
  ],
} as const;

export const HOME_EDITORIAL_BANNER = {
  eyebrow: "Authenticity",
  title: "Real Korean glow begins with verification.",
  body: "Every product we offer is positioned as original — sourced carefully so you never have to guess.",
  cta: { label: "Our authenticity promise", href: "/pages/authenticity" },
  media: {
    id: "home-editorial-banner",
    /**
     * IMAGE SPEC — Authenticity editorial (4:5)
     * Subject: Woman applying skincare / Korean lab calm / premium bottles
     * Light: Natural sunlight on soft beige or clean marble
     * Desktop: ~1100×1375 | Tablet: 900×1125 | Mobile: 800×1000
     */
    alt: "Soft daylight skincare ritual — woman applying serum beside premium bottles on warm marble",
  },
} as const;

export const HOME_STORY_PREVIEW = {
  eyebrow: "Our story",
  title: "Born to bring real Korean skincare to Pakistan",
  body: "We founded Korean Skin Lab to replace counterfeit noise with verified care — honest sourcing, careful curation, and guidance you can trust.",
  cta: { label: "Read our story", href: "/pages/our-story" },
  media: { id: "home-story-preview", alt: "Our story editorial — asset pending" },
} as const;

export const HOME_TESTIMONIALS_COPY = {
  eyebrow: "Voices",
  title: "Confidence, quietly shared",
  description: "Early community voices — live reviews connect with Shopify next.",
} as const;

export const HOME_COMMUNITY_COPY = {
  eyebrow: "Community",
  title: "A softer kind of glow",
  description: "Lifestyle moments from the Korean Skin Lab world.",
} as const;
