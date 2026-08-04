/**
 * About / Our Story — extended from brand.ts with verified mission framing only.
 * Shopify page metafields can replace these strings later.
 */

import { BRAND_STORY, SCIENCE_AUTHENTICITY, WHY_CHOOSE } from "@/content/brand";
import { FOOTER_CONTACT } from "@/lib/site-content";

export const ABOUT_PAGE = {
  eyebrow: "About us",
  title: "Korean Skin Lab",
  description:
    "A calmer path to authentic Korean skincare in Pakistan — verified, curated, and guided with care.",
  brandStory: {
    eyebrow: BRAND_STORY.eyebrow,
    title: BRAND_STORY.title,
    paragraphs: BRAND_STORY.paragraphs,
  },
  mission: {
    eyebrow: "Mission",
    title: "Honest access to the real Korean glow",
    body: BRAND_STORY.mission,
  },
  vision: {
    eyebrow: "Vision",
    title: "Trust as the foundation of every routine",
    body: "We envision a Pakistan where shoppers can discover Korean skincare with confidence — where authenticity is obvious, guidance is calm, and every purchase feels safe.",
  },
  philosophy: {
    eyebrow: "Our philosophy",
    title: "Clarity over noise",
    body: "We curate thoughtfully instead of flooding the shelf. Fewer, verified pieces. Education before urgency. Support when you need a second opinion — never pressure.",
    pillars: WHY_CHOOSE.items,
  },
  values: {
    eyebrow: "Values",
    title: "What we stand for",
    items: [
      {
        id: "authenticity",
        title: "Authenticity first",
        body: "100% authentic Korean skincare — verified and original.",
      },
      {
        id: "education",
        title: "Education over pressure",
        body: "Understand concerns and routines before you buy.",
      },
      {
        id: "care",
        title: "Customer-first care",
        body: "WhatsApp and email guidance during published support hours.",
      },
      {
        id: "curation",
        title: "Thoughtful curation",
        body: "A focused selection — not endless catalogue noise.",
      },
    ],
  },
  authenticityPromise: {
    eyebrow: "Authenticity promise",
    title: "Fighting counterfeit so you don’t have to",
    body: SCIENCE_AUTHENTICITY.lead,
    ctaLabel: SCIENCE_AUTHENTICITY.cta.label,
    ctaHref: SCIENCE_AUTHENTICITY.cta.href,
  },
  team: {
    eyebrow: "Team",
    title: "The people behind the Lab",
    description:
      "Founders and advisors portraits will appear here. Until then, know we’re a small team obsessed with authentic Korean skincare for Pakistan.",
  },
  koreanApproach: {
    eyebrow: "Korean skincare approach",
    title: "Layered care, ingredient-led results",
    body: "Korean skincare favours consistent, gentle layering and formulas designed for visible, lasting results. We bring that same discipline to curation — helping you build routines that respect skin barrier health rather than chase trends.",
    points: [
      {
        id: "layer",
        title: "Thoughtful routines",
        description:
          "Discovery paths by concern and step — so you can build a routine without overwhelm.",
      },
      {
        id: "gentle",
        title: "Barrier-first thinking",
        description:
          "We prioritise products that support calm, resilient skin over aggressive shortcuts.",
      },
      {
        id: "curate",
        title: "Focused selection",
        description:
          "Trusted Korean brands and kits — not endless catalogue noise.",
      },
    ],
  },
  scientificBacking: {
    eyebrow: SCIENCE_AUTHENTICITY.eyebrow,
    title: "Scientific backing & authenticity",
    lead: SCIENCE_AUTHENTICITY.lead,
    points: SCIENCE_AUTHENTICITY.points,
  },
  timeline: {
    eyebrow: "Journey",
    title: "How we got here",
    description:
      "Milestones grounded in our founding story — expanded chapter details will sync from Shopify pages when ready.",
    events: [
      {
        id: "observe",
        year: "Origin",
        title: "Recognising the gap",
        body: "We saw counterfeit K-beauty erode trust in Pakistan — and knew authentic access mattered.",
      },
      {
        id: "found",
        year: "Founding",
        title: "Korean Skin Lab begins",
        body: "As passionate users and frequent travelers to Korea, we founded Korean Skin Lab to bring original, verified skincare home.",
      },
      {
        id: "today",
        year: "Today",
        title: "Guided discovery from Lahore",
        body: `Operating from ${FOOTER_CONTACT.address} — with WhatsApp and email support when you need help choosing.`,
      },
    ],
  },
  closing: {
    title: "Ready to explore with confidence?",
    description:
      "Browse curated collections, or reach out if you want help finding a calmer starting point.",
    primaryLabel: "Shop best sellers",
    primaryHref: "/collections/best-sellers",
    secondaryLabel: "Contact us",
    secondaryHref: "/pages/contact",
  },
} as const;
