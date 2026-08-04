/**
 * Navigation + mega-menu data (Shopify-ready).
 * Replace static arrays with Shopify Menu / Collection fetches later —
 * keep these shapes stable for theme settings / Storefront API mapping.
 */

export type NavLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

export type MegaColumn = {
  id: string;
  title: string;
  links: NavLink[];
};

export type MegaPromo = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  /**
   * IMAGE SPEC — Mega promo
   * Purpose: Editorial campaign tile inside mega menu
   * Aspect: 4:5
   * Desktop: 480×600 | Laptop: 400×500 | Tablet: n/a (drawer)
   * Format: AVIF/WebP, q~75; no text in image
   */
  image?: {
    src?: string;
    alt: string;
  };
};

export type MegaPanel = {
  columns: MegaColumn[];
  educational?: NavLink[];
  promo?: MegaPromo;
};

export type PrimaryNavItem = {
  id: string;
  label: string;
  href: string;
  /** Shopify menu handle when connected */
  shopifyHandle?: string;
  mega?: MegaPanel;
};

/** Phase 1 IA — shop, bundles, routines, about */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  {
    id: "shop",
    label: "Shop",
    href: "/collections/all",
    shopifyHandle: "main-menu-shop",
    mega: {
      columns: [
        {
          id: "discover",
          title: "Discover",
          links: [
            { id: "all", label: "Shop All", href: "/collections/all" },
            { id: "best", label: "Best Sellers", href: "/collections/best-sellers" },
            { id: "new", label: "New Arrivals", href: "/collections/new-arrivals" },
            { id: "bundles", label: "Bundles & Kits", href: "/collections/bundles" },
          ],
        },
        {
          id: "type",
          title: "By Type",
          links: [
            { id: "cleansers", label: "Cleansers", href: "/collections/cleansers" },
            { id: "toners", label: "Toners", href: "/collections/toners" },
            { id: "moisturizers", label: "Moisturizers", href: "/collections/moisturizers" },
            { id: "masks", label: "Masks", href: "/collections/masks" },
            { id: "sunscreen", label: "Sunscreen", href: "/collections/sunscreen" },
            { id: "bb", label: "BB Cream", href: "/collections/bb-cream" },
            { id: "eye", label: "Eye Care", href: "/collections/eye-care" },
          ],
        },
      ],
      promo: {
        id: "starter-kit",
        eyebrow: "Editorial pick",
        title: "The Starter Ritual Edit",
        description: "A polished four-step K-beauty ritual curated for first-time glow seekers.",
        ctaLabel: "Discover the ritual",
        href: "/products/k-beauty-starter-kit",
        image: {
          alt: "Editorial skincare flat-lay for starter ritual panel",
        },
      },
    },
  },
  {
    id: "bundles",
    label: "Bundles",
    href: "/collections/bundles",
    shopifyHandle: "main-menu-bundles",
  },
  {
    id: "routines",
    label: "Routines",
    href: "/pages/routine-builder",
    shopifyHandle: "main-menu-routines",
    mega: {
      columns: [
        {
          id: "routine-links",
          title: "Routines",
          links: [
            { id: "builder", label: "Routine Builder", href: "/pages/routine-builder" },
            { id: "start", label: "How to Start K-Beauty", href: "/pages/guides" },
            { id: "am", label: "K-Glow AM Trio", href: "/products/k-glow-am-trio" },
            { id: "kit", label: "K-Beauty Starter Kit", href: "/products/k-beauty-starter-kit" },
          ],
        },
      ],
    },
  },
  {
    id: "about",
    label: "About",
    href: "/pages/our-story",
    shopifyHandle: "main-menu-about",
    mega: {
      columns: [
        {
          id: "brand",
          title: "Brand",
          links: [
            { id: "story", label: "Our Story", href: "/pages/our-story" },
            { id: "auth", label: "Authenticity", href: "/pages/authenticity" },
            { id: "real-fake", label: "Real vs Fake", href: "/pages/real-vs-fake" },
            { id: "guides", label: "Guides", href: "/pages/guides" },
            { id: "routine", label: "Routine Builder", href: "/pages/routine-builder" },
          ],
        },
        {
          id: "support",
          title: "Support",
          links: [
            { id: "faq", label: "FAQ", href: "/pages/faq" },
            { id: "shipping", label: "Shipping", href: "/pages/shipping" },
            { id: "returns", label: "Returns", href: "/pages/returns" },
            { id: "contact", label: "Contact", href: "/pages/contact" },
            { id: "track", label: "Track Order", href: "/pages/track-order" },
          ],
        },
      ],
    },
  },
];

/** Kept for backwards-compatible imports */
export type NavChild = NavLink;
export type NavItem = PrimaryNavItem;

export const UTILITY_LINKS = [
  { label: "Track Order", href: "/pages/track-order" },
  { label: "Contact", href: "/pages/contact" },
] as const;

export const MOBILE_SUPPORT_LINKS: NavLink[] = [
  { id: "faq", label: "FAQ", href: "/pages/faq" },
  { id: "shipping", label: "Shipping", href: "/pages/shipping" },
  { id: "returns", label: "Returns", href: "/pages/returns" },
  { id: "contact", label: "Contact", href: "/pages/contact" },
  { id: "track", label: "Track Order", href: "/pages/track-order" },
];

export const MOBILE_POLICY_LINKS: NavLink[] = [
  { id: "privacy", label: "Privacy Policy", href: "/policies/privacy-policy" },
  { id: "terms", label: "Terms of Service", href: "/policies/terms-of-service" },
];

/** Tablet condensed primary links (not full mega) */
export const TABLET_PRIMARY_LINKS = PRIMARY_NAV.filter((item) =>
  ["shop", "bundles", "routines"].includes(item.id),
);

export type Announcement = {
  id: string;
  message: string;
  href?: string;
  linkLabel?: string;
};

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "auth",
    message: "100% authentic Korean skincare — sourced with care for Pakistan",
    href: "/pages/authenticity",
    linkLabel: "Our promise",
  },
  {
    id: "support",
    message: "Need help choosing? WhatsApp our skincare team",
    href: "https://wa.me/923277560880",
    linkLabel: "Message us",
  },
];
