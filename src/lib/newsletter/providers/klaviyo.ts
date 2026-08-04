import { getNewsletterConfig } from "../config";
import { newsletterErrorMessage } from "../messages";
import type { NewsletterProvider, NewsletterSubscribeResult } from "../types";

/**
 * Klaviyo list subscribe — private API key stays server-only.
 * Change KLAVIYO_* env vars (or KLAVIYO_SUBSCRIBE_ENDPOINT) to reconnect.
 */
export const klaviyoProvider: NewsletterProvider = {
  id: "klaviyo",
  async subscribe({ email, consent, source }): Promise<NewsletterSubscribeResult> {
    const { privateApiKey, listId, endpoint } = getNewsletterConfig().klaviyo;

    if (!privateApiKey || !listId) {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "klaviyo",
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${privateApiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      subscriptions: {
                        email: {
                          marketing: {
                            consent: "SUBSCRIBED",
                            consented_at: consent.consentUpdatedAt,
                          },
                        },
                      },
                      properties: {
                        source: source ?? consent.source,
                        accepts_marketing: true,
                      },
                    },
                  },
                ],
              },
              historical_import: false,
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId,
                },
              },
            },
          },
        }),
        cache: "no-store",
      });

      if (response.status === 409) {
        return {
          ok: false,
          code: "ALREADY_SUBSCRIBED",
          error: newsletterErrorMessage("ALREADY_SUBSCRIBED"),
          provider: "klaviyo",
        };
      }

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        if (text.toLowerCase().includes("already")) {
          return {
            ok: false,
            code: "ALREADY_SUBSCRIBED",
            error: newsletterErrorMessage("ALREADY_SUBSCRIBED"),
            provider: "klaviyo",
          };
        }

        return {
          ok: false,
          code: "NETWORK",
          error: newsletterErrorMessage("NETWORK"),
          provider: "klaviyo",
        };
      }

      return {
        ok: true,
        email,
        provider: "klaviyo",
      };
    } catch {
      return {
        ok: false,
        code: "NETWORK",
        error: newsletterErrorMessage("NETWORK"),
        provider: "klaviyo",
      };
    }
  },
};
