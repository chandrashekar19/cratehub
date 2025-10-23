

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
    <div className="w-full bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center space-x-8">
            {Object.values(adminRoutes).map((route) => (
              <NavigationMenuItem key={route.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={route.path}
                    className={cn(
                      "uppercase text-sm font-medium px-3 py-2 rounded-md transition-colors",
                      location.pathname === route.path
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-800 hover:text-primary"
                    )}
                  >
                    {route.label}
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
