# Phase 12A — Final Asset Specification

**Brand:** Korean Skin Lab  
**Scope:** Production brief for every photograph, illustration, icon, and graphic required by the current storefront  
**Constraint:** Do **not** generate images in this phase — produce and deliver against this spec only  
**Sources of truth:** Live UI (`data-image-spec` / `MediaImage` specs), Brand Kit tokens, content registries under `src/content/*-assets.ts`, catalog handles in `src/lib/catalog.ts`

---

## 1. How to use this document

| Column | Meaning |
|--------|---------|
| **Asset ID** | Stable production name — file stem / CDN key / Shopify file alt tag prefix |
| **Page / Section** | Where the asset renders |
| **Purpose** | Creative + UX job |
| **Desktop** | Master pixel dimensions for primary breakpoint (≥1280) |
| **Mobile** | Crop / export for ≤767 |
| **Aspect** | Locked ratio (preserve; letterbox forbidden) |
| **Format** | Delivery format |
| **Retina** | Whether 2× masters are required |
| **Lazy** | Lazy-load in UI |
| **Priority** | Eager / LCP priority |

### Global delivery rules

1. **Masters:** Photograph / design at the **desktop (or higher)** size listed; export AVIF + WebP; JPG fallback only when required by email or legacy clients.
2. **Retina:** Where marked **Yes**, deliver a 2× master (or one high-res master ≥2× display) and let Next.js / Shopify CDN generate smaller sizes.
3. **Color:** Soft, natural Korean skincare grade — porcelain / pearl / blush atmosphere. Avoid clinical blue-white hospital light and heavy teal/orange Instagram presets.
4. **Text in frame:** **Never** bake marketing copy, prices, or badges into photography (except genuine product packaging labels).
5. **Contrast:** For collection cards, set `imageTone: "light" | "dark"` in catalog when photos ship. Placeholders always behave as light (charcoal type).
6. **Skeleton placeholders:** UI uses CSS shimmer (`skeleton-shimmer`) — **no bitmap skeletons** required.
7. **Icons today:** Trust row, header actions, and many UI marks use **Lucide** until branded SVG sets land. Specs below flag Lucide → SVG upgrades.

### Catalog counts (seed catalog — scale when Shopify expands)

| Entity | Count | Handles |
|--------|------:|---------|
| Products | 8 | See §10 |
| Bundles | 2 | `k-beauty-starter-kit`, `k-glow-am-trio` |
| Product-type categories | 7 | cleansers, toners, moisturizers, masks, sunscreen, bb-cream, eye-care |
| Merch collections | 3 | best-sellers, new-arrivals, bundles |
| Skin-concern collections | 6 | sun-protection, deep-cleansing, dryness-dehydration, anti-aging, pore-minimizer, sensitive-skin |
| Homepage concern cards | 5 | acne, dryness, sensitive, pigmentation, barrier |

### Checkout note

`/checkout` is **Shopify-hosted**. No custom storefront checkout photography is required for launch. Optional: branded logo + favicon already cover Shopify checkout chrome if configured in Admin.

### Journal note

No `/journal` route is mounted yet. Cover assets are specified for launch readiness and for future blog cards / email. Produce **3** magazine covers now; add article heroes when CMS is live.

---

## 2. Master photography direction (all lifestyle / editorial)

Apply to every lifestyle, ritual, editorial, community, and about image unless a row overrides.

| Axis | Direction |
|------|-----------|
| **Lighting** | Soft daylight or large diffused source. Gentle falloff. Avoid hard specular hotspots on packaging unless intentional “gleam” detail shot. |
| **Background** | Pearl `#F2ECE4`, canvas white `#FFFFFF`, blush `#FFF5F9`, or shallow life texture (linen, stone, pale ceramic). Never busy patterned walls. |
| **Composition** | Quiet, editorial. Generous negative space. Product readable. Centered or classic rule-of-thirds — never chaotic flat-lays with >6 props. |
| **Camera angle** | Eye-level or slight 3⁄4 for packs; overhead only for intentional flat-lays / textures. Macro for finish detail. |
| **Mood** | Calm, premium, trustworthy, modern Korean skincare — Aesop restraint × Rhode softness × Laneige clarity. |
| **Styling** | Minimal props: water droplets (controlled), soft cotton, ceramic dish, pale botanicals. No neon, no glitter, no fake “drugstore shelf” clutter. Models optional; if used, natural skin, no heavy glam makeup. |

### Packshot studio standard (all product / PDP / card thumbs)

| Axis | Direction |
|------|-----------|
| **Lighting** | Soft dual softbox / light tent; even label readability |
| **Background** | Seamless pearl or soft blush gradient (match Brand Kit) |
| **Composition** | Product centered; **8–12%** empty margin |
| **Angle** | Front 3⁄4 preferred; match across SKUs for grid rhythm |
| **Mood** | Clean laboratory-calm luxury |
| **Styling** | No props on card packshots; lifestyle reserved for dedicated lifestyle frames |

---

## 3. Brand chrome, SEO, social, email

| Asset ID | Page / Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|----------------|---------|---------|--------|--------|--------|--------|------|----------|
| `brand-logo-primary` | Global header / footer | Wordmark on light grounds | 180×48 (SVG viewBox) | 140×36 | Horizontal wordmark | **SVG** | n/a (vector) | No | Yes (header) |
| `brand-logo-inverse` | Inverse / overlay headers | Wordmark on dark / photo | 180×48 | 140×36 | Horizontal wordmark | **SVG** | n/a | No | Conditional |
| `favicon-16` | Browser tab | Favicon | 16×16 | 16×16 | 1:1 | PNG | No | No | Yes |
| `favicon-32` | Browser tab | Favicon | 32×32 | 32×32 | 1:1 | PNG | No | No | Yes |
| `favicon-512` | PWA / high-res favicon | App icon source | 512×512 | 512×512 | 1:1 | **PNG** | Source is 2×+ | No | Yes |
| `apple-touch-icon-180` | iOS home screen | Apple Touch Icon | 180×180 | 180×180 | 1:1 | PNG | No | No | Yes |
| `og-default` | SEO / social default | Open Graph + Twitter Card default | **1200×630** | n/a (shared) | ~1.91:1 | **WebP** + PNG fallback | No (fixed OG size) | No | Yes (meta) |
| `og-home` | Homepage share (optional override) | Richer home OG | 1200×630 | n/a | ~1.91:1 | WebP/PNG | No | No | Meta only |
| `twitter-card-default` | Twitter / X | Same art as `og-default` unless platform crop differs | 1200×630 | n/a | ~1.91:1 | WebP/PNG | No | No | Meta only |
| `email-header-logo` | Transactional / marketing email | Header logo | 240×64 | 200×54 | Horizontal | PNG (email-safe) | No | n/a | Email |
| `email-hero-editorial` | Marketing email | Optional campaign hero | 600×320 | 600×320 | ~1.875:1 | JPG/PNG | No | n/a | Email |
| `email-product-thumb` | Abandoned cart / recs email | Product thumb | 160×200 | 160×200 | 4:5 | JPG | No | n/a | Email |
| `email-footer-social` | Email footer | Social marks | 32×32 each | 32×32 | 1:1 | PNG | No | n/a | Email |
| `footer-payment-icons` | Global footer | Payment methods strip | ~480×48 master | ~360×36 | Horizontal strip | **SVG** sprite | n/a | Yes | No |
| `social-icon-instagram` | Footer / community CTA | Instagram mark | 40×40 | 36×36 | 1:1 | **SVG** | n/a | Yes | No |
| `social-icon-tiktok` | Footer (if used) | TikTok mark | 40×40 | 36×36 | 1:1 | SVG | n/a | Yes | No |
| `social-icon-youtube` | Footer (if used) | YouTube mark | 40×40 | 36×36 | 1:1 | SVG | n/a | Yes | No |
| `trust-icon-set` | Trust rows (home, cart, footer) | Branded replacements for Lucide | 80×80 master | 72×72 | 1:1 | **SVG** | n/a | Yes | No |
| `empty-state-illustration` | Cart / wishlist / search empty shared | Soft brand mark | 480×480 master | 320×320 | 1:1 | SVG preferred | n/a | Yes | No |
| `newsletter-ambient` | Home newsletter (optional) | Soft atmosphere behind form | 1920×1080 | text-led (omit or soft crop) | 16:9 | WebP | Yes | Yes | No |
| `loading-illustration` | Route loading / segment suspense (optional) | Soft brand loader art | 240×240 | 160×160 | 1:1 | SVG | n/a | No | Conditional |
| `skeleton-shimmer` | All MediaImage empty states | CSS-only — **no file** | — | — | — | CSS | — | — | — |

**OG creative direction:** Full-bleed soft editorial still or logo lockup on blush→pearl gradient; large quiet brand wordmark; no small unreadable body text. Safe zone: keep logo within center 80%.

---

## 4. Navigation & search chrome

| Asset ID | Page / Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|----------------|---------|---------|--------|--------|--------|--------|------|----------|
| `mega-promo-starter-kit` | Header mega-menu · Shop | Promo tile — starter kit | 960×1200 | n/a (drawer text on mobile) | 4:5 | WebP | Yes | Yes | No |
| `mega-promo-authenticity` | Header mega-menu · Concerns | Editorial authenticity tile | 960×1200 | n/a | 4:5 | WebP | Yes | Yes | No |
| `search-product-thumb-{handle}` | Search drawer predictive | Product thumbnail | 256×256 serve | 192×192 | 1:1 | WebP | Yes | Yes | No |
| `search-result-product-thumb` | `/search` list mode | Result thumb | 320×320 | 280×280 | 1:1 | WebP | Yes | Yes | No |
| `search-result-packshot-grid` | `/search` grid mode | Packshot (reuse product main) | 900×1125 | 600×750 | 4:5 | WebP | Yes | Yes | No |
| `filter-empty-illustration` | Collection / search empty filters | Soft empty mark | 240×240 | 160×160 | 1:1 | SVG | n/a | Yes | No |

**Lifestyle direction (mega promos):** Soft overhead or 3⁄4 kit composition; pearl ground; products legible; mood of calm ritual — not “promo sticker” energy.

---

## 5. Homepage (`/`)

### 5.1 Hero composition

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `hero-lux-primary` | Hero · primary plane | Editorial lifestyle / still-life plane | 1600×2000 | 1080×1350 | 4:5 | WebP | Yes | No | **Yes (LCP)** |
| `hero-lux-packshot` | Hero · overlapping card | Hero packshot float | 800×1000 | 560×700 | 4:5 | WebP | Yes | No | Yes |
| `hero-lux-texture` | Hero · texture tile | Skin/texture or soft still | 800×800 | 560×560 | 1:1 | WebP | Yes | No | Soft |

**Hero photography direction**

| Axis | Primary | Packshot | Texture |
|------|---------|----------|---------|
| Lighting | Soft window light | Studio softbox | Soft directional |
| Background | Blush/pearl atmosphere | Seamless pearl | Abstract ceramic / cream |
| Composition | Quiet ritual or premium still; leave space for card overlays | Centered product, label clear | Crop abstract; no text |
| Angle | Slight 3⁄4 lifestyle | Classic pack 3⁄4 | Overhead or macro |
| Mood | Cinematic calm luxury | Clean trustworthy | Tactile softness |
| Styling | 1–2 products max + air | No props | Texture only |

### 5.2 Trust strip

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `trust-icon-authentic` | Trust badges | 100% Authentic | 80×80 | 72×72 | 1:1 | SVG | n/a | Yes | No |
| `trust-icon-korea` | Trust badges | Imported from Korea | 80×80 | 72×72 | 1:1 | SVG | n/a | Yes | No |
| `trust-icon-selected` | Trust badges | Dermatologist Selected | 80×80 | 72×72 | 1:1 | SVG | n/a | Yes | No |
| `trust-icon-delivery` | Trust badges | Fast Pakistan Delivery | 80×80 | 72×72 | 1:1 | SVG | n/a | Yes | No |
| `trust-icon-secure` | Trust badges | Secure Checkout | 80×80 | 72×72 | 1:1 | SVG | n/a | Yes | No |

*(Until delivered, Lucide icons remain acceptable.)*

### 5.3 Featured collections

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `featured-collection-{handle}` | Featured Collections | Magazine card media (top) | 1200×960 | 800×640 | 5:4 | WebP | Yes | Yes | First 3: soft |

Produce for every featured handle used on home (seed: best-sellers + featured concerns + merch slice). Prefer shared masters with shop `merch-collection-*` / `concern-collection-*` where identical.

**Direction:** Editorial still or soft lifestyle; light photography preferred so charcoal type on content panel stays contrast-safe. If dark frames are chosen, set `imageTone: "dark"`.

### 5.4 Shop by skin concern

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `concern-acne` | Skin Concerns | Large lead + grid card | 1600×1200 | 1080×810 | ~4:3 card crop | WebP | Yes | Yes | Soft |
| `concern-dryness` | Skin Concerns | Concern card | 1200×900 | 800×600 | ~4:3 | WebP | Yes | Yes | No |
| `concern-sensitive` | Skin Concerns | Concern card | 1200×900 | 800×600 | ~4:3 | WebP | Yes | Yes | No |
| `concern-pigmentation` | Skin Concerns | Concern card | 1200×900 | 800×600 | ~4:3 | WebP | Yes | Yes | No |
| `concern-barrier` | Skin Concerns | Concern card | 1200×900 | 800×600 | ~4:3 | WebP | Yes | Yes | No |

**Direction:** Soft close-up skin texture or hands + product — never medical “before/after clinic” vibes. Mood: reassurance. Overlay-safe: leave darker lower third if overlay text remains in other sections; current home concern cards use soft ink gradient.

### 5.5 Bestsellers

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `product-{handle}-main` | Bestsellers carousel | Product card packshot | 1600×2000 | 700×875 | 4:5 | WebP | Yes | Index &lt;2: No · else Yes | First 2 priority |

Reuse PDP hero crops. See §10 for per-SKU list.

### 5.6 Routine Builder (homepage interactive preview)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `routine-step-concern` | Routine Builder panel | Optional step illustration | 960×960 | 640×640 | 1:1 | SVG/WebP | Soft | Yes | No |
| `routine-step-morning` | Routine Builder panel | Morning ritual illustration | 960×960 | 640×640 | 1:1 | SVG/WebP | Soft | Yes | No |
| `routine-step-night` | Routine Builder panel | Night ritual illustration | 960×960 | 640×640 | 1:1 | SVG/WebP | Soft | Yes | No |

**Direction (illustrations preferred):** Thin-line editorial SVG on blush; or soft photograph of morning window / evening ceramic — muted.

### 5.7 Editorial banner, story, why Korean

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `home-editorial-banner` | Editorial Banner | Full-width authenticity banner | 2400×1000 | 1080×608 | ~2.4:1 / 21:9 | WebP | Yes | Yes | No |
| `home-story-preview` | Our Story Preview | Large editorial portrait | 1200×1500 | 800×1000 | 4:5 | WebP | Yes | Yes | No |
| `home-why-korean` | Why Authentic Korean | Two-column editorial | 1200×1440 | 800×960 | 5:6 | WebP | Yes | Yes | No |

**Direction**

| Asset | Lighting | Background | Composition | Angle | Mood | Styling |
|-------|----------|------------|-------------|-------|------|---------|
| Editorial banner | Soft ambient | Pearl → blush wash | Wide still; **left 42% text-safe** (brighter) | Eye-level | Trust, quiet confidence | 1–2 authentic packs |
| Story preview | Natural window | Soft interior / pearl | Founding-mood portrait or still | Slight 3⁄4 | Honest, warm | Minimal human or hands |
| Why Korean | Soft daylight | Clean ingredient / ritual | Editorial product + air | Eye-level | Precision + calm | Botanical optional |

### 5.8 Testimonials & community

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `testimonial-portrait-ph-1` | Testimonials | Portrait / UGC still | 1200×750 | 800×500 | 16:10 | WebP | Yes | Yes | No |
| `testimonial-portrait-ph-2` | Testimonials | Portrait / UGC still | 1200×750 | 800×500 | 16:10 | WebP | Yes | Yes | No |
| `testimonial-portrait-ph-3` | Testimonials | Portrait / UGC still | 1200×750 | 800×500 | 16:10 | WebP | Yes | Yes | No |
| `community-tile-1` | Instagram / Community | Featured mosaic (2×2) | 1200×1200 | 800×800 | 1:1 | WebP | Yes | Yes | Soft |
| `community-tile-2` … `community-tile-6` | Community | Supporting mosaic tiles | 800×800 | 480×480 | 1:1 | WebP | Yes | Yes | No |

**Direction:** Authentic lifestyle (product-in-hand, vanity top, morning light). Consent-cleared faces only. Prefer directed brand photography over generic stock.

### 5.9 Newsletter

See `newsletter-ambient` in §3. Form is typography-led; ambient art optional.

### 5.10 Deferred / legacy homepage assets (produce if modules remount)

| Asset ID | Notes |
|----------|-------|
| `hero-home-01` | Legacy full-bleed 16:9 — **do not shoot** unless reverting hero |
| `journal-cover-start` / `ingredients` / `authenticity` | Produce for Journal launch (§12) |
| `bundle-starter-kit` / `bundle-am-trio` | Produce for bundle merchandising (§10) |
| `brand-story-editorial` | May alias `home-story-preview` |

---

## 6. Shop landing (`/collections/all`)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `shop-hero-banner` | ShopLandingHero | Atmosphere hero | 2400×1350 | 1080×1350 | 16:9 D · 4:5 M | WebP | Yes | No | **Yes** |
| `category-{handle}` | Featured categories | Category card (×7) | 1000×800 | 640×512 | 5:4 | WebP | Yes | Yes | Soft |
| `merch-collection-{handle}` | Featured merch | Magazine card (×3) | 1200×1500 | 600×750 | 4:5 | WebP | Yes | Yes | Soft |
| `concern-collection-{handle}` | Skin concerns grid | Concern card (×6) | 1200×1500 | 600×750 | 4:5 | WebP | Yes | Yes | Yes after fold |
| `discovery-pathway-{id}` | Discovery pathways (optional) | Pathway atmosphere | 1200×800 | 720×480 | 3:2 | WebP | Soft | Yes | No |
| `category-card-editorial` | Runtime alias | Prefer `category-{handle}` | — | — | — | — | — | — | — |
| `bundle-card-editorial` | Runtime alias | Prefer `bundle-{handle}-flatlay` | — | — | — | — | — | — | — |

**Shop hero direction:** Wide soft still — products as quiet set piece; mobile crop to vertical; keep brand-safe negative space for headline.

---

## 7. Collection PLPs (`/collections/[handle]`)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `collection-hero-{handle}` | CollectionHero | Collection banner (×16 handles) | 2400×1028 (2×: 4800×2056) | 1080×608 | 21:9 D · 16:9 M | WebP | **Yes** | No | **Yes** |
| `product-{handle}-main` | Product grid | Card packshot | 1600×2000 | 700×875 | 4:5 | WebP | Yes | Yes | First row soft |
| `product-{handle}-hover` | Product grid hover | Secondary angle (optional) | 1600×2000 | 700×875 | 4:5 | WebP | Yes | Yes | No |
| `bundle-{handle}-flatlay` | Bundles PLP | Kit flat-lay | 1800×1200 | 1080×720 | 3:2 | WebP | Yes | Yes | Soft |

**Collection banner direction:** Soft lifestyle tied to concern/category; left/center text-safe zone (~35–40% brighter); no baked headlines.

Handles requiring heroes: all category + merch + concern handles listed in §1 catalog counts.

---

## 8. Product Detail Page (`/products/[handle]`)

Per **SKU** (seed ×8). Multiply every row by product count unless shared.

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `pdp-{handle}-hero` | Gallery primary | Main packshot / LCP | 1600×2000 | 1000×1250 | 4:5 | WebP | Yes | No | **Yes** |
| `pdp-{handle}-alt` | Gallery | Secondary angle | 1600×2000 | 1000×1250 | 4:5 | WebP | Yes | Yes | No |
| `pdp-{handle}-detail` | Gallery / zoom | Macro texture | 2000×2500 (to 2400×3000) | 1100×1375 | 4:5 | WebP | **Yes (zoom)** | Yes | No |
| `pdp-{handle}-lifestyle` | Gallery | Ritual editorial | 1600×2000 | 1000×1250 | 4:5 | WebP | Yes | Yes | No |
| `pdp-media-{role}` | Runtime gallery map | Maps to hero/alt/detail/lifestyle | — | — | — | — | — | — | — |
| `pdp-thumb-{role}` | Gallery thumbs | 1:1 crops from masters | 160×160 display | 120×120 | 1:1 | WebP | Yes | Soft | Soft |
| `pdp-sticky-thumb` | Sticky ATC bar | Square crop from hero | 192×192 | 144×144 | 1:1 | WebP | Yes | No | Soft |
| `pdp-ingredient-hero` | Ingredients | Ingredient hero still | 1200×1500 | 720×900 | 4:5 | WebP | Yes | Yes | No |
| `pdp-ingredient-support` | Ingredients | Supporting tiles (2–4) | 900×720 | 600×480 | 5:4 | WebP | Yes | Yes | No |
| `pdp-howto-step` | How to use | Step art (3–5 steps) | 480×480 | optional 320 | 1:1 | SVG preferred | Soft | Yes | No |
| `pdp-ugc-tile` | Customer gallery | UGC tiles (4–8) | 800×800 | 480×480 | 1:1 | WebP | Yes | Yes | No |
| `pdp-review-avatar` | Reviews (future) | Avatar | 192×192 | 128×128 | 1:1 | WebP | Yes | Yes | No |
| `pdp-fbt-thumb` | Frequently bought | Packshot crop | 240×300 | 160×200 | 4:5 | WebP | Yes | Yes | No |
| `pdp-routine-step-thumb` | Complete routine | Step product thumb | 280×350 | 192×240 | 4:5 | WebP | Yes | Yes | No |
| `pdp-mobile-cross-sell-thumb` | Mobile cross-sell | Square pack crop | n/a | 192×192 | 1:1 | WebP | Yes | Yes | No |

**Minimum launch set per SKU:** hero + alt + detail (+ lifestyle strongly recommended).  
**Hover images:** Produce `product-{handle}-hover` for PLP cards when secondary angle exists.

**PDP lifestyle direction:** Hands applying product OR serene vanity vignette; soft daylight; Brand Kit grounds; never clinical before/after.

---

## 9. Routine Builder page (`/pages/routine-builder`)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `routine-builder-hero` | Page hero (if visual) | Soft ritual atmosphere | 1920×1080 | 1080×1350 | 16:9 / 4:5 M | WebP | Yes | Soft | Soft |
| `routine-builder-concern-{id}` | Concern picker | Concern visual chips | 480×480 | 320×320 | 1:1 | WebP/SVG | Soft | Yes | No |
| `routine-builder-slot-thumb` | Result slots | Product thumbs (reuse packshots) | 240×300 | 160×200 | 4:5 | WebP | Yes | Yes | No |
| `routine-illustration-am` | Morning path | Morning illustration | 960×720 | 720×540 | 4:3 | SVG/WebP | Soft | Yes | No |
| `routine-illustration-pm` | Night path | Night illustration | 960×720 | 720×540 | 4:3 | SVG/WebP | Soft | Yes | No |

**Direction:** Illustrations preferred for clarity; photography only if it teaches without clutter.

---

## 10. Product photography matrix (seed catalog)

For each handle below deliver: **main (card)**, **hero**, **alt**, **detail**, optional **lifestyle**, optional **hover**.

| # | Handle | Notes |
|---|--------|-------|
| 1 | `escargot-original-facial-repair-cream` | Cream jar — label clear |
| 2 | `dermal-rice-collagen-essence-mask` | Sheet mask packaging |
| 3 | `haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50` | SPF tube/bottle |
| 4 | `dermal-blueberry-facial-sheet-mask` | Mask packaging |
| 5 | `dermal-tea-tree-collagen-essence-mask` | Mask packaging |
| 6 | `dermal-kafir-facial-sheet-masks` | Mask packaging |
| 7 | `dermal-cucumber-collagen-essence-mask` | Mask packaging |
| 8 | `lacto-cica-barrier-cream-moisturizer` | Moisturizer |

### Bundles

| Asset ID | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|--------|--------|--------|--------|------|----------|
| `bundle-k-beauty-starter-kit-flatlay` / `bundle-starter-kit` | Kit flat-lay + card | 1800×1200 | 1080×720 | 3:2 | WebP | Yes | Yes | Soft |
| `bundle-k-glow-am-trio-flatlay` / `bundle-am-trio` | AM trio flat-lay | 1800×1200 | 1080×720 | 3:2 | WebP | Yes | Yes | Soft |

**Bundle direction:** All inclusions visible, balanced, pearl ground, soft overhead 10–20°.

---

## 11. Skin Concerns hub (`/pages/skin-concerns`)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|--------|--------|--------|--------|------|----------|
| `skin-concerns-hero` | Hub hero | Soft editorial (optional) | 1920×800 | 1080×608 | ~2.4:1 | WebP | Yes | Soft | Soft |
| `concern-collection-{handle}` | Concern cards | Reuse shop concern art (×6) | 1200×1500 | 600×750 | 4:5 | WebP | Yes | Yes | Soft |

---

## 12. Journal / Guides / Ingredients (planned + stubs)

| Asset ID | Page / Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|----------------|---------|---------|--------|--------|--------|--------|------|----------|
| `journal-cover-start` | Journal card / future blog | “How to start” cover | 960×600 | 640×400 | 16:10 | WebP | Yes | Yes | Soft |
| `journal-cover-ingredients` | Journal card | Ingredients guide cover | 960×600 | 640×400 | 16:10 | WebP | Yes | Yes | Soft |
| `journal-cover-authenticity` | Journal card | Authenticity guide cover | 960×600 | 640×400 | 16:10 | WebP | Yes | Yes | Soft |
| `journal-article-hero-{slug}` | Future article | Article hero | 1600×900 | 1080×608 | 16:9 | WebP | Yes | Soft | Soft |
| `journal-og-{slug}` | Future article SEO | Article OG | 1200×630 | n/a | ~1.91:1 | PNG/WebP | No | No | Meta |
| `guides-index-hero` | `/pages/guides` | Optional index atmosphere | 1600×900 | 1080×608 | 16:9 | WebP | Soft | Soft | Soft |
| `ingredients-hub-hero` | `/pages/ingredients` | Hub hero | 1600×900 | 1080×608 | 16:9 | WebP | Soft | Soft | Soft |
| `ingredient-library-{id}` | Ingredients library cards | Ingredient stills (shared with PDP) | 900×720 | 600×480 | 5:4 | WebP | Soft | Yes | No |

**Journal cover direction:** Magazine still-life; title-safe right/left third empty; soft grade; no overlaid text in file.

---

## 13. About (`/pages/our-story`)

| Asset ID | Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|--------|--------|--------|--------|------|----------|
| `about-story-editorial` | Brand story | Primary editorial | 960×1280 | 640×853 | 3:4 | WebP | Yes | Soft | Soft |
| `about-philosophy-plane` | Philosophy | Secondary plane | 800×1000 | full 4:5 crop | 4:5 | WebP | Yes | Yes | No |
| `about-authenticity-plane` | Authenticity block | Authenticity still | 1200×1500 | 800×1000 | 4:5 | WebP | Yes | Yes | No |
| `about-science-plane` | Science | Lab / ingredient mood | 1440×810 | 768×432 | 16:9 | WebP | Yes | Yes | No |
| `about-team-portrait` | Team (×3 placeholders) | Founder/team portrait | 800×1000 | 640×800 | 4:5 | WebP | Yes | Yes | No |

**Direction:** Honest, warm, non-corporate portraits; science plane slightly desaturated; authenticity plane = verified packaging detail.

---

## 14. Authenticity & Real vs Fake

| Asset ID | Page | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|------|---------|---------|--------|--------|--------|--------|------|----------|
| `authenticity-editorial` | `/pages/authenticity` | Hero editorial | 1200×1500 | 800×1000 | 4:5 | WebP | Yes | Soft | Soft |
| `real-vs-fake-authentic-pack` | `/pages/real-vs-fake` | Authentic pack reference | 1000×1250 | 700×875 | 4:5 | WebP | Yes | Soft | Soft |
| `real-vs-fake-fake-pack` | Real vs Fake | Counterfeit contrast (educational) | 1000×1250 | 700×875 | 4:5 | WebP | Yes | Soft | Soft |
| `real-vs-fake-texture` | Real vs Fake | Label/print detail | 1200×1200 | 800×800 | 1:1 | WebP | Yes | Yes | No |

**Direction:** Forensic-clear but calm — equal lighting on real vs fake; never sensational “crime lab” styling. Fake pack must be clearly labeled as educational in surrounding UI (not baked into image).

---

## 15. Contact, FAQ, Track Order

| Asset ID | Page | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|------|---------|---------|--------|--------|--------|--------|------|----------|
| `contact-ambient` | Contact aside | Soft ambient (optional) | 480×480 | omit | 1:1 | WebP | Soft | Yes | No |
| `contact-map-placeholder` | Contact | Map / location visual | 960×640 | 720×480 | 3:2 | WebP or interactive map | Soft | Yes | No |
| `faq-empty-illustration` | FAQ empty search | Soft mark | 200×200 | 140×140 | 1:1 | SVG | n/a | Yes | No |
| `track-order-status-visual` | Track order success | Status graphic | 720×405 | text OK | 16:9 | SVG/WebP | Soft | Yes | No |

---

## 16. Cart drawer & cart page

| Asset ID | Page / Section | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|----------------|---------|---------|--------|--------|--------|--------|------|----------|
| `cart-line-thumb` | Mini-cart lines | Line thumb (reuse packshot crop) | 192×240 | 144×180 | 4:5 | WebP | Yes | No | Soft |
| `cart-upsell-thumb` | Mini-cart upsell | Upsell thumb | 200×250 | 160×200 | 4:5 | WebP | Yes | Yes | No |
| `cart-empty-illustration` | Mini-cart empty | Empty bag art | 240×240 | 160×160 | 1:1 | SVG | n/a | Yes | Soft |
| `cart-page-line-thumb` | `/cart` lines | Larger line thumb | 240×300 | 160×200 | 4:5 | WebP | Yes | Soft | Soft |
| `cart-page-recommend-card` | `/cart` recs | Recommend card | 480×600 | 320×400 | 4:5 | WebP | Yes | Yes | No |
| `cart-page-empty-illustration` | `/cart` empty | Empty page art | 320×320 | 200×200 | 1:1 | SVG | n/a | Soft | Soft |

---

## 17. Checkout (Shopify-hosted)

| Asset ID | Context | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|---------|---------|---------|--------|--------|--------|--------|------|----------|
| `checkout-logo` | Shopify checkout branding | Same as `brand-logo-primary` | SVG | SVG | Wordmark | SVG | n/a | n/a | Checkout Admin |
| `checkout-favicon` | Checkout tab | Favicon set | See §3 | — | 1:1 | PNG | — | — | Admin |
| `payment-icon-*` | Checkout / footer | Visa, Mastercard, etc. | Official brand SVG/PNG per network rules | — | Per brand | SVG/PNG | No | Yes | No |

No custom checkout hero photography.

---

## 18. Account & Wishlist

| Asset ID | Page | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|------|---------|---------|--------|--------|--------|--------|------|----------|
| `account-order-line-thumb` | Orders / order detail | Line thumb | 160×200 | 112×140 | 4:5 | WebP | Yes | Yes | Soft |
| `account-wishlist-card` | `/wishlist` | Wishlist product card | 480×600 | 320×400 | 4:5 | WebP | Yes | Yes | Soft |
| `account-empty-illustration` | Empty account sections | Soft empty mark | 240×240 | 160×160 | 1:1 | SVG | n/a | Yes | Soft |
| `account-avatar-default` | Profile (future) | Default avatar | 192×192 | 128×128 | 1:1 | SVG/WebP | Soft | Soft | Soft |

Profile / addresses / recently-viewed: reuse product packshots; no unique heroes required.

---

## 19. Search (`/search`)

Covered by §4 browse specs + product packshots. Empty state: `filter-empty-illustration` or `empty-state-illustration`.

---

## 20. Utility & system pages

| Asset ID | Page | Purpose | Desktop | Mobile | Aspect | Format | Retina | Lazy | Priority |
|----------|------|---------|---------|--------|--------|--------|--------|------|----------|
| `utility-404-editorial` | 404 | Soft empty mark | 240×240 | 160×160 | 1:1 | SVG/WebP | Soft | Soft | Soft |
| `utility-error-mark` | 403 / 500 / offline / network | Status mark | 200×200 | 140×140 | 1:1 | **SVG** | n/a | Soft | Soft |
| `utility-maintenance-hero` | Maintenance | Full-bleed atmosphere | 1920×1080 | 1080×1920 OK | 16:9 | WebP | Soft | Soft | Soft |
| `utility-coming-soon-hero` | Coming soon | Launch atmosphere | 1920×1080 | 1080×1920 OK | 16:9 | WebP | Soft | Soft | Soft |

**Direction (utility heroes):** Extremely soft blush/pearl wash or out-of-focus product silhouette — never alarming red “error” photography.

---

## 21. Policy pages

| Asset ID | Pages | Purpose | Spec |
|----------|-------|---------|------|
| *(none)* | Shipping, Returns, Privacy, Terms, FAQ long-form | Typography-only long form | **No photography required** (`policy-header-rule`) |

Optional shared soft header rule or brand monogram only if design adds chrome later.

---

## 22. Production quantity summary (seed catalog)

| Category | Approx. unique assets |
|----------|----------------------:|
| Brand chrome + SEO + email + payment/social | ~25 |
| Nav / search chrome | ~5 + per-product search thumbs |
| Homepage unique (hero, concerns, editorial, story, why, testimonials, community, routine steps, trust SVGs) | ~30 |
| Shop + collection heroes (16 heroes + 7 categories + merch/concern cards) | ~35 |
| Product packs (8 × ~4–6 frames) + 2 bundle flats | ~40–55 |
| PDP supporting (ingredients, howto, UGC templates) | ~20 shared + UGC ongoing |
| About / authenticity / real-vs-fake / contact / FAQ / track | ~15 |
| Cart / account / utility / journal covers | ~20 |
| **Launch photography & graphics (estimated)** | **~190–220** deliverables (ex-UGC volume) |

Retina doubles raw pixel delivery but not creative concepts.

---

## 23. Naming & folder convention

```
/assets/brand/logo-primary.svg
/assets/brand/logo-inverse.svg
/assets/brand/favicon-512.png
/assets/brand/apple-touch-icon-180.png
/assets/seo/og-default-1200x630.webp
/assets/home/hero-lux-primary.webp
/assets/home/concern-acne.webp
/assets/collections/collection-hero-best-sellers.webp
/assets/products/{handle}/hero.webp
/assets/products/{handle}/alt.webp
/assets/products/{handle}/detail.webp
/assets/products/{handle}/lifestyle.webp
/assets/products/{handle}/hover.webp
/assets/icons/trust/*.svg
/assets/icons/payment/*.svg
/assets/illustrations/*.svg
```

File stem **must** match Asset ID (or documented alias). Prefer kebab-case.

---

## 24. Acceptance checklist (per photo)

- [ ] Matches aspect within 1%
- [ ] Meets or exceeds desktop master size
- [ ] Soft Brand Kit grade (no neon / hospital white)
- [ ] No baked UI text
- [ ] Packshots: label legible at card size
- [ ] Lifestyle: WCAG-aware when text overlays exist (or `imageTone` set)
- [ ] AVIF + WebP delivered; metadata stripped
- [ ] Rights / model releases on file for people
- [ ] Alt text draft supplied in delivery sheet

---

## 25. Phase exits

**Phase 12A complete when:** this specification is approved by brand + creative lead.  
**Phase 12B (next):** shoot / design / deliver against IDs; wire `imageSrc` + Shopify Files; replace Lucide trust icons; ship real favicon/OG set; mark assets complete in a delivery tracker.

---

*Generated for Korean Skin Lab Phase 12A — Final Asset Planning. Do not generate placeholder bitmaps from this document; production photography and vector art only.*
