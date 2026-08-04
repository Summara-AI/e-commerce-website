/**
 * Search index — Shopify-ready shapes.
 * Swap SEARCH_INDEX for Storefront API predictive search later.
 */

export type SearchResultType = "product" | "bundle" | "collection" | "page";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  href: string;
  subtitle?: string;
  priceLabel?: string;
  /** IMAGE SPEC — Search thumb 1:1, 96–128px display, serve 256 WebP */
  imageAlt?: string;
};

export const POPULAR_SEARCHES = [
  "Sunscreen",
  "Sensitive skin",
  "Haruharu",
  "Sheet mask",
  "Starter kit",
  "Snail cream",
] as const;

/** Catalog seed from koreanskinlab.pk — not invented SKUs */
export const SEARCH_INDEX: SearchResult[] = [
  {
    id: "escargot-cream",
    type: "product",
    title: "Escargot Original Facial Repair Cream",
    subtitle: "Moisturizer · Hydration",
    href: "/products/escargot-original-facial-repair-cream",
    priceLabel: "Rs.4,000",
    imageAlt: "Escargot Original Facial Repair Cream packshot",
  },
  {
    id: "haruharu-spf",
    type: "product",
    title: "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
    subtitle: "Sunscreen · Sun Protection",
    href: "/products/haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    priceLabel: "Rs.5,200",
    imageAlt: "Haruharu mineral sunscreen packshot",
  },
  {
    id: "haruharu-toner",
    type: "product",
    title: "Haruharu Wonder Black Rice Hyaluronic Toner",
    subtitle: "Toner · Hydration",
    href: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
    priceLabel: "Rs.8,000",
    imageAlt: "Haruharu hyaluronic toner packshot",
  },
  {
    id: "haruharu-oil",
    type: "product",
    title: "HARUHARU Wonder Black Rice Moisture Cleansing Oil",
    subtitle: "Cleanser · Deep cleansing",
    href: "/products/haruharu-wonder-black-rice-moisture-cleansing-oil",
    priceLabel: "Rs.6,200",
    imageAlt: "Haruharu cleansing oil packshot",
  },
  {
    id: "dermal-rice",
    type: "product",
    title: "DERMAL Rice Collagen Essence Mask",
    subtitle: "Mask",
    href: "/products/dermal-rice-collagen-essence-mask",
    priceLabel: "Rs.405",
    imageAlt: "DERMAL rice mask packshot",
  },
  {
    id: "dermal-tea",
    type: "product",
    title: "DERMAL Tea Tree Collagen Essence Mask",
    subtitle: "Mask",
    href: "/products/dermal-tea-tree-collagen-essence-mask",
    priceLabel: "Rs.405",
    imageAlt: "DERMAL tea tree mask packshot",
  },
  {
    id: "lacto-cica",
    type: "product",
    title: "Lacto Cica Barrier Cream Moisturizer",
    subtitle: "Moisturizer · Sensitive skin",
    href: "/products/lacto-cica-barrier-cream-moisturizer",
    priceLabel: "Rs.5,400",
    imageAlt: "Lacto Cica barrier cream packshot",
  },
  {
    id: "starter-kit",
    type: "bundle",
    title: "K-Beauty Starter Kit",
    subtitle: "Complete daily routine",
    href: "/products/k-beauty-starter-kit",
    priceLabel: "Rs.21,000",
    imageAlt: "K-Beauty Starter Kit",
  },
  {
    id: "am-trio",
    type: "bundle",
    title: "K-Glow AM Trio",
    subtitle: "Morning routine",
    href: "/products/k-glow-am-trio",
    priceLabel: "Rs.18,000",
    imageAlt: "K-Glow AM Trio",
  },
  {
    id: "col-sun",
    type: "collection",
    title: "Sun Protection",
    subtitle: "Collection",
    href: "/collections/sun-protection",
  },
  {
    id: "col-sensitive",
    type: "collection",
    title: "Sensitive Skin",
    subtitle: "Collection",
    href: "/collections/sensitive-skin",
  },
  {
    id: "col-dry",
    type: "collection",
    title: "Dryness & Dehydration",
    subtitle: "Collection",
    href: "/collections/dryness-dehydration",
  },
  {
    id: "col-bundles",
    type: "collection",
    title: "Bundles & Kits",
    subtitle: "Collection",
    href: "/collections/bundles",
  },
  {
    id: "col-best",
    type: "collection",
    title: "Best Sellers",
    subtitle: "Collection",
    href: "/collections/best-sellers",
  },
  {
    id: "page-routine",
    type: "page",
    title: "Routine Builder",
    subtitle: "Guide",
    href: "/pages/routine-builder",
  },
  {
    id: "page-auth",
    type: "page",
    title: "Authenticity Promise",
    subtitle: "About",
    href: "/pages/authenticity",
  },
  {
    id: "page-ingredients",
    type: "page",
    title: "Ingredients Hub",
    subtitle: "Education",
    href: "/pages/ingredients",
  },
  {
    id: "page-story",
    type: "page",
    title: "Our Story",
    subtitle: "About",
    href: "/pages/our-story",
  },
  {
    id: "page-faq",
    type: "page",
    title: "FAQ",
    subtitle: "Help",
    href: "/pages/faq",
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contact",
    subtitle: "Support",
    href: "/pages/contact",
  },
  {
    id: "page-shipping",
    type: "page",
    title: "Shipping Policy",
    subtitle: "Policies",
    href: "/pages/shipping",
  },
  {
    id: "page-returns",
    type: "page",
    title: "Returns & Refunds",
    subtitle: "Policies",
    href: "/pages/returns",
  },
  {
    id: "page-track",
    type: "page",
    title: "Track Order",
    subtitle: "Orders",
    href: "/pages/track-order",
  },
  {
    id: "page-rvf",
    type: "page",
    title: "Real vs Fake Guide",
    subtitle: "Education",
    href: "/pages/real-vs-fake",
  },
  {
    id: "page-guides",
    type: "page",
    title: "Guides",
    subtitle: "Education",
    href: "/pages/guides",
  },
];

const RECENT_KEY = "ksl-recent-searches";

export function getRecentSearches(limit = 5): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string").slice(0, limit);
  } catch {
    return [];
  }
}

export function pushRecentSearch(query: string) {
  if (typeof window === "undefined") return;
  const cleaned = query.trim();
  if (cleaned.length < 2) return;
  try {
    const prev = getRecentSearches(8).filter((q) => q.toLowerCase() !== cleaned.toLowerCase());
    localStorage.setItem(RECENT_KEY, JSON.stringify([cleaned, ...prev].slice(0, 6)));
  } catch {
    /* ignore */
  }
}

export function searchCatalog(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX.filter((item) => {
    const hay = `${item.title} ${item.subtitle ?? ""}`.toLowerCase();
    return hay.includes(q);
  }).slice(0, limit);
}

export function groupSearchResults(results: SearchResult[]) {
  return {
    products: results.filter((r) => r.type === "product"),
    bundles: results.filter((r) => r.type === "bundle"),
    collections: results.filter((r) => r.type === "collection"),
    pages: results.filter((r) => r.type === "page"),
  };
}
