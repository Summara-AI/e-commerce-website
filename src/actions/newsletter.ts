"use server";

import { subscribeNewsletter } from "@/lib/newsletter/subscribe";
import type {
  NewsletterSource,
  NewsletterSubscribeResult,
} from "@/lib/newsletter/types";

export type NewsletterSignupActionInput = {
  email: string;
  source?: NewsletterSource;
  /** Marketing consent — required for Shopify Customers / Email / Klaviyo */
  acceptsMarketing?: boolean;
  consentUpdatedAt?: string;
  tags?: string[];
};

/**
 * Newsletter server action — reusable Shopify forms API.
 *
 * UI calls this (or useNewsletterForm). Provider/endpoint swap:
 *   NEWSLETTER_PROVIDER=local|shopify_customers|shopify_email|klaviyo
 *   + provider-specific endpoint env vars.
 */
export async function newsletterSignupAction(
  input: NewsletterSignupActionInput,
): Promise<NewsletterSubscribeResult> {
  return subscribeNewsletter({
    email: input.email,
    source: input.source ?? "home-newsletter",
    acceptsMarketing: input.acceptsMarketing !== false,
    consentUpdatedAt: input.consentUpdatedAt,
    tags: input.tags,
  });
}
