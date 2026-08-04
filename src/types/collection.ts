/**
 * Collection resource models — Shopify Collection mapping target.
 */

import type { ImageResource, ProductCardModel, SeoFields } from "./product";

export type CollectionStatus = "active" | "empty" | "coming-soon" | "unavailable";

export type CollectionSortKey =
  | "manual"
  | "best-selling"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "created-desc"
  | "created-asc";

export type CollectionFilterOption = {
  id: string;
  label: string;
  value: string;
  count?: number;
};

export type CollectionFilterGroup = {
  id: string;
  label: string;
  type: "list" | "boolean" | "price-range";
  options: CollectionFilterOption[];
};

export type CollectionMetafields = {
  heroImage?: ImageResource;
  bannerImage?: ImageResource;
  icon?: ImageResource;
  badge?: string;
  seoContentHtml?: string;
  skinConcern?: string;
  editorialIntro?: string;
  highlightProductHandles?: string[];
  [key: string]: unknown;
};

/**
 * Full collection resource — Storefront Collection (+ metafields).
 */
export type ShopifyCollection = {
  id: string;
  gid?: string;
  handle: string;
  href: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  image?: ImageResource;
  heroImage?: ImageResource;
  bannerImage?: ImageResource;
  featured?: boolean;
  imageAlt: string;
  imageSrc?: string;
  metafields: CollectionMetafields;
  seo?: SeoFields;
  updatedAt?: string;
};

/**
 * PLP page model — what collection routes consume today (+ Shopify-ready extras).
 */
export type CollectionPageModel = {
  handle: string;
  collection: ShopifyCollection;
  status: CollectionStatus;
  products: ProductCardModel[];
  featuredProducts?: ProductCardModel[];
  bundles?: ProductCardModel[];
  productCount: number;
  filters?: CollectionFilterGroup[];
  sortOptions?: { value: CollectionSortKey; label: string }[];
  sortKey?: CollectionSortKey;
  pagination?: {
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor?: string;
  };
  switcherHandles: string[];
  breadcrumbLabel: string;
  editorial?: {
    eyebrow?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
};

/** Card / tile view model */
export type CollectionCardModel = {
  id: string;
  handle: string;
  title: string;
  href: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
  /** light = charcoal type; dark = overlay + light type. Placeholders force light. */
  imageTone?: "light" | "dark";
  featured?: boolean;
  badge?: string;
};
