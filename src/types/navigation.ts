/**
 * Navigation / menu models — Shopify Menu / linklists mapping.
 */

export type StoreMenuLink = {
  id: string;
  title: string;
  href: string;
  type?: "collection" | "product" | "page" | "blog" | "http" | "frontpage";
  items?: StoreMenuLink[];
};

export type StoreMenu = {
  id: string;
  handle: string;
  title: string;
  links: StoreMenuLink[];
};

export type MegaMenuColumn = {
  id: string;
  title?: string;
  links: StoreMenuLink[];
};

export type MegaMenuPanel = {
  columns: MegaMenuColumn[];
  educational?: { title: string; href: string; description?: string }[];
  promo?: {
    title: string;
    description?: string;
    href: string;
    imageSrc?: string;
    imageAlt?: string;
  };
};

export type PrimaryNavItem = {
  id: string;
  label: string;
  href: string;
  /** Shopify menu handle when nested */
  shopifyHandle?: string;
  mega?: MegaMenuPanel;
};

export type AnnouncementModel = {
  id: string;
  message: string;
  href?: string;
  linkLabel?: string;
  enabled?: boolean;
};

/**
 * Expected Shopify Online Store → Navigation menus.
 * See docs/shopify/MENUS.md
 */
export type ShopifyMenuHandles = {
  main: "main-menu";
  footerShop: "footer-shop";
  footerSupport: "footer-support";
  footerBrand: "footer-brand";
  footerLegal: "footer-legal";
  mobile: "mobile-menu";
  announcement: "announcement-bar";
};
