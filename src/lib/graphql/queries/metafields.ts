/**
 * Metafields are usually selected as aliases on parent resources:
 *   subtitle: metafield(namespace: "ksl", key: "subtitle") { value }
 * Keep alias inventory here for codegen later.
 */

export const PRODUCT_METAFIELD_ALIASES = [
  "subtitle",
  "ingredients",
  "key_ingredients",
  "skin_concerns",
  "skin_types",
  "routine_step",
  "routine_order",
  "benefits",
  "usage_instructions",
  "hover_image",
  "lifestyle_image",
  "badges",
  "authenticity_notes",
  "shipping_info",
] as const;

export const COLLECTION_METAFIELD_ALIASES = [
  "hero_image",
  "banner_image",
  "icon",
  "badges",
  "seo_content",
  "skin_concern",
] as const;
