import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signup } from "@/services/auth"

export function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { user, error } = await signup(form.name, form.email, form.password)

    if (!error && user) {
      // ✅ Auto login now handled inside signup service
      navigate("/crates") // You can update redirect here later
    }

    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Sign up - Crate</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="bg-background p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create an account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/user/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup
