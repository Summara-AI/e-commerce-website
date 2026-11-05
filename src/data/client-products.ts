/**
 * Client-approved product content — transcribed from
 * `client content/Korean_Skin_Lab_Product_and_Page_Content.docx`.
 *
 * This file is the single source of truth for the supplied product copy.
 * It never invents ingredients, sizes, prices, ratings, availability, or usage
 * instructions. Fields that the client did not supply are intentionally absent.
 *
 * Image paths point to the client-supplied PNG packshots in
 * `public/media/products/`. Each supplied product has one image.
 */

import type { CatalogProduct } from "@/lib/catalog";

export type ClientBenefit = {
  title: string;
  description: string;
};

export type ClientProductContent = {
  handle: string;
  name: string;
  /** URL printed in the client document — existing site URLs are preserved. */
  sourceUrl: string;
  /** Product Type from the client document. */
  productType: string;
  tags: string[];
  skinConcern?: string;
  keyIngredients: string;
  /** Complete Product Details copy, split into readable paragraphs/bullets. */
  details: string[];
  /** Directions exactly as supplied. */
  howToUse: string[];
  /** Concise card / above-the-fold description taken from the client copy. */
  shortDescription: string;
  image: string;
  /** Only when the size is stated in the document or clearly printed on the pack. */
  size?: string;
  skinTypes: string[];
  /** Exact suitability sentence where the client supplied one. */
  suitableFor?: string;
  /** Existing SCYN concern collection handles. */
  concerns: string[];
  highlights: string[];
  benefits: ClientBenefit[];
};

export const CLIENT_PRODUCTS: Record<string, ClientProductContent> = {
  "dermal-tea-tree-collagen-essence-mask": {
    handle: "dermal-tea-tree-collagen-essence-mask",
    name: "DERMAL Tea Tree Collagen Essence Mask",
    sourceUrl: "/products/dermal-tea-tree-collagen-essence-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Allantoin, arginine, hyaluronic acid, glycerin, collagen, panthenol, tea tree and more",
    details: [
      "Dermal Tea Tree Collagen Essence Mask, a collagen sheet mask for the face with tea tree leaf extract, stimulates the skin's own collagen production, maintaining a youthful appearance and improving complexion. It effectively tones aging skin, reduces enlarged pores, combats acne, has disinfectant properties, improves skin elasticity, and relieves itching and flaking.",
    ],
    howToUse: [
      "Remove the mask from its packaging and unfold it.",
      "Apply the mask to your face, smoothing it for a better fit, starting with the eye area.",
      "Leave on for 15-20 minutes.",
      "Remove the mask and gently pat the remaining essence over your face until fully absorbed.",
    ],
    shortDescription:
      "Dermal Tea Tree Collagen Essence Mask, a collagen sheet mask for the face with tea tree leaf extract, stimulates the skin's own collagen production, maintaining a youthful appearance and improving complexion.",
    image: "/media/products/DERMAL Tea Tree Collagen Essence Mask.png",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["anti-aging", "sensitive-skin", "pore-minimizer"],
    highlights: [
      "Tea tree leaf extract",
      "Collagen sheet mask",
      "Reduces enlarged pores",
      "Improves skin elasticity",
    ],
    benefits: [
      {
        title: "Youthful-looking complexion",
        description:
          "Stimulates the skin's own collagen production, maintaining a youthful appearance and improving complexion.",
      },
      {
        title: "Tones aging skin",
        description:
          "Effectively tones aging skin, reduces enlarged pores, combats acne, has disinfectant properties, improves skin elasticity, and relieves itching and flaking.",
      },
      {
        title: "Tea tree care",
        description:
          "A collagen sheet mask for the face with tea tree leaf extract.",
      },
    ],
  },

  "dermal-rice-collagen-essence-mask": {
    handle: "dermal-rice-collagen-essence-mask",
    name: "DERMAL Rice Collagen Essence Mask",
    sourceUrl: "/products/dermal-rice-collagen-essence-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Aqua, Butylene Glycol, Glycerin, Glycereth-26, Methylpropanediol, Oryza Sativa (Rice) Extract, Sodium Hyaluronate, Panthenol, Portulaca Oleracea Extract, Hydrolyzed Collagen, Scutellaria Baicalensis Root Extract, Octyldodeceth-16, Allantoin, Glyceryl Caprylate, Hydroxyethylcellulose, 1,2-Hexanediol, Beta-Glucan, Carbomer, Arginine, Disodium EDTA, Ethylhexylglycerin, Parfum.",
    details: [
      "The DERMAL Rice Collagen Essence Mask is enriched with Rice Extract, Hydrolyzed Collagen and Sodium Hyaluronate to brighten dull skin, boost hydration and improve elasticity. Panthenol, Beta-Glucan and Allantoin soothe and strengthen the skin barrier, leaving your complexion smooth, soft and radiant. Gentle on all skin types, it is ideal for regular use to promote clear, bright and glowing skin.",
    ],
    howToUse: [
      "Gently unfold the sheet mask onto cleansed face, evenly spreading it out.",
      "Leave it on the skin for about 15-20 minutes to allow the active ingredients to penetrate the skin.",
      "Gently remove the mask and lightly pat the remaining essence into the skin to ensure maximum absorption of the nourishing ingredients.",
    ],
    shortDescription:
      "The DERMAL Rice Collagen Essence Mask is enriched with Rice Extract, Hydrolyzed Collagen and Sodium Hyaluronate to brighten dull skin, boost hydration and improve elasticity.",
    image: "/media/products/DERMAL Rice Collagen Essence Mask.png",
    skinTypes: ["All skin types"],
    suitableFor: "Gentle on all skin types.",
    concerns: ["anti-aging", "sensitive-skin", "dryness-dehydration"],
    highlights: [
      "Rice Extract",
      "Hydrolyzed Collagen",
      "Sodium Hyaluronate",
      "Soothes and strengthens the skin barrier",
    ],
    benefits: [
      {
        title: "Brightens dull skin",
        description:
          "Enriched with Rice Extract, Hydrolyzed Collagen and Sodium Hyaluronate to brighten dull skin, boost hydration and improve elasticity.",
      },
      {
        title: "Soothes and strengthens the barrier",
        description:
          "Panthenol, Beta-Glucan and Allantoin soothe and strengthen the skin barrier, leaving your complexion smooth, soft and radiant.",
      },
      {
        title: "Gentle on all skin types",
        description:
          "Gentle on all skin types, it is ideal for regular use to promote clear, bright and glowing skin.",
      },
    ],
  },

  "dermal-kafir-facial-sheet-masks": {
    handle: "dermal-kafir-facial-sheet-masks",
    name: "Dermal Kafir Facial Sheet Masks",
    sourceUrl: "/products/dermal-kafir-facial-sheet-masks",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients: "Water, betaine, glycerin, hyaluronic acid, kefir, panthenol and more",
    details: [
      "Includes KEFIR which is called 'precious mushroom' in Tibet that replenishes pores with the deep hydration to make it glow and healthy. By using the fabric with excellent water absorption and adhesion, it swiftly transmits the active ingredients of essence to the skin.",
    ],
    howToUse: [
      "Take out mask sheet from the pack and unfold it.",
      "Gently apply the mask sheet around the eye part and then fit the face contours.",
      "Leave on for 15-20 minutes.",
      "Take off the mask sheet and pat the remaining essence until it is completely absorbed into the skin.",
    ],
    shortDescription:
      "Includes KEFIR which is called 'precious mushroom' in Tibet that replenishes pores with the deep hydration to make it glow and healthy.",
    image: "/media/products/Dermal kafir facial sheet masks.png",
    size: "25 g",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["anti-aging", "sensitive-skin", "dryness-dehydration"],
    highlights: ["KEFIR", "Deep pore hydration", "Excellent water absorption and adhesion"],
    benefits: [
      {
        title: "Deep pore hydration",
        description:
          "Includes KEFIR which is called 'precious mushroom' in Tibet that replenishes pores with the deep hydration to make it glow and healthy.",
      },
      {
        title: "Excellent adhesion",
        description:
          "By using the fabric with excellent water absorption and adhesion, it swiftly transmits the active ingredients of essence to the skin.",
      },
    ],
  },

  "dermal-blueberry-facial-sheet-mask": {
    handle: "dermal-blueberry-facial-sheet-mask",
    name: "Dermal Blueberry Facial Sheet Mask",
    sourceUrl: "/products/dermal-blueberry-facial-sheet-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Water, Glycerin, Propanediol, Ethanol, 1,2-Hexanediol, Panthenol, Betaine, Sodium Hyaluronate, Tromethamine, Cetearyl Olivate, Sorbitan Olivate, Acrylates/C10-30Alkyl Acrylate Crosspolymer, Biosaccharide Gum-1, Carbomer, Ethylhexylglycerin, Butylene Glycol, Vaccinium Angustifolium (Blueberry) Fruit Extract (1000ppm), Fragrance",
    details: [
      "Contains blueberries, which are known for their excellent antioxidant effect.",
      "Prevents aging and lightens dark skin to look healthier.",
      "Using a fabric with excellent water absorption and adhesion helps to quickly deliver the active ingredients of the extract to the skin.",
    ],
    howToUse: [
      "Clean and dry the face thoroughly.",
      "Remove and open the mask, and apply it to your face.",
      "Leave the mask on your skin for 15-20 minutes.",
      "Massage the remaining serum into the face and neck.",
      "Use the Face Sheet Mask twice a week.",
    ],
    shortDescription:
      "Contains blueberries, which are known for their excellent antioxidant effect.",
    image: "/media/products/Dermal Blueberry Facial Sheet Mask.png",
    size: "25 g",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["anti-aging", "sensitive-skin", "dryness-dehydration"],
    highlights: ["Blueberry extract", "Antioxidant effect", "Hydrating sheet mask"],
    benefits: [
      {
        title: "Antioxidant care",
        description:
          "Contains blueberries, which are known for their excellent antioxidant effect.",
      },
      {
        title: "Helps prevent aging",
        description: "Prevents aging and lightens dark skin to look healthier.",
      },
      {
        title: "Quick delivery of actives",
        description:
          "Using a fabric with excellent water absorption and adhesion helps to quickly deliver the active ingredients of the extract to the skin.",
      },
    ],
  },

  "dermal-cucumber-collagen-essence-mask": {
    handle: "dermal-cucumber-collagen-essence-mask",
    name: "DERMAL Cucumber Collagen Essence Mask",
    sourceUrl: "/products/dermal-cucumber-collagen-essence-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Water, Glycerin, Butylene Glycol, Hydrolyzed Collagen, Aloe Barbadensis Leaf Juice, Portulaca Oleracea Extract, Beta-Glucan, Panthenol, Tocopheryl Acetate, Polysorbate 80, Disodium EDTA, Xanthan Gum, Methylparaben, Fragrance",
    details: [
      "The DERMAL Cucumber Collagen Essence Mask combines the cooling, refreshing effect of cucumber with Hydrolyzed Collagen and Aloe Vera to hydrate, soothe and revive tired skin. Panthenol, Vitamin E and Beta-Glucan calm redness and support the skin barrier, leaving your complexion cool, smooth and refreshed. Gentle on all skin types, it is especially good for skin that feels dry, irritated or heat-stressed.",
    ],
    howToUse: [
      "After cleansing, apply the toner across the face.",
      "Take the mask and apply it evenly over the face, avoiding eyes and mouth.",
      "After 15-20 minutes, remove the mask sheet and pat the remaining serum gently.",
    ],
    shortDescription:
      "The DERMAL Cucumber Collagen Essence Mask combines the cooling, refreshing effect of cucumber with Hydrolyzed Collagen and Aloe Vera to hydrate, soothe and revive tired skin.",
    image: "/media/products/DERMAL Cucumber Collagen Essence Mask.png",
    skinTypes: ["All skin types", "Dry, irritated or heat-stressed skin"],
    suitableFor:
      "Gentle on all skin types, especially good for skin that feels dry, irritated or heat-stressed.",
    concerns: ["sensitive-skin", "dryness-dehydration", "anti-aging"],
    highlights: ["Cucumber", "Hydrolyzed Collagen", "Aloe Vera", "Cooling and soothing"],
    benefits: [
      {
        title: "Cooling hydration",
        description:
          "Combines the cooling, refreshing effect of cucumber with Hydrolyzed Collagen and Aloe Vera to hydrate, soothe and revive tired skin.",
      },
      {
        title: "Calms redness",
        description:
          "Panthenol, Vitamin E and Beta-Glucan calm redness and support the skin barrier, leaving your complexion cool, smooth and refreshed.",
      },
      {
        title: "Gentle on all skin types",
        description:
          "Gentle on all skin types, it is especially good for skin that feels dry, irritated or heat-stressed.",
      },
    ],
  },

  "dermal-pomegranate-collagen-essence-mask": {
    handle: "dermal-pomegranate-collagen-essence-mask",
    name: "DERMAL Pomegranate Collagen Essence Mask",
    sourceUrl: "/products/dermal-pomegranate-collagen-essence-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Water, Glycerin, Butylene Glycol, Punica Granatum (pomegranate) Fruit Extract, Hydrolyzed Collagen, Aloe Barbadensis Leaf Juice, Portulaca Oleracea Extract, Beta-Glucan, Panthenol, Tocopheryl Acetate, Polysorbate 80, Disodium EDTA, xanthan gum, Methylparaben, Fragrance",
    details: [
      "The DERMAL Pomegranate Collagen Essence Mask is enriched with 10,000 ppm Pomegranate Extract and Hydrolyzed Collagen to enhance skin elasticity, hydration, and radiance. Infused with Vitamin E, Panthenol, and Beta-Glucan, it deeply nourishes and strengthens the skin barrier while leaving your complexion smooth and revitalized. This hypoallergenic, cruelty-free mask is gentle on all skin types, making it perfect for daily use to promote firm, youthful, and glowing skin.",
    ],
    howToUse: [
      "After cleansing, apply the toner across the face.",
      "Take the mask and apply it evenly over the face, avoiding eyes and mouth.",
      "After 15-20 minutes, remove the mask sheet and pat the remaining serum gently.",
    ],
    shortDescription:
      "The DERMAL Pomegranate Collagen Essence Mask is enriched with 10,000 ppm Pomegranate Extract and Hydrolyzed Collagen to enhance skin elasticity, hydration, and radiance.",
    image: "/media/products/DERMAL Pomegranate Collagen Essence Mask.png",
    skinTypes: ["All skin types"],
    suitableFor: "Hypoallergenic and gentle on all skin types.",
    concerns: ["anti-aging", "sensitive-skin", "dryness-dehydration"],
    highlights: [
      "10,000 ppm Pomegranate Extract",
      "Hydrolyzed Collagen",
      "Vitamin E, Panthenol and Beta-Glucan",
      "Cruelty-free",
    ],
    benefits: [
      {
        title: "Elasticity, hydration and radiance",
        description:
          "Enriched with 10,000 ppm Pomegranate Extract and Hydrolyzed Collagen to enhance skin elasticity, hydration, and radiance.",
      },
      {
        title: "Nourishes and strengthens the barrier",
        description:
          "Infused with Vitamin E, Panthenol, and Beta-Glucan, it deeply nourishes and strengthens the skin barrier while leaving your complexion smooth and revitalized.",
      },
      {
        title: "Hypoallergenic and cruelty-free",
        description:
          "This hypoallergenic, cruelty-free mask is gentle on all skin types, making it perfect for daily use to promote firm, youthful, and glowing skin.",
      },
    ],
  },

  "dermal-charcoal-collagen-essence-mask": {
    handle: "dermal-charcoal-collagen-essence-mask",
    name: "DERMAL Charcoal Collagen Essence Mask",
    sourceUrl: "/products/dermal-charcoal-collagen-essence-mask",
    productType: "Facial Mask Sheet",
    tags: ["antiaging", "moisturizers", "Sensitive Skin", "Skin Coverage", "Skin Hydration"],
    keyIngredients:
      "Aqua, Glycerin, Butylene Glycol, Hydrolyzed Collagen, Aloe Barbadensis Leaf Juice, Portulaca Oleracea Extract, Charcoal Powder, Beta-Glucan, Panthenol, Tocopheryl Acetate, Polysorbate 80, Disodium EDTA, Xanthan Gum, Methylparaben, Parfum.",
    details: [
      "The DERMAL Charcoal Collagen Essence Korean Facial Mask Sheet is a purifying and nourishing sheet mask that uses charcoal powder to draw out impurities and hydrolyzed collagen to improve skin elasticity. It also contains other ingredients like panthenol, vitamin E, and aloe to hydrate and soothe the skin, making it suitable for all skin types, including oily or sensitive ones.",
    ],
    howToUse: [
      "After cleansing, apply the toner across the face.",
      "Take the mask and apply it evenly over the face, avoiding eyes and mouth.",
      "After 15-20 minutes, remove the mask sheet and pat the remaining serum gently.",
    ],
    shortDescription:
      "The DERMAL Charcoal Collagen Essence Korean Facial Mask Sheet is a purifying and nourishing sheet mask that uses charcoal powder to draw out impurities and hydrolyzed collagen to improve skin elasticity.",
    image: "/media/products/DERMAL Charcoal Collagen Essence Mask.png",
    skinTypes: ["All skin types", "Oily or sensitive skin"],
    suitableFor:
      "Suitable for all skin types, including oily or sensitive ones.",
    concerns: ["pore-minimizer", "sensitive-skin", "anti-aging"],
    highlights: [
      "Charcoal powder",
      "Hydrolyzed Collagen",
      "Panthenol, Vitamin E and Aloe",
      "Purifying and nourishing",
    ],
    benefits: [
      {
        title: "Draws out impurities",
        description:
          "A purifying and nourishing sheet mask that uses charcoal powder to draw out impurities.",
      },
      {
        title: "Improves elasticity",
        description:
          "Hydrolyzed collagen helps to improve skin elasticity.",
      },
      {
        title: "Hydrates and soothes",
        description:
          "Contains panthenol, vitamin E, and aloe to hydrate and soothe the skin, making it suitable for all skin types, including oily or sensitive ones.",
      },
    ],
  },

  "anjo-professional-snail-bb-cream": {
    handle: "anjo-professional-snail-bb-cream",
    name: "Anjo Professional Snail BB Cream",
    sourceUrl: "/products/anjo-professional-snail-bb-cream",
    productType: "BB cream",
    tags: ["bbcream", "new1", "Skin Coverage", "Skin Protection"],
    skinConcern: "sun protection, skin coverage",
    keyIngredients:
      "Purified Water, Titanium Dioxide, Ethylhexyl Methoxycinnamate, Cetyl Ethylhexanoate, Zinc Oxide, Propylene Glycol, Mineral Oil, Dimethicone, Cyclopentasiloxane",
    details: [
      "It is a BB cream that applies smoothly to the skin with a creamy and soft feeling and naturally covers the imperfections of the skin to express a bright and healthy skin tone, and contains snail mucus filtrate to improve the rough skin from external harmful substances.",
    ],
    howToUse: [
      "Take a pearl-sized amount and apply on clean skin after basic skincare.",
      "Starting from cheeks, forehead, nose, chin and spread evenly using fingertips or puff.",
    ],
    shortDescription:
      "A BB cream that applies smoothly to the skin with a creamy and soft feeling and naturally covers the imperfections of the skin to express a bright and healthy skin tone, and contains snail mucus filtrate to improve the rough skin from external harmful substances.",
    image: "/media/products/Anjo Professional Snail BB Cream.png",
    size: "50 ml",
    skinTypes: [],
    suitableFor: "Coverage and skin protection for everyday wear.",
    concerns: ["sun-protection"],
    highlights: ["Creamy, soft application", "Natural coverage", "Snail mucus filtrate"],
    benefits: [
      {
        title: "Smooth, creamy application",
        description:
          "Applies smoothly to the skin with a creamy and soft feeling.",
      },
      {
        title: "Natural coverage",
        description:
          "Naturally covers the imperfections of the skin to express a bright and healthy skin tone.",
      },
      {
        title: "Snail mucus filtrate",
        description:
          "Contains snail mucus filtrate to improve the rough skin from external harmful substances.",
      },
    ],
  },

  "mixsoon-bean-essence": {
    handle: "mixsoon-bean-essence",
    name: "Mixsoon Bean Essence",
    sourceUrl: "/products/mixsoon-bean-essence-50ml",
    productType: "Essence",
    tags: ["Essences", "new1", "Sensitive Skin", "serum", "Skin Hydration", "Skin Protection"],
    skinConcern: "skin hydration, Skin barrier protection, For sensitive skin",
    keyIngredients:
      "Lactobacillus/ bean, pear, barley and pomegranate extract Water, propanediol, Glycerine",
    details: [
      "[Dew & Glow For Textured Skin] Bean Essence is a gentle essence with zero skin irritation, best for exfoliating and hydrating textured skin for a smoother, luminous complexion.",
      "[Key Ingredient] Enriched with fermented bean, barley, pomegranate, and Korean pear. It strengthens skin health, moisturizes & revitalizes skin tone, exfoliates & smooths skin texture, and provides natural antioxidants rich in vitamin C&E. No alcohol. No artificial fragrance. Vegan.",
      "[About Brand] mixsoon is a pure ingredient oriented skincare brand. We eliminate unnecessary ingredients that might cause damage to the skin and only add what's essential.",
    ],
    howToUse: [
      "After cleansing, apply the essence to the skin and massage in circular motions.",
      "When you feel residue starting to appear, apply a few pumps of essence and continue massaging with slightly more force.",
      "Wash off residue with water or wipe off with a toner pad, and continue your skincare routine.",
      "Recommend to use 2-3 times a week. For daily use, apply an appropriate amount to the skin before using cream in the morning and evening.",
    ],
    shortDescription:
      "A gentle essence with zero skin irritation, best for exfoliating and hydrating textured skin for a smoother, luminous complexion.",
    image: "/media/products/Mixsoon Bean Essence.png",
    size: "50 ml",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["sensitive-skin", "dryness-dehydration"],
    highlights: [
      "Dew & Glow for textured skin",
      "Fermented bean, barley, pomegranate and Korean pear",
      "No alcohol. No artificial fragrance. Vegan.",
    ],
    benefits: [
      {
        title: "Dew & glow for textured skin",
        description:
          "Bean Essence is a gentle essence with zero skin irritation, best for exfoliating and hydrating textured skin for a smoother, luminous complexion.",
      },
      {
        title: "Key ingredient",
        description:
          "Enriched with fermented bean, barley, pomegranate, and Korean pear. It strengthens skin health, moisturizes & revitalizes skin tone, exfoliates & smooths skin texture, and provides natural antioxidants rich in vitamin C&E. No alcohol. No artificial fragrance. Vegan.",
      },
    ],
  },

  "skin-1004-madagascar-centella-poremizing-fresh-ampoule": {
    handle: "skin-1004-madagascar-centella-poremizing-fresh-ampoule",
    name: "SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule",
    sourceUrl: "/products/skin1004-madagascar-centella-poremizing-fresh-ampoule-100ml",
    productType: "Ampoule",
    tags: ["Ampoule", "antiaging", "new1", "Pore Minimizer"],
    skinConcern: "Pores minimiser",
    keyIngredients:
      "50% Centella Asiatica Extract, Peptide 9 complex, Himalayan pink salt",
    details: [
      "Himalayan Pink Salt and 80 other different minerals and salt combination helps to effectively cleanse pores.",
      "SKIN1004's special combination of peptide 9 Complex helps to remove keratin plugs.",
      "Helps to control excessive sebum, resulting the skin to be more clear.",
    ],
    howToUse: [
      "After cleansing, pour a little into your palms and pat into the skin to aid absorption.",
      "For dryer skin, 2-3 layers can be applied for additional moisture.",
    ],
    shortDescription:
      "Himalayan Pink Salt and 80 other different minerals and salt combination helps to effectively cleanse pores.",
    image:
      "/media/products/SKIN 1004 Madagascar Centella Poremizing Fresh Ampoule 100ml.png",
    size: "100 ml",
    skinTypes: [],
    suitableFor: "Pore-focused care.",
    concerns: ["pore-minimizer"],
    highlights: [
      "50% Centella Asiatica Extract",
      "Peptide 9 complex",
      "Himalayan pink salt",
    ],
    benefits: [
      {
        title: "Cleanses pores",
        description:
          "Himalayan Pink Salt and 80 other different minerals and salt combination helps to effectively cleanse pores.",
      },
      {
        title: "Removes keratin plugs",
        description:
          "SKIN1004's special combination of peptide 9 Complex helps to remove keratin plugs.",
      },
      {
        title: "Controls excess sebum",
        description:
          "Helps to control excessive sebum, resulting the skin to be more clear.",
      },
    ],
  },

  "ladamer-oligoforce-serum-hydrating": {
    handle: "ladamer-oligoforce-serum-hydrating",
    name: "LADAMER Oligoforce Serum Hydrating",
    sourceUrl: "/products/ladamer-oligoforce-serum-hydrating",
    productType: "Serum",
    tags: ["antiaging", "new1", "serum", "Skin Hydration"],
    skinConcern: "Anti Aging, Skin Hydration",
    keyIngredients: "phyto oligo and ocean minerals",
    details: [
      "Enriched with phyto-oligosaccharides and marine minerals, this formula nourishes cells, provides lasting hydration, and strengthens the skin's defense, enhancing overall elasticity and firmness.",
      "Experience a lightweight, non-greasy hydration with our hydro-lipophilic formula. It creates a silky, non-sticky moisture barrier that enhances the effectiveness of your entire skincare routine for superior results. Reconstruct your skin's moisture with our advanced formula that creates a powerful hydration barrier, reinforcing your skin's natural defense and keeping it healthy, balanced, and radiant.",
      "Boost your skin's hydration and elasticity with the power of Sodium PCA and collagen. This potent combination deeply moisturizes and helps maintain a firm, youthful-looking complexion.",
    ],
    howToUse: [
      "After using the toner, in a thin layer apply few drops on the skin.",
      "When Oligoforce Serum is absorbed sufficiently, apply a cream suited to the skin type.",
    ],
    shortDescription:
      "Enriched with phyto-oligosaccharides and marine minerals, this formula nourishes cells, provides lasting hydration, and strengthens the skin's defense, enhancing overall elasticity and firmness.",
    image: "/media/products/LADAMER Oligoforce Serum Hydrating.png",
    size: "50 ml",
    skinTypes: [],
    suitableFor: "Hydration and elasticity-focused care.",
    concerns: ["anti-aging", "dryness-dehydration"],
    highlights: [
      "Phyto-oligosaccharides and marine minerals",
      "Lightweight, non-greasy hydration",
      "Sodium PCA and collagen",
    ],
    benefits: [
      {
        title: "Nourishes and strengthens",
        description:
          "Enriched with phyto-oligosaccharides and marine minerals, this formula nourishes cells, provides lasting hydration, and strengthens the skin's defense, enhancing overall elasticity and firmness.",
      },
      {
        title: "Lightweight, non-greasy hydration",
        description:
          "Creates a silky, non-sticky moisture barrier that enhances the effectiveness of your entire skincare routine for superior results.",
      },
      {
        title: "Sodium PCA and collagen",
        description:
          "Boost your skin's hydration and elasticity with the power of Sodium PCA and collagen. This potent combination deeply moisturizes and helps maintain a firm, youthful-looking complexion.",
      },
    ],
  },

  "ladamer-oligoforce-caviar-ampoule": {
    handle: "ladamer-oligoforce-caviar-ampoule",
    name: "LADAMER Oligoforce Caviar Ampoule",
    sourceUrl: "/products/ladamer-oligoforce-caviar-ampoule",
    productType: "Ampoule",
    tags: ["Ampoule", "antiaging", "new1", "serum", "Skin Hydration"],
    skinConcern: "anti aging, skin hydration",
    keyIngredients: "Caviar Extract (1000mg) Aloe Vera, Centella Asiatica",
    details: [
      "This product includes caviar capsules containing caviar enriched with various nourishment that allows to feel the power of life from the sea and it is absorbed fast as the structure of caviar is very similar to that of human protein. The active ingredients inside the capsules leave the skin moisturized and soft for a long time.",
      "ACELL-300 stands for \"Active Cell,\" referring to its ability to activate skin cells. It is composed of natural herbal extracts and is highly effective in inhibiting skin cell damage, reducing inflammation, preventing aging, enhancing skin immunity, and providing excellent astringent properties.",
      "This product helps to protect the skin from the harsh environments and prevent effectively from skin aging. It is absorbed to the skin without leaving sticky feeling and gives an instant and immediate soft and moisturizing effects on the rough skin due to dehydration ACELL-300 and Portulaca Oleracea extract ease the skin troubles and enhance the skin immunity level so that it regains its healthy condition.",
      "This ampoule contains active ingredients in caviar capsules that energize and firm the skin. The concentrated moisture factors absorb without stickiness, leaving the skin hydrated and smooth for a long-lasting, dewy finish.",
      "Used in leading dermatology clinics in Korea, this product is packed with only the finest ingredients. Experience noticeable results at home, as if you've received professional care.",
    ],
    howToUse: [
      "Before applying daily cream, take appropriate amount and apply it evenly over the face with gentle tapping movement and breaking the capsules simultaneously.",
      "Please shake the case before use it.",
    ],
    shortDescription:
      "This product includes caviar capsules containing caviar enriched with various nourishment that allows to feel the power of life from the sea and it is absorbed fast as the structure of caviar is very similar to that of human protein.",
    image: "/media/products/LADAMER Oligoforce Caviar Ampoule.png",
    size: "50 ml",
    skinTypes: [],
    suitableFor: "Anti-aging and hydration-focused care.",
    concerns: ["anti-aging", "dryness-dehydration"],
    highlights: [
      "Caviar Extract (1000mg)",
      "ACELL-300",
      "Aloe Vera and Centella Asiatica",
    ],
    benefits: [
      {
        title: "Caviar capsules",
        description:
          "The active ingredients inside the capsules leave the skin moisturized and soft for a long time.",
      },
      {
        title: "ACELL-300",
        description:
          "Composed of natural herbal extracts and highly effective in inhibiting skin cell damage, reducing inflammation, preventing aging, enhancing skin immunity, and providing excellent astringent properties.",
      },
      {
        title: "Hydration and firmness",
        description:
          "This ampoule contains active ingredients in caviar capsules that energize and firm the skin. The concentrated moisture factors absorb without stickiness, leaving the skin hydrated and smooth for a long-lasting, dewy finish.",
      },
    ],
  },

  "ladamer-cell-clinic-bb-cream": {
    handle: "ladamer-cell-clinic-bb-cream",
    name: "LADAMER Cell Clinic BB Cream",
    sourceUrl: "/products/ladamer-cell-clinic-bb-cream",
    productType: "BB cream",
    tags: ["bbcream", "new1", "Sun Protection", "sunscreen"],
    skinConcern: "sun protection, skin coverage",
    keyIngredients:
      "Sodium Hyaluronate, Beta-Glucan, Camellia Sinensis Leaf Extract, Allantoin, Caviar Extract, Ceramide NP, Dipotassium Glycyrrhizate, Portulaca Oleracea Extract, Glycine Soja (Soybean) Seed Extract, Bisabolol, Soluble Collagen, Acell-300",
    details: [
      "On its application, the skin is restored to its natural skin tone. Main ingredients have regenerating, soothing and protecting effects. Achieve a flawless look with our premium formula that effortlessly blends with your skin tone. Enhance your natural radiance and cover imperfections for a smooth, flawless finish. Experience beauty and confidence with every application.",
      "Experience the calming benefits of Acell-300 and purslane extract in our gentle, effective formula. Ideal for soothing and alleviating skin troubles, it's perfect for use after laser treatments and skin peels. Embrace comfort and peace of mind with every application.",
      "Perfect for pore management, trouble spots, and oily skin, our formula adheres lightly and smoothly to your skin, providing an effortlessly natural, flawless complexion. Experience a refined skin tone with ease and effectiveness. It helps the sebum balance of skin with the skin affinity and also helps oily skin with pore-control.",
    ],
    howToUse: [
      "Apply a tap of Cell Clinic BB cream to face after sweeping on with a tonic gently along the skin texture.",
    ],
    shortDescription:
      "On its application, the skin is restored to its natural skin tone. Main ingredients have regenerating, soothing and protecting effects.",
    image: "/media/products/LADAMER Cell Clinic BB Cream.png",
    size: "50 g",
    skinTypes: ["Sensitized skin"],
    suitableFor:
      "Good for the sensitized skin that needs protection caused by peeling, laser treatments or troubled skin.",
    concerns: ["sun-protection", "sensitive-skin"],
    highlights: [
      "Natural skin tone",
      "ACELL-300 and purslane extract",
      "Pore management",
      "Light, smooth adherence",
    ],
    benefits: [
      {
        title: "Natural skin tone",
        description:
          "Achieve a flawless look with our premium formula that effortlessly blends with your skin tone. Enhance your natural radiance and cover imperfections for a smooth, flawless finish.",
      },
      {
        title: "Calming care",
        description:
          "Experience the calming benefits of Acell-300 and purslane extract in our gentle, effective formula. Ideal for soothing and alleviating skin troubles, it's perfect for use after laser treatments and skin peels.",
      },
      {
        title: "Pore management",
        description:
          "Perfect for pore management, trouble spots, and oily skin, our formula adheres lightly and smoothly to your skin, providing an effortlessly natural, flawless complexion.",
      },
    ],
  },

  "elensilia-prestige-gold-energy-deer-cream": {
    handle: "elensilia-prestige-gold-energy-deer-cream",
    name: "Elensilia Prestige Gold Energy Deer Cream",
    sourceUrl: "/products/elensilia-prestige-gold-energy-deer-cream",
    productType: "LED (Red light) Therapy",
    tags: ["antiaging", "new1"],
    skinConcern: "Anti Aging",
    keyIngredients:
      "Green tea extract, Peptides, hyaluronic acid, aquaxyl, 99% pure gold",
    details: [
      "Contains ingredients for total anti-aging care.",
      "LED device cream for special home care.",
      "The gold-colored formulation restores the skin's natural radiance.",
      "Contains green tea extract to provide infinite energy and vitality.",
      "Contains Russian green tea known for its high quality.",
      "Contains 5 types of peptides to enhance skin elasticity.",
      "Contains 5 types of hyaluronic acid to care for moist skin.",
      "Contains aquaxyl to strengthen the skin's moisture barrier.",
      "Contains 99.9% pure gold to provide nutrition and elasticity.",
      "A gel cream full of nutrients finishes with a firm texture.",
      "Vibration & LED (red light) help absorption.",
    ],
    howToUse: [
      "At the last step of skin care, gently massage an appropriate amount onto the face and neck. Gold particles melt naturally and are absorbed.",
      "When using for the first time, turn the handle of the LED device built into the top of the container counterclockwise to separate it from the body and remove the battery protection film.",
      "The LED does not have an ON/OFF button, and it automatically turns on when it touches the skin while holding the handle.",
      "Apply the cream to the face first, press the LED against the skin, and gently massage it along the skin texture to absorb it.",
      "After using the device, wipe it gently with a tissue and store it hygienically.",
      "When the battery is discharged, replace the battery and use it. (CR2032) Insert with +, - facing outward.",
    ],
    shortDescription:
      "Contains ingredients for total anti-aging care. LED device cream for special home care. The gold-colored formulation restores the skin's natural radiance.",
    image: "/media/products/Elensilia Prestige Gold Energy Deer Cream.png",
    skinTypes: [],
    concerns: ["anti-aging"],
    highlights: [
      "Green tea extract",
      "5 types of peptides",
      "5 types of hyaluronic acid",
      "99.9% pure gold",
      "LED (red light) device",
    ],
    benefits: [
      {
        title: "Total anti-aging care",
        description: "Contains ingredients for total anti-aging care.",
      },
      {
        title: "LED device cream",
        description:
          "LED device cream for special home care. Vibration & LED (red light) help absorption.",
      },
      {
        title: "Natural radiance",
        description:
          "The gold-colored formulation restores the skin's natural radiance.",
      },
    ],
  },

  "elensilia-escargot-anti-wrinkle-multi-balm": {
    handle: "elensilia-escargot-anti-wrinkle-multi-balm",
    name: "ELENSILIA Escargot Anti Wrinkle Multi Balm",
    sourceUrl: "/products/elensilia-escargot-antiwrinkle-muti-balm",
    productType: "Balms",
    tags: ["antiaging", "balms", "Fine lines and Wrinkles", "new1", "Skin Elasticity"],
    skinConcern: "Anti Aging, Skin Elasticity, fine lines and wrinkles",
    keyIngredients: "Snail Mucin, 5 Essential oils, Hyaluronic Acid",
    details: [
      "Essentials for the look of lines, wrinkles, \"11\" lines between brows, under-eye lines, and puffy eyes.",
      "LONG-LASTING HYDRATION: 80% Glycosaminoglycans that is super high in collagen and elastin provides deep and lasting hydration to create firm, plumped, and dewy skin.",
      "Helps skin hydrate, nourish, and promotes healthy skin in a help of vegetable oils.",
      "Easy application anywhere, anytime! This multi-balm stick for ease of use.",
    ],
    howToUse: [
      "Twist out a small amount of the product and apply on areas that feel dry or need extra care or attention such as under eye area, fine lines around mouth or on the neck line.",
    ],
    shortDescription:
      "Essentials for the look of lines, wrinkles, \"11\" lines between brows, under-eye lines, and puffy eyes.",
    image: "/media/products/ELENSILIA ESCARGOT ANTI WRINKLE MUTI BALM.png",
    skinTypes: [],
    suitableFor: "Targeted care for lines, wrinkles and dry areas.",
    concerns: ["anti-aging", "dryness-dehydration"],
    highlights: [
      "Snail Mucin",
      "80% Glycosaminoglycans",
      "5 essential oils",
      "Hyaluronic Acid",
    ],
    benefits: [
      {
        title: "Targets the look of lines",
        description:
          "Essentials for the look of lines, wrinkles, \"11\" lines between brows, under-eye lines, and puffy eyes.",
      },
      {
        title: "Long-lasting hydration",
        description:
          "80% Glycosaminoglycans that is super high in collagen and elastin provides deep and lasting hydration to create firm, plumped, and dewy skin.",
      },
      {
        title: "Nourishing vegetable oils",
        description:
          "Helps skin hydrate, nourish, and promotes healthy skin in a help of vegetable oils.",
      },
    ],
  },

  "escargot-original-facial-repair-cream": {
    handle: "escargot-original-facial-repair-cream",
    name: "Escargot Original Facial Repair Cream",
    sourceUrl: "/products/escargot-original-facial-repair-cream",
    productType: "Moisturizer",
    tags: ["moisturizers", "new1", "Skin Hydration"],
    skinConcern: "Skin Hydration",
    keyIngredients: "Glycosaminoglycans",
    details: [
      "Experience the ultimate rejuvenation: This anti-aging face moisturizer is made with 80% French Snail Mucin, not just an extract, to provide deep hydration and firm, plumped, and dewy skin.",
      "Elensilia Escargot Snail Repair Cream: is clinically tested and proven to provide anti-aging benefits from the Korean Journal of Dermatology. The lightweight, gel-type face cream repairs, hydrates, soothes, and rejuvenates dry, dehydrated, aging, and mature skin types.",
      "80% French Snail Mucin: a natural ingredient that is rich in antioxidants, vitamins, and peptides that help repair and protect the skin from damage. It also contains 80% glycosaminoglycans that are super high in collagen and elastin, providing deep and long-lasting hydration.",
      "SNAIL-FRIENDLY: No snails are harmed while collecting Snail Mucin in France--it is safe and environmentally friendly for snails.",
    ],
    howToUse: [
      "Apply a layer gently on the skin after washing your face as your first skin care regime as a boosting cream.",
      "Use day and night.",
    ],
    shortDescription:
      "This anti-aging face moisturizer is made with 80% French Snail Mucin, not just an extract, to provide deep hydration and firm, plumped, and dewy skin.",
    image: "/media/products/Escargot Original Facial Repair Cream.png",
    skinTypes: ["Dry, dehydrated, aging, and mature skin types"],
    suitableFor:
      "For dry, dehydrated, aging, and mature skin types.",
    concerns: ["dryness-dehydration", "anti-aging"],
    highlights: [
      "80% French Snail Mucin",
      "80% Glycosaminoglycans",
      "Lightweight gel-type cream",
      "Snail-friendly",
    ],
    benefits: [
      {
        title: "80% French Snail Mucin",
        description:
          "A natural ingredient that is rich in antioxidants, vitamins, and peptides that help repair and protect the skin from damage.",
      },
      {
        title: "Deep, lasting hydration",
        description:
          "Contains 80% glycosaminoglycans that are super high in collagen and elastin, providing deep and long-lasting hydration.",
      },
      {
        title: "Snail-friendly",
        description:
          "No snails are harmed while collecting Snail Mucin in France--it is safe and environmentally friendly for snails.",
      },
    ],
  },

  "elensilia-cpp-collagen-peptide-eye-cream": {
    handle: "elensilia-cpp-collagen-peptide-eye-cream",
    name: "Elensilia CPP+ Collagen Peptide Eye Cream",
    sourceUrl: "/products/elensilia-cpp-collagen-80-intensive-eye-cream",
    productType: "Eye Cream",
    tags: ["antiaging", "eyecream", "Fine lines and Wrinkles", "new1", "Skin Elasticity"],
    skinConcern: "Fine lines and Wrinkles, skin elasticity, anti aging",
    keyIngredients: "Collagen, Snail Mucin",
    details: [
      "80% Collagen & Snail Mucin: Provides intense hydration, improves firmness and elasticity, and helps reduce the appearance of wrinkles and fine lines for smoother, plumped, supple, and youthful skin.",
      "ANTI-AGING INGREDIENT HALOXYL: An innovative ingredient, Haloxyl, is included in the formula to slow skin aging, minimize signs of aging, and reduce wrinkles and fine lines around eyes.",
      "SPECIAL INGREDIENT, SYN-COLL: A specially formulated ingredient called SYN-COLL is developed with peptides to provide anti-aging, anti-wrinkle, and well-aging benefits for skin.",
      "MARINE COLLAGEN: None of the collagen extract used in the formula is sourced from animals; we use marine collagen only, and no animal is harmed during that process.",
      "THE HIGHEST STANDARD: Clinically Tested and Proven for all product claims such as hydration, anti-aging, and firming benefits. Hypoallergenic. Free of Animal Testing, Parabens, and any potentially harmful skin care ingredients.",
    ],
    howToUse: [
      "Start by cleansing your face and patting it dry.",
      "Apply a small amount of the eye cream or serum to your fingertips and gently pat it around the eye area, avoiding the eyelids unless otherwise specified on the packaging.",
      "Allow the product to absorb, and then follow with your regular skincare routine.",
    ],
    shortDescription:
      "80% Collagen & Snail Mucin: Provides intense hydration, improves firmness and elasticity, and helps reduce the appearance of wrinkles and fine lines for smoother, plumped, supple, and youthful skin.",
    image: "/media/products/Elensilia CPP+ Collagen Peptide Eye Cream.png",
    size: "30 ml",
    skinTypes: [],
    suitableFor: "Targeted eye care for fine lines, wrinkles and elasticity.",
    concerns: ["anti-aging", "dryness-dehydration"],
    highlights: [
      "80% Collagen & Snail Mucin",
      "Haloxyl",
      "SYN-COLL peptides",
      "Marine collagen",
    ],
    benefits: [
      {
        title: "Hydration and firmness",
        description:
          "80% Collagen & Snail Mucin provides intense hydration, improves firmness and elasticity, and helps reduce the appearance of wrinkles and fine lines for smoother, plumped, supple, and youthful skin.",
      },
      {
        title: "Haloxyl",
        description:
          "An innovative ingredient included in the formula to slow skin aging, minimize signs of aging, and reduce wrinkles and fine lines around eyes.",
      },
      {
        title: "SYN-COLL peptides",
        description:
          "A specially formulated ingredient developed with peptides to provide anti-aging, anti-wrinkle, and well-aging benefits for skin.",
      },
    ],
  },

  "lactoderm-beneficial-moisturizing-cream": {
    handle: "lactoderm-beneficial-moisturizing-cream",
    name: "LactoDerm Beneficial Moisturizing Cream",
    sourceUrl: "/products/lacto-derm-moisturizing-cream",
    productType: "Moisturizer",
    tags: ["moisturizers", "new1", "Sensitive Skin"],
    skinConcern: "Sensitive skin",
    keyIngredients: "Lactic acid Bacteria and Heart leaf lacto",
    details: [
      "Beneficial Moisturizing cream 100 billion probiotic hydrating Face cream for itchiness relief, skin defense and soothing.",
    ],
    howToUse: [
      "After cleansing and toning, take an adequate amount and spread it evenly over the face and neck.",
      "Pat gently until fully absorbed.",
      "Use morning and evening.",
    ],
    shortDescription:
      "Beneficial Moisturizing cream 100 billion probiotic hydrating Face cream for itchiness relief, skin defense and soothing.",
    image: "/media/products/LactoDerm Beneficial Moisturizing Cream.png",
    size: "100 ml",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["sensitive-skin", "dryness-dehydration"],
    highlights: [
      "100 billion probiotics",
      "Lactic acid bacteria",
      "Heart leaf lacto",
    ],
    benefits: [
      {
        title: "Probiotic hydration",
        description:
          "Beneficial Moisturizing cream 100 billion probiotic hydrating Face cream.",
      },
      {
        title: "Itchiness relief and soothing",
        description:
          "For itchiness relief, skin defense and soothing.",
      },
    ],
  },

  "lacto-cica-barrier-cream-moisturizer": {
    handle: "lacto-cica-barrier-cream-moisturizer",
    name: "Lacto Cica Barrier Cream Moisturizer",
    sourceUrl: "/products/lacto-cica-barrier-cream-moisturizer",
    productType: "Moisturizer",
    tags: ["moisturizers", "new1", "Sensitive Skin", "Skin Protection"],
    skinConcern: "Skin Barrier Protection, Sensitive skin",
    keyIngredients: "5 types of Cica complex and probiotics, Ceramides",
    details: [
      "SOOTHING BARRIER FACIAL CREAM – Pamper and protect dry, aging skin with this luxurious facial cream. It contains Unpa's exclusively developed Lacto Cica Complex to soothe sensitivity while aiding skin recovery. Highly concentrated with a sumptuous Greek yogurt consistency, this is the ultimate protective balm for fragile skin.",
      "PROTECTS THE SKIN AGAINST STRESS – An indulgent moisturizer that relieves irritation caused by skincare products, pollution, and more. Though thick and creamy, the balm melts on contact with your skin, forming a smooth, protective barrier against external aggressors. When your skin needs saving, this barrier cream is like a superhero's shield.",
      "BUILDS THE SKIN'S CORE STRENGTH – This facial cream moisturizer \"trains\" your skin cells to make them super-strong. The blend of ingredients activates Filaggrin, which stimulates ceramide synthesis and strengthens the skin's barrier.",
      "EFFECTIVELY FIGHTS THE SIGNS OF AGING – Flaunt a more improved looking complexion thanks to this dreamy cream!",
      "HYPOALLERGENIC FOR SENSITIVE SKIN – A comforting cream that won't irritate your delicate skin. Luscious yet light and non-sticky, it applies smoothly and absorbs easily.",
    ],
    howToUse: [
      "Take a small amount equivalent to a pea and apply on skin patting lightly for absorption.",
      "Night Tip: Apply 2-3 more layers to use as a sleeping pack.",
    ],
    shortDescription:
      "Pamper and protect dry, aging skin with this luxurious facial cream. It contains Unpa's exclusively developed Lacto Cica Complex to soothe sensitivity while aiding skin recovery.",
    image: "/media/products/Lacto Cica Barrier Cream Moisturizer.png",
    size: "100 ml",
    skinTypes: ["Dry, aging skin", "Sensitive skin"],
    suitableFor: "For dry, aging and sensitive skin.",
    concerns: ["sensitive-skin", "anti-aging", "dryness-dehydration"],
    highlights: [
      "Lacto Cica Complex",
      "5 types of Cica complex and probiotics",
      "Ceramides",
      "Hypoallergenic",
    ],
    benefits: [
      {
        title: "Soothing barrier care",
        description:
          "Contains Unpa's exclusively developed Lacto Cica Complex to soothe sensitivity while aiding skin recovery.",
      },
      {
        title: "Protects against stress",
        description:
          "Relieves irritation caused by skincare products, pollution, and more, forming a smooth, protective barrier against external aggressors.",
      },
      {
        title: "Builds core strength",
        description:
          "The blend of ingredients activates Filaggrin, which stimulates ceramide synthesis and strengthens the skin's barrier.",
      },
    ],
  },

  "haruharu-wonder-black-rice-hyaluronic-toner": {
    handle: "haruharu-wonder-black-rice-hyaluronic-toner",
    name: "Haruharu Wonder Black Rice Hyaluronic Toner",
    sourceUrl: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
    productType: "Toner",
    tags: ["antiaging", "new1", "Skin Hydration", "toner"],
    skinConcern: "Skin Hydration, Anti Aging",
    keyIngredients:
      "Water, Betaine, Glycerin, Propanediol, Oryza Sativa (Rice) Extract (2,000Ppm), Phyllostachys Pubescens Shoot Bark Extract (2,000Ppm), Aspergillus Ferment Extract Filtrate, Panax Ginseng Root Extract, Cyclodextrin",
    details: [
      "BOOST SKIN HYDRATION: Say goodbye to dryness and hello to silky-smooth skin with our cutting-edge formula.",
      "MAGIC FOR YOUR SKIN: Crafted with Fermented Black Rice & Bamboo Shoot Barks, experience the magic of skin elasticity restoration and soothing resilience.",
      "HYALURONIC HEAVEN: Immerse your skin in luxury with Enriched, High-Quality Hyaluronic Acid. The secret to a fortified skin barrier and continuous hydration for that radiant glow.",
      "GLYCERIN GOODNESS: Derived from vegetables, our Glycerin's humectant properties draw moisture like a magnet. Revel in skin that stays moisturized and fortified against the elements.",
      "VEGAN-FRIENDLY ASSURANCE: Committed to ethical choices, we are vegan-friendly, cruelty-free, and EWG-safe, ensuring a responsible skincare regimen.",
    ],
    howToUse: [
      "After washing the face, wet a cotton pad with the toner.",
      "Apply evenly across the face.",
      "Pat to fully absorb it.",
    ],
    shortDescription:
      "Say goodbye to dryness and hello to silky-smooth skin with our cutting-edge formula.",
    image: "/media/products/Haruharu Wonder Black Rice Hyaluronic Toner.png",
    skinTypes: ["Sensitive skin"],
    suitableFor: "For sensitive skin.",
    concerns: ["anti-aging", "dryness-dehydration"],
    highlights: [
      "Fermented Black Rice & Bamboo Shoot Barks",
      "Hyaluronic Acid",
      "Vegetable-derived Glycerin",
      "Vegan-friendly, cruelty-free and EWG-safe",
    ],
    benefits: [
      {
        title: "Boost skin hydration",
        description:
          "Say goodbye to dryness and hello to silky-smooth skin with our cutting-edge formula.",
      },
      {
        title: "Magic for your skin",
        description:
          "Crafted with Fermented Black Rice & Bamboo Shoot Barks, experience the magic of skin elasticity restoration and soothing resilience.",
      },
      {
        title: "Hyaluronic heaven",
        description:
          "Immerse your skin in luxury with Enriched, High-Quality Hyaluronic Acid. The secret to a fortified skin barrier and continuous hydration for that radiant glow.",
      },
    ],
  },

  "haruharu-wonder-black-rice-moisture-cleansing-oil": {
    handle: "haruharu-wonder-black-rice-moisture-cleansing-oil",
    name: "HARUHARU Wonder Black Rice Moisture Cleansing Oil",
    sourceUrl: "/products/haruharu-wonder-black-rice-moisture-cleansing-oil",
    productType: "Cleanser",
    tags: ["cleanser", "Deep Cleansing", "new1"],
    skinConcern: "Deep cleansing",
    keyIngredients:
      "black rice bran, camellia, jojoba, macadamia, sunflower, and sweet almond",
    details: [
      "QUICK CHECK: Review the ingredients list before buying to make sure it's right for you.",
      "GENTLE & EFFECTIVE: Easily remove makeup & impurities with our unscented cleansing oil crafted from natural oils & 9 essential ingredients.",
      "SKIN-FRIENDLY FORMULATION: Formulated with over 95% natural-derived ingredients, soothe your skin with every cleanse!",
      "MELT AWAY IMPURITIES: Say goodbye to SPF, dirt, makeup, and excess oil without stripping your skin.",
      "REVITALIZE WITH BLACK RICE: Our cleansing oil nourishes with proteins and minerals. Jojoba, Macadamia, Olive, and Sunflower oils provide a radiant boost.",
    ],
    howToUse: [
      "Pump an appropriate amount of oil on dry hands.",
      "Apply on a dry face and roll gently.",
      "When the makeup melts, apply water to emulsify it.",
      "Rinse thoroughly with lukewarm water.",
    ],
    shortDescription:
      "Easily remove makeup & impurities with our unscented cleansing oil crafted from natural oils & 9 essential ingredients.",
    image: "/media/products/HARUHARU Wonder Black Rice Moisture Cleansing Oil.png",
    size: "150 ml",
    skinTypes: [],
    suitableFor: "Deep cleansing for makeup, SPF and daily impurities.",
    concerns: ["deep-cleansing"],
    highlights: [
      "Unscented cleansing oil",
      "Natural oils and 9 essential ingredients",
      "Over 95% natural-derived ingredients",
      "Black rice bran",
    ],
    benefits: [
      {
        title: "Gentle & effective",
        description:
          "Easily remove makeup & impurities with our unscented cleansing oil crafted from natural oils & 9 essential ingredients.",
      },
      {
        title: "Skin-friendly formulation",
        description:
          "Formulated with over 95% natural-derived ingredients, soothe your skin with every cleanse!",
      },
      {
        title: "Melt away impurities",
        description:
          "Say goodbye to SPF, dirt, makeup, and excess oil without stripping your skin.",
      },
    ],
  },

  "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50": {
    handle:
      "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
    name: "Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50",
    sourceUrl:
      "/products/wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50-pa",
    productType: "Sunscreen",
    tags: ["new1", "Sun Protection", "sunscreen"],
    skinConcern: "Sun Protection",
    keyIngredients:
      "Zinc oxide, Ceramide NP, houttuynia cordata extract, niacinamide, daisy flower extract, Black Rice Bran oil extract, hyaluronic acid, moringa seed oil.",
    details: [
      "Non-nano Zinc Oxide Pure Mineral Product Which is Suitable For The Whole Family and Extra Gentle for those with Sensitive Skin.",
      "Airless Packaging to Keep Unused Product Shielded from Contact with Air, so the Product has a Reduced Risk of Oxidation.",
      "Rice Bran Oil Infused with Black Rice that gives Antioxidant Effect and Skin Moisturization. Heartleaf Extract for Nourishment and Skin Soothing, Niacinamide to Improve Skin Tone.",
      "Reef Safe Formula that Does Not Contain Oxybenzone and Octinoxate which are known to cause harm to the sea.",
      "Haruharu Standard: Haruharu Aims to Make Product which is Suitable for All Skin Type, even for those with Extra Sensitive Skin. We make products with Vegan Friendly Ingredients, Hypoallergenic Formula, Cruelty Free, Free from 7 types of Paraben and 11 harmful Ingredients.",
    ],
    howToUse: [
      "Apply as the last step of your morning skincare routine.",
      "Spread an adequate amount evenly over the face and neck 15 minutes before sun exposure.",
      "Reapply every 2-3 hours when outdoors, and after sweating or swimming.",
    ],
    shortDescription:
      "Non-nano Zinc Oxide Pure Mineral Product Which is Suitable For The Whole Family and Extra Gentle for those with Sensitive Skin.",
    image:
      "/media/products/Haruharu Wonder Black Rice Pure Mineral Relief Daily Sunscreen SPF50.png",
    skinTypes: ["All skin types", "Sensitive skin"],
    suitableFor:
      "Suitable for the whole family and extra gentle for those with sensitive skin.",
    concerns: ["sun-protection", "sensitive-skin"],
    highlights: [
      "Non-nano Zinc Oxide",
      "Airless packaging",
      "Rice Bran Oil and Black Rice",
      "Reef safe formula",
    ],
    benefits: [
      {
        title: "Pure mineral protection",
        description:
          "Non-nano Zinc Oxide Pure Mineral Product Which is Suitable For The Whole Family and Extra Gentle for those with Sensitive Skin.",
      },
      {
        title: "Airless packaging",
        description:
          "Keeps unused product shielded from contact with air, so the product has a reduced risk of oxidation.",
      },
      {
        title: "Nourishing botanicals",
        description:
          "Rice Bran Oil Infused with Black Rice that gives antioxidant effect and skin moisturization. Heartleaf Extract for nourishment and skin soothing, Niacinamide to improve skin tone.",
      },
    ],
  },
};

export function getClientProductContent(
  handle: string,
): ClientProductContent | undefined {
  return CLIENT_PRODUCTS[handle];
}

/**
 * Overlay client-approved copy and the supplied packshot onto a catalog record.
 * IDs, handles, URLs, prices, badges, variants and inventory relationships are
 * preserved exactly.
 */
export function applyClientProductContent(
  product: CatalogProduct,
): CatalogProduct {
  const content = CLIENT_PRODUCTS[product.handle];
  if (!content) return product;

  return {
    ...product,
    title: content.name,
    description: content.shortDescription,
    imageSrc: content.image,
    imageGallery: [content.image],
    imageAlt: `${content.name} packshot`,
  };
}
