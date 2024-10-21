import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    title: string
    handle: string
    priceRange: {
      minVariantPrice: {
        amount: string
      }
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

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, handle, priceRange, images } = product
  const price = formatPrice(priceRange.minVariantPrice.amount)
  const imageUrl = images.edges[0]?.node.originalSrc || '/images/placeholder.jpg'
  const imageAlt = images.edges[0]?.node.altText || title

  return (
    <Link href={`/product/${handle}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
    </Link>
  )
}