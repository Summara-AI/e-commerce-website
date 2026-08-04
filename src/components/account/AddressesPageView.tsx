"use client";

import { useCallback, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AddressFormDrawer } from "@/components/account/AddressFormDrawer";
import { useAccount } from "@/components/account/account-context";
import { AccountShell } from "@/components/account/AccountShell";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast";
import { ACCOUNT_COPY } from "@/content/account";
import {
  addressToFormValues,
  EMPTY_ADDRESS_FORM,
  type AddressFormValues,
} from "@/lib/account/address-form";
import type { CustomerAddress } from "@/lib/account-types";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type DrawerState =
  | { open: false }
  | { open: true; mode: "add" | "edit"; editingId: string | null; values: AddressFormValues };

/**
 * Premium saved addresses — Shopify Customer Address API ready.
 * Local CRUD today; swap context methods for customerAddress* mutations later.
 */
export function AddressesPageView() {
  const reduceMotion = useReducedMotion();
  const {
    isHydrated,
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  } = useAccount();

  const [drawer, setDrawer] = useState<DrawerState>({ open: false });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openAdd = useCallback(() => {
    setDrawer({
      open: true,
      mode: "add",
      editingId: null,
      values: {
        ...EMPTY_ADDRESS_FORM,
        isDefault: addresses.length === 0,
      },
    });
  }, [addresses.length]);

  const openEdit = useCallback((address: CustomerAddress) => {
    setDrawer({
      open: true,
      mode: "edit",
      editingId: address.id,
      values: addressToFormValues(address),
    });
  }, []);

  const closeDrawer = useCallback((open: boolean) => {
    if (!open) setDrawer({ open: false });
  }, []);

  const handleSave = useCallback(
    async (values: AddressFormValues) => {
      try {
        // Yield so loading state is visible; replace with Customer Address API
        await new Promise((r) => setTimeout(r, 280));
        if (drawer.open && drawer.mode === "edit" && drawer.editingId) {
          updateAddress(drawer.editingId, values);
          toast.success(ACCOUNT_COPY.addressUpdatedToast);
        } else {
          addAddress(values);
          toast.success(ACCOUNT_COPY.addressSavedToast);
        }
      } catch {
        toast.error(ACCOUNT_COPY.addressErrorToast);
        throw new Error("address-save-failed");
      }
    },
    [addAddress, drawer, updateAddress],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await new Promise((r) => setTimeout(r, 200));
      removeAddress(deleteId);
      toast.success(ACCOUNT_COPY.addressRemovedToast);
      setDeleteId(null);
    } catch {
      toast.error(ACCOUNT_COPY.addressErrorToast);
    } finally {
      setDeleting(false);
    }
  }, [deleteId, removeAddress]);

  if (!isHydrated) {
    return (
      <AccountShell
        title={ACCOUNT_COPY.addressesTitle}
        description={ACCOUNT_COPY.addressesDescription}
        breadcrumbLabel="Addresses"
      >
        <div
          className="space-y-4"
          aria-busy="true"
          aria-label="Loading addresses"
        >
          <Skeleton className="h-10 w-40 rounded-full" />
          <div className="grid gap-4 tablet:grid-cols-2">
            <Skeleton className="h-48 rounded-card" />
            <Skeleton className="h-48 rounded-card" />
          </div>
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell
      title={ACCOUNT_COPY.addressesTitle}
      description={ACCOUNT_COPY.addressesDescription}
      breadcrumbLabel="Addresses"
    >
      <div className="space-y-6" data-shopify-block="customer-addresses">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
          <p
            className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted"
            aria-live="polite"
          >
            {ACCOUNT_COPY.addressCountLabel(addresses.length)}
          </p>
          <Button
            type="button"
            className="min-h-11 rounded-full self-start"
            onClick={openAdd}
            aria-label={ACCOUNT_COPY.addAddress}
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {ACCOUNT_COPY.addAddress}
          </Button>
        </div>

        {!addresses.length ? (
          <AddressesEmptyState onAdd={openAdd} />
        ) : (
          <ul className="grid gap-4 tablet:grid-cols-2">
            {addresses.map((address, index) => (
              <motion.li
                key={address.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease,
                }}
              >
                <AddressCard
                  address={address}
                  onEdit={() => openEdit(address)}
                  onDelete={() => setDeleteId(address.id)}
                  onSetDefault={() => {
                    setDefaultAddress(address.id);
                    toast.success(ACCOUNT_COPY.addressDefaultToast);
                  }}
                />
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <AddressFormDrawer
        key={
          drawer.open
            ? `${drawer.mode}-${drawer.editingId ?? "new"}`
            : "closed"
        }
        open={drawer.open}
        mode={drawer.open ? drawer.mode : "add"}
        initialValues={
          drawer.open ? drawer.values : EMPTY_ADDRESS_FORM
        }
        onOpenChange={closeDrawer}
        onSubmit={handleSave}
      />

      <ConfirmModal
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && !deleting && setDeleteId(null)}
        title={ACCOUNT_COPY.deleteAddressConfirmTitle}
        description={ACCOUNT_COPY.deleteAddressConfirmDescription}
        confirmLabel={ACCOUNT_COPY.deleteAddressConfirmLabel}
        cancelLabel={ACCOUNT_COPY.cancelLabel}
        destructive
        loading={deleting}
        onConfirm={handleDelete}
      />
    </AccountShell>
  );
}

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: CustomerAddress;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border bg-canvas/80 p-5 tablet:p-6",
        "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)]",
        "transition-[transform,box-shadow,border-color] duration-320",
        "hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(17,17,17,0.36)]",
        "motion-reduce:transform-none",
        address.isDefault
          ? "border-power-pink/40"
          : "border-border-subtle hover:border-border-default",
      )}
      data-address-id={address.id}
      data-default={address.isDefault || undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium text-foreground">
          {address.firstName} {address.lastName}
        </h3>
        {address.isDefault ? (
          <span className="shrink-0 rounded-full bg-pink-mist px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-power-pink">
            {ACCOUNT_COPY.defaultBadge}
          </span>
        ) : null}
      </div>

      <address className="mt-4 flex-1 text-sm font-light not-italic leading-relaxed text-foreground-secondary">
        {address.phone ? (
          <>
            <span className="text-foreground">{address.phone}</span>
            <br />
          </>
        ) : null}
        {address.address1}
        {address.address2 ? (
          <>
            <br />
            {address.address2}
          </>
        ) : null}
        <br />
        {address.city}, {address.province} {address.zip}
        <br />
        {address.country}
      </address>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="min-h-10 rounded-full"
          onClick={onEdit}
          aria-label={`Edit address for ${address.firstName} ${address.lastName}`}
        >
          {ACCOUNT_COPY.editAddress}
        </Button>
        {!address.isDefault ? (
          <Button
            type="button"
            variant="text"
            size="sm"
            className="min-h-10"
            onClick={onSetDefault}
            aria-label={`Set ${address.firstName} ${address.lastName} as default address`}
          >
            {ACCOUNT_COPY.setDefault}
          </Button>
        ) : null}
        <Button
          type="button"
          variant="text"
          size="sm"
          className="min-h-10 text-destructive hover:text-destructive"
          onClick={onDelete}
          aria-label={`Delete address for ${address.firstName} ${address.lastName}`}
        >
          {ACCOUNT_COPY.deleteAddress}
        </Button>
      </div>
    </article>
  );
}

function AddressesEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center"
      data-shopify-block="addresses-empty"
    >
      <div
        className="relative mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] border border-border-subtle bg-blush"
        aria-hidden="true"
        data-image-spec="account-empty-illustration"
      >
        <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_0%,rgba(255,245,249,0.7)_45%,transparent_80%)]" />
        <MapPin className="relative h-10 w-10 text-power-pink" strokeWidth={1.25} />
      </div>
      <h2 className="font-display text-3xl font-light italic text-foreground">
        {ACCOUNT_COPY.addressesEmptyTitle}
      </h2>
      <p className="mt-3 text-base font-light leading-relaxed text-foreground-secondary">
        {ACCOUNT_COPY.addressesEmptyDescription}
      </p>
      <Button
        type="button"
        className="mt-8 min-h-11 rounded-full"
        onClick={onAdd}
      >
        <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        {ACCOUNT_COPY.addressesEmptyCta}
      </Button>
    </div>
  );
}
