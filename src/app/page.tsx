import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/shopify'
export default async function Home() {
  const products = await getProducts(10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Luxury Timepieces</h1>
      <ProductGrid products={products} />
    </div>
  )
}