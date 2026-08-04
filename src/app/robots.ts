import type { MetadataRoute } from "next";
import { SITE_SETTINGS } from "@/data/settings";

/**
 * Crawler policy — keep private commerce & thin URLs out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/account/",
          "/cart",
          "/cart/",
          "/checkout",
          "/checkout/",
          "/wishlist",
          "/wishlist/",
          "/search",
          "/search/",
          "/offline",
          "/pages/maintenance",
          "/pages/coming-soon",
          "/pages/server-error",
          "/pages/network-error",
          "/pages/forbidden",
          "/pages/track-order",
        ],
      },
    ],
    sitemap: `${SITE_SETTINGS.url}/sitemap.xml`,
    host: SITE_SETTINGS.url,
  };
}
