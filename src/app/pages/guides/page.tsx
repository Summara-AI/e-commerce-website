import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Guides",
  description:
    "Educational guides from SCYN — authenticity, real vs fake, and calm routine building.",
  path: "/pages/guides",
});

const GUIDES = [
  {
    id: "auth",
    title: "Authenticity promise",
    description: "How we source, verify, and protect your trust.",
    href: "/pages/authenticity",
  },
  {
    id: "rvf",
    title: "Real vs fake guide",
    description: "Spot counterfeit K-beauty before it reaches your skin.",
    href: "/pages/real-vs-fake",
  },
  {
    id: "routine",
    title: "Routine builder",
    description: "Build a morning or night path from our catalogue.",
    href: "/pages/routine-builder",
  },
  {
    id: "story",
    title: "Our story",
    description: "Why SCYN exists — and what we stand for.",
    href: "/pages/our-story",
  },
] as const;

export default function GuidesPage() {
  return (
    <Section spacing="default" className="bg-page" aria-labelledby="guides-heading">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Guides", path: "/pages/guides" }])}
      />
      <Container width="content">
        <Breadcrumb items={[{ label: "Guides" }]} className="mb-8" />
        <SectionHeading
          id="guides-heading"
          as="h1"
          eyebrow="Education"
          title="Guides"
          description="Calm, useful reading to shop authentic Korean skincare with clarity."
        />
        <ul className="mt-12 grid gap-6 tablet:grid-cols-2">
          {GUIDES.map((guide) => (
            <li key={guide.id}>
              <Link
                href={guide.href}
                className="block rounded-card border border-border-subtle bg-canvas p-6 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-default hover:shadow-elev1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus motion-reduce:transform-none"
              >
                <h2 className="font-display text-xl font-light text-foreground">{guide.title}</h2>
                <p className="mt-2 text-sm text-foreground-secondary">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
