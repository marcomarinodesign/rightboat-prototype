"use client"

import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type ActiveFilter = {
  key: string
  label: string
  onRemove: () => void
}

type ActiveFiltersChipsProps = {
  activeFilters: ActiveFilter[]
  onClearAll: () => void
}

export function ActiveFiltersChips({
  activeFilters,
  onClearAll,
}: ActiveFiltersChipsProps) {
  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {activeFilters.map((filter) => (
          <Badge key={filter.key} className="gap-2 pr-1 bg-white text-primary border border-primary hover:bg-primary/5">
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
