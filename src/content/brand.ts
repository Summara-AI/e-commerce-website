/**
 * Brand narrative content adapted from koreanskinlab.pk About / homepage copy.
 * Shopify metafields / page content can replace these strings later.
 */

export const BRAND_STORY = {
  eyebrow: "Our story",
  title: "Born to bring real Korean skincare to Pakistan",
  paragraphs: [
    "At Korean Skin Lab, our mission began with one simple belief: everyone deserves access to 100% authentic Korean skincare.",
    "Over the years, we noticed a growing problem in Pakistan — fake and counterfeit “K-beauty” products flooding the market, misleading customers, and damaging trust.",
    "As passionate users and frequent travelers to Korea, we experienced first-hand how genuine Korean skincare delivers visible, lasting results. That’s why we founded Korean Skin Lab — to bring original, verified, and effective Korean skincare directly to Pakistan.",
  ],
  mission:
    "We’re here to make your skincare journey honest, safe, and truly transformative — because your skin deserves nothing less than the real Korean glow.",
  cta: {
    label: "Read our story",
    href: "/pages/our-story",
  },
} as const;

export const WHY_CHOOSE = {
  eyebrow: "Why Korean Skin Lab",
  title: "A calmer way to shop K-beauty",
  description:
    "Built for trust first — so discovery feels guided, not overwhelming.",
  items: [
    {
      id: "authentic",
      title: "100% authentic",
      description:
        "Every item is verified and original — sourced to fight the rise of counterfeit K-beauty in Pakistan.",
      icon: "shield" as const,
    },
    {
      id: "curated",
      title: "Thoughtfully curated",
      description:
        "A focused selection of trusted Korean brands and routines — not endless catalogue noise.",
      icon: "sparkles" as const,
    },
    {
      id: "sourced",
      title: "Sourced from Korea",
      description:
        "Our team personally sources products from Korea to help guarantee premium quality.",
      icon: "plane" as const,
    },
    {
      id: "support",
      title: "Customer-first guidance",
      description:
        "WhatsApp and email support when you need help choosing — Mon–Sat with Sunday hours too.",
      icon: "heart" as const,
    },
  ],
} as const;

export const SCIENCE_AUTHENTICITY = {
  eyebrow: "Authenticity",
  title: "Transparency over imitation",
  lead:
    "Real Korean skincare is precise, ingredient-led, and built for results. Imitations can’t match what genuine formulas deliver — which is why authenticity sits at the center of Korean Skin Lab.",
  points: [
    {
      id: "verify",
      title: "Verified, not vague",
      description:
        "We bring you authentic Korean skincare from trusted brands — so what you buy matches what the world trusts.",
    },
    {
      id: "educate",
      title: "Understand before you buy",
      description:
        "Explore concerns, routines, and ingredients to choose with clarity — not pressure.",
    },
    {
      id: "honest",
      title: "An honest journey",
      description:
        "Our promise is simple: original products, careful curation, and a safer path to the real Korean glow.",
    },
  ],
  cta: {
    label: "Our authenticity promise",
    href: "/pages/authenticity",
  },
} as const;
