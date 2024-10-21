'use client';

import { useQuery, gql } from '@apollo/client';
import client from '@/lib/appolloClient';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Define GraphQL query
const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 6) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`;

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[200px] object-cover"
            />
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>${product.price}</span>
          <Button>Add to Cart</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProductSection = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    client,
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.error('Error fetching product data:', error);
    return <h1>Failed to load product data</h1>;
  }

  const products: Product[] = data.products.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    image:
      node.images.edges[0]?.node.originalSrc ||
      'https://via.placeholder.com/300x200?text=No+Image',
  }));

  const newArrivals = products.slice(0, 3);
  const topSellers = products.slice(3, 6);

  return (
    <div className="bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-screen bg-gray-900 flex items-center justify-center"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-6xl font-bold text-white"
        >
          Welcome to Our Watch Store
        </motion.h1>
      </motion.div>
      <div className="container mx-auto px-4">
        <ProductSection title="New Arrivals" products={newArrivals} />
        <ProductSection title="Top Sellers" products={topSellers} />
      </div>
    </div>
  );
}
