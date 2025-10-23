
import { Loader2 } from "lucide-react"
import type { FC } from "react"

interface LoadingProps {
  message?: string
}

export const Loading: FC<LoadingProps> = ({
  message = "Loading...",
}) => (
  <div className="flex flex-col items-center justify-center py-6 text-muted-foreground gap-2">
    <Loader2 className="w-6 h-6 animate-spin" />
    <p className="text-sm">{message}</p>
  </div>
)
