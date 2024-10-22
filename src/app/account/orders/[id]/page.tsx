'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getOrderDetails } from '@/lib/shopify'
import { formatDate, formatPrice } from '@/lib/utils'
import { Package, Truck, MapPin, CreditCard } from 'lucide-react'

interface OrderDetails {
  id: string
  orderNumber: string
  processedAt: string
  fulfillmentStatus: string
  financialStatus: string
  totalPrice: {
    amount: string
    currencyCode: string
  }
  shippingAddress: {
    address1: string
    city: string
    country: string
    zip: string
  }
  lineItems: {
    title: string
    quantity: number
    variant: {
      price: {
        amount: string
      }
    }
  }[]
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDetails = await getOrderDetails(params.id)
      setOrder(orderDetails)
    }
    fetchOrderDetails()
  }, [params.id])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        &larr; Back to Orders
      </Button>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Order #{order.orderNumber}
            <Badge variant={order.fulfillmentStatus === 'FULFILLED' ? 'default' : 'secondary'}>
              {order.fulfillmentStatus}
            </Badge>
          </CardTitle>
          <CardDescription>{formatDate(order.processedAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Package className="mr-2" /> Items
              </h2>
              {order.lineItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>{formatPrice(item.variant.price.amount)}</span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{formatPrice(order.totalPrice.amount)}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Truck className="mr-2" /> Shipping Details
              </h2>
              <p>{order.shippingAddress.address1}</p>
              
              <p>{order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.zip}</p>
              <h2 className="text-xl font-semibold mt-4 mb-2 flex items-center">
                <CreditCard className="mr-2" /> Payment Status
              </h2>
              <Badge variant={order.financialStatus === 'PAID' ? 'default' : 'destructive'}>
                {order.financialStatus}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}