import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  /**
   * IMAGE SPEC — empty illustration optional
   * Aspect 1:1 · Desktop 240 · Tablet 200 · Mobile 160 · soft SVG preferred
   */
  icon?: React.ReactNode;
  /** Use h1 when this is the primary page title */
  titleAs?: "h1" | "h2";
  titleId?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  icon,
  titleAs = "h2",
  titleId,
}: EmptyStateProps) {
  const TitleTag = titleAs;

  return (
    <div className={cn("mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center", className)}>
      {icon ? (
        <div className="mb-6 text-power-pink" aria-hidden="true">
          {icon}
        </div>
      ) : (
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-card border border-border-subtle bg-blush text-foreground-muted"
          aria-hidden="true"
        />
      )}
      <TitleTag
        id={titleId}
        className="font-display text-2xl font-light italic text-foreground"
      >
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-foreground-secondary">{description}</p>
      ) : null}
      {actionLabel && actionHref ? (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyCart(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      title="Your bag is empty"
      description="Discover authentic Korean skincare — start with best sellers or build a simple routine."
      actionLabel="Shop best sellers"
      actionHref="/collections/best-sellers"
      {...props}
    />
  );
}

export function EmptyWishlist(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      title="No saved pieces yet"
      description="Tap the heart on products you love — they’ll wait for you here."
      actionLabel="Browse collections"
      actionHref="/collections/all"
      {...props}
    />
  );
}

export function EmptySearch({ query }: { query?: string }) {
  return (
    <EmptyState
      title={query ? `No results for “${query}”` : "No results"}
      description="Try a concern, brand name, or product type — or explore curated collections."
      actionLabel="View all products"
      actionHref="/collections/all"
    />
  );
}

export function EmptyProducts(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      title="No products here yet"
      description="This collection is being curated. Explore best sellers in the meantime."
      actionLabel="Best sellers"
      actionHref="/collections/best-sellers"
      {...props}
    />
  );
}

export function EmptyNoFilterMatches({
  onClearFilters,
  className,
  ...props
}: Partial<EmptyStateProps> & { onClearFilters?: () => void }) {
  return (
    <EmptyState
      className={className}
      title="No matching products"
      description="Nothing fits these filters right now. Clear filters or try another combination."
      actionLabel={onClearFilters ? "Clear filters" : "Back to Shop"}
      actionHref={onClearFilters ? undefined : "/collections/all"}
      onAction={onClearFilters}
      {...props}
    />
  );
}

export function EmptyComingSoon({
  collectionTitle,
  ...props
}: Partial<EmptyStateProps> & { collectionTitle?: string }) {
  return (
    <EmptyState
      title="Coming soon"
      description={
        collectionTitle
          ? `${collectionTitle} is being thoughtfully curated with verified Korean skincare. Check back shortly.`
          : "This collection is being thoughtfully curated. Check back shortly."
      }
      actionLabel="Back to Shop"
      actionHref="/collections/all"
      {...props}
    />
  );
}

export function EmptyUnavailable({
  collectionTitle,
  ...props
}: Partial<EmptyStateProps> & { collectionTitle?: string }) {
  return (
    <EmptyState
      title="Collection unavailable"
      description={
        collectionTitle
          ? `${collectionTitle} isn’t available right now. Browse Shop for other curated paths.`
          : "This collection isn’t available right now. Browse Shop for other curated paths."
      }
      actionLabel="Back to Shop"
      actionHref="/collections/all"
      {...props}
    />
  );
}

export function EmptyOffline(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      title="You’re offline"
      description="Check your connection and try again — your bag and wishlist will sync when you’re back."
      actionLabel="Retry"
      {...props}
    />
  );
}

export function EmptyNotFound(props: Partial<EmptyStateProps>) {
  return (
    <EmptyState
      title="Page not found"
      description="The page you’re looking for may have moved. Let’s get you back to calm discovery."
      actionLabel="Return home"
      actionHref="/"
      {...props}
    />
  );
}
