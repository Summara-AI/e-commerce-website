import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductDetailsAccordion } from "@/components/product/ProductDetailsAccordion";
import { ProductOverview } from "@/components/product/ProductOverview";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import {
  getProductEducation,
  type ProductEducation as Education,
} from "@/lib/product-education";
import type { ProductPageData } from "@/lib/products";

type ProductEducationSectionProps = {
  product: ProductPageData;
  education?: Education;
};

/**
 * Mid-page PDP education — overview through expandable details.
 * Reviews / related products intentionally excluded.
 */
export function ProductEducationSections({
  product,
  education: educationProp,
}: ProductEducationSectionProps) {
  const education = educationProp ?? getProductEducation(product);

  return (
    <div data-shopify-section-group="product-education">
      <ProductOverview education={education} productTitle={product.title} />
      <ProductBenefits education={education} />
      <ProductSpecifications education={education} />
      <ProductDetailsAccordion education={education} />
    </div>
  );
}
