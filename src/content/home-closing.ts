/**
 * Homepage closing modules — CMS / Shopify reviews ready.
 * Live koreanskinlab.pk review carousel included third-party Ordinary quotes —
 * those are NOT used here (unverified for this brand).
 */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  productTitle?: string;
  productHref?: string;
  /** True until Judgeme / Shopify product reviews are connected */
  placeholder?: boolean;
};

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "ph-1",
    quote:
      "I finally feel confident buying Korean skincare online — the products feel authentic and the routines are easier to understand.",
    author: "Customer in Lahore",
    rating: 5,
    productTitle: "K-Beauty Starter Kit",
    productHref: "/products/k-beauty-starter-kit",
    placeholder: true,
  },
  {
    id: "ph-2",
    quote:
      "Clear guidance, careful packaging, and formulas that match what I expect from genuine K-beauty.",
    author: "Returning customer",
    rating: 5,
    productTitle: "Haruharu Wonder Mineral Sunscreen SPF50",
    productHref:
      "/products/haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    placeholder: true,
  },
  {
    id: "ph-3",
    quote:
      "Support helped me choose for sensitive skin without pressure — shopping felt calm and trustworthy.",
    author: "First-time buyer",
    rating: 5,
    placeholder: true,
  },
];

export type JournalArticle = {
  id: string;
  href: string;
  category: string;
  title: string;
  summary: string;
  readingMinutes: number;
  imageAlt: string;
};

/** Evergreen guides aligned with Phase 1 IA (not a full blog CMS yet) */
export const HOME_JOURNAL: JournalArticle[] = [
  {
    id: "start",
    href: "/pages/guides",
    category: "Routines",
    title: "How to start Korean skincare",
    summary:
      "A simple path from cleanser to SPF — without building a ten-step routine overnight.",
    readingMinutes: 5,
    imageAlt: "Journal cover — starting a Korean skincare routine",
  },
  {
    id: "ingredients",
    href: "/pages/ingredients",
    category: "Ingredients",
    title: "Ingredients worth knowing",
    summary:
      "Understand hero actives behind hydration, barrier care, and everyday glow.",
    readingMinutes: 6,
    imageAlt: "Journal cover — ingredient education editorial",
  },
  {
    id: "authenticity",
    href: "/pages/authenticity",
    category: "Trust",
    title: "Why authenticity matters in Pakistan",
    summary:
      "How counterfeits confuse results — and how we approach verified Korean skincare.",
    readingMinutes: 4,
    imageAlt: "Journal cover — authenticity and trust",
  },
];

export const HOME_COMMUNITY = {
  eyebrow: "Community",
  title: "Real routines. Real light.",
  description:
    "A glimpse of the SCYN world — lifestyle moments and brand rituals.",
} as const;

export const HOME_NEWSLETTER = {
  eyebrow: "Newsletter",
  title: "Stay close to what’s new",
  description:
    "New arrivals, calm routine tips, and authenticity notes — infrequent and worthwhile.",
} as const;

export const HOME_FINAL_CTA = {
  title: "Ready for real Korean glow?",
  description:
    "Explore verified essentials, curated kits, and concern-led collections — at your pace.",
  primaryLabel: "Shop best sellers",
  primaryHref: "/collections/best-sellers",
  secondaryLabel: "Build a routine",
  secondaryHref: "/pages/routine-builder",
} as const;
