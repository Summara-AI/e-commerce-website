import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  /** Shopify-friendly — build href from page number */
  hrefForPage: (page: number) => string;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    return Math.abs(page - currentPage) <= 1;
  });

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      {prev ? (
        <Link
          href={hrefForPage(prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-badge text-foreground hover:bg-blush"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="inline-flex h-11 w-11 items-center justify-center opacity-30" aria-disabled="true">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}

      {pages.map((page, index) => {
        const prevPage = pages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="contents">
            {showEllipsis ? (
              <span className="px-2 text-foreground-muted" aria-hidden="true">
                …
              </span>
            ) : null}
            <Link
              href={hrefForPage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex h-11 min-w-11 items-center justify-center rounded-badge px-3 text-sm font-medium",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                page === currentPage
                  ? "bg-power-pink text-foreground-on-primary"
                  : "text-foreground-secondary hover:bg-blush hover:text-foreground",
              )}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {next ? (
        <Link
          href={hrefForPage(next)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-badge text-foreground hover:bg-blush"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      ) : (
        <span className="inline-flex h-11 w-11 items-center justify-center opacity-30" aria-disabled="true">
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}
    </nav>
  );
}
