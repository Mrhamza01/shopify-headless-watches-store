'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCartStore } from '@/lib/store/cartStore'

interface ProductDetailsProps {
  product: any // Type this properly based on your Shopify product structure
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0].node)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant.id,
      title: product.title,
      price: parseFloat(selectedVariant.price),
      quantity: 1,
      image: product.images.edges[0].node.originalSrc,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-6">
              {product.images.edges.map((image: any, index: number) => (
                <div key={index} className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                  <Image
                    src={image.node.originalSrc}
                    alt={image.node.altText || product.title}
                    width={96}
                    height={96}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full aspect-w-1 aspect-h-1">
            <Image
              src={product.images.edges[0].node.originalSrc}
              alt={product.images.edges[0].node.altText || product.title}
              width={600}
              height={600}
              className="w-full h-full object-center object-cover sm:rounded-lg"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{formatPrice(selectedVariant.price.amount)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600 font-medium">Variant</h3>
              <Select onValueChange={(value) => setSelectedVariant(product.variants.edges.find((v: any) => v.node.id === value).node)}>
                <SelectTrigger className="w-[180px] ml-3">
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.edges.map((variant: any) => (
                    <SelectItem key={variant.node.id} value={variant.node.id}>
                      {variant.node.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <Button onClick={handleAddToCart} className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
              Add to bag
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}