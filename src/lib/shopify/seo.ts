/**
 * Map Shopify SEO fields → createPageMetadata inputs (Phase 11C).
 */

import { createPageMetadata } from "@/lib/seo";
import type { SeoFields } from "@/types";

export function metadataFromShopifySeo(input: {
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  seo?: SeoFields;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}) {
  return createPageMetadata({
    title: input.seo?.title?.trim() || input.fallbackTitle,
    description: input.seo?.description?.trim() || input.fallbackDescription,
    path: input.path,
    image: input.image,
    type: input.type,
    noIndex: input.noIndex,
  });
}
