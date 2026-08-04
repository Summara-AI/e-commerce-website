import { PolicyLayout } from "@/components/common/PolicyLayout";
import { SHIPPING_POLICY } from "@/content/policies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Shipping Policy",
  description: SHIPPING_POLICY.description,
  path: "/pages/shipping",
});

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      document={SHIPPING_POLICY}
      breadcrumbLabel="Shipping"
      path="/pages/shipping"
    />
  );
}
