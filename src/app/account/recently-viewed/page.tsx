import type { Metadata } from "next";
import { RecentlyViewedPageView } from "@/components/account/RecentlyViewedPageView";

export const metadata: Metadata = {
  title: "Recently viewed",
  description: "Products you’ve recently explored at SCYN.",
};

export default function AccountRecentlyViewedPage() {
  return <RecentlyViewedPageView />;
}
