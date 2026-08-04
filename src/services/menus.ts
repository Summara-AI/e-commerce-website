import { getFooterMenus, getPrimaryNavigation } from "@/data/navigation";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

/** Shopify: Menu API via SHOPIFY_MENU_HANDLES */
export function getPrimaryNavService() {
  if (isShopifyLive()) {
    throw new CommerceError("NOT_CONNECTED", "Shopify menus not wired.");
  }
  return getPrimaryNavigation();
}

export function getFooterMenusService() {
  if (isShopifyLive()) {
    throw new CommerceError("NOT_CONNECTED", "Shopify footer menus not wired.");
  }
  return getFooterMenus();
}
