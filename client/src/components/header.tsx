"use client"

import { Link, useLocation } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useAppStore } from "@/hooks/use-app-store"
import { homeRoutes } from "@/routes/home-routes"
import { adminRoutes } from "@/routes/admin-routes"
import { crateRoutes } from "@/routes/crate-routes"
import { userRoutes } from "@/routes/user-routes"
import Logo from "./logo"
import { cn } from "@/lib/utils"

export function Header() {
  const { isAuthenticated, user } = useAppStore()
  const location = useLocation()

  if (!isAuthenticated) return null

  const navItems = [
    { label: "Men", path: homeRoutes.men.path },
    { label: "Women", path: homeRoutes.women.path },
    { label: "How It Works", path: homeRoutes.howItWorks.path },
    { label: "What's New", path: homeRoutes.whatsNew.path },
  ]

  const rightNavItems = [
    ...(user?.role === "ADMIN" ? [{ label: "Admin", path: adminRoutes.dashboard.path }] : []),
    { label: "Crates", path: crateRoutes.list.path },
    { label: "Subscriptions", path: userRoutes.subscriptions.path },
    { label: "Profile", path: userRoutes.profile.path },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass z-50 px-6 flex items-center justify-between border-b shadow-sm">
      <div className="flex items-center gap-12">
        <Logo className="text-foreground" />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted",
                      location.pathname === item.path ? "text-primary bg-muted/50" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          {rightNavItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted",
                    location.pathname === item.path ? "text-primary bg-muted/50" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export default Header
