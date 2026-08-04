import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaBlockProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function CtaBlock({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CtaBlockProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-subtle bg-blush px-6 py-12 text-center tablet:px-12 tablet:py-16",
        className,
      )}
    >
      <h2 className="font-display text-h2 font-light italic tracking-[-0.01em] text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-lg font-sans text-sm font-light leading-[1.7] text-foreground-secondary tablet:mt-6 tablet:text-base">
          {description}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 tablet:mt-9 tablet:flex-row tablet:gap-4">
        <Button asChild>
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button asChild variant="pearl">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
