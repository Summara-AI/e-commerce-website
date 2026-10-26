import type { Metadata } from "next";
import { OrdersPageView } from "@/components/account/OrdersPageView";

export const metadata: Metadata = {
  title: "My Orders",
  description:
    "Track every skincare purchase you've made with SCYN.",
};

export default function AccountOrdersPage() {
  return <OrdersPageView />;
}
