

import type { FC, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  to: string
  children: ReactNode
  className?: string
}

export const MenuItem: FC<MenuItemProps> = ({ to, children, className }) => {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 text-sm rounded-md uppercase transition-colors",
        "hover:bg-primary/10 hover:text-primary",
        isActive && "bg-primary text-white font-semibold shadow-sm",
        className
      )}
    >
      {children}
    </Link>
  )
}
