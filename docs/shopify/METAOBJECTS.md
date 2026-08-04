# Planned metaobjects

**Do not create these in Admin yet.** Types are sketched in `src/types/content.ts` (`MetaobjectTypeHandle`).

## Recommended types

| Type handle | Use | Homepage / surfaces |
|-------------|-----|---------------------|
| `homepage_hero` | Hero headline, media, CTAs | HomeHero |
| `homepage_card` | Quick entry / promo tiles | HomeQuickEntry, Final CTA |
| `trust_metric` | Proof stats / trust bar | HomeTrustBar, HomeWhyChoose |
| `testimonial` | Customer quotes | HomeTestimonials |
| `brand_story_block` | Story sections | HomeBrandStory, Our Story |
| `routine_guide` | Routine steps + product refs | HomeRoutinePath, Routine Builder |
| `ingredient` | Ingredient education | Ingredients hub, PDP key ingredients |
| `faq_group` | FAQ Q&A sets | FAQ page, PDP accordion |
| `skin_concern_guide` | Concern education | Concern collections, guides |
| `collection_highlight` | Featured collection promos | Shop landing |
| `editorial_story` | Journal-style blocks | Authenticity, science |
| `mega_menu_panel` | Mega menu columns / promo | Header mega |
| `before_after` | Paired images + caption | PDP social proof |
| `educational_block` | Reusable education module | Pages, PLP |

## Field conventions

- Always include: `title`, `handle` (or use Shopify system handle), `status`
- Media: `file_reference` fields named `image` / `poster`
- Ordering: integer `sort_order` or ordered shop metafield lists
- CTAs: `cta_label` + `cta_url` (or typed Online Store link)

## When to use metaobjects vs metafields vs pages

| Need | Choose |
|------|--------|
| Single product attribute | Product metafield |
| Reusable content across PDP/home | Metaobject |
| Long legal/editorial page | Page (+ optional metafields) |
| Merchandising group of products | Collection |
| Site-wide toggle / threshold | Shop metafield or theme setting |

## Current seed stand-ins

| Metaobject | Seed today |
|------------|------------|
| testimonials | `HOME_TESTIMONIALS` |
| routine | `ROUTINE_BUILDER_PAGE` / routine path copy |
| FAQ | `FAQ_ITEMS` |
| ingredients | content under guides / PDP fields |
| homepage cards | `HOME_QUICK_ENTRIES`, `HOME_FINAL_CTA` |
| trust metrics | `TRUST_ITEMS`, `WHY_CHOOSE` metrics |
