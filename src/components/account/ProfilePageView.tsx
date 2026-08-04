"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@/components/account/account-context";
import { AccountShell } from "@/components/account/AccountShell";
import { FormError } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { ACCOUNT_COPY } from "@/content/account";
import type { CustomerProfile } from "@/lib/account-types";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<keyof CustomerProfile | "form", string>>;

export function ProfilePageView() {
  const { isHydrated, profile, updateProfile } = useAccount();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isHydrated) setForm(profile);
  }, [isHydrated, profile]);

  if (!isHydrated) {
    return (
      <AccountShell title={ACCOUNT_COPY.profileTitle} breadcrumbLabel="Profile">
        <div className="max-w-xl space-y-4" aria-busy="true">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </AccountShell>
    );
  }

  const setField = <K extends keyof CustomerProfile>(key: K, value: CustomerProfile[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      delete next.form;
      return next;
    });
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      updateProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || "",
        acceptsMarketing: form.acceptsMarketing,
        acceptsOrderUpdates: form.acceptsOrderUpdates,
      });
      setSaved(true);
      toast.success(ACCOUNT_COPY.profileSaved);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AccountShell
      title={ACCOUNT_COPY.profileTitle}
      description="Personal details and how we reach you — Shopify customer profile ready."
      breadcrumbLabel="Profile"
    >
      <form
        onSubmit={onSubmit}
        noValidate
        className="max-w-xl space-y-8"
        data-shopify-block="customer-profile"
      >
        {saved ? (
          <p
            className="rounded-card border border-border-subtle bg-success-bg px-4 py-3 text-sm text-success"
            role="status"
          >
            {ACCOUNT_COPY.profileSaved}
          </p>
        ) : null}

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-foreground">
            Personal information
          </legend>
          <div className="grid gap-4 tablet:grid-cols-2">
            <Field
              id="firstName"
              label="First name"
              value={form.firstName}
              error={errors.firstName}
              autoComplete="given-name"
              onChange={(v) => setField("firstName", v)}
            />
            <Field
              id="lastName"
              label="Last name"
              value={form.lastName}
              error={errors.lastName}
              autoComplete="family-name"
              onChange={(v) => setField("lastName", v)}
            />
          </div>
          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            autoComplete="email"
            onChange={(v) => setField("email", v)}
          />
          <Field
            id="phone"
            label="Phone"
            type="tel"
            value={form.phone ?? ""}
            autoComplete="tel"
            onChange={(v) => setField("phone", v)}
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-card border border-border-subtle bg-surface-soft p-5">
          <legend className="px-1 text-sm font-medium text-foreground">
            {ACCOUNT_COPY.passwordSection}
          </legend>
          <p className="text-sm text-foreground-secondary">{ACCOUNT_COPY.passwordHint}</p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => toast.info(ACCOUNT_COPY.passwordUpdate, ACCOUNT_COPY.passwordComingSoon)}
          >
            {ACCOUNT_COPY.passwordUpdate}
          </Button>
        </fieldset>

        <fieldset id="newsletter" className="scroll-mt-28 space-y-4">
          <legend className="text-sm font-medium text-foreground">
            {ACCOUNT_COPY.communications}
          </legend>
          <CheckboxRow
            id="orderUpdates"
            checked={form.acceptsOrderUpdates}
            onChange={(v) => setField("acceptsOrderUpdates", v)}
            label={ACCOUNT_COPY.orderUpdates}
            description="Status notices for your purchases."
          />
          <CheckboxRow
            id="newsletter"
            checked={form.acceptsMarketing}
            onChange={(v) => setField("acceptsMarketing", v)}
            label={ACCOUNT_COPY.newsletter}
            description="New arrivals and calm brand updates — infrequent."
          />
        </fieldset>

        {errors.form ? <FormError message={errors.form} /> : null}

        <Button type="submit" size="lg" loading={saving}>
          {ACCOUNT_COPY.saveChanges}
        </Button>
      </form>
    </AccountShell>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        error={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="text-caption text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer gap-3 rounded-sm border border-border-subtle bg-surface p-4",
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-border-focus",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--color-celadon)]"
      />
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="mt-0.5 block text-sm text-foreground-secondary">{description}</span>
      </span>
    </label>
  );
}
