import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { FEATURED_COLLECTIONS } from "@/lib/catalog";

export const metadata = createPageMetadata({
  title: "Skin Concerns",
  description:
    "Explore Korean Skin Lab collections by skin concern — dryness, sensitivity, sun protection, and more.",
  path: "/pages/skin-concerns",
});

export default function SkinConcernsPage() {
  const concerns = FEATURED_COLLECTIONS;

  return (
    <Section spacing="default" className="bg-page" aria-labelledby="concerns-heading">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Skin Concerns", path: "/pages/skin-concerns" },
        ])}
      />
      <Container width="content">
        <Breadcrumb items={[{ label: "Skin Concerns" }]} className="mb-8" />
        <SectionHeading
          id="concerns-heading"
          as="h1"
          eyebrow="Shop by concern"
          title="Skin concerns"
          description="Choose a calm path — each collection is curated with authentic Korean skincare."
        />
        <ul className="mt-12 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {concerns.map((collection) => (
            <li key={collection.id}>
              <Link
                href={collection.href}
                className="block rounded-card border border-border-subtle bg-canvas p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-default hover:shadow-elev1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus motion-reduce:transform-none"
              >
                <h2 className="font-display text-xl font-light text-foreground">
                  {collection.title}
                </h2>
                <p className="mt-2 text-sm text-foreground-secondary">{collection.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-foreground-secondary">
          Prefer a guided path?{" "}
          <Link
            href="/pages/routine-builder"
            className="font-medium text-power-pink underline-offset-4 hover:underline"
          >
            Build a routine
          </Link>
        </p>
      </Container>
    </Section>
  );
}
