import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import type { PolicyDocument } from "@/content/policies";
import { mailtoHref } from "@/lib/email";
import { FOOTER_CONTACT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type PolicyLayoutProps = {
  document: PolicyDocument;
  breadcrumbLabel: string;
  /** Canonical path for breadcrumb JSON-LD (e.g. /pages/shipping) */
  path: string;
  className?: string;
};

/**
 * Reusable long-form policy layout — Shipping, Returns, Privacy, Terms.
 */
export function PolicyLayout({
  document,
  breadcrumbLabel,
  path,
  className,
}: PolicyLayoutProps) {
  return (
    <Section
      spacing="default"
      className={cn("bg-page", className)}
      aria-labelledby="policy-heading"
      data-shopify-section="policy-page"
    >
      <JsonLd
        data={breadcrumbJsonLd([{ name: breadcrumbLabel, path }])}
      />
      <Container width="narrow">
        <Breadcrumb items={[{ label: breadcrumbLabel }]} className="mb-8" />

        <SectionHeading
          id="policy-heading"
          as="h1"
          eyebrow={document.eyebrow}
          title={document.title}
          description={document.description}
        />

        <p className="mt-4 text-caption text-foreground-muted">{document.lastUpdatedNote}</p>

        <div className="mt-12 space-y-10 tablet:mt-14 tablet:space-y-12">
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`policy-section-${section.id}`}
              className="scroll-mt-28"
            >
              <h2
                id={`policy-section-${section.id}`}
                className="font-display text-xl font-light tracking-[-0.01em] text-foreground tablet:text-2xl"
              >
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground-secondary">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside
          className="mt-14 rounded-card bg-pearl px-5 py-6 tablet:mt-16 tablet:px-8 tablet:py-8"
          aria-label="Policy support"
        >
          <p className="font-display text-lg font-light text-foreground">
            {document.contactPrompt}
          </p>
          <p className="mt-2 text-sm text-foreground-secondary">
            <a
              href={mailtoHref(FOOTER_CONTACT.email)}
              className="transition-colors hover:text-power-pink"
            >
              {FOOTER_CONTACT.email}
            </a>{" "}
            · {FOOTER_CONTACT.phone}
          </p>
          <div className="mt-5 flex flex-col gap-3 tablet:flex-row">
            <Button asChild>
              <Link href="/pages/contact">Contact support</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={FOOTER_CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </aside>
      </Container>
    </Section>
  );
}
