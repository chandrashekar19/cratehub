"use client"

import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAppStore } from "@/hooks/use-app-store"

export function UserProfile() {
  const navigate = useNavigate()
  
  const { user, logout } = useAppStore()
  
  if (!user) {
    toast.error("Please login to view your profile")
    navigate("/user/login")
    return null
  }

  function handleLogout() {
    logout()
    toast.success("Logged out successfully ✨")
    navigate("/")
  }

  return (
    <>
      <Helmet>
        <title>My Profile - Crate</title>
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground mb-6">
          Manage your account details & subscriptions.
        </p>

        <div className="bg-background px-6 py-8 rounded-lg shadow-md space-y-2 w-full max-w-sm">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

          <Link to="/user/subscriptions" className="w-full block">
            <Button className="w-full">View Subscriptions</Button>
          </Link>

          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserProfile
