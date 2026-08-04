/** Customer Account / Storefront customer — architecture only */

export const CUSTOMER_ORDERS = /* GraphQL */ `
  # query CustomerOrders — Customer Account API
  # { customer { orders(first: 20) { nodes { id name processedAt financialStatus fulfillmentStatus totalPrice { amount currencyCode } } } } }
`;

export const CUSTOMER_ADDRESSES = /* GraphQL */ `
  # query CustomerAddresses — Customer Account API
  # { customer { addresses(first: 20) { nodes { id address1 city province country zip } } } }
`;
