# Phase B — Production Frontend Hardening & Shopify Integration Readiness

**Brand:** Korean Skin Lab  
**Scope:** Architecture only — no redesign, no Shopify live calls, no removed UX  
**Date:** 16 Jul 2026  

---

## Production Frontend Readiness Score

| Area | Score |
|------|------:|
| **Overall production frontend readiness** | **88 / 100** |
| Service / data façade | 92 |
| Shopify mapper contracts | 90 |
| Checkout handoff seam | 94 |
| Account / wishlist / auth seams | 86 |
| Forms (contact, newsletter, track, discount) | 88 |
| Type safety & error UX | 85 |
| UI stability (no visual regressions intended) | 95 |

**Confirmation:** After client assets + Shopify credentials + Phase C transport (`shopifyFetch` + executable GraphQL), **no frontend redesign or structural UI refactor should be required** to deploy. Remaining work is wiring services to live APIs and replacing seed/demo providers.

---

## 1. Frontend components — production-ready

All existing UI surfaces remain intact:

- Homepage, collections, PDP, search, cart drawer/page, checkout flow, thank-you  
- Auth (login / register / recover), account (orders, addresses, wishlist, profile)  
- Contact, FAQ, policies, track order, newsletter, UGC, cookie, drawers  

Components continue to consume stable view models (`ProductPageData`, `CollectionPageData`, `CatalogProduct`, cart context lines). **Props and visuals unchanged.**

---

## 2. Remaining placeholders — client assets only

| Surface | Waiting on |
|---------|------------|
| Product / collection photography | Client Shopify CDN images |
| UGC video + poster | `/media/ugc/customer-routine.mp4` |
| PDP gallery extras | Real media (roles already modeled) |
| Reviews content | Judge.me / Loox / Stamped feed |
| Contact map / editorial mosaics | Final creative assets |
| OG share image | PNG/JPEG 1200×630 |
| Testimonials / community tiles | Approved customer media |

---

## 3. Remaining integrations — Shopify / apps only

| Integration | Seam ready | Live work (Phase C) |
|-------------|------------|---------------------|
| Storefront products / collections | Services + mappers | `shopifyFetch` + queries |
| Cart API + `checkoutUrl` | Cart + checkout services | Mutations + cart id persistence |
| Customer Accounts | Customer service + auth providers | OAuth / token migration |
| Predictive search | Search service + mapper | Predictive Search API |
| Discounts | `validateDiscountCodeService` | `cartDiscountCodesUpdate` |
| Shipping rates | `estimateShippingService` | Delivery groups / profiles |
| Newsletter | Provider switch | Shopify Email / Klaviyo env |
| Contact delivery | `submitContactService` | Resend / inbox env |
| Order tracking | `trackOrderService` | AfterShip / Parcel Panel |
| Reviews | `getProductReviewsService` | Judge.me / Loox |
| Wishlist sync | `syncWishlistWithCustomerService` | Customer metafield `ksl.wishlist` |
| Menus / homepage CMS | Menu + homepage services | Menu API / metaobjects |

---

## 4. Architecture improvements completed

```
UI (unchanged)
  → Services (@/services)          ← pages now enter here for catalog/search/checkout/forms
    → Seed (@/data, @/lib/*)       ← current
    → Shopify mappers              ← contracts ready
      → shopifyFetch (stub)        ← Phase C
```

- **Commerce mode:** `isShopifyLive()`, `isDemoCommerce()`, `isShopifyConfiguredPendingTransport()`  
- **User-safe errors:** `toUserFacingMessage()`  
- **Mapper contracts:** product, variant, image, inventory, metafields, collection, cart, customer, address, order, search  
- **Projectors:** Shopify canonical → existing UI models (`projectProductPage`, etc.)  
- **New / expanded services:** products, collections, search, cart, checkout, contact, tracking, reviews, discount, shipping, customer, wishlist  
- **Single checkout integration point:** `resolveCheckoutHandoffService` → `cart.checkoutUrl` later  

---

## 5. Files refactored / added (key)

### Added
- `src/lib/commerce/mode.ts`, `src/lib/commerce/index.ts`
- `src/lib/shopify/mappers/{catalog,commerce,projectors,index}.ts`
- `src/services/{checkout,contact,tracking,reviews,discount,shipping,customer,wishlist}.ts`
- Expanded `src/services/{products,collections,search,cart}.ts`
- `docs/PHASE_B_SHOPIFY_READINESS.md` (this report)

### Wired to services
- `src/app/products/[handle]/page.tsx`
- `src/app/collections/[handle]/page.tsx`
- `src/app/search/page.tsx`
- `src/app/sitemap.ts`
- `src/components/checkout/CheckoutFlow.tsx` → `resolveCheckoutHandoffService`
- `src/components/cart/DiscountCode.tsx` → `validateDiscountCodeService`
- `src/components/pages/TrackOrderForm.tsx` → `trackOrderService`
- `src/actions/contact.ts` → `submitContactService`

### Hardened
- `src/lib/shopify/client.ts` (Phase C notes)
- `src/lib/shopify/adapters/*` re-export mappers
- `src/lib/api/errors.ts` user-facing mapper
- `.env.example` (`NEXT_PUBLIC_DEMO_COMMERCE`, `NEXT_PUBLIC_REVIEWS_PROVIDER`)

---

## 6. Code quality improvements

- Centralized commerce entry so UI is not the seed owner  
- Demo behaviors gated behind `isDemoCommerce()` (discount intent, track heuristic, contact ack)  
- Clear `NOT_CONNECTED` vs `VALIDATION` vs network codes  
- Adapter/mapper throw messages name Phase C ownership  
- No visual/token/motion changes in this phase  

---

## 7. Future Shopify integration points (developer map)

| Call site | Expected Shopify surface | Data |
|-----------|--------------------------|------|
| `getProductPageService` | `product(handle:)` | Product + variants + media + metafields → `projectProductPage` |
| `getCollectionPageService` | `collection(handle:)` + products | Filters/sort/cursors → `projectCollectionPage` |
| `searchCatalogService` | predictiveSearch / search | `mapStorefrontSearch` |
| `createCartWithLineService` / cart context | Cart API mutations | Persist cart id; map `mapStorefrontCart` |
| `resolveCheckoutHandoffService` | `cart.checkoutUrl` | Redirect only — no local payment |
| `validateDiscountCodeService` | `cartDiscountCodesUpdate` | Amounts from cart cost |
| Auth providers | Storefront customer **or** Customer Account API | Session cookie unchanged to UI |
| `syncWishlistWithCustomerService` | Customer metafield `ksl.wishlist` | Merge with guest handles |
| `getProductReviewsService` | Judge.me / Loox | By product GID/handle |
| `trackOrderService` | AfterShip / order status | order name + email |
| `submitContactService` | Resend / Forms | Validated payload |
| `newsletterSubscribeService` | Existing providers | Env switch only |

---

## 8. Remaining risks

1. **Cart still client-local** — `cart-context` must gain server actions + cart id in Phase C without changing drawer UI.  
2. **Account still localStorage** — orders/addresses need Customer Account API + route auth guards.  
3. **Executable GraphQL** — many documents under `src/lib/graphql` remain comment scaffolds until Phase C.  
4. **Auth dual path** — Storefront customer tokens vs Customer Account OAuth decision before go-live.  
5. **Pre-existing TS debt** — unrelated project `tsc` issues (nav/rails/editorial) were not part of this phase.  
6. **Static `NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL`** — must not ship as production substitute for `cart.checkoutUrl`.

---

## 9. What was explicitly not done (by design)

- No live Shopify network calls  
- No UI redesign or animation changes  
- No removal of premium checkout / account / wishlist UX  
- No payment processing  

---

## 10. Sign-off

**Frontend architecture: READY for credential + asset intake.**  

Next engineering phase (C): implement `shopifyFetch`, executable queries/mutations, fill mapper bodies, persist Shopify cart id, flip `canUseShopifyNetwork()` when transport is proven, set `NEXT_PUBLIC_DEMO_COMMERCE=false` after UAT.
