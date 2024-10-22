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

export async function createCheckout(lineItems: any[]) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
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

  return {
    id: data.cartCreate.cart.id,
    webUrl: data.cartCreate.cart.checkoutUrl
  };
}

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

