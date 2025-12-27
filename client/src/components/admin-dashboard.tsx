
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminMenu } from "@/components/admin-menu"
import { Package, Box, Users, CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

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
    loadStats()
  }, [])

  async function loadStats() {
    try {
      setIsLoading(true)
      const { data } = await api.get<DashboardStats>("/admin/stats")
      setStats(data)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const cards = [
    { title: "Products", value: stats?.products ?? 0, icon: Package },
    { title: "Crates", value: stats?.crates ?? 0, icon: Box },
    { title: "Users", value: stats?.users ?? 0, icon: Users },
    { title: "Subscriptions", value: stats?.subscriptions ?? 0, icon: CreditCard },
  ]

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Admin Dashboard | Crate</title>
      </Helmet>

      <AdminMenu />

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-8 animate-in fade-in duration-500">
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
            Enterprise <span className="text-primary italic">Overview</span>
          </h1>
          <p className="text-muted-foreground text-lg">Real-time metrics and system health indicators.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-80 gap-4 border-2 border-dashed rounded-3xl">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <span className="text-muted-foreground font-medium">Synchronizing data...</span>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, idx) => (
              <Card
                key={card.title}
                className={cn(
                  "group relative overflow-hidden border-border/50 shadow-sm card-hover hover:border-primary/20",
                  "animate-in fade-in slide-in-from-bottom-4 duration-500"
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <card.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black">{card.value}</p>
                    <span className="text-xs font-bold text-emerald-500">+12%</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground/60 mt-2">Active this month</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
