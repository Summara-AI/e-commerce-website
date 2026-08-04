import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TrackOrderForm } from "@/components/pages/TrackOrderForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TRACK_ORDER_PAGE } from "@/content/track-order";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Track Order",
  description: TRACK_ORDER_PAGE.description,
  path: "/pages/track-order",
  noIndex: true,
});

export default function TrackOrderPage() {
  return (
    <Section
      spacing="default"
      className="bg-page"
      aria-labelledby="track-order-heading"
      data-shopify-section="track-order-page"
    >
      <Container width="form">
        <Breadcrumb items={[{ label: "Track Order" }]} className="mb-8" />
        <SectionHeading
          id="track-order-heading"
          as="h1"
          eyebrow={TRACK_ORDER_PAGE.eyebrow}
          title={TRACK_ORDER_PAGE.title}
          description={TRACK_ORDER_PAGE.description}
        />
        <div className="mt-10 tablet:mt-12">
          <TrackOrderForm />
        </div>
      </Container>
    </Section>
  );
}
