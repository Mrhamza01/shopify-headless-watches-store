'use client'; // Ensure this file is treated as a client-side component

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/appolloClient';

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
