import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Account",
  description:
    "Your Korean Skin Lab account — orders, wishlist, addresses, and profile.",
  path: "/account",
  noIndex: true,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
