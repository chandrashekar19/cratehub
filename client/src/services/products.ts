import { api } from "@/lib/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import type { ApiError } from "@/types/http"

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

const ENDPOINT = "/products"

//  Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get(ENDPOINT)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to load products")
    return []
  }
}

//  Fetch product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data } = await api.get(`${ENDPOINT}/${id}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to fetch product")
    return null
  }
}

//  Fetch product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data } = await api.get(`${ENDPOINT}/slug/${slug}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Product not found")
    return null
  }
}

//  Create product
export async function createProduct(payload: Omit<Product, "id">): Promise<boolean> {
  try {
    await api.post(ENDPOINT, payload)
    toast.success("Product created successfully ✅")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to create product")
    return false
  }
}

// Update product
export async function updateProduct(id: number, payload: Partial<Product>): Promise<boolean> {
  try {
    await api.put(`${ENDPOINT}/${id}`, payload)
    toast.success("Product updated ✅")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to update product")
    return false
  }
}

//  Delete product
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    await api.delete(`${ENDPOINT}/${id}`)
    toast.success("Product deleted 🗑️")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to delete product")
    return false
  }
}

//  Fetch product types (admin form)
export async function fetchProductTypes(): Promise<{ id: number; name: string }[]> {
  try {
    const { data } = await api.get("/product-types")
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to load product types")
    return []
  }
}
