"use client";

/**
 * Future Cart API / wishlist sync hooks — stubs keep import paths stable.
 * Live cart remains in `@/components/cart/cart-context`.
 */

import { useCallback, useState } from "react";

const RECENT_SEARCHES_KEY = "ksl-recent-searches";

export function useRecentSearches(limit = 8) {
  const [searches, setSearches] = useState<string[]>([]);

  const hydrate = useCallback(() => {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        setSearches(parsed.filter((s): s is string => typeof s === "string").slice(0, limit));
      }
    } catch {
      /* ignore */
    }
  }, [limit]);

  const push = useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q) return;
      setSearches((prev) => {
        const next = [q, ...prev.filter((s) => s !== q)].slice(0, limit);
        try {
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [limit],
  );

  return { searches, hydrate, push, storageKey: RECENT_SEARCHES_KEY };
}

/** Placeholder — returns null until Cart API issues a cart id */
export function useShopifyCartId() {
  return null as string | null;
}
