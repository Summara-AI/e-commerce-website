"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { CartLineItem, CartLineSkeleton } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartUpsell } from "@/components/cart/CartUpsell";
import { useCart } from "@/components/cart/cart-context";
import { CART_COPY } from "@/content/cart";
import { cn } from "@/lib/utils";

/**
 * Luxury mini-cart drawer — calm hierarchy, sticky checkout, refined motion.
 */
export function CartDrawer() {
  const {
    isOpen,
    openCart,
    closeCart,
    lines,
    itemCount,
    isHydrated,
    updateQuantity,
    removeItem,
  } = useCart();

  const hasItems = lines.length > 0;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (open) openCart();
        else closeCart();
      }}
    >
      <DrawerContent
        side="right"
        className={cn(
          "w-full max-w-full border-l border-border-subtle bg-canvas",
          "tablet:w-[min(100%,27.5rem)] desktop:w-[min(100%,28.5rem)]",
          "duration-320 ease-out",
        )}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          document.getElementById("cart-drawer-title")?.focus();
        }}
      >
        <DrawerHeader className="border-b border-border-subtle bg-canvas px-6 py-6 pr-16 tablet:px-7 tablet:py-7">
          <DrawerTitle
            id="cart-drawer-title"
            tabIndex={-1}
            className="outline-none font-display text-2xl font-light italic tracking-[-0.02em]"
          >
            {CART_COPY.title}
            {isHydrated && itemCount > 0 ? (
              <span className="ml-2.5 font-sans text-sm font-medium not-italic tracking-normal text-foreground-muted">
                ({itemCount})
              </span>
            ) : null}
          </DrawerTitle>
          <DrawerDescription className="mt-2.5 max-w-[22rem] text-sm font-light leading-relaxed text-foreground-secondary">
            Review your bag when you’re ready — checkout stays calm and clear.
          </DrawerDescription>
        </DrawerHeader>

        {!isHydrated ? (
          <div
            className="cart-drawer-scroll flex-1 overflow-y-auto px-6 tablet:px-7"
            aria-busy="true"
            aria-label="Loading bag"
          >
            <CartLineSkeleton />
            <CartLineSkeleton />
          </div>
        ) : !hasItems ? (
          <CartEmpty onContinue={closeCart} />
        ) : (
          <>
            <div className="cart-drawer-scroll flex-1 overflow-y-auto overscroll-contain px-6 tablet:px-7">
              <ul className="pb-2">
                {lines.map((line) => (
                  <li key={line.id}>
                    <CartLineItem
                      line={line}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  </li>
                ))}
              </ul>
              <div className="border-t border-border-subtle pb-8 pt-7">
                <CartUpsell onNavigate={closeCart} />
              </div>
            </div>

            <DrawerFooter
              className={cn(
                "sticky bottom-0 z-[1] mt-auto border-t border-border-subtle",
                "bg-canvas/95 px-6 py-6 backdrop-blur-[6px] tablet:px-7 tablet:py-7",
                "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
              )}
            >
              <CartSummary onContinue={closeCart} />
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
