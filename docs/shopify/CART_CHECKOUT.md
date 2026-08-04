# Cart & checkout architecture

## Storefront (this Next.js app)

Owns UX for:

| Concern | Current | Future |
|---------|---------|--------|
| Cart drawer | `CartDrawer` + context | Cart API → same UI |
| Cart page `/cart` | line items, qty, remove | Cart / lines APIs |
| Line items | product + variant + qty | `CartLine` |
| Discounts / coupons UI | code field UI | `cartDiscountCodesUpdate` |
| Notes | cart note field | `cartNoteUpdate` |
| Free shipping progress | `CART_SHIPPING_PROGRESS_SETTINGS` | Shop metafield threshold |
| Upsells / recommendations | local lists | Search & Discovery / collection |
| Gift card balance messaging | optional UI only | Checkout applies gift cards |
| Bundle presentation | seed bundles | line attributes / bundle apps |
| Wishlist add-from-cart | wishlist context | customer metafield sync |

Typed as `ShopifyCart`, `CartLineItem`, etc. in `src/types/cart.ts`.  
Façade: `src/data/cart.ts`.

## Shopify Checkout (hosted / Plus)

Remains Shopify-owned:

- Shipping rates & destinations
- Tax calculation
- Payment methods (cards, wallets, COD if enabled)
- Gift card **redemption** at payment
- Order creation & confirmation
- Additional Checkout Scripts / Shopify Functions / checkout UI extensions (Plus)
- Address validation (to the extent Shopify provides)

## Configurable (Admin, not hardcoded)

- Free shipping threshold / rules
- Markets & currency
- Discount campaigns
- Shipping profiles
- Tax settings
- Checkout branding (Checkout branding / Plus)

## Boundary rules

1. Do **not** rebuild Shopify payment processing, PCI forms, tax engines, or order APIs in the Next app.
2. A **premium pre-checkout** journey is allowed (`/checkout`): shipping preferences, delivery choice, payment preference, and order review — then handoff.
3. Cart / review CTA → Shopify `cart.checkoutUrl` when Cart API is live (`NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL` or Storefront cart URL). Until connected, `/checkout/thank-you?preview=1` previews the confirmation UX.
4. Authenticity / education content stays on storefront; money movement stays on Shopify.
5. Keep free shipping threshold unset until Admin values are verified (`null` = hide bar).
