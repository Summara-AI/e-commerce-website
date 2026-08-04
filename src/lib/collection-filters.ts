/**
 * Collection browse — filters, sort, pagination.
 * Shopify: map to Storefront filters / collection products query later.
 *
 * UX recommendation (Korean Skin Lab catalogue size ~10–30 SKUs per view):
 * Prefer numbered pagination over infinite scroll. Boutique catalogues stay
 * scannable with clear pages; infinite scroll suits 100+ result sets and
 * hurts “back” memory + footer reach. InfiniteScrollTrigger is prepared for growth.
 */

import type { CatalogBundle, CatalogProduct } from "@/lib/catalog";

export const COLLECTION_PAGE_SIZE = 8;

export type SortValue =
  | "featured"
  | "best-selling"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "rating"; // future — no-op until reviews connect

export type PriceRangeId = "under-1k" | "1k-3k" | "3k-6k" | "over-6k";

export type FilterState = {
  categories: string[];
  concerns: string[];
  ingredients: string[];
  productTypes: string[];
  priceRanges: PriceRangeId[];
  availability: Array<"in-stock" | "sold-out">;
  featured: boolean;
  kind: Array<"single" | "bundle">;
  sort: SortValue;
  page: number;
  /** Collection-scoped / global search query */
  q: string;
};

export type FilterChip = {
  id: string;
  group: keyof Omit<FilterState, "sort" | "page" | "q" | "featured"> | "featured" | "q";
  value: string;
  label: string;
};

export type BrowseFacets = {
  categories: { id: string; label: string; count: number }[];
  concerns: { id: string; label: string; count: number }[];
  ingredients: { id: string; label: string; count: number }[];
  productTypes: { id: string; label: string; count: number }[];
  priceRanges: { id: PriceRangeId; label: string; count: number }[];
  availability: { id: "in-stock" | "sold-out"; label: string; count: number }[];
  kind: { id: "single" | "bundle"; label: string; count: number }[];
  hasFeatured: boolean;
};

export type FilterableProduct = CatalogProduct & {
  categoryIds: string[];
  concernIds: string[];
  ingredientIds: string[];
  kind: "single" | "bundle";
  /** Rough recency proxy until Shopify createdAt */
  newestRank: number;
  bestSellerRank: number;
};

const EMPTY_FILTERS: FilterState = {
  categories: [],
  concerns: [],
  ingredients: [],
  productTypes: [],
  priceRanges: [],
  availability: [],
  featured: false,
  kind: [],
  sort: "featured",
  page: 1,
  q: "",
};

/** Facet seeds from live-site product character — Shopify tags/metafields later */
const PRODUCT_META: Record<
  string,
  {
    categoryIds: string[];
    concernIds: string[];
    ingredientIds: string[];
    newestRank?: number;
    bestSellerRank?: number;
  }
> = {
  "escargot-original-facial-repair-cream": {
    categoryIds: ["moisturizers"],
    concernIds: ["dryness-dehydration", "anti-aging"],
    ingredientIds: ["snail-mucin"],
    newestRank: 6,
    bestSellerRank: 1,
  },
  "dermal-rice-collagen-essence-mask": {
    categoryIds: ["masks"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["collagen", "rice"],
    newestRank: 2,
    bestSellerRank: 2,
  },
  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50": {
    categoryIds: ["sunscreen"],
    concernIds: ["sun-protection", "sensitive-skin"],
    ingredientIds: ["black-rice", "mineral-spf"],
    newestRank: 5,
    bestSellerRank: 3,
  },
  "dermal-blueberry-facial-sheet-mask": {
    categoryIds: ["masks"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["blueberry"],
    newestRank: 3,
    bestSellerRank: 5,
  },
  "dermal-tea-tree-collagen-essence-mask": {
    categoryIds: ["masks"],
    concernIds: ["pore-minimizer", "sensitive-skin"],
    ingredientIds: ["tea-tree", "collagen"],
    newestRank: 1,
    bestSellerRank: 4,
  },
  "dermal-kafir-facial-sheet-masks": {
    categoryIds: ["masks"],
    concernIds: ["dryness-dehydration", "sensitive-skin"],
    ingredientIds: ["kefir"],
    newestRank: 4,
    bestSellerRank: 6,
  },
  "dermal-cucumber-collagen-essence-mask": {
    categoryIds: ["masks"],
    concernIds: ["sensitive-skin"],
    ingredientIds: ["cucumber", "collagen"],
    newestRank: 7,
    bestSellerRank: 7,
  },
  "lacto-cica-barrier-cream-moisturizer": {
    categoryIds: ["moisturizers"],
    concernIds: ["sensitive-skin", "dryness-dehydration"],
    ingredientIds: ["cica", "ceramide"],
    newestRank: 8,
    bestSellerRank: 8,
  },
  "haruharu-wonder-black-rice-hyaluronic-toner": {
    categoryIds: ["toners"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["black-rice", "hyaluronic-acid"],
    newestRank: 9,
    bestSellerRank: 9,
  },
  "haruharu-wonder-black-rice-moisture-cleansing-oil": {
    categoryIds: ["cleansers"],
    concernIds: ["deep-cleansing", "pore-minimizer"],
    ingredientIds: ["black-rice"],
    newestRank: 10,
    bestSellerRank: 10,
  },
  "dermal-pomegranate-collagen-essence-mask": {
    categoryIds: ["masks"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["pomegranate", "collagen"],
    newestRank: 11,
    bestSellerRank: 11,
  },
  "dermal-charcoal-collagen-essence-mask": {
    categoryIds: ["masks"],
    concernIds: ["pore-minimizer", "deep-cleansing"],
    ingredientIds: ["charcoal", "collagen"],
    newestRank: 12,
    bestSellerRank: 12,
  },
  "mixsoon-bean-essence": {
    categoryIds: ["toners"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["fermented-soy"],
    newestRank: 13,
    bestSellerRank: 13,
  },
  "skin-1004-madagascar-centella-poremizing-fresh-ampoule": {
    categoryIds: ["toners"],
    concernIds: ["pore-minimizer"],
    ingredientIds: ["centella"],
    newestRank: 14,
    bestSellerRank: 14,
  },
  "anjo-professional-snail-bb-cream": {
    categoryIds: ["bb-cream"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["snail-mucin"],
    newestRank: 15,
    bestSellerRank: 15,
  },
  "ladamer-oligoforce-serum-hydrating": {
    categoryIds: ["toners"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["marine-mineral"],
    newestRank: 16,
    bestSellerRank: 16,
  },
  "ladamer-cell-clinic-bb-cream": {
    categoryIds: ["bb-cream"],
    concernIds: ["dryness-dehydration"],
    ingredientIds: ["collagen"],
    newestRank: 17,
    bestSellerRank: 17,
  },
  "ladamer-oligoforce-caviar-ampoule": {
    categoryIds: ["toners"],
    concernIds: ["anti-aging"],
    ingredientIds: ["caviar"],
    newestRank: 18,
    bestSellerRank: 18,
  },
  "elensilia-escargot-anti-wrinkle-multi-balm": {
    categoryIds: ["moisturizers"],
    concernIds: ["anti-aging", "dryness-dehydration"],
    ingredientIds: ["snail-mucin"],
    newestRank: 19,
    bestSellerRank: 19,
  },
  "elensilia-cpp-collagen-peptide-eye-cream": {
    categoryIds: ["eye-care"],
    concernIds: ["anti-aging"],
    ingredientIds: ["peptide", "collagen"],
    newestRank: 20,
    bestSellerRank: 20,
  },
  "lactoderm-beneficial-moisturizing-cream": {
    categoryIds: ["moisturizers"],
    concernIds: ["sensitive-skin", "dryness-dehydration"],
    ingredientIds: ["probiotic"],
    newestRank: 21,
    bestSellerRank: 21,
  },
};

const LABEL: Record<string, string> = {
  bundles: "Bundles & kits",
  moisturizers: "Moisturizers",
  masks: "Masks",
  sunscreen: "Sunscreen",
  toners: "Toners",
  cleansers: "Cleansers",
  "bb-cream": "BB Cream",
  "eye-care": "Eye Care",
  "sun-protection": "Sun Protection",
  "deep-cleansing": "Deep Cleansing",
  "dryness-dehydration": "Dryness & Dehydration",
  "anti-aging": "Anti-Aging",
  "pore-minimizer": "Pore Minimizer",
  "sensitive-skin": "Sensitive Skin",
  "snail-mucin": "Snail mucin",
  collagen: "Collagen",
  rice: "Rice",
  "black-rice": "Black rice",
  "mineral-spf": "Mineral SPF",
  blueberry: "Blueberry",
  "tea-tree": "Tea tree",
  kefir: "Kefir",
  cucumber: "Cucumber",
  cica: "Cica",
  ceramide: "Ceramide",
  "hyaluronic-acid": "Hyaluronic acid",
  pomegranate: "Pomegranate",
  charcoal: "Charcoal",
  centella: "Centella",
  "fermented-soy": "Fermented soy",
  "marine-mineral": "Marine minerals",
  caviar: "Caviar",
  peptide: "Peptides",
  probiotic: "Probiotic care",
  "under-1k": "Under Rs.1,000",
  "1k-3k": "Rs.1,000 – 3,000",
  "3k-6k": "Rs.3,000 – 6,000",
  "over-6k": "Over Rs.6,000",
  "in-stock": "In stock",
  "sold-out": "Sold out",
  single: "Single product",
  bundle: "Bundle / kit",
};

export const SORT_OPTIONS: { value: SortValue; label: string; disabled?: boolean }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "title-asc", label: "Alphabetical" },
  { value: "rating", label: "Customer rating", disabled: true },
];

export function enrichProducts(products: CatalogProduct[]): FilterableProduct[] {
  return products.map((product, index) => {
    const meta = PRODUCT_META[product.handle] ?? {
      categoryIds: [],
      concernIds: [],
      ingredientIds: [],
    };
    return {
      ...product,
      categoryIds: meta.categoryIds,
      concernIds: meta.concernIds,
      ingredientIds: meta.ingredientIds,
      kind: "single" as const,
      newestRank: meta.newestRank ?? index + 100,
      bestSellerRank: meta.bestSellerRank ?? index + 100,
    };
  });
}

export function bundlesAsFilterable(bundles: CatalogBundle[]): FilterableProduct[] {
  return bundles.map((bundle, index) => ({
    id: bundle.id,
    handle: bundle.handle,
    title: bundle.title,
    href: bundle.href,
    description: bundle.description,
    productType: "Bundle",
    price: bundle.price,
    compareAtPrice: bundle.compareAtPrice,
    availableForSale: bundle.availableForSale,
    badges: ["bestseller"] as CatalogProduct["badges"],
    imageAlt: bundle.imageAlt,
    imageSrc: bundle.imageSrc,
    categoryIds: ["bundles"],
    concernIds: [],
    ingredientIds: [],
    kind: "bundle" as const,
    newestRank: index + 1,
    bestSellerRank: index + 1,
  }));
}

function priceRangeFor(amount: number): PriceRangeId {
  if (amount < 1000) return "under-1k";
  if (amount < 3000) return "1k-3k";
  if (amount < 6000) return "3k-6k";
  return "over-6k";
}

function matchesPrice(amount: number, ranges: PriceRangeId[]) {
  if (!ranges.length) return true;
  return ranges.includes(priceRangeFor(amount));
}

export function defaultFilterState(overrides?: Partial<FilterState>): FilterState {
  return { ...EMPTY_FILTERS, ...overrides };
}

export function parseFilterParams(params: URLSearchParams): FilterState {
  const multi = (key: string) =>
    params
      .getAll(key)
      .flatMap((v) => v.split(","))
      .map((v) => v.trim())
      .filter(Boolean);

  const sort = (params.get("sort") as SortValue) || "featured";
  const page = Math.max(1, Number(params.get("page") || "1") || 1);

  return {
    categories: multi("category"),
    concerns: multi("concern"),
    ingredients: multi("ingredient"),
    productTypes: multi("type"),
    priceRanges: multi("price") as PriceRangeId[],
    availability: multi("availability") as FilterState["availability"],
    featured: params.get("featured") === "1" || params.get("featured") === "true",
    kind: multi("kind") as FilterState["kind"],
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? sort : "featured",
    page,
    q: params.get("q")?.trim() ?? "",
  };
}

export function serializeFilterParams(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  const setMulti = (key: string, values: string[]) => {
    if (values.length) params.set(key, values.join(","));
  };

  setMulti("category", state.categories);
  setMulti("concern", state.concerns);
  setMulti("ingredient", state.ingredients);
  setMulti("type", state.productTypes);
  setMulti("price", state.priceRanges);
  setMulti("availability", state.availability);
  setMulti("kind", state.kind);
  if (state.featured) params.set("featured", "1");
  if (state.sort && state.sort !== "featured") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.q) params.set("q", state.q);
  return params;
}

export function countActiveFilters(state: FilterState): number {
  return (
    state.categories.length +
    state.concerns.length +
    state.ingredients.length +
    state.productTypes.length +
    state.priceRanges.length +
    state.availability.length +
    state.kind.length +
    (state.featured ? 1 : 0) +
    (state.q ? 1 : 0)
  );
}

export function buildFilterChips(state: FilterState): FilterChip[] {
  const chips: FilterChip[] = [];
  const push = (
    group: FilterChip["group"],
    value: string,
    label = LABEL[value] ?? value,
  ) => chips.push({ id: `${group}:${value}`, group, value, label });

  state.categories.forEach((v) => push("categories", v));
  state.concerns.forEach((v) => push("concerns", v));
  state.ingredients.forEach((v) => push("ingredients", v));
  state.productTypes.forEach((v) => push("productTypes", v, v));
  state.priceRanges.forEach((v) => push("priceRanges", v));
  state.availability.forEach((v) => push("availability", v));
  state.kind.forEach((v) => push("kind", v));
  if (state.featured) push("featured", "1", "Best sellers");
  if (state.q) push("q", state.q, `Search: “${state.q}”`);
  return chips;
}

export function removeChip(state: FilterState, chip: FilterChip): FilterState {
  const next = { ...state, page: 1 };
  switch (chip.group) {
    case "categories":
      next.categories = state.categories.filter((v) => v !== chip.value);
      break;
    case "concerns":
      next.concerns = state.concerns.filter((v) => v !== chip.value);
      break;
    case "ingredients":
      next.ingredients = state.ingredients.filter((v) => v !== chip.value);
      break;
    case "productTypes":
      next.productTypes = state.productTypes.filter((v) => v !== chip.value);
      break;
    case "priceRanges":
      next.priceRanges = state.priceRanges.filter((v) => v !== chip.value);
      break;
    case "availability":
      next.availability = state.availability.filter((v) => v !== chip.value);
      break;
    case "kind":
      next.kind = state.kind.filter((v) => v !== chip.value);
      break;
    case "featured":
      next.featured = false;
      break;
    case "q":
      next.q = "";
      break;
  }
  return next;
}

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function toggleFilter(
  state: FilterState,
  group: Exclude<FilterChip["group"], "featured" | "q">,
  value: string,
): FilterState {
  const next = { ...state, page: 1 };
  switch (group) {
    case "categories":
      next.categories = toggleValue(state.categories, value);
      break;
    case "concerns":
      next.concerns = toggleValue(state.concerns, value);
      break;
    case "ingredients":
      next.ingredients = toggleValue(state.ingredients, value);
      break;
    case "productTypes":
      next.productTypes = toggleValue(state.productTypes, value);
      break;
    case "priceRanges":
      next.priceRanges = toggleValue(state.priceRanges, value as PriceRangeId);
      break;
    case "availability":
      next.availability = toggleValue(
        state.availability,
        value as "in-stock" | "sold-out",
      );
      break;
    case "kind":
      next.kind = toggleValue(state.kind, value as "single" | "bundle");
      break;
  }
  return next;
}

export function filterProducts(
  products: FilterableProduct[],
  state: FilterState,
): FilterableProduct[] {
  const q = state.q.toLowerCase();

  return products.filter((product) => {
    if (state.categories.length) {
      if (!product.categoryIds.some((id) => state.categories.includes(id))) return false;
    }
    if (state.concerns.length) {
      if (!product.concernIds.some((id) => state.concerns.includes(id))) return false;
    }
    if (state.ingredients.length) {
      if (!product.ingredientIds.some((id) => state.ingredients.includes(id))) return false;
    }
    if (state.productTypes.length) {
      if (!product.productType || !state.productTypes.includes(product.productType)) {
        return false;
      }
    }
    if (!matchesPrice(product.price.amount, state.priceRanges)) return false;
    if (state.availability.length) {
      const avail = product.availableForSale ? "in-stock" : "sold-out";
      if (!state.availability.includes(avail)) return false;
    }
    if (state.featured) {
      if (!product.badges?.includes("bestseller")) return false;
    }
    if (state.kind.length) {
      if (!state.kind.includes(product.kind)) return false;
    }
    if (q) {
      const hay = `${product.title} ${product.description} ${product.productType ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(
  products: FilterableProduct[],
  sort: SortValue,
): FilterableProduct[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price.amount - b.price.amount);
    case "price-desc":
      return list.sort((a, b) => b.price.amount - a.price.amount);
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
      return list.sort((a, b) => a.newestRank - b.newestRank);
    case "best-selling":
      return list.sort((a, b) => a.bestSellerRank - b.bestSellerRank);
    case "rating":
      return list; // future
    case "featured":
    default:
      return list.sort((a, b) => {
        const aScore = a.badges?.includes("bestseller") ? 0 : 1;
        const bScore = b.badges?.includes("bestseller") ? 0 : 1;
        if (aScore !== bScore) return aScore - bScore;
        return a.bestSellerRank - b.bestSellerRank;
      });
  }
}

export function paginateProducts<T>(
  products: T[],
  page: number,
  pageSize = COLLECTION_PAGE_SIZE,
) {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: products.slice(start, end),
    total,
    totalPages,
    page: safePage,
    pageSize,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(end, total),
  };
}

export function buildFacets(products: FilterableProduct[]): BrowseFacets {
  const countMap = (ids: string[]) => {
    const map = new Map<string, number>();
    ids.forEach((id) => map.set(id, (map.get(id) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([id, count]) => ({ id, label: LABEL[id] ?? id, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  const categories = countMap(products.flatMap((p) => p.categoryIds));
  const concerns = countMap(products.flatMap((p) => p.concernIds));
  const ingredients = countMap(products.flatMap((p) => p.ingredientIds));

  const typeMap = new Map<string, number>();
  products.forEach((p) => {
    if (!p.productType) return;
    typeMap.set(p.productType, (typeMap.get(p.productType) ?? 0) + 1);
  });
  const productTypes = Array.from(typeMap.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const priceIds: PriceRangeId[] = ["under-1k", "1k-3k", "3k-6k", "over-6k"];
  const priceRanges = priceIds
    .map((id) => ({
      id,
      label: LABEL[id],
      count: products.filter((p) => priceRangeFor(p.price.amount) === id).length,
    }))
    .filter((x) => x.count > 0);

  const inStock = products.filter((p) => p.availableForSale).length;
  const soldOut = products.length - inStock;

  const singles = products.filter((p) => p.kind === "single").length;
  const bundles = products.filter((p) => p.kind === "bundle").length;

  return {
    categories,
    concerns,
    ingredients,
    productTypes,
    priceRanges,
    availability: [
      ...(inStock ? [{ id: "in-stock" as const, label: "In stock", count: inStock }] : []),
      ...(soldOut ? [{ id: "sold-out" as const, label: "Sold out", count: soldOut }] : []),
    ],
    kind: [
      ...(singles ? [{ id: "single" as const, label: "Single product", count: singles }] : []),
      ...(bundles ? [{ id: "bundle" as const, label: "Bundle / kit", count: bundles }] : []),
    ],
    hasFeatured: products.some((p) => p.badges?.includes("bestseller")),
  };
}

export function hrefForBrowsePage(
  basePath: string,
  state: FilterState,
  page: number,
): string {
  const params = serializeFilterParams({ ...state, page });
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
