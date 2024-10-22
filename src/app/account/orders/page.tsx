'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCustomerOrders } from '@/lib/shopify'
import { formatDate, formatPrice } from '@/lib/utils'
import { Package, CheckCircle, Clock } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  processedAt: string
  fulfillmentStatus: string
  financialStatus: string
  totalPrice: {
    amount: string
    currencyCode: string
  }
}

export default function OrdersPage() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([])
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getCustomerOrders()
      setPendingOrders(orders.filter((order:any) => order.fulfillmentStatus !== 'FULFILLED'))
      setCompletedOrders(orders.filter((order:any)  => order.fulfillmentStatus === 'FULFILLED'))
    }
    fetchOrders()
  }, [])

  const OrderCard = ({ order }: { order: Order }) => (
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
        <div className="flex justify-between items-center">
          <span>Total: {formatPrice(order.totalPrice.amount)}</span>
          <Badge variant={order.financialStatus === 'PAID' ? 'default' : 'destructive'}>
            {order.financialStatus}
          </Badge>
        </div>
        <Button variant="outline" className="mt-4 w-full" onClick={() => viewOrderDetails(order.id)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )

  const viewOrderDetails = (orderId: string) => {
    // Navigate to order details page
    // router.push(`/account/orders/${orderId}`)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center">
            <Clock className="mr-2" /> Pending Orders
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <CheckCircle className="mr-2" /> Completed Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {pendingOrders.length > 0 ? (
            <div className="grid gap-4 mt-4">
              {pendingOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">No pending orders</p>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {completedOrders.length > 0 ? (
            <div className="grid gap-4 mt-4">
              {completedOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">No completed orders</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}