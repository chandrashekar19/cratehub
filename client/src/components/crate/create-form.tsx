/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminMenu } from "@/components/admin-menu"
import { cn } from "@/lib/utils"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/api"

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

  // Load crate if editing
  useEffect(() => {
    if (id) fetchCrate(Number(id))
  }, [id])

  async function fetchCrate(crateId: number) {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/crates/${crateId}`)
      setCrate(data)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error loading crate ❌")
      navigate("/admin/crate")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id) {
        await api.put(`/crates/${id}`, crate)
        toast.success("Crate updated ✅")
      } else {
        await api.post("/crates", crate)
        toast.success("Crate created ✅")
      }

      navigate("/admin/crate")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Save failed ❌")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <AdminMenu />

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/crate">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>

          <h2 className="text-2xl font-semibold">
            {id ? "Edit Crate" : "Create Crate"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={crate.name}
            onChange={(e) => setCrate({ ...crate, name: e.target.value })}
            required
          />

          <Textarea
            placeholder="Description"
            value={crate.description}
            onChange={(e) =>
              setCrate({ ...crate, description: e.target.value })
            }
            required
          />

          <div className="pt-4 text-center">
            <Button type="submit" disabled={isLoading}
              className={cn("flex items-center justify-center gap-2 min-w-32")}
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
