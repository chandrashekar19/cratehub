import { toast } from "sonner"

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  image: string
  type?: number
  gender?: number
  createdAt?: string
  updatedAt?: string
}

const API_URL = "/api/products"

// Get all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to load products")
    return []
  }
}

//  Get product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to fetch product")
    return null
  }
}

//  Get product by slug (public detail page)
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/slug/${slug}`)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Product not found")
    return null
  }
}

//  Create product
export async function createProduct(product: Omit<Product, "id">) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error()
    toast.success("Product created!")
  } catch {
    toast.error("Failed to create product")
  }
}

//  Update product
export async function updateProduct(id: number, product: Partial<Product>) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error()
    toast.success("Product updated!")
  } catch {
    toast.error("Failed to update product")
  }
}

//  Delete product
export async function deleteProduct(id: number) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error()
    toast.success("Product deleted!")
  } catch {
    toast.error("Failed to delete product")
  }
}

//  Get product types
export async function fetchProductTypes(): Promise<{ id: number; name: string }[]> {
  try {
    const res = await fetch("/api/product-types")
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to load product types")
    return []
  }
}
