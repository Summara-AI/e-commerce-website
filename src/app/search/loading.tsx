import { SearchResultsSkeleton } from "@/components/common/Loading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <Section spacing="default" className="bg-page" aria-busy="true" aria-label="Loading search">
      <Container width="content">
        <Skeleton className="mb-8 h-3 w-24" />
        <Skeleton className="mb-4 h-12 w-full max-w-xl rounded-input" />
        <Skeleton className="mb-10 h-8 w-40" />
        <SearchResultsSkeleton />
      </Container>
    </Section>
  );
}
