# Phase 11B — Integration strategy & API foundation

**Status:** Scaffold complete. **No live Shopify connection. No Shopify packages installed.**

Companion to [11A data architecture](./README.md).

## Documents

| Doc | Topic |
|-----|--------|
| [11B_ARCHITECTURE.md](./11B_ARCHITECTURE.md) | Folder structure & layering |
| [11B_GRAPHQL.md](./11B_GRAPHQL.md) | GraphQL module map |
| [11B_RENDERING_CACHE.md](./11B_RENDERING_CACHE.md) | SSG / ISR / RSC / cache tags |
| [11B_SEO_ANALYTICS.md](./11B_SEO_ANALYTICS.md) | SEO + analytics hooks |
| [11B_ERRORS_LOADING.md](./11B_ERRORS_LOADING.md) | Errors, fallbacks, skeletons |
| [11B_PERFORMANCE.md](./11B_PERFORMANCE.md) | Perf & maintainability notes |

## Layer diagram

```
UI (App Router RSC / Client islands)
        ↓
Server Actions (`src/actions`)     ← mutations (cart, forms, wishlist sync)
        ↓
Services (`src/services`)          ← read APIs; seed today, Shopify tomorrow
        ↓
Data façades (`src/data`)  OR  Shopify client (`src/lib/shopify`) + adapters
        ↓
GraphQL docs (`src/lib/graphql`)   ← placeholders only (11B)
        ↓
Types (`src/types` + `src/types/shopify`)
```

## Hard gates

1. `SHOPIFY_STOREFRONT_ENABLED` must stay `false` until 11C.
2. `canUseShopifyNetwork()` returns `false` in 11B.
3. `shopifyFetch` throws `ShopifyNotConnectedError`.
4. Domain models are not duplicated — `@/types` is canonical.
