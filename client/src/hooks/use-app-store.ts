import { create } from "zustand"
import { devtools } from "zustand/middleware"

// ----- Types -----
export interface User {
  id: number
  name: string
  email: string
  role?: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  image: string
}

export interface Subscription {
  id: number
  createdAt: string
  crate: {
    id: number
    name: string
    description: string
    image?: string
  }
}

export interface Crate {
  id: number
  name: string
  description: string
  image?: string
}

// ----- State Interface -----
interface AppState {
  loading: boolean
  setLoading: (value: boolean) => void

  // Auth
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void

  // Products
  products: Product[]
  fetchProducts: () => Promise<void>

  // Subscriptions
  subscriptions: Subscription[]
  subscriptionByUser: Subscription[]
  fetchSubscriptions: () => Promise<void>
  fetchSubscriptionsByUser: () => Promise<void>

  // Crates
  crates: Crate[]
  fetchCrates: () => Promise<void>

  reset: () => void
}

// ----- Load user on start -----
const savedUser = localStorage.getItem("user")
const parsedUser = savedUser ? (JSON.parse(savedUser) as User) : null

// ----- Zustand Store -----
export const useAppStore = create<AppState>()(
  devtools((set) => ({
    // Common
    loading: false,
    setLoading: (value) => set({ loading: value }),

    // Auth Slice
    user: parsedUser,
    isAuthenticated: !!parsedUser,

    setUser: (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
      set({ user, isAuthenticated: !!user })
    },

    logout: () => {
      localStorage.removeItem("user")
      set({ user: null, isAuthenticated: false })
    },

    // Product Slice
    products: [],
    fetchProducts: async () => {
      try {
        const res = await fetch("/api/products")
        const data = (await res.json()) as Product[]
        set({ products: data })
      } catch {
        console.error("Failed to load products")
      }
    },

    // Subscription Slice
    subscriptions: [],
    subscriptionByUser: [],

    fetchSubscriptions: async () => {
      const res = await fetch("/api/subscriptions")
      const data = (await res.json()) as Subscription[]
      set({ subscriptions: data })
    },

    fetchSubscriptionsByUser: async () => {
      const res = await fetch("/api/subscriptions/me")
      const data = (await res.json()) as Subscription[]
      set({ subscriptionByUser: data })
    },

    // Crate Slice
    crates: [],
    fetchCrates: async () => {
      const res = await fetch("/api/crates")
      const data = (await res.json()) as Crate[]
      set({ crates: data })
    },

    // Global Reset
    reset: () =>
      set({
        loading: false,
        user: null,
        isAuthenticated: false,
        products: [],
        subscriptions: [],
        subscriptionByUser: [],
        crates: [],
      }),
  }))
)
