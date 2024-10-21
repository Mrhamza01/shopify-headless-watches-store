import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/shopify'
export default async function ShopPage() {
  const products = await getProducts(20)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Shop All Watches</h1>
      <ProductGrid products={products} />
    </div>
  )
}