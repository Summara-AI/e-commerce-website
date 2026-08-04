# Wishlist architecture

## Modes

| User | Persistence today | Future |
|------|-------------------|--------|
| Guest | `localStorage` via wishlist context | Keep localStorage as source of truth |
| Logged-in | Same local + account scaffold | Customer metafield `ksl.wishlist` (product refs) |
| Sync | None | Merge on login: union guest + server, write back to customer |

## Principles

1. Never block add/remove on network for guests.
2. After login, reconcile local → customer metafield; then prefer server as truth when online.
3. On sync failure, keep local and retry later.
4. Wishlist page / account tab use the same product card models as catalog.

## Types & façade

- Customer wishlist fields in `src/types/customer.ts`
- `src/data/wishlist.ts` — seed-backed helpers for handles / hydration

## Out of scope for 11A

- Live Customer Account writes
- Cross-device real-time sync UI indicators
