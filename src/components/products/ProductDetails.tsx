'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cartStore'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Variant {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  image: {
    originalSrc: string
    altText: string
  }
}

interface ProductDetailsProps {
  product: {
    id: string
    title: string
    description: string
    options: {
      id: string
      name: string
      values: string[]
    }[]
    variants: {
      edges: {
        node: Variant
      }[]
    }
    images: {
      edges: {
        node: {
          originalSrc: string
          altText: string
        }
      }[]
    }
  }
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [mainImage, setMainImage] = useState(product.images.edges[0].node.originalSrc)
  const { addItem } = useCartStore()

  useEffect(() => {
    // Initialize selected options with the first available option for each type
    const initialOptions: Record<string, string> = {}
    product.options.forEach(option => {
      initialOptions[option.name] = option.values[0]
    })
    setSelectedOptions(initialOptions)
  }, [product.options])

  useEffect(() => {
    // Find the variant that matches the selected options
    const matchingVariant = product.variants.edges.find(({ node }) => 
      node.selectedOptions.every(option => 
        selectedOptions[option.name] === option.value
      )
    )?.node || null

    setSelectedVariant(matchingVariant)
    if (matchingVariant && matchingVariant.image) {
      setMainImage(matchingVariant.image.originalSrc)
    }
  }, [selectedOptions, product.variants.edges])

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }))
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem({
        id: selectedVariant.id,
        title: `${product.title} - ${selectedVariant.title}`,
        price: parseFloat(selectedVariant.price.amount),
        quantity: 1,
        image: selectedVariant.image.originalSrc,
        variantTitle: selectedVariant.title,
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-6">
              {product.images.edges.map(({ node }, index) => (
                <div
                  key={index}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  onClick={() => setMainImage(node.originalSrc)}
                >
                  <Image
                    src={node.originalSrc}
                    alt={node.altText || product.title}
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
              src={mainImage}
              alt={product.title}
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
            <p className="text-3xl text-gray-900">
              {selectedVariant ? formatPrice(selectedVariant.price.amount) : 'Price varies'}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          <div className="mt-6">
            {product.options.map((option) => (
              <div key={option.id} className="mb-4">
                <Label className="text-sm text-gray-600 font-medium mb-2">{option.name}</Label>
                <RadioGroup
                  defaultValue={selectedOptions[option.name]}
                  onValueChange={(value) => handleOptionChange(option.name, value)}
                  className="flex flex-wrap gap-2"
                >
                  {option.values.map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`${option.name}-${value}`} className="sr-only peer" />
                      <Label
                        htmlFor={`${option.name}-${value}`}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium uppercase bg-white border rounded-md cursor-pointer peer-data-[state=checked]:bg-indigo-600 peer-data-[state=checked]:text-white hover:bg-gray-50 peer-data-[state=checked]:hover:bg-indigo-700"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
            >
              {selectedVariant && selectedVariant.availableForSale ? 'Add to bag' : 'Out of stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}