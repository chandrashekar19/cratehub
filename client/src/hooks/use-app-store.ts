import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { api } from "@/lib/api"

export interface User {
  id: number
  name: string
  email: string
  role: "USER" | "ADMIN"
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

// ----- Load persisted auth -----
const savedUser = localStorage.getItem("auth_user")
const savedToken = localStorage.getItem("auth_token")

const initialUser = savedUser ? (JSON.parse(savedUser) as User) : null
const initialToken = savedToken ? savedToken : null

export interface AppState {
  loading: boolean
  setLoading: (value: boolean) => void

  // Auth
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
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

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),

    // Auth
    user: initialUser,
    token: initialToken,
    get isAuthenticated() {
      return !!(initialUser && initialToken)
    },

    setAuth: (user, token) => {
      localStorage.setItem("auth_user", JSON.stringify(user))
      localStorage.setItem("auth_token", token)
      set({ user, token })
    },

    logout: () => {
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
      set({ user: null, token: null })
    },

    // Products
    products: [],
    fetchProducts: async () => {
      set({ loading: true })
      try {
        const { data } = await api.get("/products")
        set({ products: data })
      } finally {
        set({ loading: false })
      }
    },

    // Subscriptions
    subscriptions: [],
    subscriptionByUser: [],
    fetchSubscriptions: async () => {
      const { data } = await api.get("/subscriptions")
      set({ subscriptions: data })
    },
    fetchSubscriptionsByUser: async () => {
      const { data } = await api.get("/subscriptions/me")
      set({ subscriptionByUser: data })
    },

    // Crates
    crates: [],
    fetchCrates: async () => {
      const { data } = await api.get("/crates")
      set({ crates: data })
    },

    reset: () =>
      set({
        loading: false,
        user: null,
        token: null,
        products: [],
        subscriptions: [],
        subscriptionByUser: [],
        crates: [],
      }),
  }))
)
