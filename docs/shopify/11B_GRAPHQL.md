# GraphQL organization (11B)

Location: `src/lib/graphql/`

Documents are **commented placeholders** — incomplete on purpose. Expand + codegen in 11C.

## Modules

| Module | Path | Purpose |
|--------|------|---------|
| Products | `queries/products.ts` | By handle, by handles, recommendations |
| Collections | `queries/collections.ts` | By handle, list |
| Menus | `queries/menus.ts` | By handle (`main-menu`, footer-*) |
| Pages / articles | `queries/pages.ts` | CMS pages, journal |
| Search | `queries/search.ts` | Predictive + product search |
| Customers | `queries/customers.ts` | Orders, addresses (Customer Account) |
| Cart | `queries/cart.ts` + `mutations/cart.ts` | Cart CRUD, discounts, note |
| Metaobjects | `queries/metaobjects.ts` | Homepage, FAQ, testimonials, routines |
| Metafields | `queries/metafields.ts` | Alias inventory for `ksl.*` |
| Fragments | `fragments/*` | Shared selection sets |

## 11C implementation order

1. Fragments: Money, Image, ProductCard, Cart
2. `product(handle)` + `collection(handle)`
3. `menu(handle)` for chrome
4. Cart mutations
5. Predictive search
6. Metaobjects for homepage
7. Customer Account API separately (different endpoint)

## Codegen (planned, not installed)

- Prefer GraphQL Code Generator against Storefront schema
- Output types into `src/types/shopify/generated/` (gitignored drafts ok)
- Keep hand-written `@/types` as UI contracts; map generated → adapters
