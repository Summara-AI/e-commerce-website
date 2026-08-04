import { createPageMetadata } from "@/lib/seo";
import { ERROR_500_PAGE } from "@/content/utility-pages";

export const metadata = createPageMetadata({
  title: ERROR_500_PAGE.title,
  description: ERROR_500_PAGE.description,
  path: "/pages/server-error",
  noIndex: true,
});

export default function ServerErrorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
