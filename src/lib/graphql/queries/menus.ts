import { SHOPIFY_MENU_HANDLES } from "@/lib/shopify/constants";

/** Handles expected in Admin Navigation */
export const EXPECTED_MENU_HANDLES = SHOPIFY_MENU_HANDLES;

export const MENU_BY_HANDLE = /* GraphQL */ `
  # query MenuByHandle($handle: String!) {
  #   menu(handle: $handle) { ...MenuFields }
  # }
`;
