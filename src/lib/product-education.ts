/**
 * PDP education content — Shopify metafield-ready.
 * Derived from catalog descriptions, product titles, concern collection membership,
 * and verified brand framing. Does not invent INCI lists, shelf life, or medical claims.
 */

import { FEATURED_COLLECTIONS } from "@/lib/catalog";
import type { ProductPageData } from "@/lib/products";
import { PDP_PURCHASE } from "@/content/pdp";

export type EducationHighlight = { id: string; label: string };

export type EducationBenefit = {
  id: string;
  title: string;
  description: string;
  /** Lucide key — editorial mark, not a loud icon grid */
  mark: "drop" | "spark" | "shield" | "sun" | "leaf" | "moon";
};

export type EducationIngredient = {
  id: string;
  name: string;
  benefit: string;
  hero?: boolean;
  imageAlt: string;
};

export type HowToStep = {
  id: string;
  title: string;
  description: string;
};

export type HowToBlock = {
  eyebrow?: string;
  steps: HowToStep[];
  frequency?: string;
  tips?: string[];
  layering?: string;
  routine?: "morning" | "evening" | "both";
};

export type ProductSpec = {
  id: string;
  label: string;
  value: string;
};

export type AccordionBlock = {
  id: string;
  title: string;
  content: string;
  /** Optional list for ingredients / FAQs */
  items?: { title: string; body: string }[];
};

export type ProductEducation = {
  overview: {
    fullDescription: string;
    purpose: string;
    highlights: EducationHighlight[];
    suitableFor: string;
    skinTypes: string[];
    concerns: { id: string; title: string; href: string }[];
    size?: string;
    texture?: string;
    finish?: string;
  };
  benefits: EducationBenefit[];
  ingredients: {
    lead: string;
    items: EducationIngredient[];
  };
  howTo: HowToBlock;
  specs: ProductSpec[];
  accordion: AccordionBlock[];
};

const CONCERN_LABEL: Record<string, string> = {
  "sun-protection": "Sun Protection",
  "deep-cleansing": "Deep Cleansing",
  "dryness-dehydration": "Dryness & Dehydration",
  "anti-aging": "Anti-Aging",
  "pore-minimizer": "Pore Minimizer",
  "sensitive-skin": "Sensitive Skin",
};

/** Ingredient IDs seeded from product titles / prior facet map — educational blurbs stay close to catalog language */
const INGREDIENT_COPY: Record<string, { name: string; benefit: string }> = {
  "snail-mucin": {
    name: "Snail mucin care",
    benefit: "Supports deep hydration and a firmer, dewier look — as described for this cream.",
  },
  collagen: {
    name: "Collagen",
    benefit: "Paired in sheet-mask formulas for a soft, hydrated finish.",
  },
  rice: {
    name: "Rice extract",
    benefit: "Highlights the rice-led glow positioning in this mask.",
  },
  "black-rice": {
    name: "Black rice",
    benefit: "Haruharu Wonder black rice comfort — central to this formula’s character.",
  },
  "mineral-spf": {
    name: "Mineral SPF50",
    benefit: "Daily mineral sun protection for everyday wear.",
  },
  blueberry: {
    name: "Blueberry",
    benefit: "Blueberry-infused sheet mask for a fresh, hydrated finish.",
  },
  "tea-tree": {
    name: "Tea tree",
    benefit: "Tea tree collagen mask positioned to refresh and balance skin.",
  },
  kefir: {
    name: "Kefir",
    benefit: "Kefir hydration to replenish and support a healthy glow.",
  },
  cucumber: {
    name: "Cucumber",
    benefit: "Cooling cucumber collagen mask for soft, soothed skin.",
  },
  cica: {
    name: "Cica",
    benefit: "Cica comfort to support the skin barrier.",
  },
  ceramide: {
    name: "Ceramides",
    benefit: "Ceramide support for barrier comfort and calm moisture.",
  },
  "hyaluronic-acid": {
    name: "Hyaluronic care",
    benefit: "Hyaluronic black rice toner for soft, hydrated layers.",
  },
  pomegranate: {
    name: "Pomegranate",
    benefit: "Pomegranate collagen sheet mask for a comfortable, hydrated finish.",
  },
  charcoal: {
    name: "Charcoal",
    benefit: "Charcoal collagen mask positioned to refresh skin after cleansing.",
  },
  centella: {
    name: "Centella",
    benefit: "Centella-led ampoule for pore-conscious serum routines.",
  },
  "fermented-soy": {
    name: "Fermented soy",
    benefit: "Bean essence step for soft hydration between toner and cream.",
  },
  "marine-mineral": {
    name: "Marine minerals",
    benefit: "Hydrating serum with marine mineral character for supple comfort.",
  },
  caviar: {
    name: "Caviar capsules",
    benefit: "Concentrated ampoule treatment step in evening routines.",
  },
  peptide: {
    name: "Peptides",
    benefit: "Peptide and collagen care for the delicate eye area.",
  },
  probiotic: {
    name: "Probiotic care",
    benefit: "Moisturizer positioned for sensitive skin seeking calm hydration.",
  },
};

const PRODUCT_INGREDIENTS: Record<string, string[]> = {
  "escargot-original-facial-repair-cream": ["snail-mucin"],
  "dermal-rice-collagen-essence-mask": ["rice", "collagen"],
  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50": [
    "mineral-spf",
    "black-rice",
  ],
  "dermal-blueberry-facial-sheet-mask": ["blueberry"],
  "dermal-tea-tree-collagen-essence-mask": ["tea-tree", "collagen"],
  "dermal-kafir-facial-sheet-masks": ["kefir"],
  "dermal-cucumber-collagen-essence-mask": ["cucumber", "collagen"],
  "lacto-cica-barrier-cream-moisturizer": ["cica", "ceramide"],
  "haruharu-wonder-black-rice-hyaluronic-toner": ["black-rice", "hyaluronic-acid"],
  "haruharu-wonder-black-rice-moisture-cleansing-oil": ["black-rice"],
  "dermal-pomegranate-collagen-essence-mask": ["pomegranate", "collagen"],
  "dermal-charcoal-collagen-essence-mask": ["charcoal", "collagen"],
  "mixsoon-bean-essence": ["fermented-soy"],
  "skin-1004-madagascar-centella-poremizing-fresh-ampoule": ["centella"],
  "anjo-professional-snail-bb-cream": ["snail-mucin"],
  "ladamer-oligoforce-serum-hydrating": ["marine-mineral"],
  "ladamer-cell-clinic-bb-cream": ["collagen"],
  "ladamer-oligoforce-caviar-ampoule": ["caviar"],
  "elensilia-escargot-anti-wrinkle-multi-balm": ["snail-mucin"],
  "elensilia-cpp-collagen-peptide-eye-cream": ["peptide", "collagen"],
  "lactoderm-beneficial-moisturizing-cream": ["probiotic"],
};

const PRODUCT_CONCERNS: Record<string, string[]> = {
  "escargot-original-facial-repair-cream": ["dryness-dehydration", "anti-aging"],
  "dermal-rice-collagen-essence-mask": ["dryness-dehydration"],
  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50": [
    "sun-protection",
    "sensitive-skin",
  ],
  "dermal-blueberry-facial-sheet-mask": ["dryness-dehydration"],
  "dermal-tea-tree-collagen-essence-mask": ["pore-minimizer", "sensitive-skin"],
  "dermal-kafir-facial-sheet-masks": ["dryness-dehydration", "sensitive-skin"],
  "dermal-cucumber-collagen-essence-mask": ["sensitive-skin"],
  "lacto-cica-barrier-cream-moisturizer": ["sensitive-skin", "dryness-dehydration"],
  "haruharu-wonder-black-rice-hyaluronic-toner": ["dryness-dehydration"],
  "haruharu-wonder-black-rice-moisture-cleansing-oil": [
    "deep-cleansing",
    "pore-minimizer",
  ],
  "dermal-pomegranate-collagen-essence-mask": ["dryness-dehydration"],
  "dermal-charcoal-collagen-essence-mask": ["pore-minimizer", "deep-cleansing"],
  "mixsoon-bean-essence": ["dryness-dehydration"],
  "skin-1004-madagascar-centella-poremizing-fresh-ampoule": ["pore-minimizer"],
  "anjo-professional-snail-bb-cream": ["dryness-dehydration"],
  "ladamer-oligoforce-serum-hydrating": ["dryness-dehydration"],
  "ladamer-cell-clinic-bb-cream": ["dryness-dehydration"],
  "ladamer-oligoforce-caviar-ampoule": ["anti-aging"],
  "elensilia-escargot-anti-wrinkle-multi-balm": ["anti-aging", "dryness-dehydration"],
  "elensilia-cpp-collagen-peptide-eye-cream": ["anti-aging"],
  "lactoderm-beneficial-moisturizing-cream": ["sensitive-skin", "dryness-dehydration"],
};

function brandFromTitle(title: string, kind: ProductPageData["kind"]): string {
  if (kind === "bundle") return "SCYN";
  if (/^HARUHARU|^Haruharu/i.test(title)) return "Haruharu Wonder";
  if (/^DERMAL|^Dermal/i.test(title)) return "DERMAL";
  if (/^Lacto Cica/i.test(title)) return "Lacto Cica";
  if (/^LactoDerm/i.test(title)) return "LactoDerm";
  if (/^Mixsoon/i.test(title)) return "Mixsoon";
  if (/^SKIN 1004/i.test(title)) return "SKIN 1004";
  if (/^Anjo/i.test(title)) return "Anjo";
  if (/^LADAMER/i.test(title)) return "LADAMER";
  if (/^ELENSILIA|^Elensilia/i.test(title)) return "ELENSILIA";
  if (/^Escargot/i.test(title)) return "Escargot";
  return "SCYN edit";
}

function purposeFor(product: ProductPageData): string {
  if (product.kind === "bundle") {
    return product.description;
  }
  const type = product.productType ?? "Skincare";
  return `${type} in the SCYN edit — ${product.description}`;
}

function highlightsFromDescription(description: string): EducationHighlight[] {
  const parts = description
    .split(/[—.–]|,\s+(?=[A-Z])|\sand\s/i)
    .map((p) => p.replace(/^with\s+/i, "").trim())
    .filter((p) => p.length > 3 && p.length < 80);

  const unique = Array.from(new Set(parts)).slice(0, 4);
  if (!unique.length) {
    return [{ id: "h1", label: description }];
  }
  return unique.map((label, i) => ({ id: `h${i + 1}`, label }));
}

function benefitsFromProduct(product: ProductPageData): EducationBenefit[] {
  if (product.kind === "bundle" && product.includes?.length) {
    return product.includes.slice(0, 3).map((item, i) => ({
      id: item.id,
      title: item.title,
      description: "Included in this verified SCYN kit.",
      mark: (["drop", "spark", "sun"] as const)[i] ?? "spark",
    }));
  }

  const highlights = highlightsFromDescription(product.description);
  const marks: EducationBenefit["mark"][] =
    product.productType === "Sunscreen"
      ? ["sun", "shield", "drop"]
      : product.productType === "Cleanser"
        ? ["drop", "leaf", "spark"]
        : product.productType === "Facial Mask"
          ? ["moon", "drop", "spark"]
          : ["drop", "spark", "shield"];

  return highlights.slice(0, 3).map((h, i) => ({
    id: h.id,
    title: h.label.replace(/\.$/, ""),
    description: `Part of what defines ${product.title} in our verified Korean edit.`,
    mark: marks[i] ?? "spark",
  }));
}

function skinTypesFor(concernIds: string[]): string[] {
  const types: string[] = [];
  if (concernIds.includes("sensitive-skin")) types.push("Sensitive");
  if (concernIds.includes("dryness-dehydration")) types.push("Dry / dehydrated");
  if (concernIds.includes("sun-protection")) types.push("All skin types seeking daily SPF");
  if (concernIds.includes("pore-minimizer")) types.push("Texture-conscious");
  if (concernIds.includes("anti-aging")) types.push("Mature / firmness-focused");
  if (concernIds.includes("deep-cleansing")) types.push("Makeup / SPF wearers");
  if (!types.length) types.push("Most skin types — patch test if new to the formula");
  return Array.from(new Set(types));
}

function howToFor(product: ProductPageData): HowToBlock {
  if (product.kind === "bundle" && product.includes?.length) {
    const isAm = /morning|AM/i.test(product.title + product.description);
    return {
      eyebrow: isAm ? "Morning path" : "Routine path",
      routine: isAm ? "morning" : "both",
      frequency: "Follow each product’s labeled directions.",
      layering:
        "Move through the kit from cleanse toward treat and protect — adjust to your skin’s comfort.",
      tips: [
        "Introduce one new step at a time if your skin is reactive.",
        "Authentic Korean skincare performs best when you stay consistent.",
      ],
      steps: product.includes.map((item, i) => ({
        id: item.id,
        title: `Step ${i + 1} · ${item.title}`,
        description: "Use as directed on the product packaging within your kit routine.",
      })),
    };
  }

  const type = product.productType ?? "";

  if (type === "Sunscreen") {
    return {
      eyebrow: "Morning",
      routine: "morning",
      frequency: "Every morning; reapply when outdoors for longer stretches.",
      layering: "Apply as the final step of your morning routine.",
      tips: ["Use generously on face and exposed areas."],
      steps: [
        {
          id: "s1",
          title: "Finish your morning skincare",
          description: "Complete cleanse, tone, and moisturize as usual.",
        },
        {
          id: "s2",
          title: "Apply SPF last",
          description:
            "Smooth on as the last leave-on step before makeup — everyday mineral comfort wear.",
        },
        {
          id: "s3",
          title: "Reapply as needed",
          description: "Reapply when you spend extended time outdoors.",
        },
      ],
    };
  }

  if (type === "Cleanser") {
    return {
      eyebrow: "Cleanse",
      routine: "both",
      frequency: "Morning and/or evening, as your routine requires.",
      layering: "First step — before toner, essence, and cream.",
      tips: ["Emulsify oil cleansers with water before rinsing, if directed on pack."],
      steps: [
        {
          id: "c1",
          title: "Dispense",
          description: "Take an appropriate amount into dry or damp hands as labeled.",
        },
        {
          id: "c2",
          title: "Massage",
          description: "Work over face to melt makeup and residue without harsh stripping.",
        },
        {
          id: "c3",
          title: "Rinse & continue",
          description: "Rinse thoroughly, then move to toner and the rest of your routine.",
        },
      ],
    };
  }

  if (type === "Facial Mask") {
    return {
      eyebrow: "Treatment",
      routine: "both",
      frequency: "As needed — typically a few times weekly, or as labeled.",
      layering: "After cleansing (and toner if you use one); follow with cream.",
      tips: ["Leave on for the time indicated on the packaging."],
      steps: [
        {
          id: "m1",
          title: "Prep skin",
          description: "Cleanse so the mask can sit on bare, comfortable skin.",
        },
        {
          id: "m2",
          title: "Apply the sheet",
          description: "Smooth the essence-soaked sheet evenly over the face.",
        },
        {
          id: "m3",
          title: "Remove & press",
          description: "Remove after the labeled time; gently press remaining essence in.",
        },
      ],
    };
  }

  if (type === "Toner") {
    return {
      eyebrow: "Hydrate",
      routine: "both",
      frequency: "Morning and evening after cleansing.",
      layering: "After cleanse, before essence, serum, and cream.",
      tips: ["Layer lightly for soft, hydrated prep."],
      steps: [
        {
          id: "t1",
          title: "After cleansing",
          description: "Start with a clean face.",
        },
        {
          id: "t2",
          title: "Apply toner",
          description: "Sweep or pat an appropriate amount until comfortably absorbed.",
        },
        {
          id: "t3",
          title: "Continue layering",
          description: "Follow with the next steps in your Korean routine.",
        },
      ],
    };
  }

  if (type === "Essence" || type === "Serum") {
    return {
      eyebrow: "Treat",
      routine: "both",
      frequency: "Morning and/or evening after toner.",
      layering: "After toner, before moisturizer and SPF.",
      tips: ["Pat in lightly until absorbed before your next layer."],
      steps: [
        {
          id: "e1",
          title: "After toner",
          description: "Start with cleansed skin and your usual toner step.",
        },
        {
          id: "e2",
          title: "Apply essence or serum",
          description: "Dispense an appropriate amount and smooth or pat over face.",
        },
        {
          id: "e3",
          title: "Seal with cream",
          description: "Follow with moisturizer — and SPF in the morning.",
        },
      ],
    };
  }

  if (type === "BB Cream") {
    return {
      eyebrow: "Morning",
      routine: "morning",
      frequency: "As needed for light coverage.",
      layering: "After skincare; before powder if you use it.",
      tips: ["Blend outward for an even, natural finish."],
      steps: [
        {
          id: "bb1",
          title: "Prep skin",
          description: "Complete your morning skincare through moisturizer.",
        },
        {
          id: "bb2",
          title: "Apply BB cream",
          description: "Dot and blend over face for light, even coverage.",
        },
        {
          id: "bb3",
          title: "Finish as you like",
          description: "Wear alone or add SPF on top if your routine calls for it.",
        },
      ],
    };
  }

  if (type === "Eye Care") {
    return {
      eyebrow: "Targeted care",
      routine: "both",
      frequency: "Morning and/or evening.",
      layering: "After lighter face layers; before heavier creams if layering.",
      tips: ["Use a gentle patting motion — avoid tugging the delicate area."],
      steps: [
        {
          id: "eye1",
          title: "Prep",
          description: "Cleanse and complete face layers as usual.",
        },
        {
          id: "eye2",
          title: "Apply eye cream",
          description: "Use a small amount around the orbital area as labeled.",
        },
        {
          id: "eye3",
          title: "Continue routine",
          description: "Follow with moisturizer or SPF as your routine requires.",
        },
      ],
    };
  }

  if (type === "Balm") {
    return {
      eyebrow: "On the go",
      routine: "both",
      frequency: "As needed for targeted moisture.",
      layering: "Over or between cream steps on dry areas.",
      tips: ["Glide onto lines, brows, or dry spots — reapply when skin feels tight."],
      steps: [
        {
          id: "b1",
          title: "Identify dry areas",
          description: "Use on lines, brows, or anywhere that needs extra comfort.",
        },
        {
          id: "b2",
          title: "Apply balm",
          description: "Glide or pat the stick directly onto skin.",
        },
        {
          id: "b3",
          title: "Reapply as needed",
          description: "Keep handy for touch-ups through the day.",
        },
      ],
    };
  }

  // Moisturizer / default
  return {
    eyebrow: "Moisture",
    routine: "both",
    frequency: "Morning and/or evening.",
    layering: "After water-based layers; before SPF in the morning.",
    tips: ["Use an amount that absorbs comfortably — less can be more for richer creams."],
    steps: [
      {
        id: "mo1",
        title: "Prep",
        description: "Cleanse and complete lighter layers (toner / essence) first.",
      },
      {
        id: "mo2",
        title: "Apply cream",
        description: "Smooth an appropriate amount over face and neck.",
      },
      {
        id: "mo3",
        title: "Seal the routine",
        description: "In the morning, follow with sunscreen as your final step.",
      },
    ],
  };
}

function sizeHint(product: ProductPageData): string | undefined {
  if (product.productType === "Sunscreen" && /SPF50/i.test(product.title)) {
    return "SPF50 daily sunscreen";
  }
  if (product.kind === "bundle") {
    const vol = product.includes?.find((i) => /\d+\s*ml/i.test(i.title));
    if (vol) return `Kit includes: ${vol.title.match(/\([^)]+\)/)?.[0] ?? "see inclusions"}`;
  }
  if (product.productType === "Facial Mask") return "Sheet mask";
  if (/100ml/i.test(product.title)) return "100ml ampoule";
  if (/50ml/i.test(product.title)) return "50ml essence";
  return undefined;
}

/**
 * Build education payload for a PDP — ready for Shopify metafield replacement.
 */
export function getProductEducation(product: ProductPageData): ProductEducation {
  const concernIds = PRODUCT_CONCERNS[product.handle] ?? [];
  const ingredientIds = PRODUCT_INGREDIENTS[product.handle] ?? [];
  const concerns = concernIds
    .map((id) => {
      const col = FEATURED_COLLECTIONS.find((c) => c.handle === id);
      return {
        id,
        title: CONCERN_LABEL[id] ?? col?.title ?? id,
        href: col?.href ?? `/collections/${id}`,
      };
    })
    .filter(Boolean);

  const highlights = highlightsFromDescription(product.description);
  const ingredients = ingredientIds.map((id, index) => {
    const copy = INGREDIENT_COPY[id] ?? {
      name: id,
      benefit: "Featured in this formula’s SCYN listing.",
    };
    return {
      id,
      name: copy.name,
      benefit: copy.benefit,
      hero: index === 0,
      imageAlt: `${copy.name} ingredient visual — photography pending`,
    };
  });

  const brand = brandFromTitle(product.title, product.kind);
  const size = sizeHint(product);

  const specs: ProductSpec[] = [
    { id: "type", label: "Product type", value: product.productType ?? product.kind },
    { id: "brand", label: "Brand", value: brand },
    {
      id: "origin",
      label: "Sourcing",
      value: "Authentic Korean skincare — sourced for Pakistan",
    },
    {
      id: "skin",
      label: "Skin focus",
      value: skinTypesFor(concernIds).join(" · "),
    },
  ];
  if (size) specs.unshift({ id: "size", label: "Format", value: size });
  if (concerns.length) {
    specs.push({
      id: "concerns",
      label: "Concern paths",
      value: concerns.map((c) => c.title).join(", "),
    });
  }

  const accordion: AccordionBlock[] = [
    {
      id: "directions",
      title: "Directions",
      content:
        "Follow the step-by-step guidance above and the directions printed on the authentic product packaging.",
    },
    {
      id: "warnings",
      title: "Good to know",
      content:
        "For external use. If you have very reactive skin, patch test first. Discontinue use if irritation occurs. Keep out of eyes.",
    },
    {
      id: "shipping",
      title: "Shipping",
      content: `${PDP_PURCHASE.shippingSummary} Visit ${PDP_PURCHASE.shippingCta.toLowerCase()} for full details.`,
    },
    {
      id: "returns",
      title: "Returns",
      content: `${PDP_PURCHASE.returnsSummary}`,
    },
    {
      id: "faq",
      title: "FAQs",
      content: "Common questions about authenticity and support.",
      items: [
        {
          title: "Is this authentic?",
          body: "SCYN brings 100% authentic Korean skincare — verified and original, sourced to fight counterfeit K-beauty in Pakistan.",
        },
        {
          title: "Need help choosing?",
          body: "Reach syncpk@gmail.com or WhatsApp +92 327 7560880 during published support hours.",
        },
      ],
    },
  ];

  return {
    overview: {
      fullDescription: product.description,
      purpose: purposeFor(product),
      highlights,
      suitableFor: concerns.length
        ? `Often chosen along our ${concerns.map((c) => c.title).join(", ")} paths.`
        : "Part of the verified SCYN catalogue.",
      skinTypes: skinTypesFor(concernIds),
      concerns,
      size,
      texture: undefined,
      finish: product.productType === "Sunscreen" ? "Everyday wearable finish" : undefined,
    },
    benefits: benefitsFromProduct(product),
    ingredients: {
      lead:
        ingredients.length > 0
          ? "Key ingredients called out from this product’s listing — fuller INCI via metafields next."
          : "Ingredient education will deepen when packaging metafields are connected.",
      items: ingredients,
    },
    howTo: howToFor(product),
    specs,
    accordion,
  };
}
