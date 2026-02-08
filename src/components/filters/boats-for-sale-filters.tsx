"use client"

import * as React from "react"

import { ActiveFiltersChips, type ActiveFilter } from "@/components/filters/active-filters-chips"
import { FiltersBar } from "@/components/filters/filters-bar"
import { MoreFiltersSheet } from "@/components/filters/more-filters-sheet"
import type { FiltersState } from "@/components/filters/types"

export type BoatsForSaleFiltersProps = {
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  activeFilters: ActiveFilter[]
  onClearAll: () => void
}

export function BoatsForSaleFilters({
  filters,
  onFiltersChange,
  activeFilters,
  onClearAll,
}: BoatsForSaleFiltersProps) {
  const [sheetOpen, setSheetOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <FiltersBar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onOpenMoreFilters={() => setSheetOpen(true)}
      />
      <ActiveFiltersChips
        activeFilters={activeFilters}
        onClearAll={onClearAll}
      />
      <MoreFiltersSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onClearAll={onClearAll}
      />
    </div>
  )
}
