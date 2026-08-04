# Shopify Data Architecture — Korean Skin Lab

**Phase 11A** — Planning only. No Storefront API, GraphQL, or Shopify packages.

## Goals

- Keep existing UI and design unchanged
- Define typed contracts in `src/types/`
- Centralize data access in `src/data/` façades
- Document menus, metafields, metaobjects, homepage sources, cart/checkout split
- Enable Phase 11B adapters with minimal component rewrites

## Package map

| Path | Purpose |
|------|---------|
| `src/types/` | Canonical Shopify-ready TypeScript contracts |
| `src/data/` | Façades over seed data (swap to API later) |
| `src/lib/catalog.ts` etc. | Current seed view models (still used by UI) |
| `docs/shopify/` | Architecture documentation |

## Documents in this folder

### Phase 11A — data architecture
1. [RESOURCE_MAPPING.md](./RESOURCE_MAPPING.md) — Component → Shopify resource
2. [HOMEPAGE.md](./HOMEPAGE.md) — Homepage section data sources
3. [MENUS.md](./MENUS.md) — Navigation menu handles
4. [METAFIELDS.md](./METAFIELDS.md) — Planned metafield definitions
5. [METAOBJECTS.md](./METAOBJECTS.md) — Planned metaobject types
6. [CART_CHECKOUT.md](./CART_CHECKOUT.md) — Cart storefront vs checkout
7. [SEARCH.md](./SEARCH.md) — Search resources & empty/trending
8. [WISHLIST.md](./WISHLIST.md) — Guest vs logged-in persistence
9. [ACCOUNT.md](./ACCOUNT.md) — Customer account surfaces
10. [INTEGRATION_CHECKLIST.md](./INTEGRATION_CHECKLIST.md) — 11A–11C checklist

### Phase 11B — API foundation
See [11B_README.md](./11B_README.md) for architecture, GraphQL, rendering/cache, SEO/analytics, errors/loading, performance.


## Integration principle

```
Shopify (Admin / Storefront / Customer Account)
        ↓ adapters (Phase 11B)
src/types (ShopifyProduct, ShopifyCart, …)
        ↓ projectors
src/lib view models OR card props (CatalogProduct, …)
        ↓
UI components (unchanged)
```

Until adapters exist, `src/data/*` returns the same seed content the UI already displays.
