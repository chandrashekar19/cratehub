/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Pencil, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import { AdminMenu } from "@/components/admin-menu"
import { api } from "@/lib/api"
import { adminRoutes } from "@/routes/admin-routes"

interface Product {
  id: number
  name: string
  slug: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export function ProductList() {
  const [data, setData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setIsLoading(true)
      const { data } = await api.get("/products")
      setData(data)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch products ❌")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: number) {
    toast.message("Delete Product?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await api.delete(`/products/${id}`)
            toast.success("Product deleted ✅")
            setData((prev) => prev.filter((p) => p.id !== id))
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete product ❌")
          }
        },
      },
    })
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Thumbnail",
      cell: ({ row }) => {
        const src = row.original.image?.startsWith("http")
          ? row.original.image
          : `/uploads/${row.original.image}`

        return (
          <img
            src={src}
            alt={row.original.name}
            className="w-14 h-14 rounded-md object-cover border"
          />
        )
      },
    },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Link to={adminRoutes.productEdit.path(String(row.original.id))}>
            <Button size="icon" variant="ghost">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>

          <Button size="icon" variant="ghost" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <AdminMenu />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          <Link to={adminRoutes.productCreate.path}>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </Link>
        </div>

        <div className="rounded-md border overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-10 gap-2">
              <Loader2 className="animate-spin w-6 h-6" /> Loading...
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No products found</div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
