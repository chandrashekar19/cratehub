"use client"

import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Badge, Package, Shirt } from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"

export default function HowItWorks() {
  const { isAuthenticated } = useAppStore()

  return (
    <div>
      <Helmet>
        <title>How It Works - Crate</title>
      </Helmet>

      {/* Header */}
      <section className="bg-muted py-12 text-center px-6">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          A subscription that delivers the latest fashion styles monthly — it's as simple as 1-2-3.
        </p>
      </section>

      {/* Steps */}
      <section className="space-y-20 py-16 container mx-auto px-6">
        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <Badge className="mx-auto h-14 w-14 text-primary" strokeWidth={1.2} />
            <h3 className="text-2xl font-semibold mt-4 uppercase">Subscribe to your crate</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Choose one or multiple crates based on your style.
            </p>
          </div>
          <img
            src="/dress-3.jpg"
            alt="Subscribe"
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <img
            src="/dress-2.jpg"
            alt="Delivery"
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
          <div className="text-center">
            <Package className="mx-auto h-14 w-14 text-primary" strokeWidth={1.2} />
            <h3 className="text-2xl font-semibold mt-4 uppercase">Receive Monthly Delivery</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Get 3 to 5 pieces of curated fashion delivered to your door.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <Shirt className="mx-auto h-14 w-14 text-primary" strokeWidth={1.2} />
            <h3 className="text-2xl font-semibold mt-4 uppercase">Keep What You Love</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Pay only for what you keep. Easy returns, hassle-free.
            </p>
          </div>
          <img
            src="/dress-1.jpg"
            alt="Keep items"
            className="w-full max-h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-12 text-center">
        <Link to={isAuthenticated ? "/crates" : "/user/signup"}>
          <Button size="lg" className="flex gap-2 mx-auto">
            {isAuthenticated ? "Subscribe" : "Get Started"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
