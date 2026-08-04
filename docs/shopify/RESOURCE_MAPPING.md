# Shopify resource mapping

Maps current UI surfaces to future Shopify resources. No live connections.

## Products

| UI / route | Current source | Shopify resource |
|------------|----------------|------------------|
| `ProductCard` | `CatalogProduct` | Product + featured/media metafields |
| PDP `/products/[handle]` | `ProductPageData` | Product, Variants, Media, Metafields |
| Best sellers rail | `BEST_SELLERS` | Collection `best-sellers` |
| Bundle cards / kit PDP | `CatalogBundle` / `kind: "bundle"` | Product (bundle app) or Product with `includes` metafield |
| Recommendations | `product-recommendations.ts` | Shopify Recommendations / Search & Discovery |

## Collections

| UI / route | Current source | Shopify resource |
|------------|----------------|------------------|
| `CollectionCard` | `CatalogCollection` | Collection |
| PLP `/collections/[handle]` | `CollectionPageData` | Collection + products connection + metafields |
| Shop landing `/collections/all` | merch + categories | Collection list / menu + `all` |
| Concern grids | `FEATURED_COLLECTIONS` | Collections with `ksl.skin_concern` |

## Navigation & chrome

| UI | Current source | Shopify resource |
|----|----------------|------------------|
| Desktop / tablet / mobile nav | `PRIMARY_NAV` | Menu `main-menu` (+ mega via metaobject or nested links) |
| Announcement bar | `DEFAULT_ANNOUNCEMENTS` | Menu `announcement-bar` or shop metafield list |
| Footer columns | `FOOTER_*_LINKS` | Menus `footer-shop`, `footer-support`, `footer-brand`, `footer-legal` |
| Footer contact | `SITE_SETTINGS` / `FOOTER_CONTACT` | Shop + theme settings |

## Content pages

| Route | Current source | Shopify resource |
|-------|----------------|------------------|
| `/pages/our-story` | `ABOUT_PAGE` | Page `our-story` + metaobjects |
| `/pages/authenticity` | `AUTHENTICITY_PAGE` | Page + metafields |
| `/pages/real-vs-fake` | `REAL_VS_FAKE_PAGE` | Page |
| `/pages/faq` | `FAQ_ITEMS` | Metaobject `faq_group` or Page |
| `/pages/contact` | `CONTACT_PAGE` | Page + shop contact |
| Policies | `content/policies` | Online Store policies / Pages |
| Guides / ingredients hubs | content modules | Blog / Pages / metaobjects |
| Routine builder | `ROUTINE_*` | Page + metaobject `routine_guide` + product metafields |

## Cart / wishlist / account / search

| Feature | Current | Shopify |
|---------|---------|---------|
| Cart drawer + `/cart` | `cart-context` localStorage | Cart AJAX / Storefront Cart API |
| Wishlist | account wishlist handles | Customer metafield + guest localStorage |
| Account | local scaffold | Customer Account API |
| Search | `SEARCH_INDEX` | Predictive Search + Storefront search |
| Newsletter | local form success | Shopify Email / Klaviyo / Customer marketing |

## Settings

| Concern | Current | Shopify |
|---------|---------|---------|
| SEO base URL, OG | `SITE_SETTINGS` | Shop + theme |
| Free shipping bar | `CART_SHIPPING_PROGRESS_SETTINGS` | Shipping / shop metafield `ksl.free_shipping_threshold` |
| Currency PKR | hardcoded Money | Shop Markets / currency |
