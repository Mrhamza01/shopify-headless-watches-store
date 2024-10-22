import client from './appolloClient'
import { gql } from '@apollo/client'

export async function getProducts(first: number = 10) {
  const { data } = await client.query({
    query: gql`
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { first },
  })

  return data.products.edges.map((edge: any) => edge.node)
}

export async function getProductByHandle(handle: string) {
  const { data } = await client.query({
    query: gql`
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          options {
            id
            name
            values
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
                image {
                  originalSrc
                  altText
                }
              }
            }
          }
          images(first: 20) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }
    `,
    variables: { handle },
  })

  return data.productByHandle
}


export async function getProductsByCategory(category: string, first: number = 10) {
  const { data } = await client.query({
    query: gql`
      query GetProductsByCategory($category: String!, $first: Int!) {
        collection(handle: $category) {
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { category, first },
  })

  return data.collection.products.edges.map((edge: any) => edge.node)
}

// export async function createCheckout(lineItems: any[]) {
//   const { data } = await client.mutate({
//     mutation: gql`
//       mutation CartCreate($input: CartInput!) {
//         cartCreate(input: $input) {
//           cart {
//             id
//             checkoutUrl
//             lines(first: 10) {
//               edges {
//                 node {
//                   id
//                   quantity
//                   merchandise {
//                     ... on ProductVariant {
//                       id
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `,
//     variables: {
//       input: {
//         lines: lineItems.map(item => ({
//           quantity: item.quantity,
//           merchandiseId: item.variantId
//         }))
//       }
//     },
//   });

//   return {
//     id: data.cartCreate.cart.id,
//     webUrl: data.cartCreate.cart.checkoutUrl
//   };
// }

export async function getCategories() {
  const { data } = await client.query({
    query: gql`
      query GetCategories {
        collections(first: 10) {
          edges {
            node {
              id
              handle
              title
            }
          }
        }
      }
    `,
  })

  return data.collections.edges.map((edge: any) => edge.node)
}




export async function createCustomer(firstName: string, lastName: string, email: string, password: string) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        firstName,
        lastName,
        email,
        password,
      },
    },
  })

  return data.customerCreate
}

export async function loginCustomer(email: string, password: string) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        email,
        password,
      },
    },
  })

  return data.customerAccessTokenCreate
}

export async function getCustomer(accessToken: string) {
  const { data } = await client.query({
    query: gql`
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
        }
      }
    `,
    variables: {
      customerAccessToken: accessToken,
    },
  })

  return data.customer
}



export async function createCheckout(lineItems: any[]) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        lines: lineItems.map(item => ({
          quantity: item.quantity,
          merchandiseId: item.variantId
        }))
      }
    },
  });

  return data.cartCreate.cart;
}

export async function updateCart(cartId: string, lineItems: any[]) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      lines: lineItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        merchandiseId: item.variantId
      }))
    },
  });

  return data.cartLinesUpdate.cart;
}




export async function getCustomerOrders() {
  const { data } = await client.query({
    query: gql`
      query getCustomerOrders {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: 20) {
            edges {
              node {
                id
                orderNumber
                processedAt
                fulfillmentStatus
                financialStatus
                totalPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      customerAccessToken: localStorage.getItem('customerAccessToken'),
    },
  })

  return data.customer.orders.edges.map((edge: any) => edge.node)
}

export async function getOrderDetails(orderId: string) {
  const { data } = await client.query({
    query: gql`
      query getOrderDetails($orderId: ID!) {
        node(id: $orderId) {
          ... on Order {
            id
            orderNumber
            processedAt
            fulfillmentStatus
            financialStatus
            totalPrice {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              city
              country
              zip
            }
            lineItems(first: 100) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      orderId,
    },
  })

  return data.node
}


export async function fetchPaymentMethods(checkoutId: string) {
  // This is a placeholder function. In a real application, you would fetch
  // available payment methods from Shopify based on the checkout.
  return [
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'apple_pay', name: 'Apple Pay' },
  ]
}



export async function processPayment(cartId: string, paymentMethodId: string) {
  // This is a placeholder function. In a real application, you would
  // integrate with Shopify's payment processing system or a third-party
  // payment processor.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 2000)
  })
}


export async function updateCheckout(checkoutId: string, shippingAddress: any) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation deliveryAddressUpdate($checkoutId: ID!, $address: DeliveryAddressInput!) {
        deliveryAddressUpdate(
          checkoutId: $checkoutId,
          address: $address
        ) {
          checkout {
            id
            deliveryAddress {
              address1
              city
              country
              zip
              firstName
              lastName
            }
          }
          checkoutUserErrors {
            field
            message
            code
          }
        }
      }
    `,
    variables: {
      checkoutId,
      address: {
        address1: shippingAddress.address,
        city: shippingAddress.city,
        countryCode: shippingAddress.country,
        zip: shippingAddress.postalCode,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
      },
    },
  });

  if (data.deliveryAddressUpdate.checkoutUserErrors.length > 0) {
    throw new Error(data.deliveryAddressUpdate.checkoutUserErrors[0].message);
  }

  return data.deliveryAddressUpdate.checkout;
}

export async function updateShippingAddress(cartId: string, shippingAddress: any) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(
          cartId: $cartId,
          buyerIdentity: $buyerIdentity
        ) {
          cart {
            id
            buyerIdentity {
              email
              phone
              deliveryAddressPreferences {
                address1
                city
                country
                zip
                firstName
                lastName
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      buyerIdentity: {
        email: shippingAddress.email,
        deliveryAddressPreferences: [{
          address1: shippingAddress.address,
          city: shippingAddress.city,
          country: shippingAddress.country,
          zip: shippingAddress.postalCode,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName
        }]
      }
    },
  });

  if (data.cartBuyerIdentityUpdate.userErrors.length > 0) {
    throw new Error(data.cartBuyerIdentityUpdate.userErrors[0].message);
  }

  return data.cartBuyerIdentityUpdate.cart;
}

export async function submitCartForCheckout(cartId: string) {
  // First, get a completion attempt token
  const { data: attemptData } = await client.mutate({
    mutation: gql`
      mutation cartSubmitForCompletion($cartId: ID!) {
        cartSubmitForCompletion(cartId: $cartId) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId
    }
  });

  if (attemptData.cartSubmitForCompletion.userErrors.length > 0) {
    throw new Error(attemptData.cartSubmitForCompletion.userErrors[0].message);
  }

  return attemptData.cartSubmitForCompletion.cart;
}

// You'll also need to update the payment method
export async function updateCartPayment(cartId: string, paymentMethod: string) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation cartPaymentUpdate($cartId: ID!, $payment: CartPaymentInput!) {
        cartPaymentUpdate(
          cartId: $cartId,
          payment: $payment
        ) {
          cart {
            id
            paymentMethod {
              id
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId,
      payment: {
        paymentMethodId: paymentMethod
      }
    }
  });

  if (data.cartPaymentUpdate.userErrors.length > 0) {
    throw new Error(data.cartPaymentUpdate.userErrors[0].message);
  }

  return data.cartPaymentUpdate.cart;
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        lines
      }
    }
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}