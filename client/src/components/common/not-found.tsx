"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { homeRoutes } from "@/routes/home-routes"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <Ghost className="w-20 h-20 text-muted-foreground mb-6" />

      <h1 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The page you're looking for does not exist or has been moved.
      </p>

      <Button asChild>
        <Link to={homeRoutes.home.path}>Go to Home</Link>
      </Button>
    </div>
  )
}
