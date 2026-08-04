"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaImage } from "@/components/common/MediaImage";
import type { CatalogCollection } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export type CollectionImageTone = "light" | "dark";

type CollectionCardProps = {
  collection: CatalogCollection;
  className?: string;
  size?: "standard" | "large";
  /**
   * Photography luminance — defaults to `light` when no image (placeholders).
   * Dark images get a soft gradient overlay + light typography.
   * Light images keep charcoal typography — never white-on-light.
   */
  imageTone?: CollectionImageTone;
  ctaLabel?: string;
  /** Editorial horizontal gallery treatment */
  variant?: "default" | "gallery";
  sizes?: string;
};

/**
 * Resolve tone for contrast-safe typography.
 * Placeholders / missing src are always treated as light.
 */
function resolveTone(
  collection: CatalogCollection,
  imageTone?: CollectionImageTone,
): CollectionImageTone {
  if (!collection.imageSrc) return "light";
  return imageTone ?? collection.imageTone ?? "light";
}

/**
 * Featured collection card — premium editorial magazine unit.
 * Split media + content for placeholders; overlay mode for dark photography.
 * Gallery variant: full-bleed editorial tile for horizontal snap rails.
 */
export function CollectionCard({
  collection,
  className,
  size = "standard",
  imageTone,
  ctaLabel = "Explore",
  variant = "default",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: CollectionCardProps) {
  const tone = resolveTone(collection, imageTone);
  const isDark = tone === "dark";
  const isGallery = variant === "gallery";

  if (isGallery) {
    return (
      <article
        className={cn("h-full", className)}
        data-collection-handle={collection.handle}
        data-image-tone={tone}
        data-variant="gallery"
      >
        <Link
          href={collection.href}
          className={cn(
            "group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-card",
            "border border-border-subtle bg-blush shadow-elev1",
            "cursor-pointer transition-[transform,box-shadow,border-color] duration-500 ease-out",
            "hover:-translate-y-1.5 hover:border-soft-pink/40 hover:shadow-float hover:cursor-zoom-in",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            "tablet:min-h-[30rem] desktop:min-h-[34rem]",
            "motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:hover:cursor-pointer",
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            <MediaImage
              src={collection.imageSrc}
              alt={collection.imageAlt}
              fill
              sizes={sizes}
              className={cn(
                "media-fade-in object-cover will-change-transform",
                "transition-transform duration-700 ease-out group-hover:scale-[1.06]",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              )}
              spec={`featured-collection-${collection.handle}`}
            />
            {/* Base atmosphere + hover deepen */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-out",
                "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(247,242,244,0.2)_35%,rgba(247,242,244,0.92)_100%)]",
                "group-hover:opacity-90",
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500 ease-out",
                "bg-gradient-to-t from-ink/45 via-ink/10 to-transparent",
                "group-hover:opacity-100",
                "motion-reduce:group-hover:opacity-0",
              )}
              aria-hidden="true"
            />
          </div>

          <div className="relative z-[1] mt-auto flex flex-col p-7 tablet:p-8 desktop:p-9">
            <h3
              className={cn(
                "max-w-[16ch] font-display text-[1.85rem] font-light italic leading-[1.12] tracking-[-0.02em] text-ink",
                "transition-transform duration-500 ease-out will-change-transform",
                "group-hover:-translate-y-2",
                "tablet:text-[2.15rem] desktop:text-[2.35rem]",
                "motion-reduce:group-hover:translate-y-0",
              )}
            >
              {collection.title}
            </h3>

            <p
              className={cn(
                "mt-3 max-w-sm text-sm font-light leading-[1.75] text-foreground-secondary",
                "line-clamp-2 transition-[opacity,transform] duration-500 ease-out",
                "group-hover:-translate-y-1.5",
                "motion-reduce:group-hover:translate-y-0",
              )}
            >
              {collection.description}
            </p>

            <span
              className={cn(
                "mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-power-pink",
                "translate-y-3 opacity-0",
                "transition-[opacity,transform] duration-500 ease-out",
                "group-hover:translate-y-0 group-hover:opacity-100",
                // Always visible on touch devices (no hover)
                "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
              )}
            >
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={cn("h-full", className)}
      data-collection-handle={collection.handle}
      data-image-tone={tone}
    >
      <Link
        href={collection.href}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-card",
          "border border-border-subtle bg-canvas shadow-elev1",
          "transition-[transform,box-shadow,border-color] duration-320 ease-out will-change-transform",
          "hover:-translate-y-2 hover:border-soft-pink/50 hover:shadow-float",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
          isDark && "bg-ink",
        )}
      >
        {/* Media */}
        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            isDark
              ? "absolute inset-0"
              : size === "large"
                ? "aspect-[5/4] tablet:aspect-[4/3]"
                : "aspect-[5/4]",
          )}
        >
          <MediaImage
            src={collection.imageSrc}
            alt={collection.imageAlt}
            fill
            sizes={sizes}
            className={cn(
              "media-fade-in will-change-transform object-cover",
              "transition-transform duration-320 ease-out group-hover:scale-[1.04]",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            )}
            spec={`featured-collection-${collection.handle}`}
          />
          {isDark ? (
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5"
              aria-hidden="true"
            />
          ) : null}
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative z-[1] flex flex-1 flex-col",
            isDark
              ? "mt-auto justify-end p-7 tablet:p-8"
              : cn(
                  "bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-blush)_100%)]",
                  size === "large" ? "p-7 tablet:p-8" : "p-6 tablet:p-7",
                ),
          )}
        >
          <h3
            className={cn(
              "font-display font-light italic tracking-[-0.02em]",
              isDark ? "text-canvas" : "text-ink",
              size === "large"
                ? "text-3xl tablet:text-[2.05rem] leading-[1.15]"
                : "text-[1.65rem] tablet:text-3xl leading-[1.18]",
            )}
          >
            {collection.title}
          </h3>

          <p
            className={cn(
              "mt-3 flex-1 text-sm font-light leading-[1.75]",
              size === "large" ? "line-clamp-3" : "line-clamp-2",
              isDark ? "text-canvas/80" : "text-foreground-secondary",
            )}
          >
            {collection.description}
          </p>

          <span
            className={cn(
              "mt-6 inline-flex items-center gap-2 self-start text-sm font-medium",
              "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat",
              "transition-[background-size,color] duration-320 ease-out",
              "group-hover:bg-[length:100%_1px]",
              isDark ? "text-canvas" : "text-power-pink",
            )}
          >
            {ctaLabel}
            <ArrowRight
              className={cn(
                "h-4 w-4 transition-transform duration-320 ease-out",
                "group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0",
              )}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
