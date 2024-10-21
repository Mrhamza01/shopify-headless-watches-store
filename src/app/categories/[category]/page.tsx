import { CategorySidebar } from '@/components/categories/CategorySidebar'
import { ProductList } from '@/components/categories/ProuctList'
import { getProductsByCategory } from '@/lib/shopify'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await getProductsByCategory(params.category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        {params.category.charAt(0).toUpperCase() + params.category.slice(1)} Watches
      </h1>
      <div className="flex">
        <CategorySidebar />
        <div className="flex-1">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  )
}