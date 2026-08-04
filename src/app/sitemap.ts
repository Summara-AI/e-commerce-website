import type { MetadataRoute } from "next";
import { SITE_SETTINGS } from "@/data/settings";
import { getProductHandlesService } from "@/services/products";
import { getCollectionHandlesService } from "@/services/collections";

/** Indexable marketing & catalog URLs only — no cart/search/wishlist/account */
const STATIC_PATHS = [
  "/",
  "/collections/all",
  "/pages/our-story",
  "/pages/authenticity",
  "/pages/real-vs-fake",
  "/pages/routine-builder",
  "/pages/faq",
  "/pages/contact",
  "/pages/shipping",
  "/pages/returns",
  "/pages/guides",
  "/pages/skin-concerns",
  "/pages/ingredients",
  "/policies/privacy-policy",
  "/policies/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE_SETTINGS.url.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/collections") || path.startsWith("/products")
          ? 0.8
          : 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = getProductHandlesService().map(
    (handle) => ({
      url: `${base}/products/${handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const collectionEntries: MetadataRoute.Sitemap =
    getCollectionHandlesService().map((handle) => ({
      url: `${base}/collections/${handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
