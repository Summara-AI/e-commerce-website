/**
 * Recommend routine products from existing catalogue (no invented SKUs).
 */

import { ROUTINE_CONCERNS, type RoutineConcernId, type RoutineGoalId, type RoutineTimeId } from "@/content/routine-builder";
import { ALL_PRODUCTS } from "@/lib/collections";
import { enrichProducts, type FilterableProduct } from "@/lib/collection-filters";
import type { CatalogProduct } from "@/lib/catalog";

export type RoutineStep = {
  id: string;
  slot: string;
  product: CatalogProduct;
};

function byType(products: FilterableProduct[], type: string) {
  return products.filter((p) => p.productType === type && p.availableForSale);
}

function pickFirst(list: FilterableProduct[], exclude: Set<string>) {
  return list.find((p) => !exclude.has(p.handle));
}

export function buildRoutineRecommendations(
  concern: RoutineConcernId,
  goals: RoutineGoalId[],
  time: RoutineTimeId,
): RoutineStep[] {
  const enriched = enrichProducts(ALL_PRODUCTS);
  let pool = enriched.filter((p) => p.concernIds.includes(concern));
  if (pool.length < 2) {
    pool = enriched.filter((p) => p.availableForSale);
  }

  // Goal bias: SPF / cleanser priorities
  if (goals.includes("protect") || concern === "sun-protection") {
    pool = [
      ...byType(pool, "Sunscreen"),
      ...pool.filter((p) => p.productType !== "Sunscreen"),
    ];
  }
  if (goals.includes("clarify") || concern === "deep-cleansing") {
    pool = [
      ...byType(pool, "Cleanser"),
      ...pool.filter((p) => p.productType !== "Cleanser"),
    ];
  }

  const used = new Set<string>();
  const steps: RoutineStep[] = [];

  const addSlot = (slot: string, type: string) => {
    const pick = pickFirst(byType(pool, type), used) ?? pickFirst(byType(enriched, type), used);
    if (pick) {
      used.add(pick.handle);
      steps.push({ id: `${slot}-${pick.handle}`, slot, product: pick });
    }
  };

  const morning = time === "morning" || time === "both";
  const night = time === "night" || time === "both";

  if (morning) {
    addSlot("Morning cleanser", "Cleanser");
    addSlot("Morning toner", "Toner");
    addSlot("Morning moisturizer", "Moisturizer");
    addSlot("Daytime SPF", "Sunscreen");
  }

  if (night) {
    addSlot("Evening cleanser", "Cleanser");
    addSlot("Evening toner", "Toner");
    addSlot("Evening moisturizer", "Moisturizer");
    addSlot("Weekly mask", "Facial Mask");
  }

  // Fallback if catalogue gaps
  if (!steps.length) {
    ALL_PRODUCTS.filter((p) => p.availableForSale)
      .slice(0, 3)
      .forEach((product, i) => {
        steps.push({ id: `fallback-${product.handle}`, slot: `Step ${i + 1}`, product });
      });
  }

  return steps;
}

export function concernLabel(id: RoutineConcernId) {
  return ROUTINE_CONCERNS.find((c) => c.id === id)?.label ?? id;
}
