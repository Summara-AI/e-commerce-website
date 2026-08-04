/**
 * Central type barrel — import commerce contracts from `@/types`.
 * Avoid duplicating interfaces across features.
 */

export type {
  MoneyV2,
  ImageResource,
  SeoFields,
  ProductBadgeKind,
  ProductMediaRole,
  ProductMedia,
  ProductOption,
  ProductVariant,
  ShopifyProduct,
  ProductMetafields,
  ProductCardModel,
} from "./product";

export type {
  CollectionStatus,
  CollectionSortKey,
  CollectionFilterOption,
  CollectionFilterGroup,
  CollectionMetafields,
  ShopifyCollection,
  CollectionPageModel,
  CollectionCardModel,
} from "./collection";

export type {
  CartDiscountApplication,
  CartLineModel,
  CartRecommendation,
  CartShippingProgress,
  ShopifyCart,
  AddToCartInput,
} from "./cart";

export type {
  CustomerProfile,
  CustomerAddress,
  OrderStatus,
  OrderLineItem,
  OrderTimelineStep,
  CustomerOrder,
  WishlistState,
  RecentlyViewedState,
  CustomerAccountModel,
} from "./customer";

export type {
  SearchResultType,
  SearchResultModel,
  SearchSuggestion,
  SearchDiscoveryModel,
  SearchResponse,
} from "./search";

export type {
  StoreMenuLink,
  StoreMenu,
  MegaMenuColumn,
  MegaMenuPanel,
  PrimaryNavItem,
  AnnouncementModel,
  ShopifyMenuHandles,
} from "./navigation";

export type {
  CmsPageId,
  CmsPageModel,
  FaqItemModel,
  FaqCategoryModel,
  TestimonialModel,
  JournalArticleModel,
  HomepageCardModel,
  TrustItemModel,
  RoutineStepModel,
  MetaobjectTypeHandle,
} from "./content";

export type {
  MetafieldOwnerType,
  MetafieldDefinitionPlan,
} from "./metafields";
export { PLANNED_METAFIELDS } from "./metafields";

export type {
  ThemeColorTokens,
  ThemeTypographyTokens,
  HomepageSectionSettings,
  CartThemeSettings,
  ThemeSettings,
} from "./theme";
