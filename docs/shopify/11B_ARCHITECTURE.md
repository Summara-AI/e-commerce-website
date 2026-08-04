# Architecture & folder structure (11B)

## Updated layout

```
src/
  actions/                 # Server Actions (cart, wishlist, forms, customer)
  components/
    analytics/             # AnalyticsProvider stub (no vendor SDKs)
  data/                    # Seed façades (11A) — swap behind services
  hooks/                   # UI + commerce stubs (recent searches, cart id)
  lib/
    analytics/             # Event names + public env ID readers
    api/                   # CommerceError + backend status
    cache/                 # Tags, revalidate helpers, ISR windows
    graphql/
      fragments/           # Product, collection, cart, menu
      queries/             # Products, collections, menus, pages, search,
                           # customers, cart, metaobjects, metafields
      mutations/           # Cart + customer
    shopify/
      adapters/            # Storefront JSON → @/types (stubs)
      client.ts            # Transport (blocked)
      config.ts            # Env config
      constants.ts         # Menu handles + cache tags
      images.ts            # CDN transform helpers
      seo.ts               # SEO field → metadata helper
    seo.ts                 # Existing page metadata helpers
  services/                # Page/action-facing read layer
  types/                   # Canonical commerce models (11A)
    shopify/               # GID / connection envelopes (re-exports @/types)
  utils/                   # GID + money normalization
```

## Responsibility rules

| Layer | May import | Must not |
|-------|------------|----------|
| Components | services (RSC), actions, hooks, types | `shopifyFetch` directly (prefer services) |
| Actions | services, shopify client (later), lib/api | UI components |
| Services | data façades **or** shopify+adapters | React |
| Adapters | `@/types`, utils | fetch |
| GraphQL | nothing runtime | execute queries in 11B |

## Naming

- Seed / facade: `getX` in `src/data`
- Service: `getXService` / `listXService`
- Action: `verbNounAction`
- Cache tag: `shopify:*` via `CACHE_TAG`
- Env: `SHOPIFY_*` server, `NEXT_PUBLIC_*` browser-safe only
