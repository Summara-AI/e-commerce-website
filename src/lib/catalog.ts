/**
 * Catalog models — Shopify Storefront API / Admin mapping later.
 * Product names, prices, and concerns sourced from koreanskinlab.pk.
 */

export type Money = {
  amount: number;
  currencyCode: "PKR";
  formatted: string;
};

export type ProductBadge = "sale" | "new" | "bestseller";

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  href: string;
  description: string;
  productType?: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
  badges?: ProductBadge[];
  /** IMAGE SPEC — packshot 4:5, see catalog-assets */
  imageAlt: string;
  /** Card / OG hero — first gallery image when `imageGallery` is set */
  imageSrc?: string;
  /** Ordered PDP gallery — hero first; see product-galleries.ts */
  imageGallery?: readonly string[];
  /** Placeholder only until Shopify reviews connect — never invent scores */
  ratingPlaceholder?: boolean;
};

export type CatalogCollection = {
  id: string;
  handle: string;
  title: string;
  href: string;
  description: string;
  /** IMAGE SPEC — collection editorial tile */
  imageAlt: string;
  imageSrc?: string;
  /**
   * Photography luminance for contrast-safe card typography.
   * Placeholders (no `imageSrc`) always render as light.
   * `dark` → gradient overlay + light type; `light` → charcoal type on content panel.
   */
  imageTone?: "light" | "dark";
  featured?: boolean;
};

export function formatPkr(amount: number): Money {
  return {
    amount,
    currencyCode: "PKR",
    formatted: `Rs.${amount.toLocaleString("en-PK")}`,
  };
}

/**
 * Product-type categories (nav “By Type”) — Shopify collection handles later.
 * Sourced from koreanskinlab.pk / Phase 1 shop IA.
 */
export const PRODUCT_CATEGORIES: CatalogCollection[] = [
  {
    id: "cleansers",
    handle: "cleansers",
    title: "Cleansers",
    href: "/collections/cleansers",
    description: "Oils and gels that prepare skin without over-stripping.",
    imageAlt: "Cleansers category editorial — asset pending",
  },
  {
    id: "toners",
    handle: "toners",
    title: "Toners",
    href: "/collections/toners",
    description: "Hydrating layers that balance and soften.",
    imageAlt: "Toners category editorial — asset pending",
  },
  {
    id: "moisturizers",
    handle: "moisturizers",
    title: "Moisturizers",
    href: "/collections/moisturizers",
    description: "Creams and balms for lasting comfort.",
    imageAlt: "Moisturizers category editorial — asset pending",
  },
  {
    id: "masks",
    handle: "masks",
    title: "Masks",
    href: "/collections/masks",
    description: "Sheet and treatment masks for a quiet reset.",
    imageAlt: "Masks category editorial — asset pending",
  },
  {
    id: "sunscreen",
    handle: "sunscreen",
    title: "Sunscreen",
    href: "/collections/sunscreen",
    description: "Daily SPF with a Korean feel on skin.",
    imageAlt: "Sunscreen category editorial — asset pending",
  },
  {
    id: "bb-cream",
    handle: "bb-cream",
    title: "BB Cream",
    href: "/collections/bb-cream",
    description: "Light coverage with skincare-minded formulas.",
    imageAlt: "BB cream category editorial — asset pending",
  },
  {
    id: "eye-care",
    handle: "eye-care",
    title: "Eye Care",
    href: "/collections/eye-care",
    description: "Targeted care for the delicate eye area.",
    imageAlt: "Eye care category editorial — asset pending",
  },
];

/** Merchandising collections for shop discovery (not full PLP yet) */
export const MERCH_COLLECTIONS: CatalogCollection[] = [
  {
    id: "best-sellers",
    handle: "best-sellers",
    title: "Best Sellers",
    href: "/collections/best-sellers",
    description: "The essentials customers return to most.",
    imageAlt: "Best sellers collection editorial — asset pending",
    featured: true,
  },
  {
    id: "new-arrivals",
    handle: "new-arrivals",
    title: "New Arrivals",
    href: "/collections/new-arrivals",
    description: "Fresh verified finds from trusted Korean brands.",
    imageAlt: "New arrivals collection editorial — asset pending",
    featured: true,
  },
  {
    id: "bundles",
    handle: "bundles",
    title: "Bundles & Kits",
    href: "/collections/bundles",
    description: "Complete routines curated for simpler mornings and nights.",
    imageAlt: "Bundles collection editorial — asset pending",
  },
];

/** Skin-concern collections featured on live homepage */
export const FEATURED_COLLECTIONS: CatalogCollection[] = [
  {
    id: "sun-protection",
    handle: "sun-protection",
    title: "Sun Protection",
    href: "/collections/sun-protection",
    description: "Daily SPF essentials for lasting, gentle defense.",
    imageAlt: "Sun protection collection editorial — asset pending",
    featured: true,
  },
  {
    id: "deep-cleansing",
    handle: "deep-cleansing",
    title: "Deep Cleansing",
    href: "/collections/deep-cleansing",
    description: "Oils and cleansers that reset skin without stripping.",
    imageAlt: "Deep cleansing collection editorial — asset pending",
  },
  {
    id: "dryness-dehydration",
    handle: "dryness-dehydration",
    title: "Dryness & Dehydration",
    href: "/collections/dryness-dehydration",
    description: "Layered hydration for calm, comfortable skin.",
    imageAlt: "Hydration collection editorial — asset pending",
    featured: true,
  },
  {
    id: "anti-aging",
    handle: "anti-aging",
    title: "Anti-Aging",
    href: "/collections/anti-aging",
    description: "Firming care with proven Korean actives.",
    imageAlt: "Anti-aging collection editorial — asset pending",
  },
  {
    id: "pore-minimizer",
    handle: "pore-minimizer",
    title: "Pore Minimizer",
    href: "/collections/pore-minimizer",
    description: "Refine texture with thoughtful, gentle formulas.",
    imageAlt: "Pore care collection editorial — asset pending",
  },
  {
    id: "sensitive-skin",
    handle: "sensitive-skin",
    title: "Sensitive Skin",
    href: "/collections/sensitive-skin",
    description: "Barrier-first formulas for reactive complexions.",
    imageAlt: "Sensitive skin collection editorial — asset pending",
  },
];

/** Best sellers highlighted on live koreanskinlab.pk homepage */
export const BEST_SELLERS: CatalogProduct[] = [
  {
    id: "escargot-cream",
    handle: "escargot-original-facial-repair-cream",
    title: "Escargot Original Facial Repair Cream",
    href: "/products/escargot-original-facial-repair-cream",
    description: "Deep hydration and firm, dewy skin with snail mucin care.",
    productType: "Moisturizer",
    price: formatPkr(4000),
    compareAtPrice: formatPkr(4450),
    availableForSale: true,
    badges: ["sale", "bestseller"],
    imageAlt: "Escargot Original Facial Repair Cream packshot",
    ratingPlaceholder: true,
  },
  {
    id: "dermal-rice",
    handle: "dermal-rice-collagen-essence-mask",
    title: "DERMAL Rice Collagen Essence Mask",
    href: "/products/dermal-rice-collagen-essence-mask",
    description: "Collagen sheet mask with rice extract for soft glow.",
    productType: "Facial Mask",
    price: formatPkr(405),
    compareAtPrice: formatPkr(450),
    availableForSale: true,
    badges: ["sale", "bestseller"],
    imageAlt: "DERMAL Rice Collagen Essence Mask packshot",
    ratingPlaceholder: true,
  },
  {
    id: "haruharu-spf",
    handle: "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    title: "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
    href: "/products/haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    description: "Mineral SPF50 with black rice comfort for everyday wear.",
    productType: "Sunscreen",
    price: formatPkr(5200),
    compareAtPrice: formatPkr(5800),
    availableForSale: true,
    badges: ["sale", "bestseller"],
    imageAlt: "Haruharu Wonder mineral sunscreen packshot",
    ratingPlaceholder: true,
  },
  {
    id: "dermal-blueberry",
    handle: "dermal-blueberry-facial-sheet-mask",
    title: "Dermal Blueberry Facial Sheet Mask",
    href: "/products/dermal-blueberry-facial-sheet-mask",
    description: "Blueberry-infused sheet mask for a fresh, hydrated finish.",
    productType: "Facial Mask",
    price: formatPkr(450),
    compareAtPrice: formatPkr(500),
    availableForSale: true,
    badges: ["sale"],
    imageAlt: "Dermal Blueberry Facial Sheet Mask packshot",
    ratingPlaceholder: true,
  },
  {
    id: "dermal-tea",
    handle: "dermal-tea-tree-collagen-essence-mask",
    title: "DERMAL Tea Tree Collagen Essence Mask",
    href: "/products/dermal-tea-tree-collagen-essence-mask",
    description: "Tea tree collagen mask to refresh and balance skin.",
    productType: "Facial Mask",
    price: formatPkr(405),
    compareAtPrice: formatPkr(450),
    availableForSale: true,
    badges: ["sale"],
    imageAlt: "DERMAL Tea Tree Collagen Essence Mask packshot",
    ratingPlaceholder: true,
  },
  {
    id: "dermal-kefir",
    handle: "dermal-kafir-facial-sheet-masks",
    title: "Dermal kafir facial sheet masks",
    href: "/products/dermal-kafir-facial-sheet-masks",
    description: "Kefir hydration to replenish and support a healthy glow.",
    productType: "Facial Mask",
    price: formatPkr(450),
    compareAtPrice: formatPkr(500),
    availableForSale: true,
    badges: ["sale"],
    imageAlt: "Dermal kefir facial sheet mask packshot",
    ratingPlaceholder: true,
  },
  {
    id: "dermal-cucumber",
    handle: "dermal-cucumber-collagen-essence-mask",
    title: "DERMAL Cucumber Collagen Essence Mask",
    href: "/products/dermal-cucumber-collagen-essence-mask",
    description: "Cooling cucumber collagen mask for soft, soothed skin.",
    productType: "Facial Mask",
    price: formatPkr(405),
    compareAtPrice: formatPkr(450),
    availableForSale: true,
    badges: ["sale"],
    imageAlt: "DERMAL Cucumber Collagen Essence Mask packshot",
    ratingPlaceholder: true,
  },
  {
    id: "lacto-cica",
    handle: "lacto-cica-barrier-cream-moisturizer",
    title: "Lacto Cica Barrier Cream Moisturizer",
    href: "/products/lacto-cica-barrier-cream-moisturizer",
    description: "Cica and ceramides to comfort and support the barrier.",
    productType: "Moisturizer",
    price: formatPkr(5400),
    compareAtPrice: formatPkr(6000),
    availableForSale: false,
    badges: ["sale"],
    imageAlt: "Lacto Cica Barrier Cream packshot",
    ratingPlaceholder: true,
  },
];

export type BundleInclusion = {
  id: string;
  title: string;
  href?: string;
};

export type CatalogBundle = {
  id: string;
  handle: string;
  title: string;
  href: string;
  description: string;
  includes: BundleInclusion[];
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
  /** IMAGE SPEC — bundle flat-lay 3:2 */
  imageAlt: string;
  imageSrc?: string;
  imageGallery?: readonly string[];
};

/** Bundles from koreanskinlab.pk — names, prices, inclusions unchanged */
export const FEATURED_BUNDLES: CatalogBundle[] = [
  {
    id: "starter-kit",
    handle: "k-beauty-starter-kit",
    title: "K-Beauty Starter Kit",
    href: "/products/k-beauty-starter-kit",
    description:
      "The perfect introduction to Korean skincare — a complete beginner-friendly daily routine from cleansing to protection.",
    includes: [
      {
        id: "oil",
        title: "Haruharu Black Rice Moisture Cleansing Oil",
        href: "/products/haruharu-wonder-black-rice-moisture-cleansing-oil",
      },
      {
        id: "toner",
        title: "Haruharu Wonder Black Rice Hyaluronic Toner",
        href: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
      },
      {
        id: "cream",
        title: "Escargot Original Facial Repair Cream",
        href: "/products/escargot-original-facial-repair-cream",
      },
      {
        id: "spf",
        title: "Haruharu Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
        href: "/products/haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
      },
    ],
    price: formatPkr(21000),
    compareAtPrice: formatPkr(23400),
    availableForSale: true,
    imageAlt: "K-Beauty Starter Kit flat-lay — asset pending",
  },
  {
    id: "am-trio",
    handle: "k-glow-am-trio",
    title: "K-Glow AM Trio",
    href: "/products/k-glow-am-trio",
    description:
      "A simple Korean morning routine designed for hydrated, glowing skin — moisture, essence, and SPF in one set.",
    includes: [
      {
        id: "toner",
        title: "Haruharu Wonder Black Rice Hyaluronic Toner",
        href: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
      },
      {
        id: "essence",
        title: "Mixsoon Bean Essence (50ml)",
        href: "/products/mixsoon-bean-essence",
      },
      {
        id: "spf",
        title: "Haruharu Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
        href: "/products/haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
      },
    ],
    price: formatPkr(18000),
    compareAtPrice: formatPkr(20200),
    availableForSale: true,
    imageAlt: "K-Glow AM Trio flat-lay — asset pending",
  },
];
