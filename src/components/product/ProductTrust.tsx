import { ShieldCheck, Lock, Headphones } from "lucide-react";
import { PDP_TRUST } from "@/content/pdp";
import { cn } from "@/lib/utils";

const ICONS = {
  authentic: ShieldCheck,
  secure: Lock,
  support: Headphones,
} as const;

type ProductTrustProps = {
  className?: string;
};

/**
 * Verified trust strip for PDP ATF — no invented guarantees.
 */
export function ProductTrust({ className }: ProductTrustProps) {
  return (
    <ul
      className={cn(
        "grid gap-4 border-t border-border-subtle pt-6 tablet:grid-cols-3 tablet:gap-6",
        className,
      )}
      aria-label="Shopping confidence"
      data-shopify-block="product-trust"
    >
      {PDP_TRUST.map((item) => {
        const Icon = ICONS[item.id as keyof typeof ICONS] ?? ShieldCheck;
        return (
          <li key={item.id} className="flex gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-badge bg-surface-soft text-power-pink">
              <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-0.5 text-caption leading-relaxed text-foreground-secondary">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
