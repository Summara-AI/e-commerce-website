import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

const accountMetadata = createPageMetadata({
  title: "Account",
  description:
    "Your SCYN account — orders, wishlist, addresses, and profile.",
  path: "/account",
  noIndex: true,
});

export const metadata: Metadata = {
  ...accountMetadata,
  title: {
    default: "Account | SCYN",
    template: "%s | SCYN",
  },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
