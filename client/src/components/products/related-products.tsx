
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loading } from "../common/loading"
import { EmptyMessage } from "../common/empty-message"
import { ProductItem } from "./product-item"
import type { Product } from "@/services/products"
import { api } from "@/lib/api"

interface RelatedProductsProps {
  productId: number
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const [related, setRelated] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (productId) loadRelated()
  }, [productId])

  async function loadRelated() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/products/${productId}/related`)
      setRelated(data || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load related products ❌")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading message="Loading related products..." />

  if (!related.length) return <EmptyMessage message="No related products to show." />

  return (
    <section className="container mx-auto py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {related.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  )
}
