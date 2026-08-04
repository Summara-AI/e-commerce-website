/**
 * Commerce façade — pages/providers import services from here or `@/services`.
 * UI view models stay stable; only the service implementation swaps to Shopify.
 */

export {
  isShopifyLive,
  isDemoCommerce,
  isShopifyConfiguredPendingTransport,
} from "./mode";

export {
  getProductPageService,
  getProductHandlesService,
  listCatalogProductsService,
  getRelatedProductsService,
} from "@/services/products";

export {
  getCollectionPageService,
  getCollectionHandlesService,
  listCollectionCardsService,
} from "@/services/collections";

export {
  searchCatalogService,
  getSearchDiscoveryService,
} from "@/services/search";

export { resolveCheckoutHandoffService } from "@/services/checkout";
export { submitContactService } from "@/services/contact";
export { trackOrderService } from "@/services/tracking";
export { getProductReviewsService } from "@/services/reviews";
export { validateDiscountCodeService } from "@/services/discount";
