import {
  CollectionProductSection,
} from "@/components/sections/collection";
import {
  ShopFeaturedCategories,
  ShopLandingHero,
} from "@/components/sections/shop";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { getAllProductsPageService } from "@/services/collections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Shop",
  description:
    "Browse authentic Korean skincare by category, skin concern, and curated collection — verified products for Pakistan.",
  path: "/collections/all",
});

/**
 * Shop all — full catalogue grid with filters and sort, matching category pages.
 */
export default function ShopLandingPage() {
  const allProducts = getAllProductsPageService();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Shop", path: "/collections/all" }])}
      />
      <ShopLandingHero />
      <ShopFeaturedCategories />
      <CollectionProductSection data={allProducts} showHeading={false} />
    </>
  );
}
