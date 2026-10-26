import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { mailtoHref } from "@/lib/email";
import { FOOTER_CONTACT } from "@/lib/site-content";
import { PDP_SHIPPING_RETURNS } from "@/content/pdp-trust";
import { cn } from "@/lib/utils";

type ProductShippingReturnsProps = {
  className?: string;
};

/**
 * Shipping, returns, support — links to policy pages; no invented estimates.
 */
export function ProductShippingReturns({ className }: ProductShippingReturnsProps) {
  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-shipping-heading"
      className={cn("bg-page", className)}
      data-shopify-section="product-shipping-returns"
    >
      <Container width="content">
        <SectionHeading
          id="pdp-shipping-heading"
          eyebrow="Delivery & care"
          title="Shipping, returns & support"
          description="Official policy pages carry the full detail — we don’t invent delivery windows here."
        />

        <ul className="mt-10 grid gap-6 tablet:mt-12 tablet:grid-cols-2">
          {PDP_SHIPPING_RETURNS.map((block) => (
            <li key={block.id}>
              <article className="flex h-full flex-col border-t border-border-subtle pt-6">
                <h3 className="font-display text-xl font-light tracking-[-0.01em] text-foreground">
                  {block.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">
                  {block.body}
                </p>
                {block.href && block.cta ? (
                  <Link
                    href={block.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                    {...(block.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {block.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-caption text-foreground-muted">
          Based in {FOOTER_CONTACT.address} ·{" "}
          <a
            href={mailtoHref(FOOTER_CONTACT.email)}
            className="transition-colors hover:text-power-pink"
          >
            {FOOTER_CONTACT.email}
          </a>{" "}
          · {FOOTER_CONTACT.phone}
        </p>
      </Container>
    </Section>
  );
}
