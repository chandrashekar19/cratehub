import { useAppStore } from "@/hooks/use-app-store"
import { userRoutes } from "@/routes/user-routes"
import { Navigate, Outlet } from "react-router-dom"

interface RoutePrivateProps {
  role?: "ADMIN" | "USER"
}

/**
 * Protects private routes.
 * Usage:
 * <Route element={<RoutePrivate role="ADMIN" />}>
 *    <Route path="/admin/dashboard" element={<Dashboard />} />
 * </Route>
 */
export function RoutePrivate({ role }: RoutePrivateProps) {
  const { isAuthenticated, user } = useAppStore()

  if (!isAuthenticated) {
    return <Navigate to={userRoutes.login.path} replace />
  }

  if (role && user?.role !== role) {
    return <Navigate to={userRoutes.login.path} replace />
  }

  return <Outlet />
}
