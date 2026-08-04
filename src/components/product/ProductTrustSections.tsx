import { ProductCustomerGallery } from "@/components/product/ProductCustomerGallery";
import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductPurchaseConfidence } from "@/components/product/ProductPurchaseConfidence";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductShippingReturns } from "@/components/product/ProductShippingReturns";
import type { ProductPageData } from "@/lib/products";

type ProductTrustSectionsProps = {
  product: ProductPageData;
};

/**
 * PDP lower trust stack — reviews, UGC shell, FAQ, shipping, confidence.
 * Related / recommendations intentionally omitted.
 */
export function ProductTrustSections({ product }: ProductTrustSectionsProps) {
  return (
    <div data-shopify-section-group="product-trust">
      <ProductReviews productHandle={product.handle} productTitle={product.title} />
      <ProductCustomerGallery />
      <ProductFaq />
      <ProductShippingReturns />
      <ProductPurchaseConfidence />
    </div>
  );
}
