import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";

export const metadata = createPageMetadata({
  title: "Ingredients",
  description:
    "Ingredient education for authentic Korean skincare — explore concerns and routines while we expand the hub.",
  path: "/pages/ingredients",
});

export default function IngredientsPage() {
  return (
    <Section spacing="lux" className="bg-page" aria-labelledby="ingredients-heading">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ingredients", path: "/pages/ingredients" },
        ])}
      />
      <Container width="narrow">
        <Breadcrumb items={[{ label: "Ingredients" }]} className="mb-8" />
        <SectionHeading
          id="ingredients-heading"
          as="h1"
          eyebrow="Education"
          title="Ingredients hub"
          description="A fuller ingredients library is coming. Meanwhile, discover concern collections and build a calm routine with verified products."
        />
        <div className="mt-10 flex flex-col gap-3 tablet:flex-row">
          <Button asChild>
            <Link href="/collections/all">Shop all</Link>
          </Button>
          <Button asChild variant="pearl">
            <Link href="/pages/routine-builder">Routine builder</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pages/authenticity">Authenticity promise</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
