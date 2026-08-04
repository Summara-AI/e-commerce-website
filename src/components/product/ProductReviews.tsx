"use client";

import { useMemo, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
/**
 * Product reviews — Judge.me / Loox / Stamped via `getProductReviewsService`.
 * Sync content helper remains for SSR/client; swap to async provider in Phase C.
 */
import {
  REVIEW_SORT_OPTIONS,
  getProductReviews,
  getReviewSummary,
  sortReviews,
  type ProductReview,
  type ReviewSort,
} from "@/content/pdp-trust";
import { cn } from "@/lib/utils";
// Future: import { getProductReviewsService } from "@/services/reviews";

function Stars({ rating, label }: { rating: number; label?: string }) {
  return (
    <p
      className="text-sm tracking-[0.18em] text-power-pink"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      {"★".repeat(Math.round(rating))}
      <span className="text-foreground-muted" aria-hidden="true">
        {"★".repeat(Math.max(0, 5 - Math.round(rating)))}
      </span>
    </p>
  );
}

export function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article
      className="flex h-full flex-col border-t border-border-subtle pt-6"
      data-review-id={review.id}
      data-placeholder={review.placeholder ? "true" : undefined}
    >
      <Stars rating={review.rating} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {review.verifiedPurchase ? (
          <span className="rounded-badge bg-success-bg px-2 py-0.5 text-caption font-medium text-success">
            Verified purchase
          </span>
        ) : (
          <span className="rounded-badge bg-surface-soft px-2 py-0.5 text-caption font-medium text-foreground-muted">
            Verified badge soon
          </span>
        )}
        {review.variantTitle ? (
          <span className="text-caption text-foreground-muted">{review.variantTitle}</span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-light text-foreground">{review.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">{review.body}</p>
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-caption text-foreground-muted">
        <p>
          <span className="font-medium text-foreground">{review.author}</span>
          {review.date ? ` · ${review.date}` : null}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-medium text-foreground-secondary transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          aria-label="Mark review helpful (coming soon)"
          disabled
        >
          <ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          Helpful{typeof review.helpfulCount === "number" ? ` (${review.helpfulCount})` : ""}
        </button>
      </footer>
    </article>
  );
}

type ProductReviewsProps = {
  productHandle: string;
  productTitle: string;
  className?: string;
};

/**
 * Premium reviews — empty until Shopify / Judge.me connects (no fabricated quotes).
 */
export function ProductReviews({ productHandle, productTitle, className }: ProductReviewsProps) {
  const [sort, setSort] = useState<ReviewSort>("recent");
  const reviews = useMemo(() => getProductReviews(productHandle), [productHandle]);
  const summary = useMemo(() => getReviewSummary(reviews), [reviews]);
  const visible = useMemo(() => sortReviews(reviews, sort), [reviews, sort]);

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-reviews-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-reviews"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-reviews-heading"
          eyebrow="Reviews"
          title={`Customer thoughts on ${productTitle}`}
          description={
            summary.connected
              ? "Verified customer feedback synced from Shopify."
              : "Product reviews will appear here when Shopify / Judge.me connects. We don’t invent ratings or quotes."
          }
        />

        <div className="mt-10 grid gap-10 laptop:mt-12 laptop:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] laptop:gap-14">
          <aside className="space-y-6" aria-label="Rating summary">
            <div>
              <p className="font-display text-4xl font-light tracking-[-0.02em] text-foreground">
                {summary.average != null ? summary.average.toFixed(1) : "—"}
              </p>
              <div className="mt-2">
                <Stars
                  rating={summary.average ?? 0}
                  label={
                    summary.average != null
                      ? `Average ${summary.average.toFixed(1)} of 5`
                      : "No average yet"
                  }
                />
              </div>
              <p className="mt-2 text-sm text-foreground-secondary">
                {summary.total} {summary.total === 1 ? "review" : "reviews"}
              </p>
            </div>

            <ul className="space-y-2" aria-label="Rating breakdown">
              {summary.breakdown.map((row) => {
                const pct =
                  summary.total > 0 ? Math.round((row.count / summary.total) * 100) : 0;
                return (
                  <li key={row.stars} className="flex items-center gap-3 text-caption">
                    <span className="w-10 shrink-0 text-foreground-muted">{row.stars}★</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-celadon transition-[width] duration-320 ease-standard"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-foreground-muted">{row.count}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-4 border-b border-border-subtle pb-5 tablet:flex-row tablet:items-center tablet:justify-between">
              <label className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as ReviewSort)}
                  disabled={!summary.connected}
                  className={cn(
                    "h-11 min-w-[12rem] rounded-button border border-border-subtle bg-canvas px-3 text-sm font-medium text-foreground",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                >
                  {REVIEW_SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <Button type="button" variant="secondary" size="sm" disabled>
                Write a review · soon
              </Button>
            </div>

            {!summary.connected ? (
              <div className="mt-10 max-w-lg">
                <p className="font-display text-xl font-light text-foreground">
                  Reviews are on the way
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  The review card, rating breakdown, filters, and helpful votes are ready for Shopify
                  Review apps. Placeholder quotes are intentionally omitted so nothing unverified
                  appears on this page.
                </p>
                {/* Structural placeholder card for layout / Shopify mapping */}
                <div
                  className="mt-8 rounded-card border border-dashed border-border-subtle bg-blush/60 p-6"
                  aria-hidden="true"
                  data-review-placeholder-shell="true"
                >
                  <div className="h-3 w-24 rounded-badge skeleton-shimmer" />
                  <div className="mt-4 h-4 w-2/3 rounded-badge skeleton-shimmer" />
                  <div className="mt-3 h-3 w-full rounded-badge skeleton-shimmer" />
                  <div className="mt-2 h-3 w-5/6 rounded-badge skeleton-shimmer" />
                  <p className="mt-5 text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
                    Review card placeholder · no fabricated content
                  </p>
                </div>
              </div>
            ) : visible.length === 0 ? (
              <p className="mt-10 text-sm text-foreground-secondary">
                No reviews match this filter.
              </p>
            ) : (
              <ul className="mt-8 grid gap-8 laptop:grid-cols-2">
                {visible.map((review) => (
                  <li key={review.id}>
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
