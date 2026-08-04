import { getHomeStoreContext } from "@/data/homepage";
import { isShopifyLive } from "@/lib/commerce/mode";
import { CommerceError } from "@/lib/api/errors";

/** Aggregated homepage inputs — metaobjects / Shopify later */
export function getHomepageBundleService() {
  if (isShopifyLive()) {
    throw new CommerceError("NOT_CONNECTED", "Shopify homepage content not wired.");
  }
  return getHomeStoreContext();
}
