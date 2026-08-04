import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-sm text-foreground-muted", className)} role="status">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-power-pink border-r-transparent motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}

export function PageLoader({ label = "Loading page" }: { label?: string }) {
  return (
    <div
      className="mx-auto flex min-h-[40vh] w-full max-w-content flex-col justify-center gap-4 px-4 py-16"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-8 w-64 max-w-full" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="mt-6 grid grid-cols-2 gap-4 tablet:grid-cols-4">
        <Skeleton className="aspect-[4/5] w-full" />
        <Skeleton className="aspect-[4/5] w-full" />
        <Skeleton className="hidden aspect-[4/5] w-full tablet:block" />
        <Skeleton className="hidden aspect-[4/5] w-full tablet:block" />
      </div>
      <span className="visually-hidden">{label}</span>
    </div>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      <Skeleton className="aspect-[4/5] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ProductGridSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 tablet:grid-cols-3 tablet:gap-x-5 tablet:gap-y-12 laptop:grid-cols-4 laptop:gap-x-6 laptop:gap-y-14",
        className,
      )}
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CollectionHeroSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading collection">
      <Skeleton className="h-3 w-40" />
      <div className="grid gap-10 laptop:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-64 max-w-full" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="aspect-[16/9] w-full rounded-card laptop:aspect-[4/5]" />
      </div>
    </div>
  );
}

export function CollectionPageSkeleton() {
  return (
    <div className="bg-page" aria-busy="true" aria-label="Loading collection page">
      <div className="mx-auto w-full max-w-content px-4 py-16 tablet:px-6 tablet:py-20 laptop:px-8 desktop:px-12 desktop:py-24">
        <CollectionHeroSkeleton />
        <div className="mt-16 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
        <div className="mt-16">
          <Skeleton className="mb-10 h-8 w-56" />
          <FilterSidebarSkeleton />
        </div>
      </div>
    </div>
  );
}

export function FilterSidebarSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex gap-10", className)}
      aria-busy="true"
      aria-label="Loading filters and products"
    >
      <div className="hidden w-56 shrink-0 space-y-4 laptop:block">
        <Skeleton className="h-6 w-24" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 border-b border-border-subtle pb-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1 space-y-8">
        <div className="flex justify-between gap-4">
          <Skeleton className="h-11 w-28" />
          <Skeleton className="h-11 w-44" />
        </div>
        <ProductGridSkeleton count={8} />
        <div className="flex justify-center gap-2 pt-4">
          <Skeleton className="h-11 w-11" />
          <Skeleton className="h-11 w-11" />
          <Skeleton className="h-11 w-11" />
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading search results">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 border-b border-border-subtle py-4">
          <Skeleton className="h-20 w-20 shrink-0 rounded-card" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2 py-8" aria-hidden="true">
      <Skeleton className="h-11 w-11" />
      <Skeleton className="h-11 w-11" />
      <Skeleton className="h-11 w-11" />
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 rounded-card border border-border-subtle p-4", className)} aria-hidden="true">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div
      className="bg-page"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="mx-auto w-full max-w-content px-4 py-16 tablet:px-6 tablet:py-20 laptop:px-8 desktop:px-12">
        <Skeleton className="mb-8 h-3 w-48" />
        <div className="grid gap-10 laptop:grid-cols-2 laptop:gap-16">
          <Skeleton className="aspect-[4/5] w-full rounded-card" />
          <div className="space-y-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-4/5 max-w-md" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-5/6 max-w-md" />
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-12 w-40 rounded-button" />
              <Skeleton className="h-12 w-12 rounded-button" />
            </div>
            <div className="space-y-3 pt-6">
              <Skeleton className="h-12 w-full rounded-card" />
              <Skeleton className="h-12 w-full rounded-card" />
              <Skeleton className="h-12 w-full rounded-card" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="bg-page" aria-busy="true" aria-label="Loading bag">
      <div className="mx-auto w-full max-w-content px-4 py-16 tablet:px-6 laptop:px-8">
        <Skeleton className="mb-8 h-8 w-40" />
        <div className="grid gap-10 laptop:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 border-b border-border-subtle pb-4">
                <Skeleton className="h-24 w-20 shrink-0 rounded-card" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-9 w-28 rounded-badge" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 rounded-card border border-border-subtle p-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-4 h-12 w-full rounded-button" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="bg-page" aria-busy="true" aria-label="Loading home">
      <div className="mx-auto w-full max-w-content px-4 py-10 tablet:px-6 laptop:px-8">
        <div className="grid gap-8 laptop:grid-cols-[45%_55%] laptop:items-center">
          <div className="space-y-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-12 w-4/5 max-w-md" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-12 w-36 rounded-button" />
              <Skeleton className="h-12 w-28 rounded-button" />
            </div>
          </div>
          <Skeleton className="aspect-[4/5] w-full rounded-card" />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 tablet:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full rounded-card" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AccountPageSkeleton() {
  return (
    <div className="bg-page" aria-busy="true" aria-label="Loading account">
      <div className="mx-auto w-full max-w-content px-4 py-16 tablet:px-6 laptop:px-8">
        <Skeleton className="mb-8 h-8 w-40" />
        <div className="grid gap-8 laptop:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="hidden space-y-3 laptop:block">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-button" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-card" />
            <Skeleton className="h-40 w-full rounded-card" />
            <Skeleton className="h-40 w-full rounded-card" />
          </div>
        </div>
      </div>
    </div>
  );
}
