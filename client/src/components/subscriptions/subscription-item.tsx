"use client"

import { useState, type FC } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { deleteSubscription, type Subscription } from "@/services/subscriptions"

interface SubscriptionItemProps {
  subscription: Subscription
  onRemoved?: () => void
  className?: string
}

export const SubscriptionItem: FC<SubscriptionItemProps> = ({
  subscription,
  onRemoved,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  async function handleUnsubscribe() {
    const confirmed = confirm("Unsubscribe from this crate?")
    if (!confirmed) return

    setIsLoading(true)
    const result = await deleteSubscription(subscription.id)

    setIsLoading(false)
    if (result !== null) {
      toast.success("Unsubscribed successfully")
      onRemoved?.()
    }
  }

  const { crate, createdAt } = subscription;

  return (
    <Card className={cn("w-full max-w-sm mt-4 shadow-sm", className)}>
      <img
        src={"/crate.png"} // customize if needed
        alt={crate?.name}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4 text-center space-y-3">
        <h4 className="text-lg font-bold">{crate?.name}</h4>
        <p className="text-sm text-muted-foreground">{crate?.description}</p>

        <Button
          variant="destructive"
          disabled={isLoading}
          onClick={handleUnsubscribe}
          className="w-full flex items-center gap-2 justify-center"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          Unsubscribe
        </Button>

        <p className="text-xs text-muted-foreground">
          Subscribed on{" "}
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  )
}
