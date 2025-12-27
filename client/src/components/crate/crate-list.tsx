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

interface Crate {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export function AdminCrateList() {
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

  async function handleDelete(id: number) {
    toast.message("Confirm delete?", {
      description: "This crate will be permanently removed.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await api.delete(`/crates/${id}`)
            toast.success("Crate deleted successfully ✅")
            setData(prev => prev.filter(c => c.id !== id))
          } catch {
            toast.error("Could not delete crate ❌")
          }
        },
      },
    })
  }

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
          <Link to={`/admin/crate/${row.original.id}/edit`}>
            <Button size="icon" variant="ghost" className="hover:bg-primary/10 text-primary">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>

          <Button size="icon" variant="ghost" onClick={() => handleDelete(row.original.id)} className="hover:bg-destructive/10 text-destructive">
            <Trash2 className="w-4 h-4" />
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
    <div className="bg-background min-h-screen">
      <AdminMenu />

      <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center bg-card p-6 rounded-2xl border shadow-sm">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Manage Crates</h2>
            <p className="text-muted-foreground mt-1">Configure and manage your subscription boxes.</p>
          </div>

          <Link to="/admin/crate/create">
            <Button className="flex items-center gap-2 h-11 px-6 font-medium shadow-md transition-all active:scale-95">
              <Plus className="w-4 h-4" /> Add New Crate
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-sm font-medium text-muted-foreground">Fetching data...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-medium">No crates found in the collection.</div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id} className="h-12 px-6 font-bold text-foreground">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors border-border/50">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="px-6 py-4">
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
