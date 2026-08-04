import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { Button } from "@/components/ui/button";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { cn } from "@/lib/utils";

type CartPageEmptyProps = {
  className?: string;
};

/**
 * Premium empty cart page — calm CTA hierarchy, no invented incentives.
 */
export function CartPageEmpty({ className }: CartPageEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-16 text-center tablet:py-20 desktop:py-28",
        className,
      )}
      data-shopify-section="cart-empty"
    >
      <div
        className="flex h-28 w-28 items-center justify-center rounded-card bg-blush text-power-pink tablet:h-32 tablet:w-32"
        aria-hidden="true"
        data-image-spec="cart-page-empty-illustration"
      >
        <ShoppingBag className="h-10 w-10" strokeWidth={1.25} />
      </div>
      <h1 className="mt-8 font-display text-h2 font-light text-foreground">
        {CART_PAGE_COPY.emptyTitle}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary">
        {CART_PAGE_COPY.emptyDescription}
      </p>
      <ButtonGroup className="mt-10 w-full max-w-md" stackedOnMobile>
        <Button asChild size="lg" className="w-full">
          <Link href="/collections/all">{CART_PAGE_COPY.emptyContinue}</Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="w-full">
          <Link href="/collections/best-sellers">{CART_PAGE_COPY.emptyFeatured}</Link>
        </Button>
        <Button asChild variant="text" className="w-full justify-center">
          <Link href="/collections/all">{CART_PAGE_COPY.emptyBrowse}</Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
