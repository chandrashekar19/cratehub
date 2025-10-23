"use client"

import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { ArrowRight } from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { Loading } from "@/components/common/loading"
import { ProductItem } from "@/components/products/product-item"
import { EmptyMessage } from "@/components/common/empty-message"

export default function WhatsNew() {
  const {
    products,
    fetchProducts,
    isAuthenticated,
  } = useAppStore()

  useEffect(() => {
    if (products.length === 0) fetchProducts()
  }, [])

  return (
    <>
      <Helmet>
        <title>What's New - Crate</title>
      </Helmet>

      {/* Header */}
      <section className="bg-muted py-12 px-6 text-center">
        <h2 className="text-4xl font-bold">What's New</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Stay updated with the latest fashion we add to Crate.
        </p>
      </section>

      {/* Product List */}
      <section className="container mx-auto px-6 py-10">
        {products.length === 0 ? (
          <Loading message="Loading products..." />
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyMessage message="No new products yet!" />
        )}
      </section>

      {/* CTA */}
      <section className="bg-muted py-12 text-center">
        <p className="text-muted-foreground mb-4">
          See something you like?
        </p>

        <Link to={isAuthenticated ? "/crates" : "/user/signup"}>
          <Button size="lg" className="flex gap-2 mx-auto">
            {isAuthenticated ? "Subscribe" : "Get Started"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </>
  )
}
