import { PolicyLayout } from "@/components/common/PolicyLayout";
import { TERMS_OF_SERVICE } from "@/content/policies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: TERMS_OF_SERVICE.description,
  path: "/policies/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <PolicyLayout
      document={TERMS_OF_SERVICE}
      breadcrumbLabel="Terms of Service"
      path="/policies/terms-of-service"
    />
  );
}
