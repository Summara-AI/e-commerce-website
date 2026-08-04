import { AuthenticityPageView } from "@/components/pages/AuthenticityPageView";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { AUTHENTICITY_PAGE } from "@/content/authenticity";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Authenticity Promise",
  description: AUTHENTICITY_PAGE.description,
  path: "/pages/authenticity",
});

export default function AuthenticityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Authenticity", path: "/pages/authenticity" },
        ])}
      />
      <AuthenticityPageView />
    </>
  );
}
