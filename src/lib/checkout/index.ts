/**
 * Pre-Shopify checkout draft — preference data before cart.checkoutUrl handoff.
 */

import type { DeliveryOption, PaymentOption } from "@/content/checkout";

export type CheckoutShippingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address1: string;
  address2: string;
  zip: string;
  instructions: string;
  saveAddress: boolean;
};

export type CheckoutDraft = {
  shipping: CheckoutShippingForm;
  deliveryId: string;
  paymentId: string;
  updatedAt: string;
};

export const EMPTY_SHIPPING_FORM: CheckoutShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "Pakistan",
  province: "",
  city: "",
  address1: "",
  address2: "",
  zip: "",
  instructions: "",
  saveAddress: false,
};

export const CHECKOUT_DRAFT_KEY = "ksl-checkout-draft-v1";
export const CHECKOUT_ORDER_PREVIEW_KEY = "ksl-checkout-order-preview-v1";

export type CheckoutShippingErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "country"
    | "province"
    | "city"
    | "address1"
    | "zip",
    string
  >
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCheckoutShipping(
  form: CheckoutShippingForm,
): CheckoutShippingErrors {
  const errors: CheckoutShippingErrors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else {
    const cleaned = form.phone.replace(/[\s\-().]/g, "");
    if (!/^(\+?92|0)?3\d{9}$/.test(cleaned) && !/^\+?\d{10,15}$/.test(cleaned)) {
      errors.phone = "Enter a valid phone number.";
    }
  }
  if (!form.country.trim()) errors.country = "Country is required.";
  if (!form.province.trim()) errors.province = "Province is required.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.address1.trim()) errors.address1 = "Address is required.";
  if (!form.zip.trim()) errors.zip = "Postal code is required.";
  return errors;
}

export function readCheckoutDraft(): CheckoutDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CheckoutDraft;
  } catch {
    return null;
  }
}

export function writeCheckoutDraft(draft: CheckoutDraft) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export type OrderPreview = {
  orderNumber: string;
  createdAt: string;
  shipping: CheckoutShippingForm;
  delivery: Pick<DeliveryOption, "id" | "title" | "eta" | "priceLabel">;
  payment: Pick<PaymentOption, "id" | "title">;
  lines: {
    id: string;
    title: string;
    variantTitle: string;
    quantity: number;
    priceFormatted: string;
    href: string;
  }[];
  subtotalFormatted: string;
  shippingFormatted: string;
  totalFormatted: string;
  preview: boolean;
};

export function writeOrderPreview(preview: OrderPreview) {
  try {
    sessionStorage.setItem(CHECKOUT_ORDER_PREVIEW_KEY, JSON.stringify(preview));
  } catch {
    /* ignore */
  }
}

export function readOrderPreview(): OrderPreview | null {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_ORDER_PREVIEW_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderPreview;
  } catch {
    return null;
  }
}

/**
 * Begin Shopify Checkout handoff.
 *
 * Production: pass `checkoutUrl` from Cart API (`cart.checkoutUrl`) via
 * `resolveCheckoutHandoffService` in `@/services/checkout`.
 * Prefer that service from UI — keep this helper as the low-level redirect resolver.
 */
export async function beginShopifyCheckout(input: {
  checkoutUrl?: string | null;
  draft: CheckoutDraft;
  preview: OrderPreview;
}): Promise<{ href: string; mode: "shopify" | "preview" }> {
  writeCheckoutDraft(input.draft);
  writeOrderPreview(input.preview);

  const envUrl =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL
      : undefined;

  const url = input.checkoutUrl || envUrl;
  if (url && /^https?:\/\//i.test(url)) {
    return { href: url, mode: "shopify" };
  }

  // Local / not-connected: complete the journey on our thank-you surface
  await new Promise((r) => setTimeout(r, 600));
  return { href: "/checkout/thank-you?preview=1", mode: "preview" };
}
