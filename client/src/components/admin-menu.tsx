

import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { adminRoutes } from "@/constants/admin-routes"

// Define your admin routes


export const AdminMenu: React.FC = () => {
  const location = useLocation()

  return (
    <div className="w-full bg-muted/40 border-b">
      <div className="max-w-6xl mx-auto px-8">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-start space-x-2 h-14">
            {Object.values(adminRoutes).map((route) => (
              <NavigationMenuItem key={route.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={route.path}
                    className={cn(
                      "text-sm font-medium px-4 py-2 rounded-lg transition-all relative overflow-hidden group",
                      location.pathname === route.path
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {route.label}
                    {location.pathname === route.path && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-left duration-300" />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
