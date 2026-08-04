import { PolicyLayout } from "@/components/common/PolicyLayout";
import { RETURNS_POLICY } from "@/content/policies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Returns & Refund Policy",
  description: RETURNS_POLICY.description,
  path: "/pages/returns",
});

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout
      document={RETURNS_POLICY}
      breadcrumbLabel="Returns"
      path="/pages/returns"
    />
  );
}
