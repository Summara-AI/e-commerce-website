"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAccount } from "@/components/account/account-context";
import { AccountShell } from "@/components/account/AccountShell";
import { WishlistToolbar } from "@/components/account/WishlistToolbar";
import { ProductCard, ProductCardSkeleton } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { ACCOUNT_COPY } from "@/content/account";
import { ALL_PRODUCTS } from "@/lib/collections";
import {
  buildWishlistFacets,
  DEFAULT_WISHLIST_FILTERS,
  filterWishlistProducts,
  resolveWishlistProducts,
  sortWishlistProducts,
  type WishlistFilters,
  type WishlistSort,
} from "@/lib/wishlist";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type WishlistPageViewProps = {
  /** When true, render inside account shell (also used at /wishlist) */
  embedded?: boolean;
};

/**
 * Premium wishlist — curated saved products with sort/filter and Shopify-ready sync.
 */
export function WishlistPageView({ embedded = true }: WishlistPageViewProps) {
  const reduceMotion = useReducedMotion();
  const { isHydrated, wishlistHandles, removeWishlist, addWishlist } =
    useAccount();
  const [sort, setSort] = useState<WishlistSort>("newest");
  const [filters, setFilters] = useState<WishlistFilters>(DEFAULT_WISHLIST_FILTERS);
  const [exiting, setExiting] = useState<string | null>(null);

  const products = useMemo(
    () => resolveWishlistProducts(wishlistHandles, ALL_PRODUCTS),
    [wishlistHandles],
  );

  const facets = useMemo(() => buildWishlistFacets(products), [products]);

  const visible = useMemo(() => {
    const filtered = filterWishlistProducts(products, filters);
    return sortWishlistProducts(filtered, sort, wishlistHandles);
  }, [products, filters, sort, wishlistHandles]);

  const showUndoToast = (handle: string, title: string) => {
    toast.success(ACCOUNT_COPY.wishlistRemovedToast, title, {
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => addWishlist(handle),
      },
    });
  };

  const handleRemove = (handle: string, title: string) => {
    if (reduceMotion) {
      removeWishlist(handle);
      showUndoToast(handle, title);
      return;
    }
    setExiting(handle);
    window.setTimeout(() => {
      removeWishlist(handle);
      setExiting(null);
      showUndoToast(handle, title);
    }, 320);
  };

  const body = !isHydrated ? (
    <div
      className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-3 tablet:gap-6"
      aria-busy="true"
      aria-label="Loading wishlist"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  ) : !products.length ? (
    <WishlistEmptyState />
  ) : (
    <div className="space-y-6" data-shopify-block="wishlist">
      <WishlistToolbar
        sort={sort}
        filters={filters}
        facets={facets}
        resultCount={visible.length}
        totalCount={products.length}
        onSortChange={setSort}
        onFiltersChange={setFilters}
      />

      {!visible.length ? (
        <div className="rounded-card border border-border-subtle bg-canvas/80 px-6 py-14 text-center">
          <p className="font-display text-xl font-light italic text-foreground">
            No matching pieces
          </p>
          <p className="mt-2 text-sm font-light text-foreground-secondary">
            Try another filter or clear your search.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-6 min-h-11 rounded-full"
            onClick={() => setFilters({ ...DEFAULT_WISHLIST_FILTERS })}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-3 tablet:gap-6 laptop:grid-cols-3"
          aria-label="Wishlist products"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => (
              <motion.li
                key={product.handle}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                animate={
                  exiting === product.handle
                    ? { opacity: 0, scale: 0.92, y: 8 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, scale: 0.9, y: 12, transition: { duration: 0.28 } }
                }
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.35),
                  ease,
                }}
                className="flex flex-col"
                data-image-spec="account-wishlist-card"
              >
                <ProductCard
                  product={product}
                  emphasis="lux"
                  density="default"
                  showBrand
                  showRating
                  showAvailability
                  addLabel="Add to Cart"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 28vw"
                  className={cn(
                    "rounded-card bg-canvas/40 p-3 tablet:p-4",
                    "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.22)]",
                  )}
                />
                <Button
                  type="button"
                  variant="text"
                  size="sm"
                  className="mt-3 min-h-10 w-full justify-center text-foreground-secondary hover:text-destructive"
                  onClick={() => handleRemove(product.handle, product.title)}
                  aria-label={`Remove ${product.title} from wishlist`}
                >
                  {ACCOUNT_COPY.remove}
                </Button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );

  const headerActions = isHydrated ? (
    <div className="mt-6 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
      <p
        className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
        aria-live="polite"
      >
        {ACCOUNT_COPY.wishlistCountLabel(products.length)}
      </p>
      <Button asChild className="min-h-11 rounded-full self-start">
        <Link href={ACCOUNT_COPY.continueHref}>
          {ACCOUNT_COPY.wishlistContinueShopping}
        </Link>
      </Button>
    </div>
  ) : null;

  if (!embedded) return body;

  return (
    <AccountShell
      title={ACCOUNT_COPY.wishlistTitle}
      description={ACCOUNT_COPY.wishlistDescription}
      breadcrumbLabel="Wishlist"
    >
      {headerActions}
      <div className={cn(headerActions ? "mt-8" : undefined)}>{body}</div>
    </AccountShell>
  );
}

function WishlistEmptyState() {
  return (
    <div
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center"
      data-shopify-block="wishlist-empty"
    >
      <div
        className="relative mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] border border-border-subtle bg-blush"
        aria-hidden="true"
        data-image-spec="account-empty-illustration"
      >
        <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_0%,rgba(255,245,249,0.7)_45%,transparent_80%)]" />
        <Heart
          className="relative h-10 w-10 text-power-pink"
          strokeWidth={1.25}
          fill="currentColor"
          fillOpacity={0.15}
        />
      </div>
      <h2 className="font-display text-3xl font-light italic text-foreground">
        {ACCOUNT_COPY.wishlistEmptyTitle}
      </h2>
      <p className="mt-3 text-base font-light leading-relaxed text-foreground-secondary">
        {ACCOUNT_COPY.wishlistEmptyDescription}
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 tablet:w-auto tablet:flex-row">
        <Button asChild className="min-h-11 rounded-full">
          <Link href={ACCOUNT_COPY.continueHref}>
            {ACCOUNT_COPY.wishlistEmptyCta}
          </Link>
        </Button>
        <Button asChild variant="secondary" className="min-h-11 rounded-full">
          <Link href={ACCOUNT_COPY.wishlistEmptySecondaryHref}>
            {ACCOUNT_COPY.wishlistEmptySecondary}
          </Link>
        </Button>
      </div>
    </div>
  );
}
