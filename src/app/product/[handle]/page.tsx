import { ProductDetails } from '@/components/products/ProductDetails'
import { getProductByHandle } from '@/lib/shopify'

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle)

  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductDetails product={product} />
}