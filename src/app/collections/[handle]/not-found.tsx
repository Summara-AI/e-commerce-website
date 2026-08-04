import type { Metadata } from "next";
import Link from "next/link";
import { EmptyNotFound } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Collection not found",
  description:
    "That collection may have moved. Continue from Shop or best sellers.",
  path: "/collections",
  noIndex: true,
});

export default function CollectionNotFound() {
  return (
    <Section spacing="lux" className="bg-page">
      <Container width="narrow">
        <EmptyNotFound
          titleAs="h1"
          title="Collection not found"
          description="That collection may have moved. Continue from Shop or best sellers."
          actionLabel="Back to Shop"
          actionHref="/collections/all"
        />
        <div className="mt-4 flex justify-center">
          <Button asChild variant="text">
            <Link href="/collections/best-sellers">View best sellers</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
