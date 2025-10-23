

import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { AdminMenu } from "@/components/admin-menu"
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Product {
  id?: number
  name: string
  slug: string
  description: string
  type: number
  gender: number
  image: string
}

export function ProductForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product>({
    name: "",
    slug: "",
    description: "",
    type: 0,
    gender: 0,
    image: "",
  })
  const [productTypes, setProductTypes] = useState<{ id: number; name: string }[]>([])
  const [userGenders, setUserGenders] = useState<{ id: number; name: string }[]>([])

  // Fetch dropdown data + product details if editing
  useEffect(() => {
    fetchProductTypes()
    fetchUserGenders()
    if (id) getProductById(parseInt(id))
  }, [id])

  async function fetchProductTypes() {
    try {
      const res = await fetch("/api/product-types")
      if (!res.ok) throw new Error("Failed to fetch product types")
      const data = await res.json()
      setProductTypes(data)
    } catch {
      toast.error("Error loading product types")
    }
  }

  async function fetchUserGenders() {
    try {
      const res = await fetch("/api/user-genders")
      if (!res.ok) throw new Error("Failed to fetch genders")
      const data = await res.json()
      setUserGenders(data)
    } catch {
      toast.error("Error loading genders")
    }
  }

  async function getProductById(productId: number) {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/products/${productId}`)
      if (!res.ok) throw new Error("Failed to fetch product")
      const data = await res.json()
      setProduct(data)
    } catch {
      toast.error("Error fetching product details")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const method = id ? "PUT" : "POST"
      const res = await fetch(`/api/products${id ? `/${id}` : ""}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error("Failed to save product")

      toast.success(`Product ${id ? "updated" : "created"} successfully.`)
      navigate("/admin/products")
    } catch {
      toast.error("Error saving product")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setIsLoading(true)
      toast.message("Uploading image...")
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      setProduct((prev) => ({ ...prev, image: data.fileUrl }))
      toast.success("Image uploaded successfully!")
    } catch {
      toast.error("Failed to upload image")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <AdminMenu />

      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold">{id ? "Edit Product" : "Create Product"}</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Product name"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Short product description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Type</Label>
            <Select
              value={product.type.toString()}
              onValueChange={(value) => setProduct({ ...product, type: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Gender</Label>
            <Select
              value={product.gender.toString()}
              onValueChange={(value) => setProduct({ ...product, gender: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {userGenders.map((g) => (
                  <SelectItem key={g.id} value={g.id.toString()}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label htmlFor="image">Upload Product Image</Label>
            <div className="flex items-center gap-3">
              <Input id="image" type="file" accept="image/*" onChange={handleFileUpload} />
              <Upload className="w-4 h-4 text-gray-600" />
            </div>

            {product.image && (
              <img
                src={product.image}
                alt="Product preview"
                className="w-40 h-40 object-cover rounded-md border mt-2"
              />
            )}
          </div>

          {/* Submit */}
          <div className="text-center pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn("flex items-center justify-center gap-2 min-w-32", isLoading && "opacity-80")}
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
