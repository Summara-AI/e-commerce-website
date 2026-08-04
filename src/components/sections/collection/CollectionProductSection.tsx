import { Suspense } from "react";
import { CollectionBrowse } from "@/components/commerce/filters/CollectionBrowse";
import {
  EmptyComingSoon,
  EmptyProducts,
  EmptyUnavailable,
} from "@/components/common/EmptyState";
import { FilterSidebarSkeleton } from "@/components/common/Loading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CollectionPageData } from "@/lib/collections";
import { cn } from "@/lib/utils";

type CollectionProductSectionProps = {
  data: CollectionPageData;
  className?: string;
};

/**
 * Collection product area — browse with filters/sort/pagination when active.
 */
export function CollectionProductSection({
  data,
  className,
}: CollectionProductSectionProps) {
  const { status, products, bundles } = data;
  const canBrowse =
    status === "active" && (products.length > 0 || Boolean(bundles?.length));

  return (
    <Section
      spacing="default"
      aria-labelledby="collection-products-heading"
      className={cn("bg-page", className)}
    >
      <Container width="content">
        <div className="mb-8 flex items-end justify-between gap-4 tablet:mb-10">
          <h2
            id="collection-products-heading"
            className="font-display text-h2 font-light tracking-[-0.01em] text-foreground"
          >
            {status === "coming-soon"
              ? "Products"
              : data.handle === "bundles"
                ? "Browse kits"
                : "Browse products"}
          </h2>
        </div>

        {status === "coming-soon" ? (
          <EmptyComingSoon collectionTitle={data.collection.title} />
        ) : null}

        {status === "unavailable" ? (
          <EmptyUnavailable collectionTitle={data.collection.title} />
        ) : null}

        {status === "empty" ? <EmptyProducts /> : null}

        {canBrowse ? (
          <Suspense fallback={<FilterSidebarSkeleton />}>
            <CollectionBrowse products={products} bundles={bundles} />
          </Suspense>
        ) : null}
      </Container>
    </Section>
  );
}
