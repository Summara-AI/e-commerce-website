import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MegaPromo } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MegaMenuPromoProps = {
  promo: MegaPromo;
  onNavigate?: () => void;
  premium?: boolean;
};

export function MegaMenuPromo({ promo, onNavigate, premium = false }: MegaMenuPromoProps) {
  return (
    <Link
      href={promo.href}
      onClick={onNavigate}
      className={cn(
        "group grid gap-4 rounded-card p-4 transition-[transform,box-shadow,background-color] duration-300",
        premium
          ? "border border-border-subtle bg-[linear-gradient(165deg,var(--color-pearl)_0%,var(--color-blush)_100%)] p-5 shadow-elev1 hover:-translate-y-0.5 hover:shadow-elev2 desktop:rounded-[1.35rem] desktop:p-6"
          : "bg-pearl hover:bg-page-subtle",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "desktop:grid-cols-[1fr] desktop:content-start",
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden bg-page-subtle",
          premium ? "rounded-[1rem]" : "rounded-sm",
        )}
        aria-hidden={Boolean(promo.image?.src) ? undefined : true}
      >
        {/* Asset pending — see NAV_IMAGE_SPECS.mega-promo-* */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/20 to-transparent p-4">
          <span className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
            {promo.eyebrow}
          </span>
        </div>
      </div>

      <div className={cn("space-y-2", premium && "space-y-2.5")}>
        <h3 className={cn("font-display text-xl font-light tracking-[-0.01em] text-foreground", premium && "text-[1.45rem]")}>
          {promo.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground-secondary">{promo.description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-power-pink transition-colors group-hover:text-ink">
          {promo.ctaLabel}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
