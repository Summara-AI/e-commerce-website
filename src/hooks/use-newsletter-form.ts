"use client";

import { useCallback, useId, useRef, useState, useTransition } from "react";
import { newsletterSignupAction } from "@/actions/newsletter";
import {
  NEWSLETTER_COPY,
  newsletterErrorMessage,
  type NewsletterErrorCode,
  type NewsletterSource,
  type NewsletterSubscribeResult,
} from "@/lib/newsletter";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

export type NewsletterFormStatus = "idle" | "loading" | "success" | "error";

export type UseNewsletterFormOptions = {
  source?: NewsletterSource;
  /** Override submit — still receives normalized email + consent timestamp */
  onSubscribe?: (input: {
    email: string;
    acceptsMarketing: true;
    consentUpdatedAt: string;
    source: NewsletterSource;
  }) => Promise<NewsletterSubscribeResult | void> | NewsletterSubscribeResult | void;
  /** Optimistic UI — show success immediately, reconcile on failure (default true) */
  optimistic?: boolean;
};

export type UseNewsletterFormReturn = {
  email: string;
  setEmail: (value: string) => void;
  status: NewsletterFormStatus;
  error: string | null;
  errorCode: NewsletterErrorCode | null;
  focused: boolean;
  setFocused: (value: boolean) => void;
  fieldId: string;
  errorId: string;
  statusId: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  copy: typeof NEWSLETTER_COPY;
  /** Hidden marketing-consent field values for Shopify-compatible forms */
  consentFields: {
    acceptsMarketing: "true";
    marketingConsent: "true";
    consentUpdatedAt: string;
    consentSource: NewsletterSource;
  };
  onEmailChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
};

/**
 * Reusable newsletter form API — Home, Footer, Coming Soon.
 * Provider swap happens server-side; this hook stays UI-agnostic.
 */
export function useNewsletterForm(
  options: UseNewsletterFormOptions = {},
): UseNewsletterFormReturn {
  const {
    source = "home-newsletter",
    onSubscribe,
    optimistic = true,
  } = options;

  const fieldId = useId();
  const errorId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<NewsletterErrorCode | null>(null);
  const [focused, setFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const consentStampRef = useRef(new Date().toISOString());

  const reset = useCallback(() => {
    setEmail("");
    setStatus("idle");
    setError(null);
    setErrorCode(null);
    consentStampRef.current = new Date().toISOString();
  }, []);

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
    setError(null);
    setErrorCode(null);
    setStatus((prev) => (prev === "error" ? "idle" : prev));
  }, []);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const value = normalizeEmail(email);
      const consentUpdatedAt = new Date().toISOString();
      consentStampRef.current = consentUpdatedAt;

      if (!isValidEmail(value)) {
        setError(newsletterErrorMessage("INVALID_EMAIL"));
        setErrorCode("INVALID_EMAIL");
        setStatus("error");
        return;
      }

      const previousEmail = value;
      setError(null);
      setErrorCode(null);
      setStatus("loading");

      // Optimistic: clear the field immediately while the request is in flight
      if (optimistic) {
        setEmail("");
      }

      startTransition(async () => {
        try {
          let result: NewsletterSubscribeResult | void;

          if (onSubscribe) {
            result = await onSubscribe({
              email: previousEmail,
              acceptsMarketing: true,
              consentUpdatedAt,
              source,
            });
          } else {
            result = await newsletterSignupAction({
              email: previousEmail,
              source,
              acceptsMarketing: true,
              consentUpdatedAt,
            });
          }

          if (result && result.ok === false) {
            setEmail(previousEmail);
            setError(result.error);
            setErrorCode(result.code);
            setStatus("error");
            return;
          }

          setEmail("");
          setStatus("success");
        } catch {
          setEmail(previousEmail);
          setError(newsletterErrorMessage("NETWORK"));
          setErrorCode("NETWORK");
          setStatus("error");
        }
      });
    },
    [email, onSubscribe, optimistic, source],
  );

  return {
    email,
    setEmail,
    status,
    error,
    errorCode,
    focused,
    setFocused,
    fieldId,
    errorId,
    statusId,
    isSubmitting: status === "loading" || isPending,
    isSuccess: status === "success",
    copy: NEWSLETTER_COPY,
    consentFields: {
      acceptsMarketing: "true",
      marketingConsent: "true",
      consentUpdatedAt: consentStampRef.current,
      consentSource: source,
    },
    onEmailChange,
    onSubmit,
    reset,
  };
}
