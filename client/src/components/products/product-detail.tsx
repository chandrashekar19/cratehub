"use client"

import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Helmet } from "react-helmet-async"
import { toast } from "sonner"
import { fetchProductBySlug, type Product } from "@/services/products"
import { homeRoutes } from "@/routes/home-routes"
import  {Loading } from "@/components/common/loading"
import RelatedProducts from "@/components/products/related-products"

const IMAGE_BASE = import.meta.env.VITE_APP_URL + "/uploads/"

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      try {
        setIsLoading(true)
        const data = await fetchProductBySlug(slug)
        if (!data) throw new Error("Product not found")
        setProduct(data)
      } catch {
        setNotFound(true)
        toast.error("Product not found ❌")
      } finally {
        setIsLoading(false)
      }
    })()
  }, [slug])

  if (notFound) return <Navigate to={homeRoutes.whatsNew.path} replace />
  if (isLoading) return <Loading message="Loading product..." />
  if (!product) return null

  return (
    <div>
      <Helmet>
        <title>{product.name} - Crate</title>
      </Helmet>

      {/* Title bar */}
      <section className="bg-muted py-8 text-center">
        <h1 className="text-3xl font-bold">Product</h1>
      </section>

      {/* Product details */}
      <section className="container mx-auto py-10 grid md:grid-cols-2 gap-10 px-6">
        <Card className="p-0 overflow-hidden shadow-md">
          <img
            src={product.image?.startsWith("http") ? product.image : IMAGE_BASE + product.image}
            alt={product.name}
            className="w-full h-auto"
          />
        </Card>

        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-muted-foreground">{product.description}</p>

          {product.createdAt && (
            <p className="text-sm text-muted-foreground">
              Added on {new Date(product.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </section>

      {/* Related products */}
      <section className="bg-muted py-8 text-center">
        <h3 className="text-xl font-semibold">Related Products</h3>
      </section>

      {/* This renders the grid of related items */}
      {typeof product.id === "number" && product.id > 0 && (
        <RelatedProducts productId={product.id} />
      )}
    </div>
  )
}

export default ProductDetail
