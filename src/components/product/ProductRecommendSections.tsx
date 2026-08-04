import dynamic from "next/dynamic";
import {
  getCompleteYourRoutine,
  getFrequentlyBoughtTogether,
  getMobileCrossSellProducts,
  getRecommendedBundles,
  getRelatedProducts,
  getYouMayAlsoLike,
} from "@/lib/product-recommendations";
import type { ProductPageData } from "@/lib/products";

const ProductRelated = dynamic(() =>
  import("@/components/product/ProductRelated").then((m) => m.ProductRelated),
);
const ProductFrequentlyBoughtTogether = dynamic(() =>
  import("@/components/product/ProductFrequentlyBoughtTogether").then(
    (m) => m.ProductFrequentlyBoughtTogether,
  ),
);
const ProductRecommendedBundles = dynamic(() =>
  import("@/components/product/ProductRecommendedBundles").then(
    (m) => m.ProductRecommendedBundles,
  ),
);
const ProductRecentlyViewed = dynamic(() =>
  import("@/components/product/ProductRecentlyViewed").then(
    (m) => m.ProductRecentlyViewed,
  ),
);
const ProductYouMayAlsoLike = dynamic(() =>
  import("@/components/product/ProductYouMayAlsoLike").then(
    (m) => m.ProductYouMayAlsoLike,
  ),
);
const ProductCompleteRoutine = dynamic(() =>
  import("@/components/product/ProductCompleteRoutine").then(
    (m) => m.ProductCompleteRoutine,
  ),
);
const ProductMobileCrossSell = dynamic(
  () =>
    import("@/components/product/ProductMobileCrossSell").then(
      (m) => m.ProductMobileCrossSell,
    ),
  { ssr: false },
);

type ProductRecommendSectionsProps = {
  product: ProductPageData;
};

/**
 * Closing PDP discovery — code-split so Embla/recommendation JS stays off the critical path.
 */
export function ProductRecommendSections({ product }: ProductRecommendSectionsProps) {
  const related = getRelatedProducts(product.handle, 4);
  const fbt = getFrequentlyBoughtTogether(product.handle);
  const bundles = getRecommendedBundles(product.handle);
  const ymal = getYouMayAlsoLike(product.handle)[0];
  const routine = getCompleteYourRoutine(product.handle);
  const mobileCross = getMobileCrossSellProducts(product.handle);

  return (
    <div data-shopify-section-group="product-recommendations">
      <ProductRelated products={related} />
      {fbt ? <ProductFrequentlyBoughtTogether fbt={fbt} /> : null}
      <ProductRecommendedBundles bundles={bundles} />
      <ProductRecentlyViewed currentHandle={product.handle} />
      {ymal ? <ProductYouMayAlsoLike group={ymal} /> : null}
      {routine ? <ProductCompleteRoutine steps={routine} /> : null}
      <ProductMobileCrossSell products={mobileCross} />
      <div
        className="pointer-events-none h-[calc(5.5rem+env(safe-area-inset-bottom))] laptop:hidden"
        aria-hidden="true"
      />
    </div>
  );
}
