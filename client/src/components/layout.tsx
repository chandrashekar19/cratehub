import type { ReactNode } from "react"
import { Header } from "./header"

interface LayoutProps {
  children: ReactNode
}

// Simple, modern, no Redux, no message UI
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Push page below header */}
      <main className="pt-16 flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout
