import type { NewsletterErrorCode } from "./types";

/** Canonical copy — keep HomeNewsletter / Footer / Coming Soon in sync */
export const NEWSLETTER_COPY = {
  successTitle: "Thank you for subscribing.",
  successBody: "Check your inbox for your welcome email.",
  submitLabel: "Subscribe",
  emailLabel: "Email address",
  emailPlaceholder: "Email address",
} as const;

export const NEWSLETTER_ERROR_MESSAGES: Record<NewsletterErrorCode, string> = {
  INVALID_EMAIL: "Invalid email",
  ALREADY_SUBSCRIBED: "Already subscribed",
  NETWORK: "Network error",
  VALIDATION: "Invalid email",
  UNKNOWN: "Network error",
};

export function newsletterErrorMessage(code: NewsletterErrorCode): string {
  return NEWSLETTER_ERROR_MESSAGES[code] ?? NEWSLETTER_ERROR_MESSAGES.UNKNOWN;
}
