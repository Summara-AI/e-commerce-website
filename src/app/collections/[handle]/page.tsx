import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CollectionHero,
  CollectionInfo,
  CollectionNav,
  CollectionProductSection,
} from "@/components/sections/collection";
import {
  JsonLd,
  breadcrumbJsonLd,
  collectionJsonLd,
} from "@/components/seo";
import {
  getCollectionHandlesService,
  getCollectionPageService,
} from "@/services/collections";
import { createPageMetadata } from "@/lib/seo";

type CollectionPageProps = {
  params: { handle: string };
};

export function generateStaticParams() {
  return getCollectionHandlesService().map((handle) => ({ handle }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const data = getCollectionPageService(params.handle);
  if (!data) {
    return createPageMetadata({
      title: "Collection",
      description: "Browse curated Korean skincare collections.",
      path: `/collections/${params.handle}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: data.collection.title,
    description: data.collection.description,
    path: data.collection.href,
    image: data.collection.imageSrc,
  });
}

/**
 * Dynamic collection PLP — curated browsing with filters, sort, and pagination.
 * `/collections/all` remains the Shop landing (static route takes precedence).
 */
export default function CollectionPage({ params }: CollectionPageProps) {
  const data = getCollectionPageService(params.handle);
  if (!data) notFound();

  return (
    <>
      <JsonLd data={collectionJsonLd(data)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Shop", path: "/collections/all" },
          { name: data.collection.title, path: data.collection.href },
        ])}
      />
      <CollectionHero data={data} />
      <CollectionNav
        currentHandle={data.handle}
        switcherHandles={data.switcherHandles}
      />
      <CollectionInfo data={data} />
      <CollectionProductSection data={data} />
    </>
  );
}
