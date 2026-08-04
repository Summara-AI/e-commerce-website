import { Suspense } from "react";
import { SearchResultsLayout } from "@/components/search/SearchResultsLayout";
import { SearchPageControls } from "@/components/search/SearchPageControls";
import { SearchDiscovery } from "@/components/search/SearchDiscovery";
import { SearchResultsSkeleton } from "@/components/common/Loading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { searchCatalogService } from "@/services/search";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Search",
  description:
    "Search authentic Korean skincare — products, collections, and guides.",
  path: "/search",
  noIndex: true,
});

type SearchPageProps = {
  searchParams: { q?: string };
};

function SearchResults({ query }: { query: string }) {
  if (!query) return <SearchDiscovery />;
  const results = searchCatalogService(query, 40);
  return <SearchResultsLayout query={query} results={results} />;
}

/**
 * Global search — discovery when empty; results + empty/no-result states when querying.
 */
export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() ?? "";

  return (
    <Section spacing="default" className="bg-page" aria-labelledby="search-page-heading">
      <Container width="content">
        <Breadcrumb items={[{ label: "Search" }]} className="mb-8" />
        <h1 id="search-page-heading" className="visually-hidden">
          Search
        </h1>

        <SearchPageControls query={query} />

        <div className="mt-10 tablet:mt-12">
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
