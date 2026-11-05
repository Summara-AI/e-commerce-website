import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CtaBlock } from "@/components/common/CtaBlock";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Logo } from "@/components/header/Logo";
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
    koreanApproach,
    scientificBacking,
    timeline,
    closing,
  } = ABOUT_PAGE;

  return (
    <div data-shopify-section="about-page">
      <Section spacing="default" className="bg-page" aria-labelledby="about-heading">
        <Container width="content">
          <div className="flex justify-center">
            <Breadcrumb items={[{ label: "Our Story" }]} className="mb-8" />
          </div>
          <div className="flex max-w-3xl mx-auto flex-col items-center text-center">
            <p className="font-sans text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
              {ABOUT_PAGE.eyebrow}
            </p>
            <h1 id="about-heading" className="sr-only">
              {ABOUT_PAGE.title} — Skincare You Need
            </h1>
            <Logo variant="complete" priority className="mt-6 justify-center" />
            <p className="mt-6 max-w-[36rem] text-sm font-light leading-[1.75] text-foreground-secondary tablet:mt-7 tablet:text-base">
              {ABOUT_PAGE.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="about-story-heading">
        <Container width="content">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              id="about-story-heading"
              align="center"
              eyebrow={brandStory.eyebrow}
              title={brandStory.title}
              className="mx-auto"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-secondary">
              {brandStory.paragraphs.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </div>
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
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              id="about-philosophy-heading"
              align="center"
              eyebrow={philosophy.eyebrow}
              title={philosophy.title}
              description={philosophy.body}
              className="mx-auto"
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
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              id="about-auth-promise-heading"
              align="center"
              eyebrow={authenticityPromise.eyebrow}
              title={authenticityPromise.title}
              description={authenticityPromise.body}
              className="mx-auto"
            />
            <Button asChild className="mt-8">
              <Link href={authenticityPromise.ctaHref}>{authenticityPromise.ctaLabel}</Link>
            </Button>
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
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading
              id="about-science-heading"
              align="center"
              eyebrow={scientificBacking.eyebrow}
              title={scientificBacking.title}
              description={scientificBacking.lead}
              className="mx-auto"
            />
            <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
              {scientificBacking.points.map((point) => (
                <li key={point.id} className="border-t border-border-subtle pt-6">
                  <h3 className="font-display text-lg font-light text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
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
