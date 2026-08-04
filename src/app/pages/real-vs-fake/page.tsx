import { RealVsFakePageView } from "@/components/pages/RealVsFakePageView";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { REAL_VS_FAKE_PAGE } from "@/content/real-vs-fake";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Real vs Fake Guide",
  description: REAL_VS_FAKE_PAGE.description,
  path: "/pages/real-vs-fake",
});

export default function RealVsFakePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Real vs Fake", path: "/pages/real-vs-fake" },
        ])}
      />
      <RealVsFakePageView />
    </>
  );
}
