import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppStore } from "@/hooks/use-app-store"
import { homeRoutes } from "@/routes/home-routes"

export function AuthAdminCheck() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") {
      navigate(homeRoutes.home.path, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  return null
}
