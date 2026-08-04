import type { Metadata } from "next";
import { ThankYouView } from "@/components/checkout/ThankYouView";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your Korean Skin Lab order confirmation.",
  robots: { index: false, follow: false },
};

export default function CheckoutThankYouPage() {
  return <ThankYouView />;
}
