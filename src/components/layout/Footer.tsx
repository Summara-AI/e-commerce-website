import Link from "next/link";
import { Logo } from "@/components/header/Logo";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/divider";
import {
  FOOTER_BRAND_LINKS,
  FOOTER_CONTACT,
  FOOTER_LEGAL_LINKS,
  FOOTER_SHOP_LINKS,
  FOOTER_SOCIAL,
  FOOTER_SUPPORT_LINKS,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { id: string; label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
        {title}
      </p>
      <ul className="mt-7 space-y-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="text-sm font-light text-foreground-secondary transition-colors hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ className }: { className?: string }) {
  const year = 2026;

  return (
    <footer
      className={cn(
        "mt-auto border-t border-border-subtle",
        "bg-[linear-gradient(180deg,var(--color-canvas)_0%,var(--color-blush)_100%)]",
        className,
      )}
      data-site-footer
    >
      <Container width="max" className="py-20 tablet:py-24 desktop:py-28">
        <div className="grid gap-16 laptop:grid-cols-[1.2fr_2fr] laptop:gap-24">
          <div className="max-w-sm space-y-8">
            <Logo />
            <p className="text-base font-light leading-[1.75] text-foreground-secondary">
              100% authentic Korean skincare for Pakistan — verified products,
              thoughtfully curated routines, and calm guidance you can trust.
            </p>
            <div className="space-y-2 text-sm font-light text-foreground-secondary">
              <a
                href={`mailto:${FOOTER_CONTACT.email}`}
                className="block transition-colors hover:text-power-pink"
              >
                {FOOTER_CONTACT.email}
              </a>
              <a
                href={FOOTER_CONTACT.phoneHref}
                className="block transition-colors hover:text-power-pink"
              >
                {FOOTER_CONTACT.phone}
              </a>
              <p className="pt-1">{FOOTER_CONTACT.address}</p>
              <p className="text-caption text-foreground-muted">{FOOTER_CONTACT.hours}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_SOCIAL.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-power-pink link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-12 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 desktop:gap-10">
            <FooterLinkList title="Shop" links={FOOTER_SHOP_LINKS} />
            <FooterLinkList title="Support" links={FOOTER_SUPPORT_LINKS} />
            <FooterLinkList title="Brand" links={FOOTER_BRAND_LINKS} />
            <div className="tablet:col-span-2 laptop:col-span-3 desktop:col-span-1">
              <p className="text-overline font-medium uppercase tracking-[0.16em] text-power-pink">
                Stay close
              </p>
              <div className="mt-7">
                <NewsletterForm
                  variant="footer"
                  heading=""
                  description="New arrivals and authenticity notes — calm and infrequent."
                />
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-14" />

        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="text-caption text-foreground-muted">
            © {year} Korean Skin Lab. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-caption text-foreground-muted transition-colors hover:text-power-pink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2.5" aria-label="Trust signals">
            <span className="rounded-badge border border-border-subtle bg-canvas px-2.5 py-1 text-caption font-medium uppercase tracking-[0.08em] text-foreground-muted">
              100% Authentic
            </span>
            <span className="rounded-badge border border-border-subtle bg-canvas px-2.5 py-1 text-caption font-medium uppercase tracking-[0.08em] text-foreground-muted">
              Secure checkout
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
