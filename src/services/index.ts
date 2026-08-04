/**
 * Service layer — single entry for pages/actions/providers.
 * Today: seed façades. Tomorrow: Shopify client + mappers when `isShopifyLive()`.
 */

export {
  getProductService,
  listProductsService,
  getProductHandlesService,
  getProductPageService,
  listCatalogProductsService,
  getRelatedProductsService,
} from "./products";

export {
  getCollectionService,
  listCollectionsService,
  getCollectionPageService,
  getCollectionHandlesService,
  listCollectionCardsService,
} from "./collections";

export {
  getPrimaryNavService,
  getFooterMenusService,
} from "./menus";

export {
  searchService,
  searchCatalogService,
  getSearchDiscoveryService,
} from "./search";

export { getHomepageBundleService } from "./homepage";

export {
  getCartBootstrapService,
  createCartWithLineService,
  getCartCheckoutUrlService,
} from "./cart";

export { resolveCheckoutHandoffService } from "./checkout";

export { newsletterSubscribeService } from "./newsletter";

export { submitContactService } from "./contact";

export { trackOrderService } from "./tracking";

export {
  getProductReviewsService,
  getConfiguredReviewProvider,
} from "./reviews";

export { validateDiscountCodeService } from "./discount";

export {
  getShippingProgressService,
  estimateShippingService,
} from "./shipping";

export {
  getCustomerProfileService,
  listCustomerOrdersService,
  getCustomerOrderService,
} from "./customer";

export {
  syncWishlistWithCustomerService,
  mergeWishlistHandles,
  readGuestWishlist,
} from "./wishlist";
