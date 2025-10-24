import { useAppStore } from "@/hooks/use-app-store"
import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API, // Example: http://localhost:3000/api
  withCredentials: false,
})

// Attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ❌ Handle unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAppStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
