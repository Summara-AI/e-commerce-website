/**
 * Search data façade — local index today; Predictive Search / Storefront later.
 */

import { searchCatalog, POPULAR_SEARCHES } from "@/lib/search";
import type { SearchDiscoveryModel, SearchResponse } from "@/types";
import { FEATURED_COLLECTIONS } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { CLIENT_PRODUCTS } from "@/data/client-products";

export type { SearchResponse, SearchResultModel, SearchDiscoveryModel } from "@/types";

function imageForHref(href: string): string | undefined {
  const handle = href.match(/^\/products\/([^/?#]+)/)?.[1];
  if (!handle) return undefined;
  const catalogImage = ALL_PRODUCTS.find((p) => p.handle === handle)?.imageSrc;
  return catalogImage ?? CLIENT_PRODUCTS[handle]?.image;
}

export function searchStore(query: string, limit = 40): SearchResponse {
  const q = query.trim();
  const qLower = q.toLowerCase();

  // Curated index (pages, collections, bundles, synonym-enriched products).
  const curated = searchCatalog(q, limit);

  // Full catalogue — match description, type, badges, handle and keywords so
  // terms like "snail" find the Escargot cream even without a title match.
  const fromCatalog = qLower
    ? ALL_PRODUCTS.filter((p) => {
        const hay = [p.title, p.description, p.productType, p.handle, ...(p.badges ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const keywordHit =
          p.handle.includes("escargot") &&
          ("snail".includes(qLower) || qLower.includes("snail"));
        return hay.includes(qLower) || keywordHit;
      })
        .filter((p) => !curated.some((r) => r.href === p.href))
        .map((p) => ({
          id: `catalog-${p.handle}`,
          type: "product" as const,
          title: p.title,
          href: p.href,
          subtitle: p.productType ? `${p.productType} · Product` : "Product",
          priceLabel: p.price.formatted,
          imageAlt: p.imageAlt,
          keywords: p.description,
        }))
    : [];

  const results = [...curated, ...fromCatalog].slice(0, limit).map((r) => ({
    id: r.id,
    type: r.type === "bundle" ? ("product" as const) : r.type,
    title: r.title,
    href: r.href,
    subtitle: r.subtitle,
    priceLabel: r.priceLabel,
    imageAlt: r.imageAlt,
    imageSrc: imageForHref(r.href) as string | undefined,
  }));

  return {
    query: q,
    results,
    suggestions: POPULAR_SEARCHES.filter((s) =>
      s.toLowerCase().includes(q.toLowerCase()),
    )
      .slice(0, 6)
      .map((s, i) => ({ id: `sug-${i}`, query: s })),
    totalCount: results.length,
    empty: q.length > 0 && results.length === 0,
  };
}

export function getSearchDiscovery(): SearchDiscoveryModel {
  return {
    trending: POPULAR_SEARCHES.slice(0, 4).map((s, i) => ({
      id: `trend-${i}`,
      query: s,
      href: `/search?q=${encodeURIComponent(s)}`,
    })),
    popular: POPULAR_SEARCHES.map((s, i) => ({
      id: `pop-${i}`,
      query: s,
      href: `/search?q=${encodeURIComponent(s)}`,
    })),
    recent: [],
    featuredProductHandles: ALL_PRODUCTS.slice(0, 4).map((p) => p.handle),
    featuredCollectionHandles: FEATURED_COLLECTIONS.filter((c) => c.featured).map(
      (c) => c.handle,
    ),
  };
}
