"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminMenu } from "@/components/admin-menu"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "sonner" 

interface Crate {
  id?: number
  name: string
  description: string
}

export function CrateForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [crate, setCrate] = useState<Crate>({ name: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch crate if editing
  useEffect(() => {
    if (id) {
      getCrateById(parseInt(id))
    }
  }, [id])

  async function getCrateById(crateId: number) {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/crates/${crateId}`)
      if (!res.ok) throw new Error("Failed to fetch crate")
      const data = await res.json()
      setCrate(data)
    } catch (error: unknown) {
      let message = "Unknown error"
      if (error instanceof Error) {
        message = error.message
      }
      toast.error("Error loading crate", {
        description: `There was a problem fetching crate details: ${message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const method = id ? "PUT" : "POST"
      const res = await fetch(`/api/crates${id ? `/${id}` : ""}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crate),
      })

      if (!res.ok) throw new Error("Failed to save crate")

      toast.success("Success", {
        description: `Crate ${id ? "updated" : "created"} successfully.`,
      })

      navigate("/admin/crates")
    } catch {
      toast.error("Error saving crate", {
        description: "Something went wrong while saving the crate.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* Admin Top Menu */}
      <AdminMenu />

      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/crates">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Crate" : "Create Crate"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={crate.name}
              onChange={(e) => setCrate({ ...crate, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Textarea
              placeholder="Description"
              name="description"
              value={crate.description}
              onChange={(e) =>
                setCrate({ ...crate, description: e.target.value })
              }
              required
            />
          </div>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex items-center justify-center gap-2 min-w-32",
                isLoading && "opacity-80"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
