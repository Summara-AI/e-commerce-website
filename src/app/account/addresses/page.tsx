import type { Metadata } from "next";
import { AddressesPageView } from "@/components/account/AddressesPageView";

export const metadata: Metadata = {
  title: "Saved Addresses",
  description:
    "Manage your delivery addresses for a faster and smoother checkout experience.",
};

export default function AccountAddressesPage() {
  return <AddressesPageView />;
}
