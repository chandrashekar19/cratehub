import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { Product } from "@/services/products"
import type { Crate } from "@/services/crate"
import type { Subscription } from "@/services/subscriptions"

import * as productService from "@/services/products"
import * as crateService from "@/services/crate"
import * as subscriptionService from "@/services/subscriptions"
import type { User } from "@/types/user"

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
  loadProducts: () => Promise<void>

  // Crates
  crates: Crate[]
  loadCrates: () => Promise<void>

  // Subscriptions
  subscriptions: Subscription[]
  mySubscriptions: Subscription[]
  loadSubscriptions: () => Promise<void>
  loadMySubscriptions: () => Promise<void>

  reset: () => void
}

// Load stored auth
const storedUser = localStorage.getItem("auth_user")
const storedToken = localStorage.getItem("auth_token")

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),

    // Auth
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!(storedUser && storedToken),

    setAuth: (user, token) => {
      localStorage.setItem("auth_user", JSON.stringify(user))
      localStorage.setItem("auth_token", token)
      set({ user, token, isAuthenticated: true })
    },

    logout: () => {
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
      set({ user: null, token: null, isAuthenticated: false })
    },

    // Products
    products: [],
    loadProducts: async () => {
      const list = await productService.fetchProducts()
      set({ products: list })
    },

    // Crates
    crates: [],
    loadCrates: async () => {
      const list = await crateService.fetchCrates()
      set({ crates: list })
    },

    // Subscriptions
    subscriptions: [],
    mySubscriptions: [],
    loadSubscriptions: async () => {
      const list = await subscriptionService.fetchSubscriptions()
      set({ subscriptions: list })
    },
    loadMySubscriptions: async () => {
      const list = await subscriptionService.fetchSubscriptionsByUser()
      set({ mySubscriptions: list })
    },

    reset: () =>
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        products: [],
        crates: [],
        subscriptions: [],
        mySubscriptions: [],
      }),
  }))
)
