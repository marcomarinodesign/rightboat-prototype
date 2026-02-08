"use client"

import { X } from "lucide-react"

import type { ActiveFilter } from "@/components/filters/active-filters-chips"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FilterChipListProps = {
  activeFilters: ActiveFilter[]
  onClearAll: () => void
  className?: string
}

export function FilterChipList({
  activeFilters,
  onClearAll,
  className,
}: FilterChipListProps) {
  if (activeFilters.length === 0) return null

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none",
        "flex-nowrap md:flex-wrap",
        className
      )}
      role="list"
      aria-label="Active filters"
    >
      <div className="flex flex-1 flex-nowrap items-center gap-2 gap-y-2">
        {activeFilters.map((filter) => (
          <span
            key={filter.key}
            role="listitem"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 py-1.5 pl-3 pr-1 text-sm text-primary"
          >
            <span className="truncate max-w-[140px]">{filter.label}</span>
            <button
              type="button"
              onClick={filter.onRemove}
              className="rounded-full p-1 text-primary/80 transition hover:bg-primary/15 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label={`Remove ${filter.label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="shrink-0 text-muted-foreground"
      >
        Clear all
      </Button>
    </div>
  )
}
