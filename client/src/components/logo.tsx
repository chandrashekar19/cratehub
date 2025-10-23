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
    <Link to={homeRoutes.home.path} className={cn("text-2xl font-bold text-white tracking-wide", className)}>
      Crate
    </Link>
  )
}

export default Logo
