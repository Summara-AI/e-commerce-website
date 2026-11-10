# SCYN — Visual Inventory & Remaining Asset Tracker

> Whole-website visual audit completed in-session. Source of truth for image
> requirements lives in `src/content/*-assets.ts` and `src/components/**`.

## 1. Asset library status

| Bucket | Location | Files | Status |
|---|---|---|---|
| Brand marks | `public/media/brand/` | scyn-complete, scyn-complete-bg, scyn-icon, scyn-icon-bg, scyn-tagline-bg, scyn-wordmark, scyn-wordmark-bg | ✅ Present |
| Product / bundle packshots | `public/media/products/` | 24 PNGs (22 client products + K-Beauty Starter Kit, K-Glow AM Trio, bundles) | ✅ Delivered |
| UGC / lifestyle | `public/media/ugc/` | none (README only) | ⏳ Pending — `customer-routine.mp4` + poster |

## 2. Images still needed (remaining visuals)

### Homepage
| # | Slot | Spec / exact px | Page | Status |
|---|---|---|---|---|
| 1 | Hero primary (full-bleed) | 2400×1350 desktop (16:9) · 1080×1350 mobile (4:5) | `/` Hero | ⏳ Pending (“final photography pending”) |
| 2 | Hero packshot | 200px display | `/` Hero | ⏳ Pending |
| 3 | Hero texture | 160px display | `/` Hero | ⏳ Pending |
| 4 | Editorial banner (authenticity) | 900×1125 (4:5) | `/` Editorial Banner | ⏳ Pending |

### Shop All
| # | Slot | Spec / exact px | Page | Status |
|---|---|---|---|---|
| 5 | Shop hero banner | — | `/collections/all` ShopLandingHero | ✅ wired (`shop-hero-banner`) |

### Product PDP
| # | Slot | Spec / exact px | Page | Status |
|---|---|---|---|---|
| 6 | PDP gallery hero | 1200×1500 display (4:5) | `/products/[handle]` | ✅ delivered via client overlay |
| 7 | PDP gallery detail / lifestyle | — | `/products/[handle]` | ⏳ Pending (client packshot single-image phase) |
| 8 | PDP UGC tiles | 800×1067 (3:4) lead / 800×800 (1:1) supports | `/products/[handle]` | ⏳ Pending |
| 9 | PDP FBT thumb | 1200×1500 (4:5) | PDP Frequently Bought Together | ✅ delivered |
| 10 | PDP routine step thumb | 1200×1500 (4:5) | PDP Complete Routine | ✅ delivered |
| 11 | PDP sticky bar thumb | 1200×1500 (4:5) | PDP StickyBar | ✅ delivered |
| 12 | PDP mobile cross-sell thumb | 1200×1500 (4:5) | PDP MobileCrossSell | ✅ delivered |
| 13 | PDP ingredients hero / support | — | PDP Ingredients | ⏳ Pending |
| 14 | PDP how-to step | — | PDP HowToUse | ⏳ Pending |

### Collections
| # | Slot | Spec / exact px | Page | Status |
|---|---|---|---|---|
| 15 | Collection hero | 21:9 desktop / 3:1 tablet / 16:9 mobile | `/collections/[handle]` | ⏳ Pending (per-handle images) |

### Commerce / system
| # | Slot | Spec / exact px | Page | Status |
|---|---|---|---|---|
| 16 | Cart line thumb | 1200×1500 (4:5) | `/cart` | ✅ delivered |
| 17 | Cart empty illustration | 240×240 (1:1) | `/cart` | ⏳ Pending |
| 18 | Cart upsell thumb | 1200×1500 (4:5) | Cart | ✅ wired |
| 19 | Account quick links | 4 slots (4:5 / 1:1) | `/account` | ⏳ Pending (“asset pending”) |
| 20 | Account empty / orders / addresses | 240×240 / 1200×1500 | Account pages | ⏳ Pending |
| 21 | Utility illustrations | 240×240 / error-mark | 404 / error / maintenance / coming-soon / track-order / FAQ | ⏳ Pending |
| 22 | Newsletter ambient | 960×540 (16:9) | Homepage Newsletter | ⏳ Optional |

## 3. Totals
- **Delivered visuals:** 24 packshots + 7 brand marks.
- **Pending visuals remaining to add:** ~8 core slots (hero ×3, editorial, PDP gallery detail/UGC/ingredients/how-to, collection hero) plus optional system/utility illustrations.

---

*Next step: supply the missing hero/editorial/UGC assets and I’ll wire them into the slots above with the exact px targets.*
