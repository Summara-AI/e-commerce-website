import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CollectionPageData } from "@/lib/collections";
import { cn } from "@/lib/utils";

type CollectionInfoProps = {
  data: CollectionPageData;
  className?: string;
};

/**
 * Editorial collection introduction — benefits as elevated soft panels.
 */
export function CollectionInfo({ data, className }: CollectionInfoProps) {
  const editorial = data.editorial;
  if (!editorial?.lead && !editorial?.benefits?.length && !editorial?.education) {
    return null;
  }

  const hasBenefits = Boolean(editorial?.benefits?.length);

  return (
    <Section
      spacing="default"
      aria-labelledby="collection-info-heading"
      className={cn("bg-surface-soft", className)}
    >
      <Container width="content">
        <div
          className={cn(
            "grid gap-12",
            hasBenefits && "laptop:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] laptop:gap-16",
          )}
        >
          <SectionHeading
            id="collection-info-heading"
            eyebrow="About this edit"
            title={`Inside ${data.collection.title}`}
            description={editorial?.lead}
          />

          {hasBenefits ? (
            <ul className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-1">
              {editorial!.benefits!.map((benefit, index) => (
                <li
                  key={benefit.id}
                  className={cn(
                    "rounded-card border border-border-subtle bg-canvas/80 px-5 py-5 shadow-elev1",
                    "transition-[transform,box-shadow] duration-320 ease-out",
                    "hover:-translate-y-1 hover:shadow-elev2 motion-reduce:transform-none",
                    index === 0 && "laptop:mt-2",
                  )}
                >
                  <p className="text-overline font-medium uppercase tracking-[0.12em] text-power-pink">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-light italic text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-foreground-secondary">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {editorial?.education ? (
          <aside
            className="mt-12 max-w-3xl rounded-card border border-border-subtle bg-blush/60 px-6 py-6 shadow-elev1 tablet:mt-14 tablet:px-8"
            aria-label="Good to know"
          >
            <p className="text-caption font-medium uppercase tracking-[0.12em] text-power-pink">
              Good to know
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground-secondary tablet:text-base">
              {editorial.education}
            </p>
          </aside>
        ) : null}
      </Container>
    </Section>
  );
}
