"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaImage } from "@/components/common/MediaImage";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_TESTIMONIALS_COPY } from "@/content/home-story";
import { HOME_TESTIMONIALS, type Testimonial } from "@/content/home-closing";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-sm tracking-[0.2em] text-power-pink" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-foreground-muted" aria-hidden="true">
        {"★".repeat(5 - rating)}
      </span>
    </p>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className={cn(
        "group flex h-full min-h-[24rem] flex-col overflow-hidden rounded-card border border-border-subtle bg-canvas",
        "shadow-elev1 transition-[transform,box-shadow] duration-320 ease-out",
        "hover:-translate-y-1 hover:shadow-elev2 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
      )}
      data-placeholder={item.placeholder ? "true" : undefined}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-blush">
        <MediaImage
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          spec={`testimonial-portrait-${item.id}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-7 tablet:p-9">
        <Stars rating={item.rating} />
        <blockquote className="mt-5 flex-1">
          <p className="font-display text-2xl font-light italic leading-snug tracking-[-0.015em] text-foreground tablet:text-[1.65rem]">
            “{item.quote}”
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-border-subtle pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-foreground">{item.author}</p>
            <span className="rounded-badge bg-pink-mist px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-power-pink">
              Verified purchase
            </span>
          </div>
          {item.productTitle ? (
            <p className="mt-2 text-caption text-foreground-muted">
              {item.productHref ? (
                <Link href={item.productHref} className="transition-colors hover:text-power-pink">
                  {item.productTitle}
                </Link>
              ) : (
                item.productTitle
              )}
            </p>
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}

export function HomeTestimonials({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const copy = HOME_TESTIMONIALS_COPY;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-testimonials-heading"
      className={cn(
        "bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-blush)_100%)]",
        className,
      )}
    >
      <Container width="content">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between">
          <SectionHeading
            id="home-testimonials-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <div className="flex gap-2.5 self-start tablet:self-auto">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-badge border border-border-subtle text-foreground transition-colors hover:border-border-default hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-badge border border-border-subtle text-foreground transition-colors hover:border-border-default hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-14 overflow-hidden tablet:mt-16" ref={emblaRef}>
          <ul className="flex gap-7 tablet:gap-8">
            {HOME_TESTIMONIALS.map((item) => (
              <li
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-[min(100%,21rem)] tablet:basis-[min(100%,24rem)] laptop:basis-[calc((100%-4rem)/3)]"
              >
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
