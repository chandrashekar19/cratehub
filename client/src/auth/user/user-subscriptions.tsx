"use client"

import { fetchSubscriptionsByUser, type Subscription } from "@/services/subscriptions"
import { EmptyMessage } from "@/components/common/empty-message"
import { Loading } from "@/components/common/loading"
import { SubscriptionItem } from "@/components/subscriptions/subscription-item"
import { useAppStore } from "@/hooks/use-app-store"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"


export function UserSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated } = useAppStore()

  async function loadSubscriptions() {
    setIsLoading(true)
    const subs = await fetchSubscriptionsByUser()
    setSubscriptions(subs)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) loadSubscriptions()
  }, [isAuthenticated])

  return (
    <div>
      {/* SEO */}
      <Helmet>
        <title>My Subscriptions - Crate</title>
      </Helmet>

      {/* Section Title */}
      <section className="bg-muted py-10 text-center">
        <h2 className="text-3xl font-bold">My Subscriptions</h2>
        <p className="text-muted-foreground mt-2">
          The crates you are subscribed to are listed below.
        </p>
      </section>

      {/* Subscription list */}
      <section className="container mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <Loading message="Fetching your subscriptions..." />
        ) : subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <SubscriptionItem key={sub.id} subscription={sub} onRemoved={loadSubscriptions} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyMessage message="You are not subscribed to any crates yet." />
          </div>
        )}
      </section>
    </div>
  )
}

export default UserSubscriptions
