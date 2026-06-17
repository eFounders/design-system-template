"use client"

import * as React from "react"
import { Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Filter bar — restrict a list/table.
 * Filter buttons (open dropdowns) + active removable chips + Clear all + result
 * count. An active filter is always visible and removable. Empty "no results"
 * is distinct from "no data".
 */
export type ActiveFilter = { id: string; label: string }

function FilterBar({
  filters = [],
  activeFilters = [],
  resultCount,
  onAddFilter,
  onRemoveFilter,
  onClearAll,
  className,
}: {
  /** labels of the available filter buttons */
  filters?: string[]
  activeFilters?: ActiveFilter[]
  resultCount?: number
  onAddFilter?: (label: string) => void
  onRemoveFilter?: (id: string) => void
  onClearAll?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {filters.map((f) => (
        <Button
          key={f}
          size="sm"
          variant="outline"
          onClick={() => onAddFilter?.(f)}
          className="border-dashed"
        >
          <Plus className="size-3.5" />
          {f}
        </Button>
      ))}

      {activeFilters.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onRemoveFilter?.(f.id)}
          className="bg-primary-subtle text-primary hover:bg-secondary-hover inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors"
        >
          {f.label}
          <X className="size-3.5 opacity-70" />
        </button>
      ))}

      {activeFilters.length > 0 ? (
        <Button size="sm" variant="ghost" onClick={onClearAll}>
          Clear all
        </Button>
      ) : null}

      {typeof resultCount === "number" ? (
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          {resultCount} result{resultCount === 1 ? "" : "s"}
        </span>
      ) : null}
    </div>
  )
}

export { FilterBar }
