export const CUSTOMER_ACCESS_TOKEN_CREATE = /* GraphQL */ `
  # mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  #   customerAccessTokenCreate(input: $input) {
  #     customerAccessToken { accessToken expiresAt }
  #     customerUserErrors { code field message }
  #   }
  # }
  # Wired in lib/auth/providers/shopify-storefront.ts
`;

export const CUSTOMER_CREATE = /* GraphQL */ `
  # mutation customerCreate($input: CustomerCreateInput!) {
  #   customerCreate(input: $input) {
  #     customer { id email firstName lastName }
  #     customerUserErrors { code field message }
  #   }
  # }
  # Wired in lib/auth/providers/shopify-storefront.ts (registration)
`;

export const CUSTOMER_RECOVER = /* GraphQL */ `
  # mutation customerRecover($email: String!) {
  #   customerRecover(email: $email) {
  #     customerUserErrors { code field message }
  #   }
  # }
  # Wired in lib/auth/providers/shopify-storefront.ts (password recovery)
`;

export const CUSTOMER_PROFILE_UPDATE = /* GraphQL */ `
  # mutation CustomerUpdate — Customer Account API
  # (firstName, lastName, email marketing consent)
`;

/** Admin API — newsletter / marketing opt-in (see lib/newsletter/providers/shopify-customers) */
export const CUSTOMER_CREATE_NEWSLETTER = /* GraphQL */ `
  # mutation customerCreate($input: CustomerInput!) {
  #   customerCreate(input: $input) {
  #     customer { id email emailMarketingConsent { marketingState } }
  #     userErrors { field message code }
  #   }
  # }
`;

export const CUSTOMER_ADDRESS_CREATE = /* GraphQL */ `
  # mutation CustomerAddressCreate — Customer Account API
`;

export const CUSTOMER_ADDRESS_UPDATE = /* GraphQL */ `
  # mutation CustomerAddressUpdate — Customer Account API
`;

export const CUSTOMER_ADDRESS_DELETE = /* GraphQL */ `
  # mutation CustomerAddressDelete — Customer Account API
`;
