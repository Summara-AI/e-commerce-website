/**
 * Authenticity Promise — verified brand positioning only.
 */

import { FOOTER_CONTACT } from "@/lib/site-content";
import { SCIENCE_AUTHENTICITY } from "@/content/brand";

export const AUTHENTICITY_PAGE = {
  eyebrow: "Trust",
  title: "Our authenticity promise",
  description:
    "Korean Skin Lab exists to bring 100% authentic Korean skincare to Pakistan — verified, curated, and free from counterfeit noise.",
  heroLead:
    "Real formulas. Honest sourcing. A calmer way to shop K-beauty with confidence.",
  pillars: [
    {
      id: "source",
      title: "Source verification",
      body: "We personally source from Korea and work with trusted brand channels — so what lands in your routine matches what the world trusts.",
    },
    {
      id: "genuine",
      title: "Genuine products only",
      body: "Every piece we offer is positioned as original and verified. We founded Korean Skin Lab to fight counterfeit K-beauty flooding the market.",
    },
    {
      id: "direct",
      title: "Direct Korean sourcing",
      body: "Our team travels and sources carefully — preferring focused curation over endless catalogue noise.",
    },
    {
      id: "quality",
      title: "Quality checks",
      body: "Before products reach you, we review condition, labelling, and presentation so your experience stays consistent with genuine Korean skincare.",
    },
    {
      id: "packaging",
      title: "Packaging inspection",
      body: "Seal integrity, print quality, and finish are part of how we spot the difference between authentic and imitation — then educate you to do the same.",
    },
    {
      id: "trust",
      title: "Customer trust",
      body: `Guidance is always available via ${FOOTER_CONTACT.email} or WhatsApp ${FOOTER_CONTACT.phone}. Hours: ${FOOTER_CONTACT.hours}.`,
    },
  ],
  science: SCIENCE_AUTHENTICITY,
  closing: {
    title: "Shop with confidence",
    description:
      "Explore curated best sellers — or learn how to spot fakes before you buy.",
    primaryLabel: "Shop best sellers",
    primaryHref: "/collections/best-sellers",
    secondaryLabel: "Real vs fake guide",
    secondaryHref: "/pages/real-vs-fake",
  },
} as const;
