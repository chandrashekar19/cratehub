

import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/hooks/use-app-store"
import Onboarding from "./onboarding"
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react"

export default function Home() {
  const { isAuthenticated } = useAppStore()

  return (
    <div className="relative">
      <Helmet>
        <title>Crate | Premium Curated Subscription Boxes</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/5 -skew-x-12 translate-x-1/4 hidden lg:block" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> New Winter Collection
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              STYLE <br />
              <span className="text-primary italic">DELIVERED</span> <br />
              EVERY MONTH.
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
              Discover a new way to elevate your lifestyle. Expertly curated crates of premium products, tailored to your unique taste.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={isAuthenticated ? "/crates" : "/user/signup"}>
                <Button size="lg" className="h-14 px-8 text-lg font-bold group shadow-xl transition-all hover:shadow-primary/20 active:scale-95">
                  {isAuthenticated ? "View All Crates" : "Start Your Journey"}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium border-2 hover:bg-muted/50 transition-all">
                  How it works
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <span className="text-primary font-bold">10k+</span> Styling enthusiasts trust us
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&q=80&w=1000"
                alt="Style"
                className="w-full h-auto aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Featured Crate</p>
                <h3 className="text-2xl font-bold">Winter Essentials 2024</h3>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-700 duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Fast Delivery</p>
                  <p className="text-sm font-black">2-3 Business Days</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-12 glass p-4 rounded-2xl shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Quality Assured</p>
                  <p className="text-sm font-black">Curated by Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <Onboarding />
    </div>
  )
}
