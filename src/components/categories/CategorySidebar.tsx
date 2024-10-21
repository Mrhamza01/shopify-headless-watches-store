'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Category {
  handle: string
  title: string
}

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory: string
}

export function CategorySidebar({ categories, selectedCategory }: CategorySidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="w-full md:w-64 mb-8 md:mb-0">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.handle}>
            <Link
              href={`${pathname}?category=${category.handle}`}
              className={`block py-2 px-4 rounded ${
                category.handle === selectedCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}