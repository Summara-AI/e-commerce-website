export const CART_FIELDS = /* GraphQL */ `
  # fragment CartFields on Cart {
  #   id checkoutUrl totalQuantity note
  #   cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
  #   discountCodes { code applicable }
  #   lines(first: 100) { nodes {
  #     id quantity
  #     merchandise { ... on ProductVariant {
  #       id title availableForSale
  #       product { id handle title featuredImage { url altText } }
  #       price { amount currencyCode }
  #     } }
  #   } }
  # }
`;
