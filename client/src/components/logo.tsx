"use client"

import type { FC } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { homeRoutes } from "@/routes/home-routes"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to={homeRoutes.home.path} className={cn("text-2xl font-black text-foreground tracking-tighter flex items-center gap-1 group", className)}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform">
        C
      </div>
      <span>CRATE</span>
    </Link>
  )
}

export default Logo
