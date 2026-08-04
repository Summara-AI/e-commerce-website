import type { Metadata } from "next";
import { ProfilePageView } from "@/components/account/ProfilePageView";

export const metadata: Metadata = {
  title: "Profile",
  description: "Update your Korean Skin Lab profile and communication preferences.",
};

export default function AccountProfilePage() {
  return <ProfilePageView />;
}
