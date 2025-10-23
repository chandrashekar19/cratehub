import { API_URL } from "@/env"
import { useAppStore } from "@/hooks/use-app-store"



//  Login
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) return { error: "Invalid credentials" }

  const data = await res.json()
  useAppStore.getState().setUser(data.user)

  return { user: data.user }
}

//  Signup
export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok) return { error: "Signup failed" }

  const data = await res.json()
  return { user: data.user }
}

// Logout
export function logout() {
  useAppStore.getState().logout()
}
