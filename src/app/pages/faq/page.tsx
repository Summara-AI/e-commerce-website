import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FaqPageView } from "@/components/pages/FaqPageView";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo";
import { FAQ_ITEMS, FAQ_PAGE } from "@/content/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: FAQ_PAGE.description,
  path: "/pages/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "FAQ", path: "/pages/faq" }])}
      />
      <Section spacing="default" className="bg-page" aria-labelledby="faq-heading">
        <Container width="narrow" className="laptop:max-w-content">
          <Breadcrumb items={[{ label: "FAQ" }]} className="mb-8" />
          <SectionHeading
            id="faq-heading"
            as="h1"
            eyebrow={FAQ_PAGE.eyebrow}
            title={FAQ_PAGE.title}
            description={FAQ_PAGE.description}
          />
          <div className="mt-10 tablet:mt-12">
            <FaqPageView />
          </div>
        </Container>
      </Section>
    </>
  );
}
