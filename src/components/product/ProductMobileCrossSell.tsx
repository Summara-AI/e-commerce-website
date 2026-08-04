"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductMobileCrossSellProps = {
  products: CatalogProduct[];
  /** Show only on small screens; sits above sticky ATC without blocking purchase */
  className?: string;
};

/**
 * Subtle mobile cross-sell strip — dismissible, laptop+ hidden.
 * Positioned above sticky ATC; does not replace purchase CTAs.
 */
export function ProductMobileCrossSell({
  products,
  className,
}: ProductMobileCrossSellProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const complement = products[0];

  useEffect(() => {
    if (!complement || dismissed) return;

    let raf = 0;
    let prev = false;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const doc = document.documentElement.scrollHeight - window.innerHeight;
        const next = y > window.innerHeight * 0.85 && y < doc - 120;
        if (next !== prev) {
          prev = next;
          setVisible(next);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [complement, dismissed]);

  if (!complement || dismissed) return null;

  return (
    <div
      role="complementary"
      aria-label="Suggested next step"
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 z-[1014] laptop:hidden",
        // Sit above sticky ATC (~py-3 + button + safe area)
        "bottom-[calc(4.75rem+env(safe-area-inset-bottom))]",
        "transition-transform duration-320 ease-standard motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-[120%] pointer-events-none",
        className,
      )}
      data-shopify-section="mobile-cross-sell"
    >
      <div className="mx-auto flex max-w-content items-center gap-3 border-t border-border-subtle bg-surface/95 px-4 py-2.5 shadow-elev2 backdrop-blur-md">
        <Link
          href={complement.href}
          className={cn(
            "relative h-12 w-12 shrink-0 overflow-hidden rounded-badge bg-surface-soft",
            "bg-[linear-gradient(160deg,var(--bg-page),var(--color-accent-muted))]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          )}
          aria-label={complement.title}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground-muted">
            Pairs well
          </p>
          <p className="truncate text-sm font-medium text-foreground">{complement.title}</p>
          <p className="text-caption text-foreground-secondary">{complement.price.formatted}</p>
        </div>
        <Link
          href={complement.href}
          className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-medium text-power-pink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          View
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss suggestion"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-badge text-foreground-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
