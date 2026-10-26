/**
 * Collection page models — Shopify collection / metafield / tag mapping later.
 * Product membership seeded from koreanskinlab.pk catalog (no invented SKUs).
 */

import {
  BEST_SELLERS,
  FEATURED_BUNDLES,
  FEATURED_COLLECTIONS,
  MERCH_COLLECTIONS,
  PRODUCT_CATEGORIES,
  formatPkr,
  type CatalogBundle,
  type CatalogCollection,
  type CatalogProduct,
} from "@/lib/catalog";
import { EXTENDED_CATALOG_PRODUCTS } from "@/lib/extended-catalog-products";

export type CollectionStatus = "active" | "empty" | "coming-soon" | "unavailable";

export type CollectionBenefit = {
  id: string;
  title: string;
  description: string;
};

export type CollectionEditorial = {
  /** Longer intro below hero — Shopify collection description / metafield */
  lead: string;
  benefits?: CollectionBenefit[];
  education?: string;
};

export type CollectionPageData = {
  handle: string;
  collection: CatalogCollection;
  status: CollectionStatus;
  products: CatalogProduct[];
  /** Bundles collection may surface kits */
  bundles?: CatalogBundle[];
  productCount: number;
  editorial?: CollectionEditorial;
  /** Sibling handles for collection switching */
  switcherHandles: string[];
  breadcrumbLabel: string;
};

/** Extra verified catalog items (search index / live site) not only on best-sellers rail */
const ADDITIONAL_PRODUCTS: CatalogProduct[] = [
  {
    id: "haruharu-toner",
    handle: "haruharu-wonder-black-rice-hyaluronic-toner",
    title: "Haruharu Wonder Black Rice Hyaluronic Toner",
    href: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
    description: "Hyaluronic black rice toner for soft, hydrated layers.",
    productType: "Toner",
    price: formatPkr(8000),
    availableForSale: true,
    badges: ["bestseller"],
    imageAlt: "Haruharu Wonder Black Rice Hyaluronic Toner packshot",
    ratingPlaceholder: true,
  },
  {
    id: "haruharu-oil",
    handle: "haruharu-wonder-black-rice-moisture-cleansing-oil",
    title: "HARUHARU Wonder Black Rice Moisture Cleansing Oil",
    href: "/products/haruharu-wonder-black-rice-moisture-cleansing-oil",
    description: "Moisture cleansing oil that melts makeup without stripping.",
    productType: "Cleanser",
    price: formatPkr(6200),
    availableForSale: true,
    imageAlt: "Haruharu Wonder Black Rice Moisture Cleansing Oil packshot",
    ratingPlaceholder: true,
  },
];

export const ALL_PRODUCTS: CatalogProduct[] = [
  ...BEST_SELLERS,
  ...ADDITIONAL_PRODUCTS,
  ...EXTENDED_CATALOG_PRODUCTS,
];

const byHandle = (handles: string[]) =>
  ALL_PRODUCTS.filter((p) => handles.includes(p.handle));

const PRODUCT_HANDLES_BY_COLLECTION: Record<string, string[]> = {
  "best-sellers": BEST_SELLERS.map((p) => p.handle),
  "new-arrivals": [
    "dermal-tea-tree-collagen-essence-mask",
    "dermal-rice-collagen-essence-mask",
    "dermal-kafir-facial-sheet-masks",
    "dermal-blueberry-facial-sheet-mask",
  ],
  masks: [
    "dermal-rice-collagen-essence-mask",
    "dermal-blueberry-facial-sheet-mask",
    "dermal-tea-tree-collagen-essence-mask",
    "dermal-kafir-facial-sheet-masks",
    "dermal-cucumber-collagen-essence-mask",
    "dermal-pomegranate-collagen-essence-mask",
    "dermal-charcoal-collagen-essence-mask",
  ],
  "bb-cream": [
    "anjo-professional-snail-bb-cream",
    "ladamer-cell-clinic-bb-cream",
  ],
  "eye-care": ["elensilia-cpp-collagen-peptide-eye-cream"],
  sunscreen: [
    "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
  ],
  "sun-protection": [
    "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
  ],
  moisturizers: [
    "escargot-original-facial-repair-cream",
    "lacto-cica-barrier-cream-moisturizer",
    "lactoderm-beneficial-moisturizing-cream",
  ],
  cleansers: ["haruharu-wonder-black-rice-moisture-cleansing-oil"],
  toners: ["haruharu-wonder-black-rice-hyaluronic-toner"],
  "deep-cleansing": ["haruharu-wonder-black-rice-moisture-cleansing-oil"],
  "dryness-dehydration": [
    "escargot-original-facial-repair-cream",
    "haruharu-wonder-black-rice-hyaluronic-toner",
    "lacto-cica-barrier-cream-moisturizer",
    "mixsoon-bean-essence",
    "ladamer-oligoforce-serum-hydrating",
    "anjo-professional-snail-bb-cream",
    "ladamer-cell-clinic-bb-cream",
    "elensilia-escargot-anti-wrinkle-multi-balm",
  ],
  "anti-aging": [
    "escargot-original-facial-repair-cream",
    "elensilia-escargot-anti-wrinkle-multi-balm",
    "elensilia-cpp-collagen-peptide-eye-cream",
    "ladamer-oligoforce-caviar-ampoule",
  ],
  "sensitive-skin": [
    "lacto-cica-barrier-cream-moisturizer",
    "lactoderm-beneficial-moisturizing-cream",
  ],
  "pore-minimizer": [
    "dermal-tea-tree-collagen-essence-mask",
    "haruharu-wonder-black-rice-moisture-cleansing-oil",
    "dermal-charcoal-collagen-essence-mask",
    "skin-1004-madagascar-centella-poremizing-fresh-ampoule",
  ],
};

const EDITORIAL: Record<string, CollectionEditorial> = {
  "best-sellers": {
    lead: "Most-loved essentials from our verified Korean skincare edit — a calm place to start if you’re not sure where to begin.",
    benefits: [
      {
        id: "trusted",
        title: "Proven favourites",
        description: "Products customers return to for everyday routines.",
      },
      {
        id: "authentic",
        title: "Authenticity first",
        description: "Sourced with care for the Pakistan market.",
      },
      {
        id: "clear",
        title: "Clear choices",
        description: "Fewer, better options — without catalogue noise.",
      },
    ],
  },
  "sun-protection": {
    lead: "Daily SPF is the quiet backbone of every Korean routine. Explore mineral and everyday sun care that feels wearable.",
    benefits: [
      {
        id: "daily",
        title: "Made for every day",
        description: "Formulas designed to layer under makeup or alone.",
      },
      {
        id: "gentle",
        title: "Comfort-minded",
        description: "Look for textures that respect reactive skin.",
      },
    ],
    education:
      "Apply SPF as the final step of your morning routine, and reapply when you’re outdoors for longer stretches.",
  },
  "sensitive-skin": {
    lead: "Barrier-first formulas for reactive complexions — fewer irritants, more comfort, curated with care.",
    benefits: [
      {
        id: "barrier",
        title: "Barrier support",
        description: "Cica, ceramides, and calm moisture where it counts.",
      },
      {
        id: "simple",
        title: "Simpler routines",
        description: "Start gentle — add actives only when skin is ready.",
      },
    ],
  },
  masks: {
    lead: "Sheet and treatment masks for a quiet reset — hydration, glow, and balanced recovery between steps.",
    benefits: [
      {
        id: "ritual",
        title: "A soft ritual",
        description: "Ten to twenty minutes of focused recovery.",
      },
      {
        id: "layer",
        title: "Easy to layer",
        description: "Pair with your cleanser, toner, and cream.",
      },
    ],
  },
  bundles: {
    lead: "Complete kits that remove decision fatigue — curated morning and starter paths with verified Korean essentials.",
    benefits: [
      {
        id: "complete",
        title: "Fewer decisions",
        description: "Routines assembled so you can begin with confidence.",
      },
      {
        id: "value",
        title: "Thoughtful value",
        description: "Kits priced as published on SCYN.",
      },
    ],
  },
  cleansers: {
    lead: "Oils and gels that prepare skin without over-stripping — the first step of a calm Korean routine.",
  },
  toners: {
    lead: "Hydrating layers that balance and soften before essences and creams.",
  },
  moisturizers: {
    lead: "Creams and balms for lasting comfort — dew, barrier care, and everyday glow.",
  },
  "bb-cream": {
    lead: "Light-coverage Korean BB creams for an even, natural finish with skincare comfort.",
  },
  "eye-care": {
    lead: "Targeted eye creams for the delicate under-eye area — gentle moisture and daily care.",
  },
};

function findCollectionMeta(handle: string): CatalogCollection | undefined {
  return [...MERCH_COLLECTIONS, ...FEATURED_COLLECTIONS, ...PRODUCT_CATEGORIES].find(
    (c) => c.handle === handle,
  );
}

function switcherFor(handle: string): string[] {
  if (FEATURED_COLLECTIONS.some((c) => c.handle === handle)) {
    return FEATURED_COLLECTIONS.map((c) => c.handle);
  }
  if (PRODUCT_CATEGORIES.some((c) => c.handle === handle)) {
    return PRODUCT_CATEGORIES.map((c) => c.handle);
  }
  if (MERCH_COLLECTIONS.some((c) => c.handle === handle)) {
    return MERCH_COLLECTIONS.map((c) => c.handle);
  }
  return [];
}

/**
 * Resolve a collection page payload by Shopify-style handle.
 * Returns null when handle is unknown (route should `notFound()`).
 */
export function getCollectionPage(handle: string): CollectionPageData | null {
  if (handle === "all") return null;

  const meta = findCollectionMeta(handle);
  if (!meta) return null;

  const editorial = EDITORIAL[handle];
  const switcherHandles = switcherFor(handle);

  if (handle === "bundles") {
    const bundles = FEATURED_BUNDLES;
    return {
      handle,
      collection: meta,
      status: bundles.length ? "active" : "empty",
      products: [],
      bundles,
      productCount: bundles.length,
      editorial,
      switcherHandles,
      breadcrumbLabel: meta.title,
    };
  }

  if (handle === "bb-cream" || handle === "eye-care") {
    const handles = PRODUCT_HANDLES_BY_COLLECTION[handle] ?? [];
    const products = byHandle(handles);
    if (!products.length) {
      return {
        handle,
        collection: meta,
        status: "coming-soon",
        products: [],
        productCount: 0,
        editorial: {
          lead:
            editorial?.lead ??
            `${meta.title} is being curated with verified Korean options. Check back soon, or explore related collections.`,
        },
        switcherHandles,
        breadcrumbLabel: meta.title,
      };
    }
  }

  const handles = PRODUCT_HANDLES_BY_COLLECTION[handle] ?? [];
  const products = byHandle(handles);

  let status: CollectionStatus = "active";
  if (!products.length) status = "empty";

  return {
    handle,
    collection: meta,
    status,
    products,
    productCount: products.length,
    editorial: editorial ?? {
      lead: meta.description,
    },
    switcherHandles,
    breadcrumbLabel: meta.title,
  };
}

export function getAllCollectionHandles(): string[] {
  return [...MERCH_COLLECTIONS, ...FEATURED_COLLECTIONS, ...PRODUCT_CATEGORIES]
    .map((c) => c.handle)
    .filter((h) => h !== "all");
}

export function getCollectionMetaByHandle(handle: string): CatalogCollection | undefined {
  return findCollectionMeta(handle);
}
