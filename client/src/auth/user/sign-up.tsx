import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react"
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

    const { user } = await signup(form.name, form.email, form.password)
    if (user) {
      navigate("/user/login")
    }

    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Sign up | Crate</title>
      </Helmet>

      <div className="min-h-screen flex flex-row-reverse">
        {/* Right Side - Visual Branding (Flipped for variety) */}
        <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,rgba(0,0,0,0.4)_0%,transparent_100%)] z-10" />
          <div className="relative z-20 text-primary-foreground max-w-lg space-y-6">
            <h1 className="text-6xl font-bold tracking-tight leading-[1.1]">
              Join the <br /> Community.
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Unlock exclusive access to curated collections, early previews, and a community of like-minded enthusiasts.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Hand-picked premium products",
                "Flexible monthly subscriptions",
                "Exclusive member-only discounts"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground/60" />
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-foreground/5 blur-3xl text-primary-foreground/30 ring-1 ring-primary-foreground/10" />
        </div>

        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
              <p className="text-muted-foreground">
                Join us today and start your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="name">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="h-11"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="h-11"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-11"
                  value={form.password}
                  onChange={handleChange}
                />
                <p className="text-[10px] text-muted-foreground">
                  Minimum 6 characters with at least one number.
                </p>
              </div>

              <Button disabled={loading} className="w-full h-11 text-base font-medium transition-all active:scale-[0.98]">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign up <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/user/login" className="font-semibold text-primary hover:underline underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
