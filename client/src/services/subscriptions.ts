import { api } from "@/lib/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import type { ApiError } from "@/types/http"


export interface Subscription {
  id: number
  user?: {
    name: string
    email: string
  }
  crate?: {
    id: number
    name: string
    description: string
  }
  createdAt: string
}

const ENDPOINT = "/subscriptions"

// Admin - Get all subscriptions
export async function fetchSubscriptions(): Promise<Subscription[]> {
  try {
    const { data } = await api.get(ENDPOINT)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to load subscriptions")
    return []
  }
}

//  Logged-in user subscriptions
export async function fetchSubscriptionsByUser(): Promise<Subscription[]> {
  try {
    const { data } = await api.get(`${ENDPOINT}/me`)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to load your subscriptions")
    return []
  }
}

//  Get single subscription
export async function fetchSubscription(id: number): Promise<Subscription | null> {
  try {
    const { data } = await api.get(`${ENDPOINT}/${id}`)
    return data
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Subscription not found")
    return null
  }
}

//  Create subscription
export async function createSubscription(crateId: number): Promise<boolean> {
  try {
    await api.post(ENDPOINT, { crateId })
    toast.success("Subscription added ✅")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to subscribe")
    return false
  }
}

//  Remove subscription
export async function deleteSubscription(id: number): Promise<boolean> {
  try {
    await api.delete(`${ENDPOINT}/${id}`)
    toast.success("Subscription removed 🗑️")
    return true
  } catch (err) {
    const error = err as AxiosError<ApiError>
    toast.error(error.response?.data?.message || "Failed to remove subscription")
    return false
  }
}
