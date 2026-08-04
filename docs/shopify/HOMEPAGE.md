# Homepage section → data sources

| Section | Component | Current seed | Future Shopify source |
|---------|-----------|--------------|------------------------|
| Hero | `HomeHero` | `HOME_HERO`, `HOME_HERO_MEDIA` | Theme settings + Metaobject `homepage_hero` (headline, CTAs, media refs) |
| Trust bar | `HomeTrustBar` | `TRUST_ITEMS` | Metaobject `trust_metric` list **or** shop metafield JSON |
| Shop entry | `HomeQuickEntry` | `HOME_QUICK_ENTRIES` | Metaobject `homepage_card` (ordered) **or** custom menu |
| Featured collections | `HomeFeaturedCollections` | `FEATURED_COLLECTIONS` | Theme setting: collection handles + Collection metafields (hero/badge) |
| Best sellers | `HomeBestSellers` | `BEST_SELLERS` | Collection `best-sellers` (manual sort) |
| Bundles | `HomeFeaturedBundles` | `FEATURED_BUNDLES` | Collection `bundles` or tagged products |
| Routine path | `HomeRoutinePath` | `ROUTINE_BUILDER_PAGE` + local steps | Metaobject `routine_guide` |
| Why / trust banner | `HomeWhyChoose` | `WHY_CHOOSE` + metrics | Metaobject `trust_metric` + Page CTA |
| Brand story | `HomeBrandStory` | `BRAND_STORY` | Page `our-story` excerpts + Metaobject `brand_story_block` |
| Science / authenticity | `HomeScienceAuthenticity` | `SCIENCE_AUTHENTICITY` | Page `authenticity` |
| Testimonials | `HomeTestimonials` | `HOME_TESTIMONIALS` | Metaobject `testimonial` (or reviews app) |
| Journal | `HomeJournal` | `HOME_JOURNAL` | Blog `journal` articles |
| Community | `HomeCommunity` | `HOME_COMMUNITY` | Theme settings + UGC app / Instagram |
| Newsletter | `HomeNewsletter` | `HOME_NEWSLETTER` | Theme copy + marketing provider |
| Final CTA | `HomeFinalCta` | `HOME_FINAL_CTA` | Theme settings / Metaobject `homepage_card` |

## Theme settings keys (planned)

```
homepage.best_sellers_collection → "best-sellers"
homepage.featured_collection_handles → list
homepage.bundles_collection → "bundles"
homepage.show_routine_path → boolean
homepage.show_testimonials → boolean
homepage.show_community → boolean
homepage.show_newsletter → boolean
```

Access today via `getHomepageSectionSettings()` in `src/data/homepage.ts`.
