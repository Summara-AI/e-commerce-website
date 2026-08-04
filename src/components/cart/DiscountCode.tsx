"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CART_PAGE_COPY } from "@/content/cart-page";
import { validateDiscountCodeService } from "@/services/discount";
import { toUserFacingMessage } from "@/lib/api/errors";
import { cn } from "@/lib/utils";

export type DiscountStatus = "idle" | "loading" | "success" | "error";

export type AppliedDiscount = {
  code: string;
  /** Shopify discount allocation later — null until Cart API validates */
  amount: number | null;
};

type DiscountCodeProps = {
  value?: AppliedDiscount | null;
  onChange?: (discount: AppliedDiscount | null) => void;
  className?: string;
};

/**
 * Reusable coupon field — Apply / success / error / loading.
 * Validates through Shopify Cart API later; local save only marks intent for checkout.
 */
export function DiscountCode({ value = null, onChange, className }: DiscountCodeProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const [code, setCode] = useState(value?.code ?? "");
  const [status, setStatus] = useState<DiscountStatus>(value ? "success" : "idle");
  const [message, setMessage] = useState(value ? CART_PAGE_COPY.discountSuccess : "");

  const busy = status === "loading";

  const apply = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage(CART_PAGE_COPY.discountEmptyError);
      onChange?.(null);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Shopify: cartDiscountCodesUpdate — totals update only from Cart API response
      const result = await validateDiscountCodeService(trimmed);
      setStatus("success");
      setMessage(result.message || CART_PAGE_COPY.discountSuccess);
      setCode(result.code);
      onChange?.({ code: result.code, amount: result.amount });
    } catch (error) {
      setStatus("error");
      setMessage(
        toUserFacingMessage(error, CART_PAGE_COPY.discountUnavailableError),
      );
      onChange?.(null);
    }
  };

  const clear = () => {
    setCode("");
    setStatus("idle");
    setMessage("");
    onChange?.(null);
  };

  return (
    <div
      className={cn("space-y-2", className)}
      data-shopify-block="discount-code"
      data-discount-status={status}
    >
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {CART_PAGE_COPY.discountLabel}
      </label>
      <div className="flex gap-2">
        <Input
          id={id}
          name="discount"
          autoComplete="off"
          spellCheck={false}
          placeholder={CART_PAGE_COPY.discountPlaceholder}
          value={code}
          disabled={busy || status === "success"}
          error={status === "error"}
          aria-describedby={message ? messageId : undefined}
          onChange={(e) => {
            setCode(e.target.value);
            if (status === "error" || status === "success") {
              setStatus("idle");
              setMessage("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void apply();
            }
          }}
        />
        {status === "success" ? (
          <Button type="button" variant="secondary" onClick={clear} className="shrink-0">
            {CART_PAGE_COPY.discountRemove}
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            loading={busy}
            onClick={() => void apply()}
            className="shrink-0"
          >
            {busy ? CART_PAGE_COPY.discountLoading : CART_PAGE_COPY.discountApply}
          </Button>
        )}
      </div>
      {message ? (
        <p
          id={messageId}
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "text-caption leading-relaxed",
            status === "error" && "text-destructive",
            status === "success" && "text-power-pink",
            status !== "error" && status !== "success" && "text-foreground-secondary",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
