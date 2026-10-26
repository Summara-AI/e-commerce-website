/**
 * Metafield namespace contracts — documentation + typing only.
 * Definitions are created in Shopify Admin / TOML later (not here).
 */

export type MetafieldOwnerType =
  | "product"
  | "productvariant"
  | "collection"
  | "shop"
  | "page"
  | "customer"
  | "blog"
  | "article";

export type MetafieldDefinitionPlan = {
  namespace: string;
  key: string;
  name: string;
  description: string;
  type: string;
  ownerType: MetafieldOwnerType;
  /** When true — required for premium PDP experience */
  requiredForUi?: boolean;
};

/**
 * Planned custom metafields (namespace `ksl` = SCYN).
 * Do not create in Shopify until Phase 11B+.
 */
export const PLANNED_METAFIELDS: MetafieldDefinitionPlan[] = [
  // ——— Product ———
  {
    namespace: "ksl",
    key: "subtitle",
    name: "Subtitle",
    description: "Short line under product title on PDP",
    type: "single_line_text_field",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "ingredients",
    name: "Ingredients",
    description: "Full INCI / ingredients list",
    type: "multi_line_text_field",
    ownerType: "product",
    requiredForUi: true,
  },
  {
    namespace: "ksl",
    key: "key_ingredients",
    name: "Key ingredients",
    description: "Highlighted actives with benefits",
    type: "json",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "skin_concerns",
    name: "Skin concerns",
    description: "Concern tags for filters and routine builder",
    type: "list.single_line_text_field",
    ownerType: "product",
    requiredForUi: true,
  },
  {
    namespace: "ksl",
    key: "skin_types",
    name: "Skin types",
    description: "Recommended skin types",
    type: "list.single_line_text_field",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "routine_step",
    name: "Routine step",
    description: "e.g. cleanser, toner, moisturizer, sunscreen",
    type: "single_line_text_field",
    ownerType: "product",
    requiredForUi: true,
  },
  {
    namespace: "ksl",
    key: "routine_order",
    name: "Routine order",
    description: "Numeric step order in AM/PM routine",
    type: "number_integer",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "usage_instructions",
    name: "Usage instructions",
    description: "How to use narrative",
    type: "multi_line_text_field",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "benefits",
    name: "Benefits",
    description: "Benefit bullets",
    type: "list.single_line_text_field",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "faq",
    name: "Product FAQ",
    description: "PDP FAQ accordion JSON",
    type: "json",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "shipping_info",
    name: "Shipping info",
    description: "Product-specific shipping notes",
    type: "multi_line_text_field",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "authenticity_notes",
    name: "Authenticity notes",
    description: "Trust / authenticity copy block",
    type: "multi_line_text_field",
    ownerType: "product",
    requiredForUi: true,
  },
  {
    namespace: "ksl",
    key: "hover_image",
    name: "Hover image",
    description: "Secondary packshot for card hover",
    type: "file_reference",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "lifestyle_image",
    name: "Lifestyle image",
    description: "Editorial lifestyle for PDP / homepage",
    type: "file_reference",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "before_after",
    name: "Before & after",
    description: "Optional results imagery JSON",
    type: "json",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "video_url",
    name: "Video URL",
    description: "Product education video",
    type: "url",
    ownerType: "product",
  },
  {
    namespace: "ksl",
    key: "badge_override",
    name: "Badge override",
    description: "Force badge: new | bestseller | limited",
    type: "single_line_text_field",
    ownerType: "product",
  },
  // ——— Collection ———
  {
    namespace: "ksl",
    key: "hero_image",
    name: "Hero image",
    description: "Collection PLP hero photography",
    type: "file_reference",
    ownerType: "collection",
  },
  {
    namespace: "ksl",
    key: "banner_image",
    name: "Banner image",
    description: "Optional wide banner",
    type: "file_reference",
    ownerType: "collection",
  },
  {
    namespace: "ksl",
    key: "icon",
    name: "Collection icon",
    description: "Small icon for concern grids",
    type: "file_reference",
    ownerType: "collection",
  },
  {
    namespace: "ksl",
    key: "badge",
    name: "Collection badge",
    description: "e.g. New concerns, Best sellers",
    type: "single_line_text_field",
    ownerType: "collection",
  },
  {
    namespace: "ksl",
    key: "seo_content",
    name: "SEO content",
    description: "Long-form SEO HTML below grid",
    type: "rich_text_field",
    ownerType: "collection",
  },
  {
    namespace: "ksl",
    key: "skin_concern",
    name: "Skin concern key",
    description: "Maps to routine builder concern id",
    type: "single_line_text_field",
    ownerType: "collection",
  },
  // ——— Shop ———
  {
    namespace: "ksl",
    key: "free_shipping_threshold",
    name: "Free shipping threshold",
    description: "Cart progress bar threshold amount",
    type: "number_decimal",
    ownerType: "shop",
  },
  {
    namespace: "ksl",
    key: "authenticity_promise",
    name: "Authenticity promise",
    description: "Global trust statement",
    type: "multi_line_text_field",
    ownerType: "shop",
  },
  // ——— Customer ———
  {
    namespace: "ksl",
    key: "wishlist",
    name: "Wishlist product GIDs",
    description: "Logged-in wishlist persistence",
    type: "list.product_reference",
    ownerType: "customer",
  },
];
