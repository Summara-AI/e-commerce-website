"use client";

import { useState } from "react";
import { FormError } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormAction } from "@/actions/contact";
import { CONTACT_PAGE, CONTACT_TOPICS } from "@/content/contact";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";


type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState | "form", string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "general",
  message: "",
};

/**
 * Contact form — validation, loading, success, error. Shopify Forms / customer ready.
 */
export function ContactForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      delete next.form;
      return next;
    });
    if (status === "error") setStatus("idle");
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Please share at least a short message (10+ characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const result = await contactFormAction({
        name: form.name.trim(),
        email: normalizeEmail(form.email),
        message: form.message.trim(),
        topic: form.topic,
      });
      if (!result.ok) {
        throw new Error(result.error);
      }
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
      setErrors({ form: CONTACT_PAGE.form.errorGeneric });
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-card border border-border-subtle bg-success-bg px-5 py-6",
          className,
        )}
        role="status"
        data-shopify-block="contact-form-success"
      >
        <p className="font-display text-xl font-light text-foreground">
          {CONTACT_PAGE.form.successTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
          {CONTACT_PAGE.form.successBody}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("space-y-5", className)}
      data-shopify-block="contact-form"
      aria-busy={status === "loading"}
    >
      <div>
        <h2 className="font-display text-xl font-light text-foreground">
          {CONTACT_PAGE.form.heading}
        </h2>
        <p className="mt-2 text-sm text-foreground-secondary">
          {CONTACT_PAGE.form.description}
        </p>
      </div>

      {errors.form ? <FormError message={errors.form} /> : null}

      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          error={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          disabled={status === "loading"}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-caption text-destructive" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 tablet:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            error={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            disabled={status === "loading"}
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-caption text-destructive" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone <span className="font-normal text-foreground-muted">(optional)</span></Label>
          <Input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-topic">Topic</Label>
        <select
          id="contact-topic"
          name="topic"
          value={form.topic}
          onChange={(e) => setField("topic", e.target.value)}
          disabled={status === "loading"}
          className={cn(
            "flex h-12 w-full rounded-input border border-border-subtle bg-canvas px-5 text-base font-light text-foreground",
            "transition-[border-color,box-shadow] duration-200 ease-out",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            "focus-visible:border-border-focus focus-visible:shadow-[0_0_0_4px_rgba(228,19,111,0.12)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          error={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          disabled={status === "loading"}
          rows={5}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-caption text-destructive" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" loading={status === "loading"} className="w-full tablet:w-auto">
        {CONTACT_PAGE.form.submitLabel}
      </Button>
    </form>
  );
}
