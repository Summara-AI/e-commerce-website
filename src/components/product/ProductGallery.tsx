"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { MediaImage } from "@/components/common/MediaImage";
import type { ProductMediaItem } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  media: ProductMediaItem[];
  productTitle: string;
  className?: string;
};

/**
 * Premium PDP gallery — Embla swipe, thumbs, zoom/fullscreen hooks for later.
 */
export function ProductGallery({ media, productTitle, className }: ProductGalleryProps) {
  const slides = media.filter((item) => item.src);
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    setSelected(index);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const canScrollPrev = selected > 0;
  const canScrollNext = selected < slides.length - 1;

  if (!slides.length) {
    return (
      <div className={cn("flex flex-col gap-4", className)} data-shopify-section="product-gallery">
        <div className="relative overflow-hidden rounded-card border border-border-subtle bg-pearl shadow-elev2">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush">
            <MediaImage
              src={undefined}
              alt={productTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
              spec="pdp-media-hero"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} data-shopify-section="product-gallery">
      <div className="relative overflow-hidden rounded-card border border-border-subtle bg-pearl shadow-elev2">
        <div className="overflow-hidden" ref={emblaRef}>
          <ul className="flex">
            {slides.map((item, index) => {
              const loadImage =
                index === selected || Math.abs(index - selected) <= 1;
              return (
              <li key={item.id} className="min-w-0 shrink-0 grow-0 basis-full">
                <div
                  className="lux-media-zoom relative aspect-[4/5] w-full overflow-hidden bg-blush"
                  data-image-spec={`pdp-media-${item.role}`}
                  data-media-index={index}
                >
                  {loadImage ? (
                  <MediaImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
                    spec={`pdp-media-${item.role}`}
                    className={cn(
                      "transition-opacity duration-320",
                      item.src ? "object-contain bg-canvas p-6 tablet:p-8" : "object-cover",
                    )}
                  />
                  ) : (
                    <div className="h-full w-full bg-blush" aria-hidden="true" />
                  )}
                  {index === 0 ? (
                    <span className="visually-hidden">{productTitle} primary image</span>
                  ) : null}
                </div>
              </li>
            );})}
          </ul>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous product image"
              className={cn(
                "absolute left-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-border-subtle bg-surface/95 text-ink shadow-elev2 backdrop-blur-sm",
                "transition-[opacity,transform] duration-200 hover:border-power-pink/50 hover:bg-power-pink hover:text-foreground-on-primary",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                "disabled:pointer-events-none disabled:opacity-35",
              )}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next product image"
              className={cn(
                "absolute right-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-border-subtle bg-surface/95 text-ink shadow-elev2 backdrop-blur-sm",
                "transition-[opacity,transform] duration-200 hover:border-power-pink/50 hover:bg-power-pink hover:text-foreground-on-primary",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                "disabled:pointer-events-none disabled:opacity-35",
              )}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </>
        ) : null}

        <p className="absolute left-3 top-3 rounded-badge bg-canvas/90 px-2.5 py-1 text-caption font-medium text-foreground-muted shadow-elev1 backdrop-blur-sm">
          {selected + 1} / {slides.length}
        </p>
      </div>

      {slides.length > 1 ? (
        <ul
          className="flex gap-2 overflow-x-auto overscroll-x-contain scroll-px-1 pb-1 pr-1 [-webkit-overflow-scrolling:touch]"
          aria-label="Product image thumbnails"
        >
          {slides.map((item, index) => {
            const active = index === selected;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Show image ${index + 1}: ${item.alt}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative h-16 w-14 overflow-hidden rounded-badge border-2 transition-[border-color,box-shadow] duration-200 ease-out tablet:h-20 tablet:w-[4.5rem]",
                    active
                      ? "border-power-pink shadow-elev1"
                      : "border-transparent hover:border-border-default",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  )}
                >
                  <MediaImage
                    src={item.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    spec={`pdp-thumb-${item.role}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
