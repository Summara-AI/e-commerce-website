import { Breadcrumb } from "@/components/common/Breadcrumb";
import { MediaImage } from "@/components/common/MediaImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CollectionPageData } from "@/lib/collections";
import { cn } from "@/lib/utils";

type CollectionHeroProps = {
  data: CollectionPageData;
  className?: string;
};

/**
 * Collection banner — editorial landing with framed imagery and depth.
 */
export function CollectionHero({ data, className }: CollectionHeroProps) {
  const { collection, productCount, status } = data;
  const countLabel =
    status === "coming-soon"
      ? "Coming soon"
      : status === "unavailable"
        ? "Unavailable"
        : productCount === 1
          ? "1 product"
          : `${productCount} products`;

  return (
    <Section
      spacing="lux"
      aria-labelledby="collection-hero-heading"
      className={cn("relative overflow-hidden lux-atmosphere bg-page", className)}
      data-collection-handle={collection.handle}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className={cn(
            "h-full w-full",
            "bg-[radial-gradient(ellipse_at_80%_0%,var(--color-pink-mist)_0%,transparent_45%),linear-gradient(165deg,var(--color-canvas)_0%,var(--color-blush)_50%,var(--color-pearl)_100%)]",
          )}
        />
      </div>

      <Container width="content">
        <Breadcrumb
          items={[
            { label: "Shop", href: "/collections/all" },
            { label: data.breadcrumbLabel },
          ]}
          className="mb-10 tablet:mb-12"
        />

        <div className="grid gap-12 laptop:grid-cols-12 laptop:items-end laptop:gap-8">
          <div className="laptop:col-span-6 laptop:pb-6">
            <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
              Collection
            </p>
            <h1
              id="collection-hero-heading"
              className="mt-4 font-display text-h1 font-light italic tracking-[-0.02em] text-foreground desktop:text-[2.75rem]"
            >
              {collection.title}
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-[1.75] text-foreground-secondary tablet:text-lg">
              {collection.description}
            </p>
            <p
              className="mt-8 text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted"
              aria-live="polite"
            >
              {countLabel}
            </p>
          </div>

          <div className="relative laptop:col-span-6">
            <div
              className="pointer-events-none absolute -right-8 -top-8 hidden h-36 w-36 rounded-full bg-pink-mist/60 blur-2xl laptop:block"
              aria-hidden="true"
            />
            <div
              className={cn(
                "lux-frame lux-media-zoom relative aspect-[16/10] shadow-elev2",
                "tablet:aspect-[2/1] laptop:aspect-[4/5] laptop:translate-y-2",
              )}
              data-shopify-setting="collection_image"
            >
              <MediaImage
                src={collection.imageSrc}
                alt={collection.imageAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
                spec={`collection-hero-${collection.handle}`}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
