import { createPageMetadata } from "@/lib/seo";
import { OFFLINE_PAGE } from "@/content/utility-pages";

export const metadata = createPageMetadata({
  title: OFFLINE_PAGE.title,
  description: OFFLINE_PAGE.description,
  path: "/offline",
  noIndex: true,
});

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
