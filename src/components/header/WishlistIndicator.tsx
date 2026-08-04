import { Heart } from "lucide-react";
import { HeaderIconButton } from "@/components/header/HeaderIconButton";
import { CountBadge } from "@/components/header/CountBadge";

type WishlistIndicatorProps = {
  count?: number;
  className?: string;
};

export function WishlistIndicator({ count = 0, className }: WishlistIndicatorProps) {
  return (
    <HeaderIconButton
      href="/wishlist"
      label={count > 0 ? `Wishlist, ${count} items` : "Wishlist"}
      className={className}
    >
      <Heart className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      <CountBadge count={count} />
    </HeaderIconButton>
  );
}
