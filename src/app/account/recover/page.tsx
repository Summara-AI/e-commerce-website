import { RecoverPageView } from "@/components/auth/RecoverPageView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Forgot Password",
  description:
    "Reset your SCYN password securely — we’ll email a recovery link to your account.",
  path: "/account/recover",
  noIndex: true,
});

/**
 * Premium password recovery — Shopify customerRecover.
 */
export default function RecoverPage() {
  return <RecoverPageView />;
}
