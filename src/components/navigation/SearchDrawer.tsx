"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useBodyLock } from "@/hooks/use-body-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import {
  getRecentSearches,
  groupSearchResults,
  POPULAR_SEARCHES,
  pushRecentSearch,
  searchCatalog,
  type SearchResult,
} from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function ResultRow({
  item,
  onSelect,
}: {
  item: SearchResult;
  onSelect: (item: SearchResult) => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={() => onSelect(item)}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-2.5 -mx-2 transition-colors",
        "hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
      )}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-page-subtle text-caption text-foreground-muted"
        aria-hidden="true"
      >
        {/* 1:1 thumb — NAV_IMAGE_SPECS.search-product-thumb */}
        {item.type === "collection" ? "Col" : item.type === "bundle" ? "Kit" : item.type === "page" ? "Pg" : "Pr"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{item.title}</span>
        <span className="block truncate text-caption text-foreground-muted">
          {[item.subtitle, item.priceLabel].filter(Boolean).join(" · ")}
        </span>
      </span>
    </Link>
  );
}

export function SearchDrawer({ open, onClose }: SearchDrawerProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useBodyLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    setRecent(getRecentSearches());
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handle = window.setTimeout(() => {
      setResults(searchCatalog(q));
      setLoading(false);
    }, 180);

    return () => window.clearTimeout(handle);
  }, [query]);

  const grouped = useMemo(() => groupSearchResults(results), [results]);

  const onSelect = useCallback(
    (item: SearchResult) => {
      pushRecentSearch(query || item.title);
      onClose();
    },
    [onClose, query],
  );

  const runPopular = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    pushRecentSearch(q);
    onClose();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const showIdle = !query.trim();
  const showEmpty = Boolean(query.trim()) && !loading && results.length === 0;
  const showResults = Boolean(query.trim()) && !loading && results.length > 0;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-modal" role="presentation">
          <motion.button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 border-0 bg-ink/40"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id="site-search-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "absolute inset-x-0 top-0 flex max-h-[calc(100dvh-env(safe-area-inset-top))] flex-col overflow-hidden bg-surface shadow-elev3",
              "pt-[env(safe-area-inset-top)]",
              "tablet:inset-x-auto tablet:left-1/2 tablet:top-[max(12vh,env(safe-area-inset-top))] tablet:w-[min(100%-2rem,40rem)] tablet:max-h-[min(80dvh,40rem)] tablet:-translate-x-1/2 tablet:rounded-lg tablet:border tablet:border-border-subtle",
            )}
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border-subtle px-4 py-3">
              <h2 id={titleId} className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Search
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-foreground hover:text-power-pink"
                aria-label="Close search"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={submit} className="shrink-0 border-b border-border-subtle px-4 py-3" role="search">
              <label htmlFor="site-search-input" className="visually-hidden">
                Search products, bundles, and collections
              </label>
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-foreground-muted" strokeWidth={1.5} aria-hidden="true" />
                <input
                  ref={inputRef}
                  id="site-search-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  autoComplete="off"
                  placeholder="Search products, concerns, ingredients"
                  className="h-11 w-full bg-transparent text-base text-foreground outline-none placeholder:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                />
                {query ? (
                  <button
                    type="button"
                    className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-medium text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                    onClick={() => setQuery("")}
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="hidden rounded-sm border border-border-subtle px-1.5 py-0.5 text-caption text-foreground-muted tablet:inline">
                    Esc
                  </kbd>
                )}
              </div>
            </form>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]" aria-live="polite">
              {loading ? (
                <div className="flex items-center gap-2 py-8 text-sm text-foreground-muted">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Searching…
                </div>
              ) : null}

              {showIdle ? (
                <div className="space-y-6">
                  {recent.length > 0 ? (
                    <section aria-label="Recent searches">
                      <h3 className="mb-3 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                        Recent
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {recent.map((term) => (
                          <li key={term}>
                            <button
                              type="button"
                              onClick={() => runPopular(term)}
                              className="rounded-sm border border-border-subtle bg-surface-soft px-3 py-2 text-sm text-foreground-secondary hover:border-border-default hover:text-foreground"
                            >
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <section aria-label="Popular searches">
                    <h3 className="mb-3 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                      Popular
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <li key={term}>
                          <button
                            type="button"
                            onClick={() => runPopular(term)}
                            className="rounded-sm border border-border-subtle px-3 py-2 text-sm text-foreground-secondary hover:border-border-default hover:text-foreground"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : null}

              {showEmpty ? (
                <div className="py-10 text-center">
                  <p className="font-display text-xl text-foreground">No results for “{query.trim()}”</p>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Try a concern, brand, or product type — or browse Best Sellers.
                  </p>
                  <Link
                    href="/collections/best-sellers"
                    onClick={onClose}
                    className="mt-5 inline-flex text-sm font-medium text-power-pink underline-offset-4 hover:underline"
                  >
                    View best sellers
                  </Link>
                </div>
              ) : null}

              {showResults ? (
                <div className="space-y-6">
                  {grouped.products.length ? (
                    <section aria-label="Products">
                      <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                        Products
                      </h3>
                      <ul>
                        {grouped.products.map((item) => (
                          <li key={item.id}>
                            <ResultRow item={item} onSelect={onSelect} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  {grouped.bundles.length ? (
                    <section aria-label="Bundles">
                      <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                        Bundles
                      </h3>
                      <ul>
                        {grouped.bundles.map((item) => (
                          <li key={item.id}>
                            <ResultRow item={item} onSelect={onSelect} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  {grouped.collections.length ? (
                    <section aria-label="Collections">
                      <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                        Collections
                      </h3>
                      <ul>
                        {grouped.collections.map((item) => (
                          <li key={item.id}>
                            <ResultRow item={item} onSelect={onSelect} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  {grouped.pages.length ? (
                    <section aria-label="Guides">
                      <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                        Guides
                      </h3>
                      <ul>
                        {grouped.pages.map((item) => (
                          <li key={item.id}>
                            <ResultRow item={item} onSelect={onSelect} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={() => {
                      pushRecentSearch(query);
                      onClose();
                    }}
                    className="inline-flex text-sm font-medium text-power-pink"
                  >
                    View all results
                  </Link>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
