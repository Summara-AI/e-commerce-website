import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductPurchaseConfidence } from "@/components/product/ProductPurchaseConfidence";
import { ProductShippingReturns } from "@/components/product/ProductShippingReturns";
import type { ProductPageData } from "@/lib/products";

type ProductTrustSectionsProps = {
  product: ProductPageData;
};

/**
 * PDP lower trust stack — FAQ, shipping, confidence.
 * Reviews / UGC / related products intentionally omitted.
 */
export function ProductTrustSections({ product }: ProductTrustSectionsProps) {
  return (
    <div data-shopify-section-group="product-trust">
      <ProductFaq />
      <ProductShippingReturns />
      <ProductPurchaseConfidence />
    </div>
  );
}
