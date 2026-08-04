import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CtaBlock } from "@/components/common/CtaBlock";
import { EditorialMedia } from "@/components/common/EditorialMedia";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ABOUT_PAGE } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * About Us — brand story, mission, vision, philosophy, Korean approach, science, timeline.
 */
export function AboutPageView() {
  const {
    brandStory,
    mission,
    vision,
    philosophy,
    values,
    authenticityPromise,
    team,
    koreanApproach,
    scientificBacking,
    timeline,
    closing,
  } = ABOUT_PAGE;

  return (
    <div data-shopify-section="about-page">
      <Section spacing="default" className="bg-page" aria-labelledby="about-heading">
        <Container width="content">
          <Breadcrumb items={[{ label: "Our Story" }]} className="mb-8" />
          <SectionHeading
            id="about-heading"
            as="h1"
            eyebrow={ABOUT_PAGE.eyebrow}
            title={ABOUT_PAGE.title}
            description={ABOUT_PAGE.description}
          />
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-story-heading">
        <Container width="content">
          <div className="grid items-center gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="about-story-heading"
                eyebrow={brandStory.eyebrow}
                title={brandStory.title}
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-secondary">
                {brandStory.paragraphs.map((p) => (
                  <p key={p.slice(0, 28)}>{p}</p>
                ))}
              </div>
            </div>
            <EditorialMedia
              spec="about-story-editorial"
              label="Brand story editorial imagery — founding journey, asset pending"
              aspect="3/4"
              className="tablet:aspect-[4/5] laptop:aspect-[3/4]"
            />
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-surface-soft" aria-labelledby="about-mission-heading">
        <Container width="content">
          <div className="grid gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="about-mission-heading"
                eyebrow={mission.eyebrow}
                title={mission.title}
              />
              <p className="mt-6 font-display text-xl font-light leading-snug tracking-[-0.01em] text-foreground">
                {mission.body}
              </p>
            </div>
            <div>
              <SectionHeading eyebrow={vision.eyebrow} title={vision.title} />
              <p className="mt-6 text-base leading-relaxed text-foreground-secondary">
                {vision.body}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-philosophy-heading">
        <Container width="content">
          <div className="grid items-start gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="about-philosophy-heading"
                eyebrow={philosophy.eyebrow}
                title={philosophy.title}
                description={philosophy.body}
              />
              <ul className="mt-10 space-y-8">
                {philosophy.pillars.map((item) => (
                  <li key={item.id}>
                    <h3 className="font-display text-lg font-light text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <EditorialMedia
              spec="about-philosophy-plane"
              label="Philosophy editorial imagery — calm curated still life, asset pending"
              aspect="4/5"
              className="laptop:sticky laptop:top-28"
            />
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-pink-mist" aria-labelledby="about-values-heading">
        <Container width="content">
          <SectionHeading
            id="about-values-heading"
            eyebrow={values.eyebrow}
            title={values.title}
          />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-2 laptop:grid-cols-4">
            {values.items.map((item) => (
              <li key={item.id}>
                <h3 className="font-display text-lg font-light text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-auth-promise-heading">
        <Container width="content">
          <div className="grid items-center gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="about-auth-promise-heading"
                eyebrow={authenticityPromise.eyebrow}
                title={authenticityPromise.title}
                description={authenticityPromise.body}
              />
              <Button asChild className="mt-8">
                <Link href={authenticityPromise.ctaHref}>{authenticityPromise.ctaLabel}</Link>
              </Button>
            </div>
            <EditorialMedia
              spec="about-authenticity-plane"
              label="Authenticity promise editorial — asset pending"
              aspect="4/5"
            />
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-surface-soft" aria-labelledby="about-approach-heading">
        <Container width="content">
          <SectionHeading
            id="about-approach-heading"
            eyebrow={koreanApproach.eyebrow}
            title={koreanApproach.title}
            description={koreanApproach.body}
          />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
            {koreanApproach.points.map((point) => (
              <li key={point.id}>
                <h3 className="font-display text-lg font-light text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-science-heading">
        <Container width="content">
          <EditorialMedia
            spec="about-science-plane"
            label="Scientific backing atmosphere — soft ingredient study, asset pending"
            aspect="16/9"
            className="mb-10 tablet:mb-12"
          />
          <SectionHeading
            id="about-science-heading"
            eyebrow={scientificBacking.eyebrow}
            title={scientificBacking.title}
            description={scientificBacking.lead}
          />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
            {scientificBacking.points.map((point) => (
              <li key={point.id} className="border-t border-border-subtle pt-6">
                <h3 className="font-display text-lg font-light text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="default" className="bg-surface-soft" aria-labelledby="about-timeline-heading">
        <Container width="narrow" className="laptop:max-w-content">
          <SectionHeading
            id="about-timeline-heading"
            eyebrow={timeline.eyebrow}
            title={timeline.title}
            description={timeline.description}
          />
          <ol className="mt-12 space-y-0">
            {timeline.events.map((event) => (
              <li
                key={event.id}
                className={cn(
                  "relative grid gap-2 border-l border-border-subtle pl-8 pb-10 last:pb-0",
                  "before:absolute before:left-[-5px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-power-pink",
                )}
              >
                <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
                  {event.year}
                </p>
                <h3 className="font-display text-xl font-light text-foreground">{event.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">{event.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-team-heading">
        <Container width="narrow">
          <SectionHeading
            id="about-team-heading"
            eyebrow={team.eyebrow}
            title={team.title}
            description={team.description}
          />
          <p className="mt-8 text-center text-sm font-light leading-relaxed text-foreground-secondary">
            Founder and team portraits will appear here once photography is complete —
            quiet, natural, and true to the brand.
          </p>
        </Container>
      </Section>

      <Section spacing="default" className="bg-page">
        <Container width="content">
          <CtaBlock
            title={closing.title}
            description={closing.description}
            primaryLabel={closing.primaryLabel}
            primaryHref={closing.primaryHref}
            secondaryLabel={closing.secondaryLabel}
            secondaryHref={closing.secondaryHref}
          />
          <p className="mt-6 text-center text-caption text-foreground-muted">
            Prefer authenticity details?{" "}
            <Link
              href="/pages/authenticity"
              className="font-medium text-foreground underline-offset-4 hover:text-power-pink hover:underline"
            >
              Read our authenticity promise
            </Link>
          </p>
        </Container>
      </Section>
    </div>
  );
}
