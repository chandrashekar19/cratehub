import { useAppStore } from "@/hooks/use-app-store"
import { adminRoutes } from "@/routes/admin-routes";
import { crateRoutes } from "@/routes/crate-routes";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function AuthCheck() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "ADMIN") {
        navigate(adminRoutes.dashboard.path, { replace: true })
      } else {
        navigate(crateRoutes.list.path, { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  return null
}
