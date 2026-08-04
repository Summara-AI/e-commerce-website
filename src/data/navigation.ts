/**
 * Navigation / menus — Shopify menu / link lists later.
 *
 * Note: Live UI still reads `PRIMARY_NAV` from `@/lib/navigation`.
 * Shopify-ready menu contracts live in `@/types` (`StoreMenu` with `handle` + link `title`).
 * This façade uses a lean seed shape (`label`) until adapters map Admin menus → types.
 */

import {
  PRIMARY_NAV,
  UTILITY_LINKS,
} from "@/lib/navigation";
import {
  FOOTER_BRAND_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SHOP_LINKS,
  FOOTER_SUPPORT_LINKS,
} from "@/lib/site-content";

export type StoreMenuLink = { id: string; label: string; href: string };

export type StoreMenu = {
  id: string;
  title: string;
  links: StoreMenuLink[];
};

export function getPrimaryNavigation() {
  return PRIMARY_NAV;
}

export function getUtilityLinks() {
  return UTILITY_LINKS;
}

export function getFooterMenus(): StoreMenu[] {
  return [
    { id: "shop", title: "Shop", links: FOOTER_SHOP_LINKS },
    { id: "support", title: "Support", links: FOOTER_SUPPORT_LINKS },
    { id: "brand", title: "Brand", links: FOOTER_BRAND_LINKS },
    { id: "legal", title: "Legal", links: FOOTER_LEGAL_LINKS },
  ];
}
