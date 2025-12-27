import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, Package } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/api"

interface Crate {
    id: number
    name: string
    description: string
    image?: string
    createdAt: string
    updatedAt: string
}

export function CrateCards() {
    const [data, setData] = useState<Crate[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function fetchCrates() {
        try {
            setIsLoading(true)
            const res = await api.get("/crates")
            setData(res.data)
        } catch {
            toast.error("Failed to load crates ❌")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCrates()
    }, [])

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-20 min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Discovering premium crates...</p>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-20 min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No crates available yet</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Our curators are working hard to bring you the best collections. Check back soon!
                </p>
            </div>
        )
    }

    async function handleSubscribe(crateId: number) {
        try {
            await api.post("/subscriptions", { crateId })
            toast.success("Subscribed successfully! Welcome to the crate.")
        } catch (err: any) {
            const msg = err.response?.data?.message || "Could not subscribe. Please try again."
            toast.error(msg)
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight">Our Curated Crates</h2>
                <p className="text-lg text-muted-foreground">
                    Hand-picked collections of world-class products, tailored to your lifestyle.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {data.map((crate) => (
                    <div
                        key={crate.id}
                        className="group flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden card-hover"
                    >
                        {/* Image Placeholder / Banner */}
                        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                            {crate.image ? (
                                <img
                                    src={crate.image}
                                    alt={crate.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                                    <Package className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider">
                                Monthly Edition
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 space-y-3">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {crate.name}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                {crate.description}
                            </p>

                            <div className="pt-4 mt-auto">
                                <Button
                                    onClick={() => handleSubscribe(crate.id)}
                                    className="w-full group/btn relative overflow-hidden h-11"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Subscribe Now <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
