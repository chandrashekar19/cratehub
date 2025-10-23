import ProductDetail from "@/components/products/product-detail";


export const productRoutes = {
  product: {
    path: (slug = ":slug") => `/product/${slug}`,
    element: <ProductDetail />,
  },
}
