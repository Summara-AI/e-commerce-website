# Architecture overview

Korean Skin Lab storefront — Next.js App Router, TypeScript, Tailwind.

## Folder map

```
src/
  app/                 # Routes, metadata, loading/error/not-found
  actions/             # Server Actions (forms today; cart/customer later)
  components/          # UI by domain (commerce, cart, product, layout, …)
  content/             # Editorial copy + image specs (seed)
  data/                # Seed façades (swap for Shopify behind services)
  hooks/               # Client hooks (scroll, focus, media, commerce stubs)
  lib/                 # Catalog, seo, validation, shopify scaffold, cache, …
  services/            # Read layer over data/ (Shopify later)
  styles/              # Design tokens, layout, motion
  types/               # Canonical Shopify-ready contracts (+ types/shopify)
  utils/               # GID + money bridges for future adapters
```

## Data flow (today)

```
Page / Component → @/lib/* seeds & content → UI
                ↘ optional @/data + @/services (façades, mostly unused by UI yet)
```

## Data flow (planned live Shopify)

```
Page (RSC) → services → shopify client + GraphQL → adapters → @/types → view models → UI
Mutations  → Server Actions → Cart / Customer APIs
```

Hard gate: `SHOPIFY_STOREFRONT_ENABLED` + `canUseShopifyNetwork()` (false until intentionally enabled).

## Important utilities

| Utility | Path | Purpose |
|---------|------|---------|
| `cn` | `lib/utils.ts` | Classnames |
| `createPageMetadata` | `lib/seo.ts` | Metadata / OG / Twitter |
| `isValidEmail` | `lib/validation.ts` | Shared email validation |
| `formatPkr` | `lib/catalog.ts` | Display money (seed) |
| `moneyFromAmount` | `utils/money.ts` | Bridge to `MoneyV2` |
| `MediaImage` | `components/common/MediaImage.tsx` | next/image + placeholders |
| `SegmentError` | `components/common/SegmentError.tsx` | Shared route error UI |
| Cache tags | `lib/cache` / `lib/shopify/constants` | ISR revalidation |

## Reusable hooks

| Hook | Purpose |
|------|---------|
| `useMediaQuery` / `useIsDesktop` / `useIsMobile` | Breakpoints |
| `useHeaderScroll` | Header hide/show |
| `useBodyLock` | Scroll lock for drawers |
| `useFocusTrap` | Modal/drawer focus |
| `useSearchShortcut` | `/` or Cmd-K style search |
| `useRecentSearches` | localStorage recent queries (ready; wire when needed) |

## Shared components (high value)

- Layout: `Header`, `Footer`, `SiteShell`, `Container`, `Section`
- Commerce: `ProductCard`, `CollectionCard`, `ProductGrid`, filters
- States: `EmptyState`, `ErrorState`, `Loading` skeletons
- Forms: `NewsletterForm`, `ContactForm`, account forms
- SEO: `JsonLd` helpers

## Shopify integration docs

See `docs/shopify/` — Phase 11A resource maps, Phase 11B API foundation.
