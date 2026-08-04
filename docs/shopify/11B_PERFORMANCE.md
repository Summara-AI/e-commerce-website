# Performance & code quality (11B)

## Done this phase

- `optimizePackageImports` includes `framer-motion`
- Shopify CDN + `**.myshopify.com` in `next.config` image patterns
- AVIF/WebP already enabled
- `MediaImage` optional `blurDataURL` for future LQIP (default UI unchanged)
- Service layer to prevent ad-hoc duplicate fetches later
- Money / GID utils for adapter boundary

## Remaining (do not rush — preserves design)

1. Split motion-only wrappers so static content can stay RSC
2. Audit client components that only need a small island (Header is necessarily client)
3. Wrap services in React `cache()` when Shopify reads land
4. Cap `generateStaticParams` to best sellers + top collections
5. Ensure ProductCard image always has explicit `sizes` (mostly true)

## Bundle hygiene

- Prefer `@/services` over importing large seed modules in many leaves
- Keep GraphQL documents out of client bundles (server-only imports)
- Avoid default importing large icon packs (already lucide optimized)

## Dead code / duplication policy

- Canonical types: `@/types`
- Shopify envelopes: `@/types/shopify`
- Do not recreate Money/Image interfaces in adapters
