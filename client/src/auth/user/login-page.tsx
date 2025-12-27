import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight } from "lucide-react"
import { login } from "@/services/auth"
import { useAppStore } from "@/hooks/use-app-store"

export function Login() {
  const navigate = useNavigate()
  const { user } = useAppStore()

  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  // Auto-redirect only when user state becomes available
  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") navigate("/admin/dashboard", { replace: true })
      else navigate("/crates", { replace: true })
    }
  }, [user, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await login(form.email, form.password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.4)_0%,transparent_100%)] z-10" />
        <div className="relative z-20 text-primary-foreground max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-xs font-medium backdrop-blur-sm">
            <span>Premium Subscription Experience</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tight">
            Elevate Your <br /> Everyday.
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Curated crates of world-class products, delivered straight to your door. Join thousands of members who trust Crate for their monthly inspiration.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="h-1 w-12 rounded-full bg-primary-foreground" />
            <div className="h-1 w-4 rounded-full bg-primary-foreground/40" />
            <div className="h-1 w-4 rounded-full bg-primary-foreground/40" />
          </div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="h-11"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
                <Link to="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="h-11"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <Button disabled={loading} className="w-full h-11 text-base font-medium transition-all active:scale-[0.98]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
              ) : (
                <span className="flex items-center gap-2">
                  Login <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/user/signup" className="font-semibold text-primary hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
