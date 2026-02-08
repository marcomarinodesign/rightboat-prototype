"use client"

import * as React from "react"

import { BoatCard } from "@/components/boats/boat-card"
import { BoatsForSaleFilters } from "@/components/filters/boats-for-sale-filters"
import { FilterChipList } from "@/components/filters/filter-chip-list"
import { filterBoats } from "@/components/filters/filter-boats"
import { MobileFilterBottomSheet } from "@/components/filters/mobile-filter-bottom-sheet"
import { MobileQuickFiltersBar } from "@/components/filters/mobile-quick-filters-bar"
import { useFiltersState } from "@/components/filters/use-filters-state"
import { useIsMobile } from "@/lib/use-media-query"
import type { Boat } from "@/data/boats"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type BoatsForSaleListingProps = {
  boats: Boat[]
}

export function BoatsForSaleListing({ boats }: BoatsForSaleListingProps) {
  const isMobile = useIsMobile()
  const { filters, setFilters, clearAll, activeFilters } = useFiltersState()
  const [moreSheetOpen, setMoreSheetOpen] = React.useState(false)

  const filteredBoats = React.useMemo(
    () => filterBoats(boats, filters),
    [boats, filters]
  )
  const resultCount = filteredBoats.length

  return (
    <div className="space-y-6">
      {/* Desktop: full filters bar. Hidden on mobile. */}
      <div className="hidden md:block">
        <BoatsForSaleFilters
          filters={filters}
          onFiltersChange={setFilters}
          activeFilters={activeFilters}
          onClearAll={clearAll}
        />
      </div>

      {/* Mobile: sticky quick filters + chips. Only on mobile. */}
      {isMobile && (
        <>
          <MobileQuickFiltersBar
            filters={filters}
            onFiltersChange={setFilters}
            onOpenMoreFilters={() => setMoreSheetOpen(true)}
          />
          <div className="space-y-3 md:hidden">
            <FilterChipList
              activeFilters={activeFilters}
              onClearAll={clearAll}
            />
          </div>
        </>
      )}

      {/* Results bar + grid: same for both */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card px-5 py-4">
        <div>
          <p className="text-sm text-muted-foreground">Results</p>
          <p className="text-lg font-semibold">
            {resultCount} boats near you
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price (low to high)</SelectItem>
            <SelectItem value="price-high">Price (high to low)</SelectItem>
            <SelectItem value="newest">Newest listings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBoats.map((boat) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
      </div>

      {/* Mobile: bottom sheet for "More filters". Only on mobile. */}
      {isMobile && (
        <MobileFilterBottomSheet
          open={moreSheetOpen}
          onOpenChange={setMoreSheetOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onClearAll={clearAll}
          resultCount={resultCount}
        />
      )}
    </div>
  )
}
