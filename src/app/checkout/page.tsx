'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cartStore'
import { createCart, updateShippingAddress, fetchPaymentMethods, updateCartPayment, submitCartForCheckout } from '@/lib/shopify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Truck, MapPin } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface PaymentMethod {
  id: string;
  name: string;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const [cartId, setCartId] = useState<string | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })

  useEffect(() => {
    const initializeCart = async () => {
      if (items.length > 0) {
        try {
          const cart = await createCart(items.map(item => ({
            merchandiseId: item.id,
            quantity: item.quantity
          })))
          setCartId(cart.id)
          // Fetch payment methods
          const methods = await fetchPaymentMethods(cart.id)
          setPaymentMethods(methods)
        } catch (error) {
          console.error('Error initializing cart:', error)
          toast({
            title: "Cart Error",
            description: "Failed to create cart. Please try again.",
            variant: "destructive",
          })
        }
      }
    }

    initializeCart()
  }, [items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cartId) {
      toast({
        title: "Cart Error",
        description: "No active cart found. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      // Update cart with customer information
      await updateShippingAddress(cartId, formData)

      // Update payment method
      await updateCartPayment(cartId, selectedPaymentMethod)

      // Submit cart for completion
      await submitCartForCheckout(cartId)

      clearCart()
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been submitted for processing.",
      })
      console.log("Order Placed Successfully")
      router.push('/account/orders')
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "An error occurred during checkout. Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" /> Shipping Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" /> Payment Method
            </h2>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id}>{method.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <Separator />
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Truck className="mr-2" /> Order Summary
          </h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>{formatPrice(items.reduce((acc, item) => acc + item.price * item.quantity, 0))}</span>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Place Order
        </Button>
      </form>
    </div>
  )
}