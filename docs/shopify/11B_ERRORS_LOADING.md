# Errors, loading & graceful fallbacks (11B)

## Error model

`CommerceError` + codes in `src/lib/api/errors.ts`:

| Code | HTTP | UX |
|------|------|-----|
| `NOT_FOUND` / `GONE` | 404 | `not-found.tsx` / product|collection not-found |
| `NETWORK` / `SHOPIFY_DOWN` | 503 | Utility network/server pages + retry |
| `TIMEOUT` | 504 | Retry CTA |
| `NOT_CONNECTED` | 501 | Dev-only; seed path used instead |
| `VALIDATION` | 400 | Inline form errors |
| `UNAUTHORIZED` | 401 | Account login redirect |

App Router:

- `src/app/error.tsx` — segment recovery
- `src/app/global-error.tsx` — root shell
- `src/app/not-found.tsx` — global 404
- Product / collection `not-found.tsx` — resource missing / deleted

## Shopify downtime strategy (11C)

1. Short timeout on `shopifyFetch` (e.g. 8s)
2. Serve last ISR page from Data Cache when possible
3. Cart mutations: surface toast, keep local optimistic queue optional
4. Announcement metafield for status copy (optional)

## Loading states audit

| Route | Loading UI |
|-------|------------|
| `/` | `app/loading.tsx` → `HomePageSkeleton` **(added 11B)** |
| `/products/[handle]` | `ProductPageSkeleton` |
| `/collections/[handle]` | collection loading |
| `/collections/all` | loading |
| `/search` | loading |
| `/cart` | `CartPageSkeleton` |
| `/wishlist` | loading |
| `/pages/*` | `pages/loading.tsx` |
| `/policies/*` | `policies/loading.tsx` **(added 11B)** |
| `/account/**` | `account/loading.tsx` **(added 11B)** |

Skeletons live in `src/components/common/Loading.tsx` — fixed aspects to limit CLS.

## Progressive rendering

Homepage already dynamic-imports below-fold sections. Keep Suspense boundaries around future Shopify-backed rails without changing layout.
