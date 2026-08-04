import {
  ShopFeaturedCategories,
  ShopFeaturedCollections,
  ShopLandingHero,
  ShopProductDiscovery,
} from "@/components/sections/shop";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Shop",
  description:
    "Browse authentic Korean skincare by category, skin concern, and curated collection — verified products for Pakistan.",
  path: "/collections/all",
});

/**
 * Shop landing — curated catalogue discovery.
 * Product grid, filters, and sorting are intentionally deferred.
 */
export default function ShopLandingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Shop", path: "/collections/all" }])}
      />
      <ShopLandingHero />
      <ShopFeaturedCategories />
      <ShopFeaturedCollections />
      <ShopProductDiscovery />
    </>
  );
}
