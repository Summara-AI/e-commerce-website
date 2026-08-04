# Planned metafields

**Do not create these in Admin yet** — inventory for Phase 11B setup.

Namespace: prefer `ksl` for brand custom fields. Built-in Shopify namespaces (`seo`, etc.) stay as-is.

Canonical list also lives in code: `PLANNED_METAFIELDS` in `src/types/metafields.ts`.

## Product (`product`)

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.subtitle` | single_line_text | Card / PDP subtitle |
| `ksl.hover_image` | file_reference | Product card hover media |
| `ksl.lifestyle_image` | file_reference | Lifestyle / editorial shot |
| `ksl.gallery_priority` | list.file_reference | Ordered gallery override |
| `ksl.badges` | list.single_line_text | Badges (bestseller, limited, etc.) |
| `ksl.skin_concerns` | list.single_line_text | Concern tags for filters |
| `ksl.skin_types` | list.single_line_text | Skin type suitability |
| `ksl.routine_step` | single_line_text | Cleanser / toner / serum / … |
| `ksl.routine_order` | number_integer | Sort within routine |
| `ksl.benefits` | list.single_line_text | Benefit bullets |
| `ksl.key_ingredients` | list.metaobject_reference | Links to ingredient metaobjects |
| `ksl.ingredients_full` | multi_line_text | Full INCI list |
| `ksl.usage_instructions` | multi_line_text | How to use |
| `ksl.faq` | metaobject_reference | Product FAQ group |
| `ksl.shipping_info` | multi_line_text | Product-level shipping notes |
| `ksl.authenticity_notes` | multi_line_text | Authenticity callouts |
| `ksl.before_after` | list.metaobject_reference | Before/after pairs |
| `ksl.videos` | list.file_reference | PDP videos |
| `ksl.editorial_content` | rich_text | Long-form editorial block |
| `ksl.rating` | number_decimal | Aggregate rating (or reviews app) |
| `ksl.review_count` | number_integer | Review count |
| `ksl.includes` | list.product_reference | Bundle contents |

## Collection (`collection`)

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.hero_image` | file_reference | PLP / landing hero |
| `ksl.banner_image` | file_reference | Secondary banner |
| `ksl.icon` | file_reference | Concern/category icon |
| `ksl.badges` | list.single_line_text | Collection badges |
| `ksl.seo_content` | rich_text | Below-grid SEO copy |
| `ksl.editorial` | json | Eyebrow, body, CTA JSON |
| `ksl.skin_concern` | single_line_text | Canonical concern handle |
| `ksl.featured_product_handles` | list.product_reference | Manual featured products |

## Shop / brand (`shop`)

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.free_shipping_threshold` | money | Free shipping bar (null = hide) |
| `ksl.announcement_default` | multi_line_text | Fallback announcement |
| `ksl.support_whatsapp` | single_line_text | WhatsApp URL |
| `ksl.support_email` | single_line_text | Support email |

## Customer (`customer`)

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.wishlist` | list.product_reference | Server wishlist for logged-in users |
| `ksl.recently_viewed` | list.product_reference | Recently viewed |
| `ksl.rewards_tier` | single_line_text | Future loyalty (stub) |

## Page (`page`)

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.hero_image` | file_reference | Page hero |
| `ksl.sections` | json | Ordered section config |
| `ksl.related_products` | list.product_reference | Related products |

## Variant (`product_variant`) — optional

| Key | Type | Purpose |
|-----|------|---------|
| `ksl.unit_label` | single_line_text | Size display override |

## Adapter notes

- Seed `CatalogProduct` already carries many of these as flat fields; adapters map metafield → view model.
- Reviews: prefer a reviews app; metafields are fallback aggregates only.
- Never put secrets in metafields.
