import { CartPageView } from "@/components/cart/CartPageView";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: CART_PAGE_COPY.metaTitle,
  description: CART_PAGE_COPY.metaDescription,
  path: "/cart",
  noIndex: true,
});

/**
 * Full Cart Page — review, adjust, and checkout with confidence.
 * Checkout / account flows remain out of scope.
 */
export default function CartPage() {
  return <CartPageView />;
}
