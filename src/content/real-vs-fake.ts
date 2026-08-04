/**
 * Real vs Fake educational guide — trust education without invented lab claims.
 */

export const REAL_VS_FAKE_PAGE = {
  eyebrow: "Education",
  title: "Real vs fake Korean skincare",
  description:
    "Counterfeit K-beauty can waste money and put skin at risk. Here’s how to stay calm, curious, and protected.",
  danger: {
    eyebrow: "Why it matters",
    title: "Why fake skincare is dangerous",
    body: "Imitations may dilute actives, use unknown ingredients, or skip safety standards. Real Korean skincare is precise and ingredient-led — fakes can’t honestly match that.",
    points: [
      {
        id: "unknown",
        title: "Unknown formulas",
        description: "You can’t trust what’s inside when packaging is copied without the original maker.",
      },
      {
        id: "barrier",
        title: "Barrier risk",
        description: "Harsh fillers or poorly preserved products can irritate skin and delay results you expect from authentic care.",
      },
      {
        id: "trust",
        title: "Eroded trust",
        description: "Fakes flood markets and confuse shoppers — which is why Korean Skin Lab focuses on verified authenticity.",
      },
    ],
  },
  identify: {
    eyebrow: "How to spot the real thing",
    title: "How to identify authentic products",
    steps: [
      {
        id: "seller",
        title: "Buy from verified sellers",
        body: "Choose retailers who publicly commit to authentic Korean sourcing — not the cheapest listing with no story.",
      },
      {
        id: "print",
        title: "Check print & finish",
        body: "Blurry logos, uneven foils, or misaligned text are common red flags on counterfeit packaging.",
      },
      {
        id: "seal",
        title: "Inspect seals & batch marks",
        body: "Broken seals, missing batch codes, or codes that look stamped poorly deserve a pause before you use the product.",
      },
      {
        id: "price",
        title: "Be wary of extreme discounts",
        body: "If a price seems impossible for a known Korean brand, ask for proof of authenticity before buying.",
      },
    ],
  },
  packaging: {
    eyebrow: "Compare",
    title: "Packaging comparison",
    description:
      "Place authentic and suspicious packs side by side. Look for colour accuracy, typography, and finish quality.",
  },
  texture: {
    eyebrow: "On skin",
    title: "Texture comparison",
    description:
      "Genuine formulas typically feel consistent with brand reputation. Odd grit, separation, or harsh scent can be warning signs — stop use and contact the seller.",
  },
  qr: {
    eyebrow: "Codes",
    title: "QR & barcode explanation",
    body: "Some brands print QR or barcode authenticity checks. Scan only from packaging you purchased, follow brand-owned portals, and never share payment details on unofficial pages. When in doubt, ask Korean Skin Lab support to help verify what you received.",
  },
  myths: {
    eyebrow: "Clarity",
    title: "Common misconceptions",
    items: [
      {
        id: "cheap",
        title: "“If it works, it must be real”",
        body: "Short-term softness isn’t proof of authenticity. Focus on source and packaging integrity.",
      },
      {
        id: "same",
        title: "“All Korean labels are equal”",
        body: "The label can be copied. The sourcing path and verification matter more than a familiar logo alone.",
      },
      {
        id: "online",
        title: "“Online means unverifiable”",
        body: "Trusted online retailers can be authentic — look for clear authenticity promises and responsive support.",
      },
    ],
  },
  closing: {
    title: "Shop authentic Korean skincare",
    description:
      "Start with our curated selection — verified pieces chosen to protect your glow.",
    primaryLabel: "Shop all",
    primaryHref: "/collections/all",
    secondaryLabel: "Authenticity promise",
    secondaryHref: "/pages/authenticity",
  },
} as const;
