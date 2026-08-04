import { createPageMetadata } from "@/lib/seo";
import { NETWORK_ERROR_PAGE } from "@/content/utility-pages";

export const metadata = createPageMetadata({
  title: NETWORK_ERROR_PAGE.title,
  description: NETWORK_ERROR_PAGE.description,
  path: "/pages/network-error",
  noIndex: true,
});

export default function NetworkErrorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
