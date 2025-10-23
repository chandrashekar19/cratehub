"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shirt, Badge, Users } from "lucide-react"


const steps = [
  {
    title: "Welcome to Crate",
    text: "Your monthly subscription of trendy clothes and accessories.",
    icon: Users,
    img: "/collage.png",
  },
  {
    title: "For Men",
    text: "Handpicked outfits for every occasion.",
    icon: Shirt,
    img: "/collage.png",
  },
  {
    title: "For Women",
    text: "Personal styling delivered monthly.",
    icon: Badge,
    img: "/collage.png",
  },
  {
    title: "Fix Me Up",
    text: "Choose your crate and subscribe today!",
    icon: Badge,
    img: "/collage.png",
  },
]

export default function Onboarding() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
//   const { isAuthenticated } = useAppStore()

  useEffect(() => {
    const onboarded = localStorage.getItem("onboarding")
    if (!onboarded) {
      setVisible(true)
      localStorage.setItem("onboarding", "1")
    }
  }, [])

  const nextStep = () =>
    current < steps.length - 1
      ? setCurrent(current + 1)
      : setVisible(false)

  const { title, text, icon: Icon, img } = steps[current]

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="max-w-2xl text-center space-y-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <Icon className="w-14 h-14 mx-auto text-primary" />
        <p className="text-muted-foreground">{text}</p>

        <img
          src={img}
          alt={title}
          className="w-full max-w-sm mx-auto object-cover rounded-lg shadow-md"
        />

        <DialogFooter className="mt-4">
          <Button onClick={nextStep} className="w-full justify-center">
            {current === steps.length - 1 ? "Start" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
