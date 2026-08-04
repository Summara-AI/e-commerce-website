/**
 * CMS / metaobject content models — Shopify Pages, Metaobjects, Blog mapping.
 */

import type { ImageResource } from "./product";

export type CmsPageId =
  | "about"
  | "authenticity"
  | "real-vs-fake"
  | "contact"
  | "faq"
  | "shipping"
  | "returns"
  | "privacy"
  | "terms"
  | "guides"
  | "routine-builder";

export type CmsPageModel = {
  id: CmsPageId | string;
  handle: string;
  title: string;
  description?: string;
  bodyHtml?: string;
  seo?: { title?: string; description?: string };
};

export type FaqItemModel = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export type FaqCategoryModel = {
  id: string;
  label: string;
};

export type TestimonialModel = {
  id: string;
  quote: string;
  author: string;
  rating: number;
  productTitle?: string;
  productHref?: string;
  placeholder?: boolean;
  image?: ImageResource;
};

export type JournalArticleModel = {
  id: string;
  title: string;
  summary: string;
  href: string;
  category: string;
  readingMinutes: number;
  imageAlt: string;
  imageSrc?: string;
};

export type HomepageCardModel = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type TrustItemModel = {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "package" | "headphones" | "lock";
};

export type RoutineStepModel = {
  id: string;
  number: string;
  title: string;
  description: string;
  iconKey?: string;
};

/**
 * Metaobject type handles planned in Shopify Admin.
 * See docs/shopify/METAOBJECTS.md
 */
export type MetaobjectTypeHandle =
  | "testimonial"
  | "editorial_story"
  | "routine_guide"
  | "ingredient"
  | "brand_story_block"
  | "faq_group"
  | "homepage_card"
  | "educational_block"
  | "skin_concern_guide"
  | "collection_highlight"
  | "trust_metric";
