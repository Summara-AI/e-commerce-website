/**
 * Local account scaffold until Shopify Customer Accounts connect.
 * Line items use catalogue products/prices only. Address uses published Lahore contact location.
 */

import { formatPkr } from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
import { FOOTER_CONTACT } from "@/lib/site-content";
import type {
  CustomerAddress,
  CustomerOrder,
  CustomerProfile,
  OrderLineItem,
} from "@/lib/account-types";

function productLine(
  handle: string,
  quantity: number,
): OrderLineItem | null {
  const p = ALL_PRODUCTS.find((x) => x.handle === handle);
  if (!p) return null;
  return {
    id: `line-${p.handle}`,
    handle: p.handle,
    title: p.title,
    href: p.href,
    variantTitle: "Default",
    quantity,
    price: p.price,
    imageAlt: p.imageAlt,
    imageSrc: p.imageSrc,
  };
}

const lahoreAddress = (id: string, isDefault: boolean): CustomerAddress => ({
  id,
  firstName: "Ayesha",
  lastName: "Khan",
  address1: FOOTER_CONTACT.address,
  city: "Lahore",
  province: "Punjab",
  zip: "54792",
  country: "Pakistan",
  phone: FOOTER_CONTACT.phone,
  isDefault,
});

/** Default profile shell — customer edits persist locally until Shopify */
export const DEFAULT_PROFILE: CustomerProfile = {
  id: "local-customer",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  acceptsMarketing: false,
  acceptsOrderUpdates: true,
};

export const DEFAULT_ADDRESSES: CustomerAddress[] = [];

/**
 * Optional layout scaffold for order UI QC.
 * Not live order history — replace with Customer Account API / Orders API responses.
 */
export function getScaffoldOrders(): CustomerOrder[] {
  const deliveredLines = [
    productLine("haruharu-wonder-black-rice-hyaluronic-toner", 1),
    productLine("escargot-original-facial-repair-cream", 1),
  ].filter(Boolean) as OrderLineItem[];

  const shippedLines = [
    productLine("dermal-rice-collagen-essence-mask", 3),
    productLine(
      "haruharu-wonder-black-rice-pure-mineral-relief-daily-sunscreen-spf50",
      1,
    ),
  ].filter(Boolean) as OrderLineItem[];

  if (!deliveredLines.length) return [];

  const addr = lahoreAddress("addr-scaffold-ship", true);
  const deliveredSubtotal = deliveredLines.reduce(
    (sum, l) => sum + l.price.amount * l.quantity,
    0,
  );
  const shippingCost = 250;
  const discountAmount = 500;
  const taxAmount = Math.round(deliveredSubtotal * 0.05);
  const deliveredTotal =
    deliveredSubtotal + shippingCost + taxAmount - discountAmount;

  const orders: CustomerOrder[] = [
    {
      id: "scaffold-1001",
      number: "#KSL1001",
      processedAt: "2026-06-02T10:30:00.000Z",
      status: "delivered",
      financialStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      paymentMethod: "JazzCash",
      estimatedDelivery: null,
      subtotal: formatPkr(deliveredSubtotal),
      shipping: formatPkr(shippingCost),
      discount: formatPkr(discountAmount),
      tax: formatPkr(taxAmount),
      total: formatPkr(deliveredTotal),
      notes: null,
      lineItems: deliveredLines,
      shippingAddress: addr,
      billingAddress: { ...addr, id: "addr-scaffold-bill" },
      trackingNumber: "KSL-PK-88421",
      trackingUrl: "/pages/track-order",
      invoiceUrl: null,
      source: "scaffold",
      timeline: [
        {
          id: "placed",
          label: "Order Placed",
          description: "We received your order.",
          at: "2026-06-02T10:30:00.000Z",
          complete: true,
        },
        {
          id: "payment",
          label: "Payment Confirmed",
          description: "Payment received via JazzCash.",
          at: "2026-06-02T11:00:00.000Z",
          complete: true,
        },
        {
          id: "packed",
          label: "Packed",
          description: "Prepared at our Lahore studio.",
          at: "2026-06-03T09:00:00.000Z",
          complete: true,
        },
        {
          id: "shipped",
          label: "Shipped",
          description: "Handed to carrier.",
          at: "2026-06-03T16:00:00.000Z",
          complete: true,
        },
        {
          id: "out_for_delivery",
          label: "Out for Delivery",
          description: "On the way to your address.",
          at: "2026-06-05T09:30:00.000Z",
          complete: true,
        },
        {
          id: "delivered",
          label: "Delivered",
          description: "Signed for at delivery.",
          at: "2026-06-05T14:00:00.000Z",
          complete: true,
          current: true,
        },
      ],
    },
  ];

  if (shippedLines.length) {
    const shipSub = shippedLines.reduce(
      (sum, l) => sum + l.price.amount * l.quantity,
      0,
    );
    const shipShip = 250;
    const shipTax = Math.round(shipSub * 0.05);
    const shipTotal = shipSub + shipShip + shipTax;

    orders.unshift({
      id: "scaffold-1002",
      number: "#KSL1002",
      processedAt: "2026-07-10T14:15:00.000Z",
      status: "shipped",
      financialStatus: "Paid",
      fulfillmentStatus: "In transit",
      paymentMethod: "Card",
      estimatedDelivery: "2026-07-18T00:00:00.000Z",
      subtotal: formatPkr(shipSub),
      shipping: formatPkr(shipShip),
      discount: null,
      tax: formatPkr(shipTax),
      total: formatPkr(shipTotal),
      notes: "Please leave with reception if unavailable.",
      lineItems: shippedLines,
      shippingAddress: addr,
      billingAddress: { ...addr, id: "addr-scaffold-bill-2" },
      trackingNumber: "KSL-PK-90217",
      trackingUrl: "/pages/track-order",
      invoiceUrl: null,
      source: "scaffold",
      timeline: [
        {
          id: "placed",
          label: "Order Placed",
          description: "We received your order.",
          at: "2026-07-10T14:15:00.000Z",
          complete: true,
        },
        {
          id: "payment",
          label: "Payment Confirmed",
          description: "Card payment authorized.",
          at: "2026-07-10T14:20:00.000Z",
          complete: true,
        },
        {
          id: "packed",
          label: "Packed",
          description: "Prepared at our Lahore studio.",
          at: "2026-07-11T11:00:00.000Z",
          complete: true,
        },
        {
          id: "shipped",
          label: "Shipped",
          description: "Tracking KSL-PK-90217",
          at: "2026-07-12T09:00:00.000Z",
          complete: true,
          current: true,
        },
        {
          id: "out_for_delivery",
          label: "Out for Delivery",
          description: "Carrier will update when out for delivery.",
          complete: false,
        },
        {
          id: "delivered",
          label: "Delivered",
          description: "Estimated arrival soon.",
          complete: false,
        },
      ],
    });
  }

  return orders;
}
