"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import {
  CartPageLineItem,
  CartPageLineSkeleton,
} from "@/components/cart/CartPageLineItem";
import { CartPageEmpty } from "@/components/cart/CartPageEmpty";
import { CartPageSummary } from "@/components/cart/CartPageSummary";
import type { AppliedDiscount } from "@/components/cart/DiscountCode";
import { useCart } from "@/components/cart/cart-context";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CART_PAGE_COPY } from "@/content/cart-page";

const CartRecommendations = dynamic(
  () =>
    import("@/components/cart/CartRecommendations").then(
      (m) => m.CartRecommendations,
    ),
  { loading: () => null },
);

/**
 * Full cart experience — two-column on laptop+, stacked on mobile/tablet with
 * summary after items for checkout confidence.
 */
export function CartPageView() {
  const { lines, itemCount, isHydrated, updateQuantity, removeItem } = useCart();
  const [discount, setDiscount] = useState<AppliedDiscount | null>(null);

  if (!isHydrated) {
    return (
      <>
        <Section spacing="tight" aria-busy="true" aria-label="Loading bag">
          <Container width="content">
            <Breadcrumb items={[{ label: CART_PAGE_COPY.title }]} />
            <div className="mt-8 h-10 w-48 animate-pulse rounded-badge bg-blush motion-reduce:animate-none" />
            <div className="mt-10 grid gap-10 laptop:grid-cols-[minmax(0,1fr)_22rem] desktop:grid-cols-[minmax(0,1fr)_24rem] desktop:gap-14">
              <div>
                <CartPageLineSkeleton />
                <CartPageLineSkeleton />
              </div>
              <CartPageSummary discount={null} onDiscountChange={() => undefined} />
            </div>
          </Container>
        </Section>
        <CartRecommendations />
      </>
    );
  }

  if (!lines.length) {
    return (
      <Section spacing="tight">
        <Container width="content">
          <Breadcrumb items={[{ label: CART_PAGE_COPY.title }]} />
          <CartPageEmpty />
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section
        spacing="tight"
        aria-labelledby="cart-page-heading"
        data-shopify-section="cart"
      >
        <Container width="content">
          <Breadcrumb items={[{ label: CART_PAGE_COPY.title }]} />

          <header className="mt-8 max-w-2xl">
            <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
              {CART_PAGE_COPY.eyebrow}
            </p>
            <h1
              id="cart-page-heading"
              className="mt-3 font-display text-h1 font-light tracking-[-0.01em] text-foreground"
            >
              {CART_PAGE_COPY.title}
              <span className="ml-3 font-sans text-lg font-medium text-foreground-muted">
                ({itemCount}{" "}
                {itemCount === 1
                  ? CART_PAGE_COPY.itemSingular
                  : CART_PAGE_COPY.itemPlural}
                )
              </span>
            </h1>
          </header>

          {/* Mobile/tablet: items then summary. Laptop+: two columns. */}
          <div className="mt-10 grid gap-10 laptop:mt-12 laptop:grid-cols-[minmax(0,1fr)_22rem] laptop:items-start desktop:grid-cols-[minmax(0,1fr)_24rem] desktop:gap-14">
            <div>
              <ul className="divide-y-0">
                {lines.map((line, index) => (
                  <li key={line.id}>
                    <CartPageLineItem
                      line={line}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      priority={index < 2}
                      index={index}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <CartPageSummary
              discount={discount}
              onDiscountChange={setDiscount}
            />
          </div>
        </Container>
      </Section>

      <CartRecommendations />
    </>
  );
}
