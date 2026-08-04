import { WishlistPageView } from "@/components/account/WishlistPageView";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "My Wishlist",
  description:
    "Save products you love and come back anytime to continue your skincare journey.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return <WishlistPageView />;
}
