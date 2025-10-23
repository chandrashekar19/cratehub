"use client"

import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/hooks/use-app-store"


export default function Women() {
  const { isAuthenticated } = useAppStore()

  return (
    <>
      <Helmet>
        <title>Women's Monthly Fashion Subscription - Crate</title>
      </Helmet>

      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Collage */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/women-1.jpg"
            alt="Women Fashion"
            className="rounded-lg shadow-lg col-span-2 h-112 object-cover"
          />
          <img
            src="/women-2.jpg"
            alt="Women Style"
            className="rounded-lg shadow-md h-48 object-cover"
          />
          <img
            src="/women-3.jpg"
            alt="Latest fashion styles"
            className="rounded-lg shadow-md h-48 object-cover"
          />
        </div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl font-bold">Monthly Crates for Women</h2>

          <p className="text-muted-foreground">
            Save time. Look amazing. Get personalized outfits curated based on your fit & lifestyle every month.
          </p>

          <Link 
            to={isAuthenticated ? "/crates" : "/user/signup"}
            className="inline-block"
          >
            <Button size="lg" className="mt-4">
              {isAuthenticated ? "Get Subscription" : "Get Started"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
