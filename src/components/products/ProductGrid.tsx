import { ProductCard } from './ProductCard'

interface Product {
  id: string
  title: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  images: {
    edges: {
      node: {
        originalSrc: string
        altText: string
      }
    }[]
  }
}

interface ProductGridProps {
  products: Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}