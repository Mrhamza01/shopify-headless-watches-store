'use client'

import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { createCheckout } from '@/lib/shopify'

export const CartDrawer = () => {
  const { isOpen, toggleCart, items, removeItem, updateQuantity } = useCartStore()

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    const lineItems = items.map(item => ({
      variantId: item.id,
      quantity: item.quantity,
    }))

    try {
      const checkout = await createCheckout(lineItems)
      window.location.href = checkout.webUrl
    } catch (error) {
      console.error('Error creating checkout:', error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p className="ml-4">{formatPrice((item.price * item.quantity))}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <p className="mx-2">Qty {item.quantity}</p>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(String(total))}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Button onClick={handleCheckout} className="w-full">
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}