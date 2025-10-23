"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminMenu } from "@/components/admin-menu"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

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
    fetchSubscriptions()
  }, [])

  async function fetchSubscriptions() {
    try {
      setIsLoading(true)
      const res = await fetch("/api/subscriptions")
      if (!res.ok) throw new Error("Failed to fetch subscriptions")
      const subs = await res.json()
      setData(subs)
    } catch {
      toast.error("Error fetching subscriptions", {
        description: "Could not load data from the server.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Table columns
  const columns: ColumnDef<Subscription>[] = [
    {
      accessorKey: "crate",
      header: "Crate",
      cell: ({ row }) => row.original.crate?.name ?? "-",
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const { name, email } = row.original.user || {}
        return (
          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
          <Button
            variant="outline"
            onClick={fetchSubscriptions}
            className="flex items-center gap-2"
          >
            <Loader2
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
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
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
