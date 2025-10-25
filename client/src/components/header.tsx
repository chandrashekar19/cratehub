"use client"

import { Link } from "react-router-dom"
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

export function Header() {
  const { isAuthenticated, user } = useAppStore()

  if (!isAuthenticated) return null // ✅ Don't show header at all if logged out

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary text-white z-50 shadow-lg px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Logo />

        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={homeRoutes.men.path}>Men</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={homeRoutes.women.path}>Women</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={homeRoutes.howItWorks.path}>How It Works</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={homeRoutes.whatsNew.path}>What's New</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          {user?.role === "ADMIN" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={adminRoutes.dashboard.path}>Admin</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={crateRoutes.list.path}>Crates</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={userRoutes.subscriptions.path}>Subscriptions</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={userRoutes.profile.path}>Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export default Header
