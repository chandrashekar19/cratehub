import { api } from "@/lib/api"
import type { ApiError } from "@/types/http"
import type { AxiosError } from "axios"
import { toast } from "sonner"

export interface Crate {
  id: number
  name: string
  description: string
  image?: string
  createdAt?: string
  updatedAt?: string
}

const ENDPOINT = "/crates"

//  Fetch all crates
export async function fetchCrates(): Promise<Crate[]> {
  try {
    const { data } = await api.get(ENDPOINT)
    return data
  } catch (err) {
      const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to load crates")
    return []
  }
}

// Get single crate
export async function fetchCrateById(id: number): Promise<Crate | null> {
  try {
    const { data } = await api.get(`${ENDPOINT}/${id}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to fetch crate")
    return null
  }
}

// Create a crate
export async function createCrate(payload: Omit<Crate, "id">): Promise<boolean> {
  try {
    await api.post(ENDPOINT, payload)
    toast.success("Crate created successfully ✅")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to create crate ❌")
    return false
  }
}

// Update crate
export async function updateCrate(id: number, payload: Partial<Crate>): Promise<boolean> {
  try {
    await api.put(`${ENDPOINT}/${id}`, payload)
    toast.success("Crate updated successfully ✅")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to update crate ❌")
    return false
  }
}

//  Delete crate
export async function deleteCrate(id: number): Promise<boolean> {
  try {
    await api.delete(`${ENDPOINT}/${id}`)
    toast.success("Crate deleted successfully 🗑️")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to delete crate ❌")
    return false
  }
}
