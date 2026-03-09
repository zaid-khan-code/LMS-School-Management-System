'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ColumnDef<T> {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  pageSize?: number
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends object>({
  columns,
  data,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = (row as Record<string, unknown>)[key as string]
        return typeof val === 'string' && val.toLowerCase().includes(q)
      })
    )
  }, [data, search, searchKeys])

  const sorted = useMemo(() => {
    if (!sortColumn || !sortDirection) return filtered
    return [...filtered].sort((a, b) => {
      const col = columns.find((c) => c.id === sortColumn)
      if (!col?.accessorKey) return 0
      const aVal = (a as Record<string, unknown>)[col.accessorKey as string]
      const bVal = (b as Record<string, unknown>)[col.accessorKey as string]
      const aStr = String(aVal ?? '')
      const bStr = String(bVal ?? '')
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true })
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortColumn, sortDirection, columns])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = (colId: string) => {
    if (sortColumn === colId) {
      if (sortDirection === 'asc') setSortDirection('desc')
      else if (sortDirection === 'desc') { setSortColumn(null); setSortDirection(null) }
    } else {
      setSortColumn(colId)
      setSortDirection('asc')
    }
    setCurrentPage(1)
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {searchKeys.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    'px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wider',
                    col.sortable && 'cursor-pointer hover:text-foreground select-none'
                  )}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-muted-foreground/50">
                        {sortColumn === col.id ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-primary" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                  No results found
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.id} className="px-4 py-3">
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String((row as Record<string, unknown>)[col.accessorKey as string] ?? '')
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {sorted.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, sorted.length)} of {sorted.length} results
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce<(number | '...')[]>((acc, p, idx, arr) => {
              if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) {
                acc.push('...')
              }
              acc.push(p)
              return acc
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-1">…</span>
              ) : (
                <Button
                  key={p}
                  variant={currentPage === p ? 'default' : 'outline'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(p as number)}
                >
                  {p}
                </Button>
              )
            )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
