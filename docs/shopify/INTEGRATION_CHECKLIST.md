# Integration checklist

## Done in Phase 11A

- [x] Audit surfaces → resource mapping docs
- [x] Product / collection / cart / customer / search / menu / content / theme types
- [x] Planned metafield & metaobject inventories
- [x] Homepage section source map
- [x] Cart vs checkout boundary
- [x] Data façades under `src/data/` (seed-backed)
- [x] 11A documentation set

## Done in Phase 11B

- [x] Scalable folders: `lib/shopify`, `lib/graphql`, `lib/cache`, `lib/api`, `lib/analytics`, `services`, `actions`, `utils`, `types/shopify`
- [x] GraphQL module architecture (placeholder documents only)
- [x] Shopify client stub gated by env (`canUseShopifyNetwork() === false`)
- [x] Cache tags + revalidation helpers
- [x] Server Actions surface (cart, wishlist, newsletter, contact, search log, customer)
- [x] CommerceError model
- [x] Loading skeletons for home, account, policies
- [x] `.env.example` (no credentials)
- [x] Image CDN helpers + optional blurDataURL
- [x] SEO mapper stub + analytics integration points
- [x] 11B strategy docs

## Done in Phase 11C

- [x] Production audit + quality fixes (a11y, forms, errors, cleanup)
- [x] Shared validation + form Server Actions wired (newsletter, contact)
- [x] Segment error boundaries
- [x] Architecture + production readiness docs

## Explicitly NOT done (by design)

- [ ] Install Shopify / Hydrogen packages
- [ ] Live Storefront API / GraphQL execution
- [ ] Admin metafield / metaobject creation
- [ ] Full UI → services migration
- [ ] UI redesign
- [ ] Checkout customization
- [ ] Analytics SDK installs

## Remaining → Phase 11C (live connection)

1. Fill `.env.local` from `.env.example`; enable only after adapters work in staging
2. Implement `shopifyFetch` transport + timeouts
3. Flesh GraphQL fragments/queries; optional codegen
4. Implement adapters → `@/types` → existing view models
5. Point `src/services` at Shopify when `canUseShopifyNetwork()` is flipped intentionally
6. Cart: Server Actions + Cart API; keep drawer UX
7. Menus from Storefront; webhooks → `revalidateTag`
8. Customer Account API
9. Install analytics only behind CookieConsent
10. QA PDP variants, sold-out, Markets/currency
