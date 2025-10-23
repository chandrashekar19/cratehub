
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table" 
import {useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Pencil, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import { AdminMenu } from "@/components/admin-menu"


interface Crate {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export function CrateList() {
  const [data, setData] = useState<Crate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all crates
  useEffect(() => {
    fetchCrates()
  }, [])

  async function fetchCrates() {
    try {
      setIsLoading(true)
      const res = await fetch("/api/crates")
      if (!res.ok) throw new Error("Failed to fetch crates")
      const crates = await res.json()
      setData(crates)
    } catch {
      toast.error("Error fetching crates", { description: "Could not load crates from server." })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete crate
  async function handleDelete(id: number) {
    toast.message("Confirm delete?", {
      description: "This crate will be permanently removed.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/crates/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Failed to delete crate")
            toast.success("Crate deleted successfully")
            setData((prev) => prev.filter((c) => c.id !== id))
          } catch {
            toast.error("Error deleting crate", { description: "Please try again." })
          }
        },
      },
    })
  }

  // Table columns
  const columns: ColumnDef<Crate>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Link to={`/admin/crates/edit/${row.original.id}`}>
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
          <h2 className="text-2xl font-semibold">Crates</h2>
          <Link to="/admin/crates/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Crate
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">Loading crates...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No crates found.</div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
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
