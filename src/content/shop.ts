/**
 * Shop landing (`/collections/all`) — curated discovery hub.
 * Shopify: map to collection template section settings / metafields later.
 * Product grid, filters, and sorting ship in a later phase.
 */

export const SHOP_HERO = {
  eyebrow: "Shop",
  title: "A quieter way to discover Korean skincare",
  description:
    "Browse authentic K-beauty by category, skin concern, or curated collection — verified products, thoughtfully organised.",
  primaryCta: {
    label: "Shop best sellers",
    href: "/collections/best-sellers",
  },
  secondaryCta: {
    label: "Browse categories",
    href: "#shop-categories",
  },
  /** Compact overview — mirrors primary shopping paths without overcrowding the hero */
  categoryOverview: [
    { id: "best", label: "Best Sellers", href: "/collections/best-sellers" },
    { id: "cleansers", label: "Cleansers", href: "/collections/cleansers" },
    { id: "sunscreen", label: "Sunscreen", href: "/collections/sunscreen" },
    { id: "masks", label: "Masks", href: "/collections/masks" },
    { id: "bundles", label: "Bundles", href: "/collections/bundles" },
    { id: "sensitive", label: "Sensitive Skin", href: "/collections/sensitive-skin" },
  ],
} as const;

export const SHOP_CATEGORIES = {
  eyebrow: "Categories",
  title: "Shop by product type",
  description:
    "Start with the step you need — cleansers through SPF, organised the way routines are built.",
} as const;

export const SHOP_FEATURED_COLLECTIONS = {
  eyebrow: "Collections",
  title: "Curated paths into the catalogue",
  description:
    "Highlight collections for discovery — seasonal merchandising and curated edits, ready for Shopify.",
} as const;

export const SHOP_DISCOVERY = {
  eyebrow: "Discover",
  title: "Begin where curiosity takes you",
  description:
    "A calm entry into browsing. Full collection grids, filters, and sorting arrive next — for now, follow a curated path.",
  pathways: [
    {
      id: "types",
      title: "By product type",
      description: "Cleansers, toners, moisturizers, masks, SPF.",
      href: "#shop-categories",
      cta: "Browse types",
    },
    {
      id: "bundles",
      title: "Bundles & kits",
      description: "Complete routines in fewer decisions.",
      href: "/collections/bundles",
      cta: "View kits",
    },
  ],
  productsHeading: "A taste of best sellers",
  productsCta: {
    label: "View all best sellers",
    href: "/collections/best-sellers",
  },
} as const;

export const SHOP_BREADCRUMB = [{ label: "Shop" }] as const;
