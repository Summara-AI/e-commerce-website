import { subscribeNewsletter } from "@/lib/newsletter/subscribe";
import type {
  NewsletterSubscribeInput,
  NewsletterSubscribeResult,
} from "@/lib/newsletter/types";

/**
 * Service façade — pages/actions can call this instead of providers directly.
 */
export async function newsletterSubscribeService(
  input: NewsletterSubscribeInput,
): Promise<NewsletterSubscribeResult> {
  return subscribeNewsletter(input);
}
