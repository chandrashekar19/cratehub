"use client"

import type { FC } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Product } from "@/services/products"
import { productRoutes } from "@/routes/product-routes"

interface ProductItemProps {
  product: Product
  className?: string
}

export const ProductItem: FC<ProductItemProps> = ({ product, className }) => {
  return (
    <Link
      to={productRoutes.product.path(product.slug)}
      className={cn("group block", className)}
    >
      <Card className="overflow-hidden transition shadow-sm hover:shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition group-hover:scale-105"
        />
        <CardContent className="p-4">
          <h4 className="text-lg font-semibold">{product.name}</h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
