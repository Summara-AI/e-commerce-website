/**
 * Search models — Shopify Predictive Search / Storefront search mapping.
 */

export type SearchResultType = "product" | "collection" | "article" | "page" | "bundle";

export type SearchResultModel = {
  id: string;
  type: SearchResultType;
  title: string;
  href: string;
  subtitle?: string;
  priceLabel?: string;
  imageAlt?: string;
  imageSrc?: string;
};

export type SearchSuggestion = {
  id: string;
  query: string;
  href?: string;
};

export type SearchDiscoveryModel = {
  trending: SearchSuggestion[];
  popular: SearchSuggestion[];
  recent: string[];
  featuredProductHandles?: string[];
  featuredCollectionHandles?: string[];
};

export type SearchResponse = {
  query: string;
  results: SearchResultModel[];
  suggestions: SearchSuggestion[];
  totalCount: number;
  empty: boolean;
};
