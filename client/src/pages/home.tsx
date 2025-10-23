

import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/hooks/use-app-store"
import Onboarding from "./onboarding"

export default function Home() {
  const { isAuthenticated } = useAppStore()

  return (
    <div>
      <Helmet>
        <title>Crate — Monthly Subscription for Style</title>
      </Helmet>

      {/* Hero Section */}
      <section
        className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/cover.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white max-w-2xl px-6">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">Crate</h1>
          <p className="text-lg mt-4 drop-shadow-md">
            Your monthly subscription of trendy clothes and accessories
          </p>

          <Link to={isAuthenticated ? "/crates" : "/user/signup"}>
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 w-40 justify-center"
            >
              {isAuthenticated ? "Get Subscription" : "Get Started"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Onboarding Section */}
      <Onboarding />
    </div>
  )
}
