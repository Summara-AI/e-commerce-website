import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

type ProductOverviewProps = {
  education: ProductEducation;
  productTitle: string;
  className?: string;
};

/**
 * Expanded product overview — description, highlights, suitability, format.
 */
export function ProductOverview({
  education,
  productTitle,
  className,
}: ProductOverviewProps) {
  const { overview } = education;

  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-overview-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-overview"
    >
      <Container width="content">
        <div className="grid gap-12 laptop:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] laptop:gap-16">
          <div>
            <SectionHeading
              id="pdp-overview-heading"
              eyebrow="Overview"
              title={`About ${productTitle}`}
              description={overview.purpose}
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-secondary">
              {overview.fullDescription}
            </p>

            {overview.highlights.length ? (
              <ul className="mt-8 space-y-3">
                {overview.highlights.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 border-l-2 border-power-pink/40 pl-4 text-sm font-medium leading-relaxed text-foreground"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="space-y-8 border-t border-border-subtle pt-8 laptop:border-l laptop:border-t-0 laptop:pl-10 laptop:pt-0">
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Suitable for
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {overview.suitableFor}
              </p>
            </div>

            <div>
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Skin focus
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {overview.skinTypes.map((type) => (
                  <li
                    key={type}
                    className="rounded-badge bg-surface px-3 py-1.5 text-caption font-medium text-foreground"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            {overview.concerns.length ? (
              <div>
                <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                  Skin concerns
                </p>
                <ul className="mt-2 space-y-2">
                  {overview.concerns.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={c.href}
                        className="text-sm font-medium text-power-pink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(overview.size || overview.texture || overview.finish) && (
              <dl className="space-y-3 text-sm">
                {overview.size ? (
                  <div>
                    <dt className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                      Format
                    </dt>
                    <dd className="mt-1 text-foreground">{overview.size}</dd>
                  </div>
                ) : null}
                {overview.texture ? (
                  <div>
                    <dt className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                      Texture
                    </dt>
                    <dd className="mt-1 text-foreground">{overview.texture}</dd>
                  </div>
                ) : null}
                {overview.finish ? (
                  <div>
                    <dt className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
                      Finish
                    </dt>
                    <dd className="mt-1 text-foreground">{overview.finish}</dd>
                  </div>
                ) : null}
              </dl>
            )}
          </aside>
        </div>
      </Container>
    </Section>
  );
}
