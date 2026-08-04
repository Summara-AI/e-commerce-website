/**
 * Commerce + content data façade.
 * Swap implementations for Shopify Storefront API / Admin / metaobjects later
 * without rewriting UI components.
 */

export { SITE_SETTINGS, type SiteSettings } from "./settings";

export {
  getAllProducts,
  getProductByHandle,
  getProductHandles,
  type StoreProduct,
} from "./products";

export {
  getAllCollections,
  getCollectionByHandle,
  getCollectionHandles,
  type StoreCollection,
} from "./collections";

export {
  getPrimaryNavigation,
  getFooterMenus,
  type StoreMenu,
  type StoreMenuLink,
} from "./navigation";

export {
  getAnnouncements,
  getFaqItems,
  getFaqCategories,
  getTestimonials,
  getCmsPage,
  type CmsPageId,
} from "./content";

export {
  getHomepageSectionSettings,
  getHomeHero,
  getHomeQuickEntries,
  getHomeBestSellers,
  getHomeFeaturedCollections,
  getHomeFeaturedBundles,
  getHomeBrandStory,
  getHomeWhyChoose,
  getHomeScienceAuthenticity,
  getHomeTrustItems,
  getHomeTestimonials,
  getHomeJournal,
  getHomeCommunity,
  getHomeNewsletter,
  getHomeFinalCta,
  getHomeRoutinePath,
  getHomeStoreContext,
} from "./homepage";

export {
  createEmptyCart,
  getCartShippingProgress,
} from "./cart";

export { searchStore, getSearchDiscovery } from "./search";

export {
  createEmptyWishlist,
  WISHLIST_STORAGE_KEY,
  WISHLIST_SYNC_STRATEGY,
} from "./wishlist";

export { getAccountScaffold, ACCOUNT_ROUTE_MAP } from "./account";
