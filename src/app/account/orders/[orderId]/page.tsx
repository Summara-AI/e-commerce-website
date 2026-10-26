import type { Metadata } from "next";
import { OrderDetailView } from "@/components/account/OrderDetailView";

type PageProps = {
  params: { orderId: string };
};

export const metadata: Metadata = {
  title: "Order details",
  description: "Order details for your SCYN purchase.",
};

export default function AccountOrderDetailPage({ params }: PageProps) {
  return <OrderDetailView orderId={params.orderId} />;
}
