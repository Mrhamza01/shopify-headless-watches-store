import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/appolloClient'; // import Apollo Client
import ApolloProviderWrapper from '../lib/ApolloProviderWrapper';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Fotter';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'faizan store',
  description: 'Premium Watches you can ever imagine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProviderWrapper>
        {' '}
        {/* Use the client-side ApolloProvider */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </ApolloProviderWrapper>
    </html>
  );
}
