/**
 * Address form helpers — local scaffold until Shopify Customer Address API.
 * Keep field names aligned with CustomerAddress / Shopify customerAddressCreate.
 */

import type { CustomerAddress } from "@/lib/account-types";

export type AddressFormValues = Omit<CustomerAddress, "id">;

export const EMPTY_ADDRESS_FORM: AddressFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  zip: "",
  country: "Pakistan",
  phone: "",
  isDefault: false,
};

export type AddressFormErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "phone"
    | "address1"
    | "city"
    | "province"
    | "zip"
    | "country",
    string
  >
>;

/** Accepts common PK mobile formats and international E.164-ish numbers */
export function isValidPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (!cleaned) return false;
  if (/^(\+?92|0)?3\d{9}$/.test(cleaned)) return true;
  return /^\+?\d{10,15}$/.test(cleaned);
}

export function validateAddressForm(form: AddressFormValues): AddressFormErrors {
  const errors: AddressFormErrors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!form.address1.trim()) errors.address1 = "Address is required.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.province.trim()) errors.province = "Province is required.";
  if (!form.zip.trim()) errors.zip = "Postal code is required.";
  if (!form.country.trim()) errors.country = "Country is required.";
  return errors;
}

export function normalizeAddressForm(form: AddressFormValues): AddressFormValues {
  return {
    ...form,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    company: form.company?.trim() || "",
    address1: form.address1.trim(),
    address2: form.address2?.trim() || "",
    city: form.city.trim(),
    province: form.province.trim(),
    zip: form.zip.trim(),
    country: form.country.trim() || "Pakistan",
    phone: form.phone?.trim() || "",
  };
}

export function addressToFormValues(address: CustomerAddress): AddressFormValues {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    company: address.company ?? "",
    address1: address.address1,
    address2: address.address2 ?? "",
    city: address.city,
    province: address.province,
    zip: address.zip,
    country: address.country,
    phone: address.phone ?? "",
    isDefault: address.isDefault,
  };
}
