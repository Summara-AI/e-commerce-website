/**
 * Newsletter subscription contract — Shopify Customers / Shopify Email / Klaviyo.
 * Swap providers via NEWSLETTER_PROVIDER without touching UI components.
 */

export type NewsletterProviderId =
  | "local"
  | "shopify_customers"
  | "shopify_email"
  | "klaviyo";

export type NewsletterErrorCode =
  | "INVALID_EMAIL"
  | "ALREADY_SUBSCRIBED"
  | "NETWORK"
  | "VALIDATION"
  | "UNKNOWN";

export type NewsletterSource =
  | "home-newsletter"
  | "footer"
  | "coming-soon"
  | "inline"
  | "card"
  | (string & {});

/** Marketing consent payload — maps to Shopify Customer emailMarketingConsent */
export type NewsletterMarketingConsent = {
  /** Always true for newsletter opt-in forms */
  acceptsMarketing: true;
  /** ISO timestamp when consent was recorded */
  consentUpdatedAt: string;
  /** Single / confirmed opt-in level for Shopify */
  marketingOptInLevel: "SINGLE_OPT_IN" | "CONFIRMED_OPT_IN";
  /** Form / surface that collected consent */
  source: NewsletterSource;
};

export type NewsletterSubscribeInput = {
  email: string;
  source?: NewsletterSource;
  /** Explicit marketing consent — UI always sends true via hidden fields */
  acceptsMarketing?: boolean;
  consentUpdatedAt?: string;
  tags?: string[];
  locale?: string;
};

export type NewsletterSubscribeSuccess = {
  ok: true;
  email: string;
  provider: NewsletterProviderId;
  /** True when provider reported an existing subscriber as already opted in */
  alreadySubscribed?: boolean;
};

export type NewsletterSubscribeFailure = {
  ok: false;
  code: NewsletterErrorCode;
  error: string;
  provider: NewsletterProviderId;
};

export type NewsletterSubscribeResult =
  | NewsletterSubscribeSuccess
  | NewsletterSubscribeFailure;

export type NewsletterProvider = {
  id: NewsletterProviderId;
  subscribe: (
    input: Required<
      Pick<NewsletterSubscribeInput, "email">
    > &
      NewsletterSubscribeInput & {
        consent: NewsletterMarketingConsent;
      },
  ) => Promise<NewsletterSubscribeResult>;
};
