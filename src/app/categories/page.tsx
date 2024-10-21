import { Suspense } from 'react'
import { CategorySidebar } from '@/components/categories/CategorySidebar'
import { ProductList } from '@/components/categories/ProuctList'
import { getCategories, getProductsByCategory } from '@/lib/shopify'

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categories = await getCategories()
  const selectedCategory = typeof searchParams.category === 'string' ? searchParams.category : categories[0].handle

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Shop by Category</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <CategorySidebar categories={categories} selectedCategory={selectedCategory} />
        <div className="flex-1">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductListWrapper category={selectedCategory} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function ProductListWrapper({ category }: { category: string }) {
  const products = await getProductsByCategory(category)
  return <ProductList products={products} />
}