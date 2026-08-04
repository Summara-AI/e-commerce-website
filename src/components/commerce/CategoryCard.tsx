import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaImage } from "@/components/common/MediaImage";
import type { CatalogCollection } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  category: CatalogCollection;
  className?: string;
};

/**
 * Product-type category card — editorial, soft media, Shopify collection-ready.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col",
        "transition-transform duration-280 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
        className,
      )}
      data-collection-handle={category.handle}
      data-shopify-resource="collection"
    >
      <Link
        href={category.href}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-border-subtle bg-pearl transition-shadow duration-280 group-hover:shadow-elev2 motion-reduce:group-hover:shadow-none">
          <MediaImage
            src={category.imageSrc}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "transition-transform duration-480 ease-out group-hover:scale-[1.035]",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            )}
            spec="category-card-editorial"
          />
        </div>

        <div className="flex flex-1 items-start justify-between gap-4 pt-5">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-light italic tracking-[-0.01em] text-foreground transition-colors group-hover:text-power-pink">
              {category.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-foreground-secondary">
              {category.description}
            </p>
          </div>
          <span className="mt-1 inline-flex shrink-0 text-power-pink transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="visually-hidden">Shop {category.title}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
