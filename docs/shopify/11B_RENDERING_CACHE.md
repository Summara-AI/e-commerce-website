# Rendering & cache strategy (11B)

## Per-route rendering

| Route | Strategy | Why |
|-------|----------|-----|
| `/` homepage | **ISR** (`revalidate` ~60s) + RSC | Merch changes often; mostly static shell |
| `/products/[handle]` | **ISR** (~120s) + `generateStaticParams` hot set | SEO + TTFB; on-demand revalidate on product webhooks |
| `/collections/[handle]` | **ISR** (~120s) | Same as products; filters can be client overlay |
| `/collections/all` | **ISR** | Category grid from collections list |
| `/pages/*`, `/policies/*` | **ISR** (~600s) or SSG | Rarely change |
| `/search` | **Dynamic** (`force-dynamic` or short cache) | Query string; predictive suggestions can be ISR |
| `/cart` | **Dynamic** + Client | Session cart; no shared cache |
| `/wishlist` | **Dynamic** + Client | Guest localStorage |
| `/account/**` | **Dynamic** + auth | Never cache PII in Data Cache |
| `sitemap` / `robots` | **ISR** / static | Rebuild on catalog webhook |

## Server vs Client Components

| Prefer **Server** | Prefer **Client** |
|-------------------|-------------------|
| Product / collection reads | Cart drawer, qty steppers |
| Metadata, JSON-LD | Filters, infinite scroll |
| Homepage section data fetch | Mega menu open state, drawers |
| Policy / FAQ markup | Forms with local validation UX |
| | Motion / Embla / sticky bars |

Do **not** convert motion-heavy home sections to RSC in this phase (visual parity). Document for a later hydration pass.

## Cache tags (`src/lib/cache`)

| Data | Tag | Revalidate when |
|------|-----|-----------------|
| Product | `shopify:product:{handle}` | Product update webhook |
| Products list | `shopify:products` | Bulk catalog change |
| Collection | `shopify:collection:{handle}` | Collection / publish |
| Menus | `shopify:menus` | Navigation change |
| Homepage | `shopify:homepage` | Metaobject / featured collection |
| Search suggestions | `shopify:search` | Short TTL only |
| Recommendations | `shopify:recommendations` | Product update |
| Customer | **none (private)** | — |
| Cart | **none (session)** | — |

Helpers: `revalidateProduct`, `revalidateCollection`, `revalidateMenus`, `revalidateHomepage`.

## ISR windows (`REVALIDATE`)

Defined in `src/lib/cache/index.ts` — homepage 60s, product/collection 120s, nav 300s, content 600s.

## Duplicate-fetch prevention

- One service call per request; pass props to children
- Use React `cache()` wrappers around services in 11C
- `generateStaticParams` for top N products/collections only
