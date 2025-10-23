import { toast } from "sonner"

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

const API_URL = "/api/subscriptions"

// Admin - get all subscriptions
export async function fetchSubscriptions(): Promise<Subscription[]> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to load subscriptions")
    return []
  }
}

//  Logged in user - get user's own subscriptions
export async function fetchSubscriptionsByUser(): Promise<Subscription[]> {
  try {
    const res = await fetch(`${API_URL}/me`)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Failed to load your subscriptions")
    return []
  }
}

//  Get single subscription by ID
export async function fetchSubscription(id: number): Promise<Subscription | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) throw new Error()
    return await res.json()
  } catch {
    toast.error("Subscription not found")
    return null
  }
}

//  Create subscription (User action)
export async function createSubscription(crateId: number) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crateId }),
    })
    if (!res.ok) throw new Error()
    toast.success("Subscription added!")
  } catch {
    toast.error("Failed to subscribe")
  }
}

//  Remove subscription
export async function deleteSubscription(id: number) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error()
    toast.success("Subscription removed!")
  } catch {
    toast.error("Failed to remove subscription")
  }
}
