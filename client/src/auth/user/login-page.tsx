import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { login } from "@/services/auth"
import { useAppStore } from "@/hooks/use-app-store"

export function Login() {
  const navigate = useNavigate()
  const { user } = useAppStore()

  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  //  Auto-redirect only when user state becomes available
  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") navigate("/admin/dashboard", { replace: true })
      else navigate("/crates", { replace: true })
    }
  }, [user, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // only updates Zustand (no redirect here)
    await login(form.email, form.password)

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="bg-background p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button disabled={loading} className="w-full flex gap-2 justify-center">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/user/signup" className="text-primary underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
