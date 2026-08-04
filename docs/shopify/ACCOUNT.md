# Customer account architecture

## Surfaces (planned)

| Surface | Current | Future Shopify |
|---------|---------|----------------|
| Account dashboard | scaffold | Customer Account API home |
| Orders | empty / scaffold list | Orders connection |
| Addresses | scaffold | Customer addresses CRUD |
| Wishlist | local handles | Customer metafield + local merge |
| Recently viewed | local / planned | Customer metafield `ksl.recently_viewed` |
| Returns | placeholder copy | Returns app / customer portal policy |
| Rewards | future stub | Loyalty app / `ksl.rewards_tier` |
| Profile editing | scaffold profile | Customer profile update |

## Types & façade

- `src/types/customer.ts` — profile, order summary, address, wishlist refs
- `src/data/account.ts` — seed profile + empty orders until API

## Auth boundary

- Login / logout / session: Customer Account API (or classic customer accounts — decide in 11B)
- Storefront never stores passwords; redirect or headless auth flows only
- Order details beyond summaries may deep-link to Shopify account portal if needed

## Remaining before implementation

1. Choose Customer Account API vs classic accounts
2. Map order line items to storefront product handles for reorder CTA
3. Wire account layout to façades without redesigning account UI
