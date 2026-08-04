"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PDP_PRODUCT_FAQS } from "@/content/pdp-trust";
import { cn } from "@/lib/utils";

type ProductFaqProps = {
  className?: string;
};

/**
 * Purchase-hesitation FAQs — verified brand / support / policy pointers only.
 */
export function ProductFaq({ className }: ProductFaqProps) {
  return (
    <Section
      spacing="default"
      aria-labelledby="pdp-faq-heading"
      className={cn("bg-surface-soft", className)}
      data-shopify-section="product-faq"
    >
      <Container width="narrow" className="laptop:max-w-content">
        <SectionHeading
          id="pdp-faq-heading"
          eyebrow="FAQ"
          title="Questions before you buy"
          description="Answers grounded in Korean Skin Lab’s published brand and support information."
        />

        <Accordion type="multiple" className="mt-10 tablet:mt-12" defaultValue={["authentic"]}>
          {PDP_PRODUCT_FAQS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
