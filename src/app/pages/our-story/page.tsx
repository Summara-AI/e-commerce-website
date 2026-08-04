import { AboutPageView } from "@/components/pages/AboutPageView";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";
import { ABOUT_PAGE } from "@/content/about";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Story",
  description: ABOUT_PAGE.description,
  path: "/pages/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Our Story", path: "/pages/our-story" }])}
      />
      <AboutPageView />
    </>
  );
}
