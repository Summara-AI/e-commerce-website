import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductAboveTheFold } from "@/components/product/ProductAboveTheFold";
import { ProductEducationSections } from "@/components/product/ProductEducationSections";
import { ProductRecommendSections } from "@/components/product/ProductRecommendSections";
import { ProductTrustSections } from "@/components/product/ProductTrustSections";
import {
  JsonLd,
  breadcrumbJsonLd,
  productJsonLd,
} from "@/components/seo";
import { getProductHandlesService, getProductPageService } from "@/services/products";
import { createPageMetadata } from "@/lib/seo";

type ProductPageProps = {
  params: { handle: string };
};

export function generateStaticParams() {
  return getProductHandlesService().map((handle) => ({ handle }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductPageService(params.handle);
  if (!product) {
    return createPageMetadata({
      title: "Product",
      description: "Product details from SCYN.",
      path: `/products/${params.handle}`,
      noIndex: true,
    });
  }

  const image = product.media[0]?.src;
  return createPageMetadata({
    title: product.title,
    description: product.description,
    path: product.href,
    image,
  });
}

/**
 * Complete Product Detail Page — purchase, education, trust, recommendations.
 * Data via `@/services/products` (seed → Storefront).
 */
export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductPageService(params.handle);
  if (!product) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Shop", path: "/collections/all" },
          { name: product.title, path: product.href },
        ])}
      />
      <ProductAboveTheFold product={product} />
      <ProductEducationSections product={product} />
      <ProductTrustSections product={product} />
      <ProductRecommendSections product={product} />
    </>
  );
}
