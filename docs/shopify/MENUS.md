# Navigation menus

Create these menus in **Shopify Admin → Online Store → Navigation**. Handles must match exactly for adapters.

| Handle | Location in UI | Current seed |
|--------|----------------|--------------|
| `main-menu` | Header desktop + tablet + mobile root | `PRIMARY_NAV` |
| `mobile-menu` | Optional dedicated mobile tree (fallback: `main-menu`) | `PRIMARY_NAV` |
| `announcement-bar` | Announcement strip | `DEFAULT_ANNOUNCEMENTS` |
| `footer-shop` | Footer “Shop” | `FOOTER_SHOP_LINKS` |
| `footer-support` | Footer “Support” | `FOOTER_SUPPORT_LINKS` |
| `footer-brand` | Footer “Brand” | `FOOTER_BRAND_LINKS` |
| `footer-legal` | Footer legal row | `FOOTER_LEGAL_LINKS` |

## Mega menu

Two strategies (pick one in 11B):

1. **Nested menu links** under Shop / Concerns in `main-menu`
2. **Metaobject `mega_menu_panel`** referenced by nav item metafield — columns, educational links, promo image

Current structure lives in `PRIMARY_NAV[].mega` (`src/lib/navigation.ts`).

## Link types to support

- Collection
- Product
- Page
- Blog / article
- Front page
- External HTTP (WhatsApp, social)

Typed as `StoreMenuLink` in `src/types/navigation.ts`.

## Façade

- `getPrimaryNavigation()` → maps seed nav
- `getFooterMenus()` → should be wired to Footer UI in a later cleanup (Footer still reads `@/lib/site-content` directly today)
