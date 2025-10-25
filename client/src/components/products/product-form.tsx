
import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { AdminMenu } from "@/components/admin-menu"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  fetchProductById,
  fetchProductTypes,
  createProduct,
  updateProduct,
} from "@/services/products"
import { uploadFile } from "@/services/upload"
import { api } from "@/lib/api"

export function ProductForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    type: 0,
    gender: 0,
    image: "",
  })

  const [productTypes, setProductTypes] = useState<{ id: number; name: string }[]>([])
  const [userGenders, setUserGenders] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    loadMetadata()
    if (id) loadProduct(Number(id))
  }, [id])

  async function loadMetadata() {
    setProductTypes(await fetchProductTypes())

    try {
      const { data } = await api.get("/user-genders")
      setUserGenders(data)
    } catch {
      toast.error("Failed to load gender list ❌")
    }
  }

  async function loadProduct(productId: number) {
    setIsLoading(true)
    const data = await fetchProductById(productId)
    if (data) setProduct({
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
      type: data.type || 0,
      gender: data.gender || 0,
      image: data.image || ""
    })
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const success = id
      ? await updateProduct(Number(id), product)
      : await createProduct(product)

    setIsLoading(false)

    if (success) navigate("/admin/products")
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file)
    if (url) setProduct((prev) => ({ ...prev, image: url }))
  }

  return (
    <div>
      <AdminMenu />

      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Product" : "Create Product"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label>Product Name</Label>
            <Input
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                  ...(id ? {} : { slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }),
                })
              }
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>

          {/* Type */}
          <div>
            <Label>Type</Label>
            <Select
              value={product.type ? product.type.toString() : undefined}
              onValueChange={(v) => setProduct({ ...product, type: Number(v) })}
            >
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {productTypes.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <Select
              value={product.gender ? product.gender.toString() : undefined}
              onValueChange={(v) => setProduct({ ...product, gender: Number(v) })}
            >
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                {userGenders.map((g) => (
                  <SelectItem key={g.id} value={g.id.toString()}>{g.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Product Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileUpload} />
            {product.image && (
              <img src={product.image} className="w-40 h-40 rounded border mt-2" />
            )}
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className={cn("flex gap-2 justify-center min-w-40", isLoading && "opacity-75")}
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

export default ProductForm
