
import { useAppStore } from "@/hooks/use-app-store"
import { api } from "@/lib/api"
import type { ApiError } from "@/types/http"
import type { AxiosError } from "axios"
import { toast } from "sonner"

interface User {
  id?: string
  name: string
  email?: string
  // allow other optional fields coming from the API, typed as unknown to avoid `any`
  [key: string]: unknown
}

interface AuthResponse {
  user?: User
  error?: string
}

//  LOGIN
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await api.post("/auth/login", { email, password })
    const { user, token } = res.data

    useAppStore.getState().setAuth(user, token)

    toast.success(`Welcome back, ${user.name}! 👋`)
    return { user }
  } catch (err) {
      const error = err as AxiosError<ApiError>
    const message = error.response?.data?.message || "Invalid credentials"
    toast.error(message)
    return { error: message }
  }
}

//  SIGNUP
export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await api.post("/auth/signup", {
      name,
      email,
      password,
    })

    const { user, token } = res.data

    useAppStore.getState().setAuth(user, token)

    toast.success("Account created successfully 🎉")
    return { user }
  } catch (err) {
    const error = err as AxiosError<ApiError>
    const message = error.response?.data?.message || "Signup failed"
    toast.error(message)
    return { error: message }
  }
}

//  LOGOUT
export function logout() {
  useAppStore.getState().logout()
  toast("You have been logged out 👋")
}
