'use client'

import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { Button } from '@/components/ui/button'

export const CartIcon = () => {
  const { items, toggleCart } = useCartStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={toggleCart}
    >
      <ShoppingBag className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {items.length}
        </span>
      )}
    </Button>
  )
}