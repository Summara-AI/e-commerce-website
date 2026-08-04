"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PDP_PURCHASE } from "@/content/pdp";
import type { ProductEducation } from "@/lib/product-education";
import { cn } from "@/lib/utils";

type ProductDetailsAccordionProps = {
  education: ProductEducation;
  className?: string;
};

/**
 * Expandable PDP details — Shopify metafield / rich-text ready.
 */
export function ProductDetailsAccordion({
  education,
  className,
}: ProductDetailsAccordionProps) {
  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-details-heading"
      className={cn("bg-page", className)}
      data-shopify-section="product-details-accordion"
    >
      <Container width="narrow" className="laptop:max-w-content">
        <SectionHeading
          id="pdp-details-heading"
          eyebrow="Details"
          title="More information"
          description="Expand for directions, shipping, and support."
        />

        <Accordion type="multiple" className="mt-10 tablet:mt-12" defaultValue={[]}>
          {education.accordion.map((block) => (
            <AccordionItem key={block.id} value={block.id}>
              <AccordionTrigger>{block.title}</AccordionTrigger>
              <AccordionContent>
                <p>{block.content}</p>
                {block.id === "shipping" ? (
                  <p className="mt-3">
                    <Link
                      href={PDP_PURCHASE.shippingHref}
                      className="font-medium text-power-pink underline-offset-4 hover:underline"
                    >
                      {PDP_PURCHASE.shippingCta}
                    </Link>
                  </p>
                ) : null}
                {block.id === "returns" ? (
                  <p className="mt-3">
                    <Link
                      href={PDP_PURCHASE.returnsHref}
                      className="font-medium text-power-pink underline-offset-4 hover:underline"
                    >
                      {PDP_PURCHASE.returnsCta}
                    </Link>
                  </p>
                ) : null}
                {block.items?.length ? (
                  <ul className="mt-4 space-y-4">
                    {block.items.map((item) => (
                      <li key={item.title}>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-foreground-secondary">{item.body}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
