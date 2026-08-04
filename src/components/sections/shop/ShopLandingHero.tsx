import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SHOP_BREADCRUMB, SHOP_HERO } from "@/content/shop";
import { cn } from "@/lib/utils";

/**
 * Shop landing hero — curated discovery, not a dense catalogue header.
 * Shopify: section settings for title, CTAs, banner media.
 */
export function ShopLandingHero({ className }: { className?: string }) {
  return (
    <Section
      spacing="default"
      aria-labelledby="shop-hero-heading"
      className={cn("relative overflow-hidden bg-page", className)}
    >
      {/* Future banner plane — soft atmosphere until photography lands */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        data-shopify-setting="shop_hero_banner"
      >
        <div
          className={cn(
            "h-full w-full",
            "bg-[radial-gradient(ellipse_at_75%_20%,var(--color-pink-mist)_0%,transparent_50%),linear-gradient(165deg,var(--color-canvas)_0%,var(--color-blush)_55%,var(--color-pearl)_100%)]",
          )}
        />
      </div>

      <Container width="content">
        <Breadcrumb items={[...SHOP_BREADCRUMB]} className="mb-8 tablet:mb-10" />

        <div className="grid gap-10 laptop:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] laptop:items-end laptop:gap-16">
          <div>
            <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
              {SHOP_HERO.eyebrow}
            </p>
            <h1
              id="shop-hero-heading"
              className="mt-3 max-w-xl font-display text-h1 font-light italic tracking-[-0.02em] text-foreground"
            >
              {SHOP_HERO.title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground-secondary tablet:text-lg">
              {SHOP_HERO.description}
            </p>

            <ButtonGroup className="mt-8" stackedOnMobile>
              <Button asChild size="lg">
                <Link href={SHOP_HERO.primaryCta.href}>{SHOP_HERO.primaryCta.label}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={SHOP_HERO.secondaryCta.href}>{SHOP_HERO.secondaryCta.label}</Link>
              </Button>
            </ButtonGroup>
          </div>

          <div
            className={cn(
              "relative aspect-[4/5] overflow-hidden rounded-card border border-border-subtle tablet:aspect-[3/2] laptop:aspect-[4/5]",
              "bg-pearl",
              "bg-[linear-gradient(160deg,var(--color-pearl)_0%,var(--color-canvas)_40%,var(--color-pink-mist)_100%)]",
            )}
            role="img"
            aria-label="Shop landing editorial banner — photography pending"
            data-image-spec="shop-hero-banner"
          />
        </div>

        <nav
          aria-label="Popular shopping paths"
          className="mt-12 border-t border-border-subtle pt-8 tablet:mt-14"
        >
          <p className="text-caption font-medium uppercase tracking-[0.12em] text-foreground-muted">
            Start here
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-2">
            {SHOP_HERO.categoryOverview.map((item, index) => (
              <li key={item.id} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="mx-2 text-foreground-muted/50" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-power-pink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
