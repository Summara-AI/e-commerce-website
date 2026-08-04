import { PolicyLayout } from "@/components/common/PolicyLayout";
import { PRIVACY_POLICY } from "@/content/policies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: PRIVACY_POLICY.description,
  path: "/policies/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      document={PRIVACY_POLICY}
      breadcrumbLabel="Privacy Policy"
      path="/policies/privacy-policy"
    />
  );
}
