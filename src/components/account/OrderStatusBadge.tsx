import type { OrderStatus } from "@/lib/account-types";
import { ORDER_STATUS_LABEL, ORDER_STATUS_TONE } from "@/lib/account-types";
import { cn } from "@/lib/utils";

const TONE_CLASS = {
  pending: "bg-pearl text-foreground-secondary",
  processing: "bg-pink-mist text-power-pink",
  packed: "bg-blush text-foreground",
  shipped: "bg-[rgba(228,19,111,0.12)] text-power-pink",
  out_for_delivery: "bg-soft-pink/70 text-soft-pink-text",
  delivered: "bg-emerald-50 text-emerald-800",
  cancelled: "bg-soft-pink/60 text-destructive",
  refunded: "bg-pearl text-foreground-muted",
} as const;

type OrderStatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

/**
 * Premium order status pill — soft background, calm color language.
 */
export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const tone = ORDER_STATUS_TONE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em]",
        "opacity-100 transition-opacity duration-320",
        TONE_CLASS[tone],
        className,
      )}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}
