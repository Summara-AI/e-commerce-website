# Phase 11D — Final premium design & experience pass

**Scope:** Visual elevation only. Brand Kit preserved. No redesign, IA change, or Shopify connect.

## Hierarchy

- Section eyebrows: medium weight + Power Pink tracking
- Section descriptions: `text-foreground-secondary` (stronger than muted)
- Product card body: muted for quiet support under titles
- Compare-at pricing: unified muted strikethrough

## Spacing & section rhythm

- Default sections: more desktop breathing (`desktop:py-28`)
- Trust bar: padded to `py-10–14` so hero → commerce doesn’t feel rushed
- Homepage atmospheric bridges softened between Bundles → Routine → Why Choose → Brand Story → Testimonials → Journal → Final CTA

## Components

- Media placeholders: blush base, pearl vignette, soft sheen (kit-only)
- Badges: tighter tracking + whisper elevation
- Accordion: calmer open duration + Power Pink chevron
- Contact select: input radius + focus ring matching Input
- Radii: `rounded-sm`/`rounded-md` hotspots → `rounded-badge` / `rounded-button` / `rounded-card`

## Product & collection

- Variant chips: button radius, selected elev, blush hover
- Qty control: button radius + soft elev1
- Gallery thumbs: Power Pink active border (was ink)
- Gallery utility buttons: badge radius + glass + focus
- FBT / UGC / routine / reviews shells on card radius + kit surfaces
- Collection hero media fade/transform ready

## Cart

- Neutrals (`bg-neutral-200`) → blush / pink-mist
- Empty wells → `rounded-card` + blush

## Motion

- Section reveal: 640ms, slightly deeper lift (14px)
- Accordion: 280ms open / 240ms close with premium ease
- Card/button micro-motion already 200–280ms; reduced-motion preserved

## Documentation

- `docs/IMAGE_PLACEHOLDERS.md` — where editorial photography lands
