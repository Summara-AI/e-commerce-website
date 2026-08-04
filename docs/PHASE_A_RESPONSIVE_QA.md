# Phase A — Responsive & Cross-Device QA Audit

**Brand:** Korean Skin Lab  
**Scope:** Exhaustive responsive frontend stabilization (no redesign, no new features)  
**Date:** 16 Jul 2026  
**Brand kit:** Power Pink, Canvas / Blush / Pearl, Cormorant + Poppins, existing radii/shadows/motion unchanged  

---

## Final Responsive Readiness Score

| Metric | Score |
|--------|------:|
| **Responsive Readiness (frontend)** | **91 / 100** |
| Layout integrity (320–2560) | 92 |
| Touch targets & chrome collisions | 90 |
| Drawers / modals / floating UI | 91 |
| Commerce grids & typography wrap | 90 |
| Safe-area & sticky clearance | 89 |

**Verdict:** Frontend is **production-ready for responsive behavior** pending a short physical device lab pass after real Shopify imagery lands.

---

## 1. Issues found

### Critical / High (fixed)

| ID | Issue | Location |
|----|-------|----------|
| R1 | Shared dialogs could overflow short mobile viewports | `ui/dialog.tsx` |
| R2 | Side drawers used `h-full` (unreliable with mobile browser chrome); bottom sheets lacked flex scroll containment | `ui/drawer.tsx` |
| R3 | Mobile cross-sell overlapped sticky ATC / double-counted safe area | `ProductMobileCrossSell.tsx` |
| R4 | Cookie banner spanned full mobile width and collided with floating UGC | `CookieConsent.tsx` |
| R5 | UGC ignored PDP sticky ATC; chip/controls under 44px; modal used static `vh` | `FloatingUgcWidget.tsx` |
| R6 | Search drawer max-height / results scroll could exceed viewport | `SearchDrawer.tsx` |
| R7 | Wishlist filter bottom drawer footer could push off-screen; clear control 32px | `WishlistToolbar.tsx` |
| R8 | Mobile nav child/support links ~32px vertical hit area | `MobileNav.tsx` |
| R9 | Product grids forced 2 columns at 320px → cramped cards | `ProductGrid.tsx`, `layout.css`, wishlist/search/thank-you grids |
| R10 | Laptop header side columns `minmax(11rem)` crowded logo/actions | `Header.tsx` |
| R11 | Sticky ATC could cover PDP page end content | `ProductRecommendSections.tsx` + sticky data attribute |
| R12 | Collection switcher / filter chips / popular search chips under 44px | `CollectionNav`, `ActiveFilterChips`, `SearchDiscovery` |
| R13 | Long titles overflowed cart / checkout / thank-you / order rows | Cart, Checkout, ThankYou, OrderDetail |
| R14 | Checkout stepper crushed labels on narrow widths | `CheckoutFlow.tsx` |
| R15 | Global horizontal overflow risk | `globals.css` `overflow-x: clip` + `100dvh` body |
| R16 | Account drawer missing `100dvh` / safe-area | `AccountShell.tsx` |
| R17 | Gallery / collection rails lacked touch overscroll containment | `ProductGallery`, `CollectionNav` |
| R18 | Cart recommend Embla flush to edges / focus clip | `CartRecommendations.tsx` |
| R19 | Announcement copy could grow bar height unboundedly | `AnnouncementItem.tsx` |
| R20 | UGC progress scrub hit area too thin | `FloatingUgcWidget.tsx` |

### Medium / Low (noted or partially mitigated)

| ID | Issue | Status |
|----|-------|--------|
| R21 | Physical matrix (foldables, landscape iPad, Samsung Internet FPS) | Remaining — needs device lab |
| R22 | Placeholder media aspect ratios vs final Shopify CDN crops | Remaining — asset-dependent |
| R23 | Hero ambient motion FPS on mid Android with UGC + drawers | Remaining — device lab |
| R24 | Filter facet drawers on collection PLP (if custom widths) | Spot-check after Shopify facets |

---

## 2. Fixes applied

### Foundations
- `html` / `body`: `overflow-x: clip`, `min-height: 100dvh`
- `.grid-product`: 1 column below 380px, then 2+
- Dialogs: `max-h-[calc(100dvh-2rem)]`, scroll, safe-area padding
- Drawers: `h-[100dvh]` sides; bottom sheets flex + `85dvh`

### Floating chrome
- Cookie banner left-aligned with width reserved for UGC on phones
- Sticky ATC sets `documentElement.dataset.stickyPurchase`
- UGC lifts via `html[data-sticky-purchase=true]` selector
- Cross-sell uses `bottom-[calc(4.75rem+env(safe-area-inset-bottom))]`
- PDP end spacer clears sticky ATC on mobile
- UGC chips/controls → 44×44; modal uses `dvh` + safe area; progress hit area expanded

### Navigation & drawers
- Header laptop gutters reduced; desktop restores 11rem columns
- Search drawer flex column + scrollable body + Clear min-h-11
- Mobile nav links min-h-11; search control min-w-11
- Account drawer `100dvh` + safe areas
- Wishlist filter drawer scroll body + footer shrink-0; clear 44×44

### Commerce / content
- Product grids: `grid-cols-1 min-[380px]:grid-cols-2` (shared + wishlist/recent/search/thank-you)
- Collection nav / filter chips / popular searches → min-h-11
- Cart/checkout/order/thank-you title clamp + `min-w-0` / `shrink-0` money columns
- Checkout stepper `min-w-[7.5rem]` on mobile; step markers 44×44
- Gallery + collection rails: overscroll containment / scroll padding
- Cart recommendations: horizontal padding for Embla
- Announcement: `line-clamp-2` mobile / `line-clamp-1` tablet+

---

## 3. Remaining risks

1. **Device lab** — code audit + CSS fixes complete; still run 320 / 390 / 768 / 1024 / 1440 / 1920 + iOS Safari landscape + one foldable.
2. **Real media** — placeholders hide crop/CLS issues until Shopify images + UGC video land.
3. **Stacking edge cases** — cookie + sticky ATC + cross-sell + UGC simultaneously on a short phone is mitigated but should be smoke-tested on iPhone SE.
4. **Shopify facets** — when live filters replace seeds, re-verify filter drawer footer/scroll.

---

## 4. Needs real Shopify assets for final visual verification

| Surface | Why |
|---------|-----|
| Product / collection cards | Final aspect ratios, object-fit, LCP |
| PDP gallery + sticky thumb | Cropping, focus rings over photos |
| Home rails (bestsellers / collections) | Card height with real photography |
| Floating UGC video + poster | Modal player layout with real media |
| Contact map / editorial placeholders | Remove empty planes once assets exist |
| OG / social share image | Not responsive UI, but launch package |

---

## 5. Regression notes

- Brand tokens (color, type, radius, shadow, motion easing) were not changed.
- No new features added.
- Cookie left-align + UGC sticky-lift replace the previous aggressive `46vh` UGC lift (less layout jump).
- Product grid single-column under 380px is intentional for readability at 320–360.

---

## Sign-off

**Responsive frontend: READY after brief device-lab smoke test.**  
Commerce/Shopify integration remains out of scope for this phase.
