"use client";

import { useCallback, useEffect, useRef } from "react";
import { Spinner } from "@/components/common/Loading";
import { cn } from "@/lib/utils";

type InfiniteScrollTriggerProps = {
  hasMore: boolean;
  loading?: boolean;
  onLoadMore: () => void;
  className?: string;
  /** Prefer pagination for boutique catalogues; keep this for large result sets */
  enabled?: boolean;
};

/**
 * Prepared infinite-scroll sentinel — not enabled by default on collection PLP.
 * Recommendation: use Pagination while catalogue views stay under ~50–100 products.
 */
export function InfiniteScrollTrigger({
  hasMore,
  loading,
  onLoadMore,
  className,
  enabled = false,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handle = useCallback(() => {
    if (!loading && hasMore) onLoadMore();
  }, [loading, hasMore, onLoadMore]);

  useEffect(() => {
    if (!enabled || !hasMore) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) handle();
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, hasMore, handle]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className={cn("flex justify-center py-10", className)}
      aria-hidden={!loading}
    >
      {loading ? <Spinner label="Loading more products" /> : null}
      {!loading && hasMore ? (
        <p className="text-caption text-foreground-muted">Scroll for more</p>
      ) : null}
    </div>
  );
}
