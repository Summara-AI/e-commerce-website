"use client";

import { ShoppingBag } from "lucide-react";
import { HeaderIconButton } from "@/components/header/HeaderIconButton";
import { CountBadge } from "@/components/header/CountBadge";
import { useCart } from "@/components/cart/cart-context";

type CartIndicatorProps = {
  className?: string;
};

/**
 * Opens the mini-cart drawer — Shopify cart icon count maps to line quantity.
 */
export function CartIndicator({ className }: CartIndicatorProps) {
  const { itemCount, openCart, isHydrated } = useCart();
  const count = isHydrated ? itemCount : 0;

  return (
    <HeaderIconButton
      type="button"
      onClick={openCart}
      label={count > 0 ? `Bag, ${count} items` : "Bag"}
      aria-haspopup="dialog"
      aria-expanded={undefined}
      className={className}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      <CountBadge count={count} />
    </HeaderIconButton>
  );
}
