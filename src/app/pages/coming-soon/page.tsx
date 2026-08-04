import { ComingSoonPageView } from "@/components/pages/ComingSoonPageView";
import { COMING_SOON_PAGE } from "@/content/utility-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Coming Soon",
  description: COMING_SOON_PAGE.description,
  path: "/pages/coming-soon",
  noIndex: true,
});

export default function ComingSoonPage() {
  return <ComingSoonPageView />;
}
