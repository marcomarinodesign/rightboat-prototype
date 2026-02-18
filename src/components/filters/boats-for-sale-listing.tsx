"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"

import { BoatCard } from "@/components/boats/boat-card"
import { ActiveFiltersChips } from "@/components/filters/active-filters-chips"
import { FiltersDrawer } from "@/components/filters/filters-drawer"
import { filterBoats } from "@/components/filters/filter-boats"
import { useFiltersState } from "@/components/filters/use-filters-state"
import type { Boat } from "@/data/boats"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  const { filters, setFilters, clearAll, activeFilters } = useFiltersState()
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const filteredBoats = React.useMemo(
    () => filterBoats(boats, filters),
    [boats, filters]
  )
  const resultCount = filteredBoats.length

  return (
    <div className="space-y-4">
      {/* Results bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card px-5 py-4">
        <div>
          <p className="text-sm text-muted-foreground">Results</p>
          <p className="text-lg font-semibold">{resultCount} boats near you</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setDrawerOpen(true)}
            className="relative gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
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
      </div>

      {/* Active filter chips */}
      <ActiveFiltersChips activeFilters={activeFilters} onClearAll={clearAll} />

      {/* Results grid */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBoats.map((boat) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
      </div>

      {/* Filters drawer: left overlay on desktop, full-screen on mobile */}
      <FiltersDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAll}
        resultCount={resultCount}
      />
    </div>
  )
}
