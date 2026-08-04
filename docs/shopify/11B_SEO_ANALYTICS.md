# SEO & analytics preparation (11B)

## SEO (already strong; Shopify-ready)

| Capability | Location | Shopify handoff |
|------------|----------|-----------------|
| Metadata helper | `createPageMetadata` | Map `seo.title` / `seo.description` |
| Shopify SEO mapper | `metadataFromShopifySeo` | Use in PDP/PLP `generateMetadata` |
| Canonical / OG / Twitter | `src/lib/seo.ts` | Use product featured image URL |
| Organization / WebSite JSON-LD | `JsonLd` in root layout | Keep |
| Product / Collection / Breadcrumb / FAQ | `src/components/seo/JsonLd.tsx` | Feed from adapters |
| robots / sitemap | `src/app/robots.ts`, `sitemap.ts` | Include live handles from Shopify |

### Structured data checklist (11C)

- [ ] Product: price, availability, sku/barcode, brand, images
- [ ] Collection: ItemList of products (cap size)
- [ ] Article: BlogPosting for journal
- [ ] BreadcrumbList on PDP / PLP / pages
- [ ] FAQPage where FAQ groups render

## Analytics integration points

**Do not install pixels yet.** Scaffold:

- `src/lib/analytics` — event names + public env readers
- `src/components/analytics/AnalyticsProvider` — wired in `Providers` (no-op)
- `CookieConsent` — gate future script loaders on `accepted`
- `.env.example` — GA4, GTM, Meta, TikTok, Pinterest, Clarity IDs

### Event map

| Storefront moment | Event |
|-------------------|--------|
| Route change | `page_view` |
| PDP view | `view_item` |
| PLP / rails | `view_item_list` |
| Add to bag | `add_to_cart` |
| Checkout CTA | `begin_checkout` |
| Search submit | `search` (+ `logSearchAction`) |
| Wishlist | `add_to_wishlist` |
| Newsletter | `newsletter_subscribe` |

### Server-side (future)

- Prefer server GTM / Conversions API after consent architecture
- Never send cart tokens or emails to client analytics without policy review
