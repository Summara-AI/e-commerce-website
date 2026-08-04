/**
 * PDP models — Shopify Product / ProductVariant / Media mapping later.
 * Titles, prices, and short descriptions from catalog seeded by koreanskinlab.pk.
 * Do not invent claims, policies, or long-form copy here.
 */

import {
  FEATURED_BUNDLES,
  type CatalogBundle,
  type CatalogProduct,
  type Money,
  type ProductBadge,
} from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { getProductGallery } from "@/lib/product-galleries";

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
  /** Shopify selectedOptions → map later */
  optionValues: Record<string, string>;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductMediaItem = {
  id: string;
  alt: string;
  /** IMAGE SPEC — see pdp-assets */
  role: "hero" | "alt" | "detail" | "lifestyle";
  src?: string;
};

export type ProductPageData = {
  id: string;
  handle: string;
  title: string;
  href: string;
  productType?: string;
  description: string;
  badges?: ProductBadge[];
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
  variants: ProductVariant[];
  options: ProductOption[];
  media: ProductMediaItem[];
  /** Bundle inclusions when kit PDP */
  includes?: { id: string; title: string; href?: string }[];
  kind: "product" | "bundle";
  ratingPlaceholder?: boolean;
};

function mediaFor(product: CatalogProduct | CatalogBundle): ProductMediaItem[] {
  const gallery =
    product.imageGallery?.length
      ? product.imageGallery
      : getProductGallery(product.handle);
  const sources =
    gallery.length > 0
      ? [...gallery]
      : product.imageSrc
        ? [product.imageSrc]
        : [];

  if (!sources.length) {
    return [
      {
        id: `${product.handle}-media-1`,
        alt: product.imageAlt,
        role: "hero",
        src: undefined,
      },
    ];
  }

  const roles = ["hero", "alt", "detail", "lifestyle"] as const;
  return sources.map((src, i) => ({
    id: `${product.handle}-media-${i + 1}`,
    alt:
      i === 0
        ? product.imageAlt
        : `${product.title} — gallery view ${i + 1}`,
    role: roles[i] ?? "alt",
    src,
  }));
}

function productToPage(product: CatalogProduct): ProductPageData {
  const variant: ProductVariant = {
    id: `${product.id}-default`,
    title: "Default",
    availableForSale: product.availableForSale,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    optionValues: {},
  };

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    href: product.href,
    productType: product.productType,
    description: product.description,
    badges: product.badges,
    availableForSale: product.availableForSale,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    variants: [variant],
    options: [],
    media: mediaFor(product),
    kind: "product",
    ratingPlaceholder: product.ratingPlaceholder,
  };
}

function bundleToPage(bundle: CatalogBundle): ProductPageData {
  const variant: ProductVariant = {
    id: `${bundle.id}-default`,
    title: "Default",
    availableForSale: bundle.availableForSale,
    price: bundle.price,
    compareAtPrice: bundle.compareAtPrice,
    optionValues: {},
  };

  return {
    id: bundle.id,
    handle: bundle.handle,
    title: bundle.title,
    href: bundle.href,
    productType: "Bundle",
    description: bundle.description,
    badges: ["bestseller"],
    availableForSale: bundle.availableForSale,
    price: bundle.price,
    compareAtPrice: bundle.compareAtPrice,
    variants: [variant],
    options: [],
    media: mediaFor(bundle),
    includes: bundle.includes,
    kind: "bundle",
    ratingPlaceholder: true,
  };
}

const PRODUCT_PAGES: ProductPageData[] = [
  ...ALL_PRODUCTS.map(productToPage),
  ...FEATURED_BUNDLES.map(bundleToPage),
];

export function getProductPage(handle: string): ProductPageData | null {
  return PRODUCT_PAGES.find((p) => p.handle === handle) ?? null;
}

export function getAllProductHandles(): string[] {
  return PRODUCT_PAGES.map((p) => p.handle);
}

export function getSelectedVariant(
  product: ProductPageData,
  variantId?: string,
): ProductVariant {
  return (
    product.variants.find((v) => v.id === variantId) ??
    product.variants[0] ?? {
      id: "fallback",
      title: "Default",
      availableForSale: product.availableForSale,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      optionValues: {},
    }
  );
}
