// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!endpoint || !key) {
  throw new Error('Shopify environment variables are not set');
}

const httpLink = createHttpLink({
  uri: `https://${endpoint}/api/2024-10/graphql.json`, // Shopify Storefront API
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token': key,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
