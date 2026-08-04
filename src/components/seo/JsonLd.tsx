/**
 * JSON-LD structured data helpers for Organization, WebSite, Breadcrumb, Product, Collection, FAQ.
 */

import { SITE_SETTINGS } from "@/data/settings";
import { absoluteUrl } from "@/lib/seo";
import type { ProductPageData } from "@/lib/products";
import type { CollectionPageData } from "@/lib/collections";
import type { FaqItem } from "@/content/faq";

function toJson(data: object | object[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_SETTINGS.name,
    legalName: SITE_SETTINGS.legalName,
    url: SITE_SETTINGS.url,
    email: SITE_SETTINGS.email,
    telephone: SITE_SETTINGS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_SETTINGS.address.street,
      addressLocality: SITE_SETTINGS.address.city,
      addressRegion: SITE_SETTINGS.address.region,
      addressCountry: SITE_SETTINGS.address.country,
    },
    sameAs: SITE_SETTINGS.sameAs,
    logo: absoluteUrl(SITE_SETTINGS.defaultOgImage),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_SETTINGS.name,
    url: SITE_SETTINGS.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_SETTINGS.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_SETTINGS.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    ],
  };
}

export function productJsonLd(product: ProductPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.handle,
    brand: {
      "@type": "Brand",
      name: SITE_SETTINGS.name,
    },
    image: product.media[0]?.src
      ? [product.media[0].src]
      : [absoluteUrl(SITE_SETTINGS.defaultOgImage)],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(product.href),
      priceCurrency: product.price.currencyCode,
      price: product.price.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_SETTINGS.name,
      },
    },
  };
}

export function collectionJsonLd(data: CollectionPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data.collection.title,
    description: data.collection.description,
    url: absoluteUrl(data.collection.href),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.productCount,
      itemListElement: data.products.slice(0, 24).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(product.href),
        name: product.title,
      })),
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJson(data) }}
    />
  );
}
