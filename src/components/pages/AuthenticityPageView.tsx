import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CtaBlock } from "@/components/common/CtaBlock";
import { EditorialMedia } from "@/components/common/EditorialMedia";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AUTHENTICITY_PAGE } from "@/content/authenticity";

export function AuthenticityPageView() {
  const { pillars, science, closing } = AUTHENTICITY_PAGE;

  return (
    <div data-shopify-section="authenticity-page">
      <Section spacing="default" className="bg-page" aria-labelledby="auth-heading">
        <Container width="content">
          <Breadcrumb
            items={[
              { label: "Our Story", href: "/pages/our-story" },
              { label: "Authenticity" },
            ]}
            className="mb-8"
          />
          <SectionHeading
            id="auth-heading"
            as="h1"
            eyebrow={AUTHENTICITY_PAGE.eyebrow}
            title={AUTHENTICITY_PAGE.title}
            description={AUTHENTICITY_PAGE.description}
          />
          <p className="mt-6 max-w-2xl font-display text-xl font-light italic text-foreground">
            {AUTHENTICITY_PAGE.heroLead}
          </p>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-blush" aria-labelledby="auth-pillars-heading">
        <Container width="content">
          <div className="grid items-start gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="auth-pillars-heading"
                eyebrow="How we protect you"
                title="Verification at every calm step"
              />
              <ul className="mt-10 space-y-8">
                {pillars.map((pillar) => (
                  <li key={pillar.id} className="border-t border-border-subtle pt-6">
                    <h3 className="font-display text-lg font-light text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {pillar.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <EditorialMedia
              spec="authenticity-editorial"
              label="Authenticity editorial — sealed product still life, asset pending"
              aspect="4/5"
              className="laptop:sticky laptop:top-28"
            />
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-page" aria-labelledby="auth-science-heading">
        <Container width="content">
          <SectionHeading
            id="auth-science-heading"
            eyebrow={science.eyebrow}
            title={science.title}
            description={science.lead}
          />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
            {science.points.map((point) => (
              <li key={point.id}>
                <h3 className="font-display text-lg font-light text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
          <Button asChild variant="text" className="mt-8 px-0">
            <Link href="/pages/real-vs-fake">Learn how to spot fakes</Link>
          </Button>
        </Container>
      </Section>

      <Section spacing="default" className="bg-pearl">
        <Container width="content">
          <CtaBlock
            title={closing.title}
            description={closing.description}
            primaryLabel={closing.primaryLabel}
            primaryHref={closing.primaryHref}
            secondaryLabel={closing.secondaryLabel}
            secondaryHref={closing.secondaryHref}
          />
        </Container>
      </Section>
    </div>
  );
}
