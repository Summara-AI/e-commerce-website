"use client";

import useEmblaCarousel from "embla-carousel-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PDP_CUSTOMER_GALLERY } from "@/content/pdp-trust";
import { cn } from "@/lib/utils";

type ProductCustomerGalleryProps = {
  className?: string;
};

/**
 * Future UGC gallery — placeholders only, never fabricated customer images.
 */
export function ProductCustomerGallery({ className }: ProductCustomerGalleryProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const tiles = Array.from({ length: PDP_CUSTOMER_GALLERY.tileCount }, (_, i) => i);

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-ugc-heading"
      className={cn("bg-page", className)}
      data-shopify-section="product-customer-gallery"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-ugc-heading"
          eyebrow={PDP_CUSTOMER_GALLERY.eyebrow}
          title={PDP_CUSTOMER_GALLERY.title}
          description={PDP_CUSTOMER_GALLERY.description}
        />

        {/* Desktop / laptop grid — equal tiles until UGC lands */}
        <ul className="mt-10 hidden gap-3 tablet:mt-12 tablet:grid tablet:grid-cols-3 laptop:grid-cols-3 laptop:gap-4">
          {tiles.map((i) => (
            <li key={i} className="overflow-hidden rounded-card bg-pearl">
              <button
                type="button"
                disabled
                className={cn(
                  "aspect-square w-full",
                  "bg-[linear-gradient(160deg,var(--bg-page-subtle),var(--color-accent-muted),var(--neutral-200))]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  "disabled:cursor-default",
                )}
                aria-label={`Customer photo placeholder ${i + 1} — lightbox soon`}
                data-lightbox-ready="false"
                data-image-spec="pdp-ugc-tile"
              />
            </li>
          ))}
        </ul>

        {/* Mobile swipe rail */}
        <div className="mt-10 overflow-hidden tablet:hidden" ref={emblaRef}>
          <ul className="flex gap-3">
            {tiles.map((i) => (
              <li key={i} className="min-w-0 shrink-0 grow-0 basis-[70%]">
                <div
                  className={cn(
                    "aspect-square overflow-hidden rounded-card",
                    "bg-[linear-gradient(160deg,var(--bg-page-subtle),var(--color-accent-muted),var(--neutral-200))]",
                  )}
                  role="img"
                  aria-label={`Customer photo placeholder ${i + 1}`}
                  data-image-spec="pdp-ugc-tile"
                />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-caption text-foreground-muted">
          Lightbox & lazy photo loading connect with review-photo metafields later.
        </p>
      </Container>
    </Section>
  );
}
