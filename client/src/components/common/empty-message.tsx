
import type { FC } from "react"

interface EmptyMessageProps {
  message?: string
}

export const EmptyMessage: FC<EmptyMessageProps> = ({
  message = "No data to show",
}) => {
  return (
    <p className="text-center text-muted-foreground py-4 w-full">
      {message}
    </p>
  )
}
