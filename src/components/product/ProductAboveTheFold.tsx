"use client";

import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductStickyBar } from "@/components/product/ProductStickyBar";
import { ProductTrust } from "@/components/product/ProductTrust";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getSelectedVariant, type ProductPageData } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductAboveTheFoldProps = {
  product: ProductPageData;
  className?: string;
};

function collectionHrefFor(product: ProductPageData): { label: string; href: string } | null {
  if (product.kind === "bundle") {
    return { label: "Bundles", href: "/collections/bundles" };
  }
  const map: Record<string, string> = {
    Sunscreen: "/collections/sunscreen",
    "Facial Mask": "/collections/masks",
    Moisturizer: "/collections/moisturizers",
    Toner: "/collections/toners",
    Cleanser: "/collections/cleansers",
  };
  if (!product.productType) return null;
  const href = map[product.productType];
  if (!href) return null;
  return { label: product.productType, href };
}

/**
 * PDP above-the-fold — gallery + purchase experience only.
 */
export function ProductAboveTheFold({ product, className }: ProductAboveTheFoldProps) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const purchaseRef = useRef<HTMLDivElement>(null);

  const variant = getSelectedVariant(product, variantId);
  const midCrumb = collectionHrefFor(product);

  useEffect(() => {
    const node = purchaseRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Only pin the bar once the main purchase block has scrolled ABOVE the
        // viewport — never while the primary Add to bag button is still visible.
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        setStickyVisible(scrolledPast);
      },
      { rootMargin: "0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Section
        spacing="default"
        topSpacing="compact"
        aria-labelledby="pdp-title"
        className={cn("bg-page", className)}
        data-product-handle={product.handle}
      >
        <Container width="content">
          <Breadcrumb
            items={[
              { label: "Shop", href: "/collections/all" },
              ...(midCrumb ? [midCrumb] : []),
              { label: product.title },
            ]}
            className="mb-8 tablet:mb-10"
          />

          <div className="grid gap-12 laptop:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] laptop:gap-16 desktop:gap-20">
            <div className="laptop:sticky laptop:top-[calc(var(--announcement-height)+var(--header-height-sticky)+1.5rem)] laptop:self-start">
              <ProductGallery media={product.media} productTitle={product.title} />
            </div>

            <div className="laptop:sticky laptop:top-28 laptop:self-start">
              <ProductInfo product={product} variant={variant} />
              <ProductPurchase
                product={product}
                variant={variant}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onVariantChange={setVariantId}
                purchaseAnchorRef={purchaseRef}
                className="mt-2"
              />
              <ProductTrust className="mt-8" />
            </div>
          </div>
        </Container>
      </Section>

      <ProductStickyBar
        product={product}
        variant={variant}
        quantity={quantity}
        visible={stickyVisible}
      />
    </>
  );
}
