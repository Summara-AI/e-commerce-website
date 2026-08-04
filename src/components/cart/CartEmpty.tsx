"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CART_COPY } from "@/content/cart";
import { cn } from "@/lib/utils";

type CartEmptyProps = {
  onContinue: () => void;
  className?: string;
};

export function CartEmpty({ onContinue, className }: CartEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-8 py-16 text-center tablet:px-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-card border border-border-subtle",
          "bg-[linear-gradient(160deg,var(--color-blush)_0%,var(--color-pearl)_100%)] text-power-pink shadow-elev1",
        )}
        aria-hidden="true"
        data-image-spec="cart-empty-illustration"
      >
        <ShoppingBag className="h-9 w-9" strokeWidth={1.25} />
      </div>
      <h2 className="mt-8 font-display text-3xl font-light italic tracking-[-0.02em] text-foreground">
        {CART_COPY.emptyTitle}
      </h2>
      <p className="mt-4 max-w-[17rem] text-sm font-light leading-[1.75] text-foreground-secondary">
        {CART_COPY.emptyDescription}
      </p>
      <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
        <Button type="button" size="lg" className="h-[58px] w-full" onClick={onContinue}>
          {CART_COPY.continueShopping}
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full bg-canvas">
          <Link href="/collections/best-sellers" onClick={onContinue}>
            Shop best sellers
          </Link>
        </Button>
        <Link
          href="/collections/all"
          onClick={onContinue}
          className={cn(
            "mt-1 inline-flex items-center justify-center py-2",
            "font-sans text-sm font-medium text-power-pink link-underline underline-offset-[6px]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          )}
        >
          Browse collections
        </Link>
      </div>
    </div>
  );
}
