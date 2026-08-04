export const CART_CREATE = /* GraphQL */ `
  # mutation CartCreate($input: CartInput!) {
  #   cartCreate(input: $input) { cart { ...CartFields } userErrors { field message } }
  # }
`;

export const CART_LINES_ADD = /* GraphQL */ `
  # mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  #   cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { field message } }
  # }
`;

export const CART_LINES_UPDATE = /* GraphQL */ `
  # mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  #   cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } userErrors { field message } }
  # }
`;

export const CART_LINES_REMOVE = /* GraphQL */ `
  # mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  #   cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } userErrors { field message } }
  # }
`;

export const CART_DISCOUNT_CODES_UPDATE = /* GraphQL */ `
  # mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
  #   cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
  #     cart { ...CartFields } userErrors { field message }
  #   }
  # }
`;

export const CART_NOTE_UPDATE = /* GraphQL */ `
  # mutation CartNoteUpdate($cartId: ID!, $note: String!) {
  #   cartNoteUpdate(cartId: $cartId, note: $note) { cart { ...CartFields } userErrors { field message } }
  # }
`;
