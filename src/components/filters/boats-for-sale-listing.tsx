"use client"

import * as React from "react"
import Link from "next/link"
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
  const [sortValue, setSortValue] = React.useState("featured")

  const filteredBoats = React.useMemo(
    () => filterBoats(boats, filters),
    [boats, filters]
  )

  const sortedBoats = React.useMemo(() => {
    const copy = [...filteredBoats]
    if (sortValue === "price-low") {
      return copy.sort((a, b) => {
        const pa = parseInt(a.price.replace(/[^0-9]/g, "")) || 0
        const pb = parseInt(b.price.replace(/[^0-9]/g, "")) || 0
        return pa - pb
      })
    }
    if (sortValue === "price-high") {
      return copy.sort((a, b) => {
        const pa = parseInt(a.price.replace(/[^0-9]/g, "")) || 0
        const pb = parseInt(b.price.replace(/[^0-9]/g, "")) || 0
        return pb - pa
      })
    }
    if (sortValue === "newest") {
      return copy.sort((a, b) => b.year - a.year)
    }
    return copy
  }, [filteredBoats, sortValue])

  const resultCount = filteredBoats.length

  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-2xl border border-border/60 bg-card px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link>{" "}
          / Boats for sale
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Boats for sale</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {resultCount} listings · Find your perfect boat
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              onClick={() => setDrawerOpen(true)}
              className="relative gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge className="flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs bg-background text-primary">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
            <Select value={sortValue} onValueChange={setSortValue}>
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
      </div>

      {/* Active filter chips */}
      <ActiveFiltersChips activeFilters={activeFilters} onClearAll={clearAll} />

      {/* Results grid */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {sortedBoats.map((boat) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
      </div>

      {sortedBoats.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-muted/20 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-foreground">No boats found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearAll}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Filters drawer: bottom sheet on mobile, right panel on desktop */}
      <FiltersDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAll}
        resultCount={resultCount}
        boats={boats}
      />
    </div>
  )
}
