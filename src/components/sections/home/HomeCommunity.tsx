import { MediaImage } from "@/components/common/MediaImage";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HOME_COMMUNITY_COPY } from "@/content/home-story";
import { cn } from "@/lib/utils";

/** Six-tile editorial mosaic — lifestyle placeholders */
const TILES: { id: string; alt: string; featured?: boolean }[] = [
  { id: "1", alt: "Community lifestyle tile 1 — soft ritual, asset pending", featured: true },
  { id: "2", alt: "Community lifestyle tile 2 — product in daylight, asset pending" },
  { id: "3", alt: "Community lifestyle tile 3 — brand moment, asset pending" },
  { id: "4", alt: "Community lifestyle tile 4 — texture / atmosphere, asset pending" },
  { id: "5", alt: "Community lifestyle tile 5 — skincare flat-lay, asset pending" },
  { id: "6", alt: "Community lifestyle tile 6 — morning ritual, asset pending" },
];

export function HomeCommunity({ className }: { className?: string }) {
  const copy = HOME_COMMUNITY_COPY;

  return (
    <Section
      spacing="lux"
      aria-labelledby="home-community-heading"
      className={cn(
        "bg-[linear-gradient(180deg,var(--color-blush)_0%,var(--color-canvas)_60%)]",
        className,
      )}
    >
      <Container width="content">
        <SectionHeading
          id="home-community-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ul className="mt-14 grid grid-cols-2 gap-3 tablet:mt-16 tablet:grid-cols-4 tablet:gap-4">
          {TILES.map((tile) => (
            <li
              key={tile.id}
              className={cn(
                "group relative overflow-hidden rounded-card border border-border-subtle bg-pearl",
                "transition-transform duration-280 ease-out hover:-translate-y-0.5 hover:shadow-elev2",
                "motion-reduce:transform-none motion-reduce:hover:translate-y-0",
                tile.featured && "col-span-2 row-span-2",
              )}
            >
              <div
                className={cn(
                  "relative h-full w-full",
                  tile.featured ? "aspect-square min-h-[14rem] tablet:min-h-[22rem]" : "aspect-square",
                )}
              >
                <MediaImage
                  alt={tile.alt}
                  fill
                  sizes={tile.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                  spec={`community-tile-${tile.id}`}
                />
                <div
                  className="absolute inset-0 bg-ink/0 transition-colors duration-320 group-hover:bg-ink/10"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
