"use client"

import { useEffect, useState } from "react"

import { toast } from "sonner"
import { Loading } from "../common/loading"
import { EmptyMessage } from "../common/empty-message"
import { ProductItem } from "./product-item"

interface RelatedProductsProps {
  productId: number
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const [related, setRelated] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRelated()
  }, [productId])

  async function loadRelated() {
    setIsLoading(true)

    try {
      const res = await fetch(`/api/products/${productId}/related`)
      if (!res.ok) throw new Error()

      const data = await res.json()
      setRelated(data)
    } catch {
      toast.error("Failed to fetch related products")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading message="Loading related products..." />

  if (related.length === 0)
    return <EmptyMessage message="No related products to show." />

  return (
    <section className="container mx-auto py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {related.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  )
}
