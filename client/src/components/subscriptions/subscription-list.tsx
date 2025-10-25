

import { useEffect, useState } from "react"
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminMenu } from "@/components/admin-menu"
import { Loader2, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

interface Subscription {
  id: number
  user: {
    name: string
    email: string
  }
  crate: {
    name: string
  }
  createdAt: string
}

export function SubscriptionList() {
  const [data, setData] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSubscriptions()
  }, [])

  async function loadSubscriptions() {
    try {
      setIsLoading(true)
      const { data } = await api.get<Subscription[]>("/subscriptions")
      setData(data)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load subscriptions")
    } finally {
      setIsLoading(false)
    }
  }

  const columns: ColumnDef<Subscription>[] = [
    {
      header: "Crate",
      accessorKey: "crate.name",
      cell: ({ row }) => row.original.crate?.name ?? "-",
    },
    {
      header: "User",
      accessorKey: "user.name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.user?.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.user?.email}
          </span>
        </div>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
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

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Subscriptions</h2>
          <Button onClick={loadSubscriptions} className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2 text-sm text-muted-foreground">
                Loading subscriptions...
              </span>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No subscriptions found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id}>
                    {group.headers.map((header) => (
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
