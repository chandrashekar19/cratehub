"use client"

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminMenu } from "@/components/admin-menu"
import { Package, Box, Users, CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface DashboardStats {
  products: number
  crates: number
  users: number
  subscriptions: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  async function fetchDashboardStats() {
    try {
      setIsLoading(true)
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error("Failed to fetch dashboard stats")
      const data = await res.json()
      setStats(data)
    } catch {
      toast.error("Error fetching dashboard stats", {
        description: "Please check your server connection.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const cards = [
    {
      title: "Products",
      value: stats?.products ?? 0,
      icon: <Package className="w-6 h-6 text-primary" />,
    },
    {
      title: "Crates",
      value: stats?.crates ?? 0,
      icon: <Box className="w-6 h-6 text-primary" />,
    },
    {
      title: "Users",
      value: stats?.users ?? 0,
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Subscriptions",
      value: stats?.subscriptions ?? 0,
      icon: <CreditCard className="w-6 h-6 text-primary" />,
    },
  ]

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <AdminMenu />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Admin Dashboard
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground text-sm">
              Loading dashboard...
            </span>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  "hover:shadow-md transition-shadow border-muted/40"
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
