"use client"

import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Helmet } from "react-helmet-async"
import { toast } from "sonner"
import { fetchProductBySlug, type Product } from "@/apis/products"
import { productRoutes } from "@/routes/product-routes"
import { Loading } from "../common/loading"
import RelatedProducts from "./related-products"

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    loadProduct(slug)
  }, [slug])

  async function loadProduct(slug: string) {
    setIsLoading(true)
    const data = await fetchProductBySlug(slug)
    setIsLoading(false)

    if (!data) {
      toast.error("Product not found")
      setNotFound(true)
    } else {
      setProduct(data)
    }
  }

  if (notFound) return <Navigate to={productRoutes.product.path()} replace />

  if (isLoading) return <Loading message="Loading product..." />

  if (!product) return null

  return (
    <div>
      <Helmet>
        <title>{product.name} - Product</title>
      </Helmet>

      {/* Title bar */}
      <section className="bg-muted py-8 text-center">
        <h1 className="text-3xl font-bold">Product</h1>
      </section>

      {/* Product details */}
      <section className="container mx-auto py-10 grid md:grid-cols-2 gap-10 px-6">
        {/* Image */}
        <Card className="p-0 overflow-hidden shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </Card>

        {/* Content */}
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-muted-foreground">{product.description}</p>

          {product.createdAt && (
            <p className="text-sm text-muted-foreground">
              Added on{" "}
              {new Date(product.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-muted py-8 text-center">
        <h3 className="text-xl font-semibold">Related Products</h3>
      </section>

      <RelatedProducts productId={product.id} />
    </div>
  )
}

export default ProductDetail
