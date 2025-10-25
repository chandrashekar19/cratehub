import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useAppStore } from "@/hooks/use-app-store"
import { Header } from "./header"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { isAuthenticated } = useAppStore()

  const authPages = ["/user/login", "/user/signup"]
  const isAuthPage = authPages.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show header ONLY when logged in */}
      {isAuthenticated && !isAuthPage && <Header />}

      <main
        className={`
          flex-1
          ${isAuthenticated && !isAuthPage ? "pt-16" : "flex items-center justify-center"}
        `}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
