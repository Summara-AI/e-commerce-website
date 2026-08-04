import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaImage } from "@/components/common/MediaImage";
import type { CatalogBundle } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { cn } from "@/lib/utils";

type BundleCardProps = {
  bundle: CatalogBundle;
  className?: string;
  /** Grid cards match product tiles; featured uses a wide editorial split on PDP. */
  variant?: "grid" | "featured";
  priority?: boolean;
};

type PreviewTile = {
  id: string;
  title: string;
  imageSrc?: string;
  imageAlt: string;
};

function previewTilesFor(bundle: CatalogBundle): PreviewTile[] {
  return bundle.includes.slice(0, 4).map((item) => {
    const handle = item.href?.split("/").pop();
    const product = handle
      ? ALL_PRODUCTS.find((p) => p.handle === handle)
      : undefined;

    return {
      id: item.id,
      title: item.title,
      imageSrc: product?.imageSrc,
      imageAlt: product?.imageAlt ?? item.title,
    };
  });
}

function BundleCardMedia({
  bundle,
  priority = false,
  className,
}: {
  bundle: CatalogBundle;
  priority?: boolean;
  className?: string;
}) {
  if (bundle.imageSrc) {
    return (
      <MediaImage
        src={bundle.imageSrc}
        alt={bundle.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className={cn(
          "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
        spec="bundle-card-packshot"
      />
    );
  }

  const tiles = previewTilesFor(bundle);

  return (
    <div
      className={cn("grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-border-subtle", className)}
      role="img"
      aria-label={bundle.imageAlt}
      data-image-spec="bundle-card-collage"
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="relative overflow-hidden bg-[linear-gradient(155deg,var(--color-canvas)_0%,var(--color-pink-mist)_55%,var(--color-pearl)_100%)]"
        >
          {tile.imageSrc ? (
            <Image
              src={tile.imageSrc}
              alt={tile.imageAlt}
              fill
              sizes="(max-width: 767px) 25vw, 12vw"
              className="object-contain bg-canvas p-3"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Premium bundle card — product-tile layout for grids; editorial split for featured rows.
 */
export function BundleCard({
  bundle,
  className,
  variant = "grid",
  priority = false,
}: BundleCardProps) {
  const savings =
    bundle.compareAtPrice && bundle.compareAtPrice.amount > bundle.price.amount
      ? bundle.compareAtPrice.amount - bundle.price.amount
      : null;

  const badges = (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="celadon">Bundle</Badge>
      {savings ? (
        <Badge variant="sale">Save Rs.{savings.toLocaleString("en-PK")}</Badge>
      ) : null}
    </div>
  );

  const title = (
    <h3 className="font-display text-xl font-light italic tracking-[-0.01em] text-foreground tablet:text-2xl">
      <Link
        href={bundle.href}
        className="transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        {bundle.title}
      </Link>
    </h3>
  );

  const includes = (
    <div>
      <p className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
        Includes
      </p>
      <ul className="mt-3 space-y-2">
        {bundle.includes.map((item) => (
          <li key={item.id} className="text-sm font-light leading-snug text-foreground-secondary">
            <span className="mr-2 text-power-pink" aria-hidden="true">
              ·
            </span>
            {item.href ? (
              <Link href={item.href} className="hover:text-power-pink hover:underline">
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const pricing = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-lg font-medium tracking-[0.01em] text-foreground">
          {bundle.price.formatted}
        </p>
        {bundle.compareAtPrice ? (
          <p className="mt-1 text-sm font-light text-foreground-muted line-through">
            {bundle.compareAtPrice.formatted}
          </p>
        ) : null}
      </div>
      <Button asChild>
        <Link href={bundle.href}>Shop the kit</Link>
      </Button>
    </div>
  );

  if (variant === "featured") {
    return (
      <article
        className={cn(
          "group grid h-full overflow-hidden rounded-card border border-border-subtle bg-surface",
          "laptop:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
          "transition-shadow duration-280 ease-out hover:shadow-elev2 motion-reduce:hover:shadow-none",
          className,
        )}
        data-bundle-handle={bundle.handle}
      >
        <Link
          href={bundle.href}
          className="relative block min-h-[16rem] overflow-hidden bg-blush tablet:min-h-[20rem] laptop:min-h-[24rem]"
          aria-label={bundle.title}
        >
          <BundleCardMedia bundle={bundle} priority={priority} />
        </Link>

        <div className="flex flex-col p-6 tablet:p-8 laptop:p-10">
          {badges}
          <div className="mt-5">{title}</div>
          <p className="mt-4 text-sm font-light leading-relaxed text-foreground-secondary tablet:text-base">
            {bundle.description}
          </p>
          <div className="mt-6">{includes}</div>
          <div className="mt-auto pt-10">{pricing}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col",
        "transition-shadow duration-280 ease-out",
        className,
      )}
      data-bundle-handle={bundle.handle}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-card border border-border-subtle bg-blush",
          "transition-shadow duration-320 ease-out group-hover:shadow-elev3 motion-reduce:group-hover:shadow-none",
        )}
      >
        <Link
          href={bundle.href}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          aria-label={bundle.title}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush">
            <BundleCardMedia bundle={bundle} priority={priority} />
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-[1] flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5">
          <Badge variant="celadon" className="px-2 py-0.5 text-[0.65rem]">
            Bundle
          </Badge>
          {savings ? (
            <Badge variant="sale" className="px-2 py-0.5 text-[0.65rem]">
              Save Rs.{savings.toLocaleString("en-PK")}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {title}
        <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-foreground-secondary">
          {bundle.description}
        </p>
        <div className="mt-4">{includes}</div>
        <div className="mt-auto pt-6">{pricing}</div>
      </div>
    </article>
  );
}
