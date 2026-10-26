import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/pages/ContactForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/content/contact";
import { mailtoHref } from "@/lib/email";

/**
 * Contact page — form + verified business information.
 */
export function ContactPageView() {
  const { business, faqShortcut, supportCta } = CONTACT_PAGE;

  return (
    <Section
      spacing="default"
      className="bg-page"
      aria-labelledby="contact-heading"
      data-shopify-section="contact-page"
    >
      <Container width="content">
        <Breadcrumb items={[{ label: "Contact" }]} className="mb-8" />
        <SectionHeading
          id="contact-heading"
          as="h1"
          eyebrow={CONTACT_PAGE.eyebrow}
          title={CONTACT_PAGE.title}
          description={CONTACT_PAGE.description}
        />

        <div className="mt-12 grid gap-12 laptop:mt-14 laptop:grid-cols-12 laptop:gap-16">
          <div className="laptop:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-10 laptop:col-span-5" aria-label="Business information">
            <div>
              <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
                {business.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-xl font-light text-foreground">
                {business.title}
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-medium text-foreground">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={mailtoHref(business.email)}
                      className="text-foreground-secondary transition-colors hover:text-power-pink"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={business.phoneHref}
                      className="text-foreground-secondary transition-colors hover:text-power-pink"
                    >
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Location</dt>
                  <dd className="mt-1 text-foreground-secondary">{business.address}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Business hours</dt>
                  <dd className="mt-1 text-foreground-secondary">{business.hours}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-card bg-pearl px-5 py-6">
              <h3 className="font-display text-lg font-light text-foreground">
                {supportCta.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">{supportCta.description}</p>
              <Button asChild className="mt-4">
                <a href={supportCta.href} target="_blank" rel="noopener noreferrer">
                  {supportCta.label}
                </a>
              </Button>
            </div>

            <div>
              <h3 className="font-display text-lg font-light text-foreground">
                {faqShortcut.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">{faqShortcut.description}</p>
              <Button asChild variant="text" className="mt-3 px-0">
                <Link href={faqShortcut.href}>{faqShortcut.label}</Link>
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
