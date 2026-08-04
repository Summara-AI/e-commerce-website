"use client";

import { useEffect, useId, useState } from "react";
import { LoginFloatingField } from "@/components/auth/LoginFloatingField";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ACCOUNT_COPY } from "@/content/account";
import {
  normalizeAddressForm,
  validateAddressForm,
  type AddressFormErrors,
  type AddressFormValues,
} from "@/lib/account/address-form";
import { cn } from "@/lib/utils";

type AddressFormDrawerProps = {
  open: boolean;
  mode: "add" | "edit";
  initialValues: AddressFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AddressFormValues) => Promise<void>;
};

/**
 * Premium add/edit address drawer — floating labels, inline validation.
 * Swap `onSubmit` for Shopify customerAddressCreate / customerAddressUpdate.
 */
export function AddressFormDrawer({
  open,
  mode,
  initialValues,
  onOpenChange,
  onSubmit,
}: AddressFormDrawerProps) {
  const formId = useId();
  const [form, setForm] = useState<AddressFormValues>(initialValues);
  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;
    setForm(initialValues);
    setErrors({});
    setTouched({});
    setSaving(false);
  }, [open, initialValues]);

  const setField = <K extends keyof AddressFormValues>(
    key: K,
    value: AddressFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof AddressFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof AddressFormErrors];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateAddressForm(form);
    setErrors(nextErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      address1: true,
      city: true,
      province: true,
      zip: true,
      country: true,
    });
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    try {
      await onSubmit(normalizeAddressForm(form));
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  const fieldSuccess = (key: keyof AddressFormErrors, value: string) =>
    Boolean(touched[key] && value.trim() && !errors[key]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        side="right"
        className="tablet:w-[min(100%,36rem)]"
        aria-describedby={`${formId}-desc`}
      >
        <DrawerHeader>
          <DrawerTitle>
            {mode === "edit"
              ? ACCOUNT_COPY.editAddressDrawerTitle
              : ACCOUNT_COPY.addAddressDrawerTitle}
          </DrawerTitle>
          <DrawerDescription id={`${formId}-desc`}>
            {mode === "edit"
              ? ACCOUNT_COPY.editAddressDrawerDescription
              : ACCOUNT_COPY.addAddressDrawerDescription}
          </DrawerDescription>
        </DrawerHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
          noValidate
          aria-busy={saving || undefined}
          data-shopify-block="customer-address-form"
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <div className="grid gap-4 tablet:grid-cols-2">
              <FieldBlock
                error={errors.firstName}
                errorId={`${formId}-first-err`}
              >
                <LoginFloatingField
                  id={`${formId}-first`}
                  name="firstName"
                  label="First Name *"
                  autoComplete="given-name"
                  value={form.firstName}
                  disabled={saving}
                  error={Boolean(errors.firstName)}
                  success={fieldSuccess("firstName", form.firstName)}
                  describedBy={
                    errors.firstName ? `${formId}-first-err` : undefined
                  }
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, firstName: true }));
                    setField("firstName", v);
                  }}
                />
              </FieldBlock>
              <FieldBlock error={errors.lastName} errorId={`${formId}-last-err`}>
                <LoginFloatingField
                  id={`${formId}-last`}
                  name="lastName"
                  label="Last Name *"
                  autoComplete="family-name"
                  value={form.lastName}
                  disabled={saving}
                  error={Boolean(errors.lastName)}
                  success={fieldSuccess("lastName", form.lastName)}
                  describedBy={
                    errors.lastName ? `${formId}-last-err` : undefined
                  }
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, lastName: true }));
                    setField("lastName", v);
                  }}
                />
              </FieldBlock>
            </div>

            <FieldBlock error={errors.phone} errorId={`${formId}-phone-err`}>
              <LoginFloatingField
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                label="Phone Number *"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone ?? ""}
                disabled={saving}
                error={Boolean(errors.phone)}
                success={fieldSuccess("phone", form.phone ?? "")}
                describedBy={errors.phone ? `${formId}-phone-err` : undefined}
                onChange={(v) => {
                  setTouched((t) => ({ ...t, phone: true }));
                  setField("phone", v);
                }}
              />
            </FieldBlock>

            <FieldBlock error={errors.address1} errorId={`${formId}-a1-err`}>
              <LoginFloatingField
                id={`${formId}-a1`}
                name="address1"
                label="Address Line 1 *"
                autoComplete="address-line1"
                value={form.address1}
                disabled={saving}
                error={Boolean(errors.address1)}
                success={fieldSuccess("address1", form.address1)}
                describedBy={errors.address1 ? `${formId}-a1-err` : undefined}
                onChange={(v) => {
                  setTouched((t) => ({ ...t, address1: true }));
                  setField("address1", v);
                }}
              />
            </FieldBlock>

            <LoginFloatingField
              id={`${formId}-a2`}
              name="address2"
              label="Address Line 2 (Optional)"
              autoComplete="address-line2"
              required={false}
              value={form.address2 ?? ""}
              disabled={saving}
              onChange={(v) => setField("address2", v)}
            />

            <div className="grid gap-4 tablet:grid-cols-2">
              <FieldBlock error={errors.city} errorId={`${formId}-city-err`}>
                <LoginFloatingField
                  id={`${formId}-city`}
                  name="city"
                  label="City *"
                  autoComplete="address-level2"
                  value={form.city}
                  disabled={saving}
                  error={Boolean(errors.city)}
                  success={fieldSuccess("city", form.city)}
                  describedBy={errors.city ? `${formId}-city-err` : undefined}
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, city: true }));
                    setField("city", v);
                  }}
                />
              </FieldBlock>
              <FieldBlock
                error={errors.province}
                errorId={`${formId}-province-err`}
              >
                <LoginFloatingField
                  id={`${formId}-province`}
                  name="province"
                  label="Province / State *"
                  autoComplete="address-level1"
                  value={form.province}
                  disabled={saving}
                  error={Boolean(errors.province)}
                  success={fieldSuccess("province", form.province)}
                  describedBy={
                    errors.province ? `${formId}-province-err` : undefined
                  }
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, province: true }));
                    setField("province", v);
                  }}
                />
              </FieldBlock>
            </div>

            <div className="grid gap-4 tablet:grid-cols-2">
              <FieldBlock error={errors.zip} errorId={`${formId}-zip-err`}>
                <LoginFloatingField
                  id={`${formId}-zip`}
                  name="zip"
                  label="Postal Code *"
                  autoComplete="postal-code"
                  value={form.zip}
                  disabled={saving}
                  error={Boolean(errors.zip)}
                  success={fieldSuccess("zip", form.zip)}
                  describedBy={errors.zip ? `${formId}-zip-err` : undefined}
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, zip: true }));
                    setField("zip", v);
                  }}
                />
              </FieldBlock>
              <FieldBlock
                error={errors.country}
                errorId={`${formId}-country-err`}
              >
                <LoginFloatingField
                  id={`${formId}-country`}
                  name="country"
                  label="Country *"
                  autoComplete="country-name"
                  value={form.country}
                  disabled={saving}
                  error={Boolean(errors.country)}
                  success={fieldSuccess("country", form.country)}
                  describedBy={
                    errors.country ? `${formId}-country-err` : undefined
                  }
                  onChange={(v) => {
                    setTouched((t) => ({ ...t, country: true }));
                    setField("country", v);
                  }}
                />
              </FieldBlock>
            </div>

            <label
              htmlFor={`${formId}-default`}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-card border border-border-subtle bg-blush/25 p-4",
                "transition-[border-color,background-color] duration-280",
                "hover:border-border-default hover:bg-blush/40",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-border-focus",
              )}
            >
              <input
                id={`${formId}-default`}
                type="checkbox"
                checked={form.isDefault}
                disabled={saving}
                onChange={(e) => setField("isDefault", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-power-pink)]"
              />
              <span className="text-sm font-light leading-relaxed text-foreground">
                {ACCOUNT_COPY.setDefaultCheckbox}
              </span>
            </label>
          </div>

          <DrawerFooter className="flex flex-col gap-2 tablet:flex-row tablet:justify-end">
            <Button
              type="button"
              variant="secondary"
              className="min-h-11 rounded-full"
              disabled={saving}
              onClick={() => onOpenChange(false)}
            >
              {ACCOUNT_COPY.cancelLabel}
            </Button>
            <Button
              type="submit"
              className="min-h-11 rounded-full"
              loading={saving}
              disabled={saving}
            >
              {ACCOUNT_COPY.saveAddress}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

function FieldBlock({
  children,
  error,
  errorId,
}: {
  children: React.ReactNode;
  error?: string;
  errorId: string;
}) {
  return (
    <div>
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-caption text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
