"use client"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ActiveFilter = {
  key: string
  label: string
  onRemove: () => void
}

type ActiveFiltersChipsProps = {
  activeFilters: ActiveFilter[]
  onClearAll: () => void
  /** Tighter chips for SRP filter sidebar / toolbar (does not change DS Badge defaults). */
  compact?: boolean
}

export function ActiveFiltersChips({
  activeFilters,
  onClearAll,
  compact = false,
}: ActiveFiltersChipsProps) {
  if (activeFilters.length === 0) return null

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/20",
        compact ? "mb-2 px-2 py-2" : "gap-3 px-3 py-3"
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {activeFilters.map((filter) => (
          <Badge
            key={filter.key}
            className={cn(
              "gap-1.5 bg-background pr-1 text-primary border border-primary hover:bg-primary/5",
              compact
                ? "rounded-full px-2.5 py-1 text-[13px] font-medium"
                : "gap-2 px-3 py-1.5 text-xs font-medium"
            )}
          >
            <span>{filter.label}</span>
            <button
              type="button"
              onClick={filter.onRemove}
              className="rounded-full p-1 text-primary/80 transition hover:bg-primary/10 hover:text-primary"
              aria-label={`Remove ${filter.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all filters
      </Button>
    </div>
  )
}
