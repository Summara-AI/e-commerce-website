/**
 * Canonical commerce TypeScript models — Shopify Storefront / Customer Account ready.
 * UI today consumes lean view models in `@/lib/catalog` and `@/lib/products`.
 * Adapters (future) map Shopify GraphQL → these shapes → existing UI props.
 *
 * DO NOT import Shopify SDK here. No live API calls.
 */

/** ISO-4217 money — aligns with Shopify MoneyV2 */
export type MoneyV2 = {
  amount: string;
  currencyCode: string;
  /** Pre-formatted for display (e.g. "Rs. 4,500") — computed in adapter */
  formatted: string;
};

export type ImageResource = {
  id: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
};

export type SeoFields = {
  title?: string;
  description?: string;
};

export type ProductBadgeKind =
  | "sale"
  | "new"
  | "bestseller"
  | "authentic"
  | "limited"
  | "bundle";

export type ProductMediaRole =
  | "featured"
  | "gallery"
  | "hover"
  | "lifestyle"
  | "detail"
  | "packshot";

export type ProductMedia = ImageResource & {
  role: ProductMediaRole;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  sku?: string;
  barcode?: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  selectedOptions: { name: string; value: string }[];
  image?: ImageResource;
  weight?: { value: number; unit: string };
};

/**
 * Full product resource — Storefront API Product (+ metafields) mapping target.
 */
export type ShopifyProduct = {
  id: string;
  gid?: string;
  handle: string;
  /** Storefront path `/products/{handle}` */
  href: string;
  title: string;
  /** Optional short line under title (metafield) */
  subtitle?: string;
  description: string;
  descriptionHtml?: string;
  vendor?: string;
  productType?: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage?: ImageResource;
  images: ProductMedia[];
  hoverImage?: ImageResource;
  lifestyleImage?: ImageResource;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  variants: ProductVariant[];
  options: ProductOption[];
  selectedVariantId?: string;
  badges: ProductBadgeKind[];
  /** Reviews — future Judge.me / Shopify Reviews */
  reviews?: {
    ratingAverage?: number;
    ratingCount?: number;
    enabled: boolean;
  };
  /** Merchandising + education metafields (see docs/shopify/METAFIELDS.md) */
  metafields: ProductMetafields;
  seo?: SeoFields;
  publishedAt?: string;
  updatedAt?: string;
};

export type ProductMetafields = {
  ingredients?: string;
  keyIngredients?: { name: string; benefit?: string }[];
  skinConcerns?: string[];
  skinTypes?: string[];
  routineStep?: string;
  routineOrder?: number;
  usageInstructions?: string;
  benefits?: string[];
  faq?: { question: string; answer: string }[];
  shippingInfo?: string;
  authenticityNotes?: string;
  howToUseSteps?: { title: string; body: string }[];
  beforeAfter?: { before: ImageResource; after: ImageResource; caption?: string };
  videoUrl?: string;
  editorialHeadline?: string;
  [key: string]: unknown;
};

/**
 * Card / rail view model — what ProductCard consumes today.
 * Adapter projects ShopifyProduct → CatalogProduct-compatible shape.
 */
export type ProductCardModel = {
  id: string;
  handle: string;
  title: string;
  href: string;
  description: string;
  productType?: string;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  availableForSale: boolean;
  badges?: ProductBadgeKind[];
  imageAlt: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  ratingPlaceholder?: boolean;
};
