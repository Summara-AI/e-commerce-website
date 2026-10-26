/**
 * PDP recommendations — curated from SCYN catalogue.
 * Shopify Recommendations API / metafields can replace static maps later.
 */

import {
  FEATURED_BUNDLES,
  formatPkr,
  type CatalogBundle,
  type CatalogProduct,
  type Money,
} from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";

export type FbtItem = {
  product: CatalogProduct;
  role: "main" | "complement";
};

export type FrequentlyBoughtTogether = {
  items: FbtItem[];
  combinedPrice: Money;
  compareAtCombined?: Money;
  savings?: Money;
};

export type RoutineStep = {
  id: string;
  step: number;
  purpose: string;
  explanation: string;
  product: CatalogProduct;
};

export type YouMayAlsoLikeGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  products: CatalogProduct[];
};

function byHandle(handle: string): CatalogProduct | undefined {
  return ALL_PRODUCTS.find((p) => p.handle === handle);
}

function exclude(products: CatalogProduct[], handle: string) {
  return products.filter((p) => p.handle !== handle);
}

/** Related = same product type, then same catalog neighbors */
export function getRelatedProducts(handle: string, limit = 4): CatalogProduct[] {
  const current = byHandle(handle);
  if (!current) {
    // Bundle PDP — show best sellers as related catalogue peers
    return ALL_PRODUCTS.filter((p) => p.availableForSale).slice(0, limit);
  }

  const sameType = exclude(
    ALL_PRODUCTS.filter((p) => p.productType === current.productType),
    handle,
  );
  if (sameType.length >= limit) return sameType.slice(0, limit);

  const rest = exclude(ALL_PRODUCTS, handle).filter(
    (p) => !sameType.some((s) => s.id === p.id),
  );
  return [...sameType, ...rest].slice(0, limit);
}

/**
 * Complementary handles by product type — logical Korean routine pairing.
 * Only uses products that exist in ALL_PRODUCTS.
 */
const COMPLEMENTS: Record<string, string[]> = {
  "escargot-original-facial-repair-cream": [
    "haruharu-wonder-black-rice-hyaluronic-toner",
    "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
  ],
  "haruharu-wonder-black-rice-hyaluronic-toner": [
    "escargot-original-facial-repair-cream",
    "haruharu-wonder-black-rice-moisture-cleansing-oil",
  ],
  "haruharu-wonder-black-rice-moisture-cleansing-oil": [
    "haruharu-wonder-black-rice-hyaluronic-toner",
    "escargot-original-facial-repair-cream",
  ],
  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50": [
    "escargot-original-facial-repair-cream",
    "haruharu-wonder-black-rice-hyaluronic-toner",
  ],
  "lacto-cica-barrier-cream-moisturizer": [
    "dermal-cucumber-collagen-essence-mask",
    "haruharu-wonder-black-rice-hyaluronic-toner",
  ],
  "dermal-rice-collagen-essence-mask": [
    "dermal-tea-tree-collagen-essence-mask",
    "escargot-original-facial-repair-cream",
  ],
  "dermal-tea-tree-collagen-essence-mask": [
    "dermal-rice-collagen-essence-mask",
    "haruharu-wonder-black-rice-moisture-cleansing-oil",
  ],
  "dermal-blueberry-facial-sheet-mask": [
    "dermal-rice-collagen-essence-mask",
    "escargot-original-facial-repair-cream",
  ],
  "dermal-kafir-facial-sheet-masks": [
    "dermal-cucumber-collagen-essence-mask",
    "lacto-cica-barrier-cream-moisturizer",
  ],
  "dermal-cucumber-collagen-essence-mask": [
    "lacto-cica-barrier-cream-moisturizer",
    "dermal-kafir-facial-sheet-masks",
  ],
};

export function getFrequentlyBoughtTogether(
  handle: string,
): FrequentlyBoughtTogether | null {
  const main = byHandle(handle);
  if (!main) return null;

  const complementHandles = (COMPLEMENTS[handle] ?? []).slice(0, 2);
  const complements = complementHandles
    .map(byHandle)
    .filter((p): p is CatalogProduct => Boolean(p));

  if (!complements.length) return null;

  const items: FbtItem[] = [
    { product: main, role: "main" },
    ...complements.map((product) => ({ product, role: "complement" as const })),
  ];

  const amount = items.reduce((sum, i) => sum + i.product.price.amount, 0);
  const compareAmount = items.reduce(
    (sum, i) => sum + (i.product.compareAtPrice?.amount ?? i.product.price.amount),
    0,
  );

  const combinedPrice = formatPkr(amount);
  const compareAtCombined =
    compareAmount > amount ? formatPkr(compareAmount) : undefined;
  const savings =
    compareAmount > amount ? formatPkr(compareAmount - amount) : undefined;

  return { items, combinedPrice, compareAtCombined, savings };
}

/** Bundles that list this product, else all featured kits */
export function getRecommendedBundles(handle: string): CatalogBundle[] {
  const inKits = FEATURED_BUNDLES.filter((b) =>
    b.includes.some((inc) => inc.href?.includes(handle) || inc.href?.endsWith(handle)),
  );
  if (inKits.length) return inKits;
  // Bundle PDPs or unmatched singles — show both catalogue kits
  return FEATURED_BUNDLES;
}

export function getYouMayAlsoLike(handle: string): YouMayAlsoLikeGroup[] {
  const current = byHandle(handle);
  const groups: YouMayAlsoLikeGroup[] = [];

  const masks = exclude(
    ALL_PRODUCTS.filter((p) => p.productType === "Facial Mask"),
    handle,
  ).slice(0, 4);

  if (masks.length && current?.productType !== "Facial Mask") {
    groups.push({
      id: "masks",
      eyebrow: "Complementary ritual",
      title: "You may also like · Masks",
      description: "Quiet treatment steps from the verified catalogue.",
      products: masks,
    });
  }

  const hydration = exclude(
    ALL_PRODUCTS.filter(
      (p) =>
        p.productType === "Moisturizer" ||
        p.productType === "Toner" ||
        p.handle.includes("hyaluronic"),
    ),
    handle,
  ).slice(0, 4);

  if (hydration.length) {
    groups.push({
      id: "hydration",
      eyebrow: "Concern path",
      title: "You may also like · Hydration",
      description: "Moisture-minded picks for softer, comfortable skin.",
      products: hydration.slice(0, 4),
    });
  }

  // Always provide at least one group
  if (!groups.length) {
    groups.push({
      id: "edit",
      eyebrow: "Our edit",
      title: "You may also like",
      description: "Other verified essentials from SCYN.",
      products: exclude(ALL_PRODUCTS, handle).slice(0, 4),
    });
  }

  return groups.slice(0, 1); // One editorial block — curated, not noisy
}

/** Logical AM / barrier / cleanse routines using real SKUs */
export function getCompleteYourRoutine(handle: string): RoutineStep[] | null {
  const starterPath = [
    {
      handle: "haruharu-wonder-black-rice-moisture-cleansing-oil",
      purpose: "Cleanse",
      explanation: "Melt the day without over-stripping.",
    },
    {
      handle: "haruharu-wonder-black-rice-hyaluronic-toner",
      purpose: "Hydrate",
      explanation: "Soft layers before cream.",
    },
    {
      handle: "escargot-original-facial-repair-cream",
      purpose: "Moisturize",
      explanation: "Deep hydration and a dewy finish.",
    },
    {
      handle: "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
      purpose: "Protect",
      explanation: "Final morning step — everyday mineral SPF.",
    },
  ];

  const sensitivePath = [
    {
      handle: "dermal-cucumber-collagen-essence-mask",
      purpose: "Soothe",
      explanation: "A cooling mask for comfort-focused days.",
    },
    {
      handle: "lacto-cica-barrier-cream-moisturizer",
      purpose: "Barrier care",
      explanation: "Cica and ceramides for calm moisture.",
    },
    {
      handle: "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
      purpose: "Protect",
      explanation: "Gentle everyday SPF after barrier care.",
    },
  ];

  const isSensitive =
    handle.includes("lacto-cica") ||
    handle.includes("cucumber") ||
    handle.includes("kafir") ||
    handle.includes("tea-tree");

  const path = isSensitive ? sensitivePath : starterPath;
  const steps = path
    .map((step, index) => {
      const product = byHandle(step.handle);
      if (!product) return null;
      return {
        id: `step-${index + 1}`,
        step: index + 1,
        purpose: step.purpose,
        explanation: step.explanation,
        product,
      };
    })
    .filter((s): s is RoutineStep => Boolean(s));

  // If current product isn't in path, still show path as discovery (curated)
  return steps.length >= 2 ? steps : null;
}

export function getMobileCrossSellProducts(handle: string): CatalogProduct[] {
  const fbt = getFrequentlyBoughtTogether(handle);
  if (fbt) {
    return fbt.items.filter((i) => i.role === "complement").map((i) => i.product);
  }
  return getRelatedProducts(handle, 2);
}

const RECENT_KEY = "ksl-recently-viewed";
const RECENT_MAX = 8;

export function pushRecentlyViewed(handle: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const prev: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const next = [handle, ...prev.filter((h) => h !== handle)].slice(0, RECENT_MAX);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
}

export function readRecentlyViewedHandles(excludeHandle?: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const prev: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    return excludeHandle ? prev.filter((h) => h !== excludeHandle) : prev;
  } catch {
    return [];
  }
}

export function productsFromHandles(handles: string[]): CatalogProduct[] {
  return handles
    .map(byHandle)
    .filter((p): p is CatalogProduct => Boolean(p));
}
