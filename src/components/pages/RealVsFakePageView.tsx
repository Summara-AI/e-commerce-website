import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CtaBlock } from "@/components/common/CtaBlock";
import { EditorialMedia } from "@/components/common/EditorialMedia";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { REAL_VS_FAKE_PAGE } from "@/content/real-vs-fake";

export function RealVsFakePageView() {
  const { danger, identify, packaging, texture, qr, myths, closing } = REAL_VS_FAKE_PAGE;

  return (
    <div data-shopify-section="real-vs-fake-page">
      <Section spacing="default" className="bg-page" aria-labelledby="rvf-heading">
        <Container width="content">
          <Breadcrumb
            items={[
              { label: "Guides", href: "/pages/guides" },
              { label: "Real vs Fake" },
            ]}
            className="mb-8"
          />
          <SectionHeading
            id="rvf-heading"
            as="h1"
            eyebrow={REAL_VS_FAKE_PAGE.eyebrow}
            title={REAL_VS_FAKE_PAGE.title}
            description={REAL_VS_FAKE_PAGE.description}
          />
        </Container>
      </Section>

      <Section spacing="lux" className="bg-blush" aria-labelledby="rvf-danger-heading">
        <Container width="content">
          <SectionHeading
            id="rvf-danger-heading"
            eyebrow={danger.eyebrow}
            title={danger.title}
            description={danger.body}
          />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
            {danger.points.map((point) => (
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

      <Section spacing="default" className="bg-page" aria-labelledby="rvf-identify-heading">
        <Container width="narrow" className="laptop:max-w-content">
          <SectionHeading
            id="rvf-identify-heading"
            eyebrow={identify.eyebrow}
            title={identify.title}
          />
          <ol className="mt-10 space-y-8">
            {identify.steps.map((step, index) => (
              <li key={step.id} className="grid gap-2 border-t border-border-subtle pt-6">
                <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
                  Step {index + 1}
                </p>
                <h3 className="font-display text-xl font-light text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-pearl" aria-labelledby="rvf-packaging-heading">
        <Container width="content">
          <SectionHeading
            id="rvf-packaging-heading"
            eyebrow={packaging.eyebrow}
            title={packaging.title}
            description={packaging.description}
          />
          <div className="mt-10 grid gap-6 tablet:grid-cols-2">
            <div>
              <p className="mb-3 text-caption font-medium uppercase tracking-[0.08em] text-power-pink">
                Authentic
              </p>
              <EditorialMedia
                spec="real-vs-fake-authentic-pack"
                label="Authentic packaging reference — asset pending"
                aspect="4/5"
              />
            </div>
            <div>
              <p className="mb-3 text-caption font-medium uppercase tracking-[0.08em] text-foreground-nav">
                Suspicious
              </p>
              <EditorialMedia
                spec="real-vs-fake-fake-pack"
                label="Suspicious packaging comparison — asset pending"
                aspect="4/5"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-page" aria-labelledby="rvf-texture-heading">
        <Container width="content">
          <div className="grid items-center gap-10 laptop:grid-cols-2 laptop:gap-16">
            <div>
              <SectionHeading
                id="rvf-texture-heading"
                eyebrow={texture.eyebrow}
                title={texture.title}
                description={texture.description}
              />
            </div>
            <EditorialMedia
              spec="real-vs-fake-texture"
              label="Texture study placeholder — asset pending"
              aspect="16/9"
            />
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="bg-blush" aria-labelledby="rvf-qr-heading">
        <Container width="narrow">
          <SectionHeading id="rvf-qr-heading" eyebrow={qr.eyebrow} title={qr.title} />
          <p className="mt-6 text-base leading-relaxed text-foreground-secondary">{qr.body}</p>
        </Container>
      </Section>

      <Section spacing="lux" className="bg-page" aria-labelledby="rvf-myths-heading">
        <Container width="content">
          <SectionHeading id="rvf-myths-heading" eyebrow={myths.eyebrow} title={myths.title} />
          <ul className="mt-10 grid gap-8 tablet:grid-cols-3">
            {myths.items.map((item) => (
              <li key={item.id} className="rounded-card border border-border-subtle bg-canvas p-6">
                <h3 className="font-display text-lg font-light text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
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
