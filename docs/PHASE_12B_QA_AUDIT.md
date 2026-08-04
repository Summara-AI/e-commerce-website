# Phase 12B — Final Design QA & Brand Consistency Audit

**Brand:** Korean Skin Lab  
**Scope:** Full-storefront Creative Director review (no new features, no redesigns)  
**Brand kit source of truth:** Power Pink `#E8006F`, Canvas / Blush / Pearl / Pink Mist, Ink `#2A1A22`, Cormorant + Poppins, radii 24px card/button · 20px badge, shadows `elev1–3`, motion 200 / 280 / 320ms (+ reveal ≤640ms)

**Review team lens:** Creative Director · Senior UI · Senior UX · Brand · Shopify Plus · Accessibility · Frontend · QA

---

## Executive summary

The storefront already presents as a coherent luxury Korean skincare system. Phase 12B identified **contrast, token drift, touch-target, and motion/a11y consistency** issues. Highest-severity defects were **fixed in this pass**. Remaining items are mostly photographic placeholders, content length on About/education pages, and Shopify-live dependencies (UGC, maps, checkout).

| Score | Result |
|-------|-------:|
| **Final design quality** | **8.4 / 10** |
| **Brand consistency** | **8.7 / 10** |
| **Responsive quality** | **8.2 / 10** |
| **Accessibility** | **8.0 / 10** |
| **Production readiness (visual/UX)** | **8.1 / 10** |
| **Production readiness (commerce launch)** | **~5.5 / 10** *(Shopify not connected — out of scope for design QA)* |

---

## Fixes applied in this phase

| ID | Issue | Severity | Recommended fix | Fix applied |
|----|-------|----------|-----------------|-------------|
| F1 | Skin concern cards: white type on light blush placeholders | **High** | Ink typography + light panel scrim until dark photos | **Yes** — `HomeSkinConcerns` ConcernCard |
| F2 | Collection cards: custom 30px radius + off-token shadows | **High** | Brand `rounded-card` + `shadow-elev*` | **Yes** — `CollectionCard` |
| F3 | Cart checkout CTA: hand-rolled gradient `#c4005c` | **High** | Use shared `Button` primary | **Yes** — `CartSummary` |
| F4 | Announcement link hover → pink-mist on pink-mist (invisible) | **High** | Hover to Power Pink + focus ring | **Yes** — `AnnouncementItem` |
| F5 | Chip: no focus-visible; 36px hit area | **High** | Focus ring + `min-h-11` when interactive | **Yes** — `Chip` |
| F6 | Product card ATC hidden on laptop until hover | **High** | Always visible actions | **Yes** — `ProductCard` |
| F7 | Product “View details” below 44px | **High** | Keep Button `size="sm"` min height | **Yes** — `ProductCard` |
| F8 | Product description used muted (low contrast body) | **Medium** | Use `foreground-secondary` | **Yes** — `ProductCard` |
| F9 | Cart qty / remove controls 40px | **High** | Raise to 44px (`h-11`) | **Yes** — `CartLineItem` |
| F10 | Cart thumbs / upsell: arbitrary 16–18px radius | **Medium** | `rounded-badge` (20px) | **Yes** — `CartLineItem`, `CartUpsell` |
| F11 | Trust strip ad-hoc bottom padding | **Medium** | Use Section `spacing="default"` only | **Yes** — `HomeTrustBadges` |
| F12 | Newsletter submit bypassed Button | **Medium** | Shared `Button` + loading | **Yes** — `HomeNewsletter` |
| F13 | Drawer open/close ignores reduced motion | **Medium** | `motion-reduce:animate-none` | **Yes** — `drawer.tsx` |
| F14 | Collection/concern image zoom `duration-700` | **Medium** | `duration-320` | **Yes** |
| F15 | Cart empty title `h3` without parent `h2` | **Low** | Promote to `h2` | **Yes** — `CartEmpty` |
| F16 | Product skeleton pulse ignores reduced motion | **Low** | `motion-reduce:animate-none` | **Yes** |

---

## Issues found (full audit ledger)

### High

| ID | Area | Issue | Recommended fix | Status |
|----|------|-------|-----------------|--------|
| H1 | Home · Skin Concerns | White text over light placeholders | Light scrim + ink type (or dark `imageTone` when photos land) | **Fixed** |
| H2 | Commerce · CollectionCard | Off-kit radius/shadows | Align to Brand Kit card tokens | **Fixed** |
| H3 | Cart · Checkout CTA | Off-token pink + custom CTA | Use `Button` primary | **Fixed** |
| H4 | Header · Announcement | Hover washes into background | Power Pink hover | **Fixed** |
| H5 | UI · Chip | Missing focus + small touch | Focus + 44px interactive | **Fixed** |
| H6 | Commerce · ProductCard | Hover-only ATC on laptop | Always show ATCs | **Fixed** |
| H7 | Commerce · ProductCard | Shrunk text CTA hit target | Restore min height | **Fixed** |
| H8 | Cart · Line qty | Controls &lt; 44px | `h-11` | **Fixed** |
| H9 | About · Structure | Very long alternating lux/default stack + three empty team cards | Collapse bands; hide team until portraits exist | **Open** *(content/IA polish — no redesign this phase)* |

### Medium

| ID | Area | Issue | Recommended fix | Status |
|----|------|-------|-----------------|--------|
| M1 | Home · Trust | Spacing token overridden | Section spacing only | **Fixed** |
| M2 | Home · Newsletter | Custom submit button | Shared Button | **Fixed** |
| M3 | Drawer | Motion ignore `prefers-reduced-motion` | Gate animations | **Fixed** |
| M4 | Cards · Motion | 700ms / 480ms zooms | Prefer 320ms | **Partially fixed** (collection/concern); ProductCard still uses `duration-480` |
| M5 | Home · Hero floats | Continuous 6–7s ambient loops | Prefer lighter ambient or static when photos land | **Open** (gated by `useReducedMotion`) |
| M6 | Home · Spacing rhythm | Many consecutive `lux` sections | Alternate tight/default/lux lightly | **Open** (refine later) |
| M7 | Cart / Filter drawers | Width drift (22–28.5rem) | Named drawer size tokens | **Open** |
| M8 | Search chips / CollectionNav | Some controls still &lt; 44px | Align to Chip/Button sm | **Open** |
| M9 | Community / UGC / PDP gallery | Inert empty placeholder mosaics | Gate behind real media | **Open** (asset phase) |
| M10 | Errors · SegmentError | Feels like inline alert, not utility page | Match 404 hierarchy | **Open** |
| M11 | Wishlist | Duplicate ATC chrome under ProductCard | Wishlist-specific actions | **Open** |
| M12 | Real vs Fake / About | Long educational stacks feel dense | Band consolidation when content edited | **Open** |
| M13 | Embla carousels | Drag not disabled for reduced-motion | Prefer buttons-only when reduced | **Open** |

### Low

| ID | Area | Issue | Recommended fix | Status |
|----|------|-------|-----------------|--------|
| L1 | Cart empty heading level | `h3` → `h2` | Hierarchy | **Fixed** |
| L2 | Skeleton pulse | Reduce motion | **Fixed** |
| L3 | Footer links | No min-height on mobile | `min-h-11` | **Open** |
| L4 | CountBadge `rounded-full` | Prefer badge radius | Optional | **Open** |
| L5 | Celadon naming leftovers | Prefer Power Pink aliases in new UI | Incremental | **Open** |
| L6 | Micro type `text-[0.65rem]` | Prefer `text-caption` | Incremental | **Open** |
| L7 | Contact map placeholder | Large empty block | Shrink until Maps live | **Open** |
| L8 | PDP zoom “coming soon” chrome | Hide until implemented | **Open** |
| L9 | 404 empty icon box | Pass illustration or omit | **Open** |
| L10 | Policies | Intentional typography-only | Keep | **OK** |
| L11 | Checkout | Shopify-hosted | Admin branding only | **OK** |
| L12 | Skeleton placeholders | CSS shimmer (correct) | Keep | **OK** |

---

## Dimension scores (detail)

### Brand consistency — **8.7 / 10**
**Strengths:** Single palette; Cormorant/Poppins; Power Pink CTAs; `rounded-card` / `Button` system; no purple/indigo drift.  
**Gaps:** Residual arbitrary radii, celadon aliases, a few custom shadows. High-token drift on collection/cart **fixed**.

### Visual hierarchy — **8.3 / 10**
**Strengths:** Hero `h1`, Power Pink overlines, display italic section titles, clear secondary body after fixes.  
**Gaps:** Some section titles use `text-h1` visually while remaining `h2` (acceptable); muted gray overused for body in places (partially fixed).

### Spacing / rhythm — **8.0 / 10**
**Strengths:** `Section` tight/default/lux tokens; Container content/narrow widths.  
**Gaps:** Homepage lux stacking; About length; trust padding now normalized.

### Responsive — **8.2 / 10**
**Strengths:** Tablet/laptop/desktop screens; drawers full-bleed mobile; safe-area shell.  
**Gaps:** Touch targets in search/collection nav; drawer width variants; no critical overflow found in app shell.

### Motion — **8.1 / 10**
**Strengths:** Button/`Reveal` honor reduced motion; drawers now gated; luxury ease curve used.  
**Gaps:** Hero continuous floats; some Framer 0.55–0.75s entrances; Embla reduced-motion.

### Accessibility — **8.0 / 10**
**Strengths:** Dialog drawers, labelled sections, form errors/alerts, focus rings on primary controls.  
**Remaining:** Chip fixed; announcement hover fixed; concern contrast fixed; footer/nav minor hit areas; muted text still used for captions (by design — keep for captions only).

### Performance — **8.3 / 10** (visual surface)
**Strengths:** Dynamic imports on home closing sections; MediaImage lazy by default; LCP priority on heroes; GPU transforms.  
**Watch:** Multiple Framer home sections + Embla — acceptable; photography will dominate LCP once wired. CLS risk remaining is primarily placeholder → image swap (use intrinsic aspect + blur LQIP in Phase 12 asset wire-up).

---

## Page-by-page verdict

| Page | Verdict | Notes |
|------|---------|-------|
| Homepage | **Pass with notes** | Concern contrast fixed; lux stacking optional refine |
| Shop / Collections | **Pass** | Cards now token-aligned; heroes await photography |
| Product Page | **Pass with notes** | Hide UGC/zoom chrome until live |
| Routine Builder | **Pass** | Interaction clear; illustrations pending |
| About | **Needs content prune** | Empty team portraits; long stack |
| Authenticity / Real vs Fake | **Pass with notes** | Educational density high |
| Journal | **N/A route** | Specced in 12A; not mounted |
| Contact | **Pass** | Map placeholder large |
| Search | **Pass with notes** | Chip touch sizes |
| Wishlist | **Pass with notes** | Duplicate actions |
| Cart drawer / page | **Pass** | QA fixes applied |
| Checkout | **External** | Shopify Admin branding |
| Account | **Pass** | Reuses product thumbs |
| FAQ / Policies | **Pass** | Typographic — correct |
| 404 / errors / empty | **Pass with notes** | Soften SegmentError presentation |
| Utilities (offline, maintenance, coming soon) | **Pass** | Marks pending SVG |

---

## Final standard check

| Perception goal | Status |
|-----------------|--------|
| Premium quality | **Met** after token + CTA fixes |
| Trust | **Met** (trust strips, authenticity paths) |
| Luxury | **Met** (editorial type, calm motion) |
| Scientific credibility | **Met** on authenticity / ingredients surfaces |
| Authenticity | **Met** (dedicated pages; placeholders remain) |
| Modern Korean skincare | **Met** (palette + mood; photos will seal it) |

---

## Recommended next steps (not Phase 12B scope)

1. **Phase 12A → shoot** and wire `imageSrc` / `imageTone`  
2. Light **About / Real vs Fake** content banding (editor, not redesign)  
3. Gate empty UGC / team / map / community mosaics until assets exist  
4. Align remaining ProductCard `duration-480` and search chip hit areas  
5. Connect Shopify for commerce production score ≥ 9

---

## Sign-off

Phase 12B design QA pass is **complete for launch polish of the current experience**.  
Critical brand/contrast/a11y defects identified in audit are **fixed**.  
Remaining opens are tracked above as Medium/Low and do not block a design-system sign-off — they block “perfect photography launch” and “Shopify commerce go-live,” which are separate phases.

**Creative Director judgment:** The site reads as one brand. With photography and Shopify, it is ready to feel like a real international luxury K-beauty storefront.
