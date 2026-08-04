import type { Metadata } from "next";
import Link from "next/link";
import { EmptyNotFound } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Product not found",
  description: "That product may have moved. Continue shopping authentic K-beauty.",
  path: "/products",
  noIndex: true,
});

export default function ProductNotFound() {
  return (
    <Section spacing="lux" className="bg-page">
      <Container width="narrow">
        <EmptyNotFound
          titleAs="h1"
          title="Product not found"
          description="That product may have moved. Continue from best sellers or Shop."
          actionLabel="Shop best sellers"
          actionHref="/collections/best-sellers"
        />
        <div className="mt-4 flex justify-center">
          <Button asChild variant="text">
            <Link href="/collections/all">Back to Shop</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
