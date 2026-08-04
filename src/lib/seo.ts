/**
 * Shared SEO metadata helpers — Shopify Storefront / Hydrogen-ready shapes later.
 */

import type { Metadata } from "next";
import { SITE_SETTINGS } from "@/data/settings";

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  const base = SITE_SETTINGS.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean === "/" ? "" : clean}`;
}

/**
 * Full page metadata: title, description, canonical, Open Graph, Twitter, robots.
 */
export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  keywords,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? SITE_SETTINGS.defaultOgImage;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: SITE_SETTINGS.locale,
      url,
      siteName: SITE_SETTINGS.name,
      title: `${title} · ${SITE_SETTINGS.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_SETTINGS.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_SETTINGS.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
