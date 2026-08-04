"use client";

import { useState } from "react";
import Link from "next/link";
import { ErrorState, FormError } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRACK_ORDER_PAGE } from "@/content/track-order";
import { isValidEmail } from "@/lib/validation";
import { trackOrderService } from "@/services/tracking";
import { toUserFacingMessage } from "@/lib/api/errors";
import { cn } from "@/lib/utils";


type Status = "idle" | "loading" | "success" | "error";

/**
 * Track order form — Shopify order lookup ready (customer email + order name).
 */
export function TrackOrderForm({ className }: { className?: string }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ order?: string; email?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorVariant, setErrorVariant] = useState<"notFound" | "generic">("notFound");

  const validate = () => {
    const next: { order?: string; email?: string } = {};
    if (!orderNumber.trim()) next.order = "Enter your order number.";
    if (!isValidEmail(email)) next.email = "Enter the email used at checkout.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const result = await trackOrderService({ orderNumber, email });
      if (result.found) {
        setStatus("success");
      } else {
        setErrorVariant("notFound");
        setStatus("error");
      }
    } catch (error) {
      void toUserFacingMessage(error);
      setErrorVariant("generic");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setFieldErrors({});
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-card border border-border-subtle bg-surface-soft px-5 py-6",
          className,
        )}
        role="status"
        data-shopify-block="order-tracking-result"
      >
        <p className="text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
          Tracking
        </p>
        <h2 className="mt-2 font-display text-xl font-light text-foreground">
          {TRACK_ORDER_PAGE.success.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
          {TRACK_ORDER_PAGE.success.body}
        </p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
            <dt className="text-foreground-muted">Order</dt>
            <dd className="font-medium text-foreground">{orderNumber.trim()}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
            <dt className="text-foreground-muted">{TRACK_ORDER_PAGE.success.statusLabel}</dt>
            <dd className="text-right font-medium text-foreground">
              {TRACK_ORDER_PAGE.success.statusValue}
            </dd>
          </div>
        </dl>
        <div
          className="mt-6 aspect-[16/9] overflow-hidden rounded-card bg-[linear-gradient(165deg,var(--color-blush)_0%,var(--color-canvas)_50%,var(--color-pink-mist)_100%)]"
          role="img"
          aria-label="Order status visual placeholder"
          data-image-spec="track-order-status-visual"
          data-placeholder="true"
        />
        <Button type="button" variant="secondary" className="mt-6" onClick={reset}>
          Track another order
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {status === "error" ? (
        <ErrorState
          variant="form"
          title={
            errorVariant === "notFound"
              ? TRACK_ORDER_PAGE.error.notFoundTitle
              : TRACK_ORDER_PAGE.error.genericTitle
          }
          description={
            errorVariant === "notFound"
              ? TRACK_ORDER_PAGE.error.notFoundBody
              : TRACK_ORDER_PAGE.error.genericBody
          }
          onRetry={reset}
        />
      ) : null}

      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-5"
        data-shopify-block="order-tracking-form"
        aria-busy={status === "loading"}
      >
        <div className="space-y-2">
          <Label htmlFor="track-order-number">{TRACK_ORDER_PAGE.form.orderLabel}</Label>
          <Input
            id="track-order-number"
            name="order"
            autoComplete="off"
            placeholder={TRACK_ORDER_PAGE.form.orderPlaceholder}
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
              setFieldErrors((p) => ({ ...p, order: undefined }));
            }}
            error={Boolean(fieldErrors.order)}
            aria-describedby={fieldErrors.order ? "track-order-error" : undefined}
            disabled={status === "loading"}
          />
          {fieldErrors.order ? (
            <p id="track-order-error" role="alert">
              <FormError message={fieldErrors.order} />
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="track-email">{TRACK_ORDER_PAGE.form.emailLabel}</Label>
          <Input
            id="track-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={TRACK_ORDER_PAGE.form.emailPlaceholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((p) => ({ ...p, email: undefined }));
            }}
            error={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "track-email-error" : undefined}
            disabled={status === "loading"}
          />
          {fieldErrors.email ? (
            <p id="track-email-error" role="alert">
              <FormError message={fieldErrors.email} />
            </p>
          ) : null}
        </div>

        <Button type="submit" loading={status === "loading"} className="w-full tablet:w-auto">
          {status === "loading" ? TRACK_ORDER_PAGE.loading : TRACK_ORDER_PAGE.form.submitLabel}
        </Button>
      </form>

      <aside className="rounded-card bg-pearl px-5 py-5">
        <p className="font-display text-lg font-light text-foreground">
          {TRACK_ORDER_PAGE.help.title}
        </p>
        <p className="mt-1 text-sm text-foreground-secondary">
          {TRACK_ORDER_PAGE.help.description}
        </p>
        <div className="mt-4 flex flex-col gap-2 tablet:flex-row">
          <Button asChild size="sm">
            <Link href={TRACK_ORDER_PAGE.help.contactHref}>
              {TRACK_ORDER_PAGE.help.contactLabel}
            </Link>
          </Button>
          <Button asChild variant="text" size="sm">
            <Link href={TRACK_ORDER_PAGE.help.faqHref}>{TRACK_ORDER_PAGE.help.faqLabel}</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
