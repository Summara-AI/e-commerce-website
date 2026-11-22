import { Banknote, Truck } from "lucide-react";
import { CART_SHIPPING_PROGRESS_SETTINGS } from "@/content/cart-page";
import { formatPkr } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Shared delivery / payment assurance for PDP and bag.
 * Free-shipping threshold is rendered only when a verified Shopify/theme value exists.
 */
export function DeliveryAssurance({ className }: { className?: string }) {
  const { enabled, freeShippingThreshold } = CART_SHIPPING_PROGRESS_SETTINGS;
  const threshold = enabled && freeShippingThreshold ? freeShippingThreshold : null;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 text-caption font-light text-foreground-secondary",
        className,
      )}
      aria-label="Delivery and payment information"
    >
      <li className="inline-flex items-center gap-1.5">
        <Banknote className="h-3.5 w-3.5 text-power-pink" strokeWidth={1.5} aria-hidden="true" />
        Cash on Delivery available
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Truck className="h-3.5 w-3.5 text-power-pink" strokeWidth={1.5} aria-hidden="true" />
        Delivery in 2–4 working days
      </li>
      {threshold ? (
        <li className="inline-flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-power-pink" strokeWidth={1.5} aria-hidden="true" />
          Free shipping over {formatPkr(threshold).formatted}
        </li>
      ) : null}
    </ul>
  );
}
