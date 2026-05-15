"use client"

import * as React from "react"
import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"

import { BoatCard } from "@/components/boats/boat-card"
import { ActiveFiltersChips } from "@/components/filters/active-filters-chips"
import { BoatsForSaleListingIntro } from "@/components/filters/boats-for-sale-listing-intro"
import { FiltersDrawer } from "@/components/filters/filters-drawer"
import {
  FilterSection,
  FiltersFormBody,
} from "@/components/filters/filters-form-body"
import { filterBoats } from "@/components/filters/filter-boats"
import type { FiltersState } from "@/components/filters/types"
import { useFiltersState } from "@/components/filters/use-filters-state"
import type { Boat } from "@/data/boats"
import { useIsMobile } from "@/lib/use-media-query"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price (low to high)" },
  { value: "price-high", label: "Price (high to low)" },
  { value: "newest", label: "Newest listings" },
]

type LayoutVariant = "default" | "split"

type BoatsForSaleListingProps = {
  boats: Boat[]
  layoutVariant?: LayoutVariant
}

export function BoatsForSaleListing({
  boats,
  layoutVariant = "default",
}: BoatsForSaleListingProps) {
  const isMobile = useIsMobile()
  const { filters, setFilters, clearAll, activeFilters } = useFiltersState()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [sortValue, setSortValue] = React.useState("featured")

  const splitDesktop = layoutVariant === "split" && !isMobile
  const showFiltersDrawer = isMobile || layoutVariant !== "split"

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

  const updateDraftLive = React.useCallback(
    (field: keyof FiltersState, value: string) => {
      setFilters((prev) => ({ ...prev, [field]: value }))
    },
    [setFilters]
  )

  const updateConditionLive = React.useCallback(
    (key: "new" | "used", checked: boolean) => {
      setFilters((prev) => ({
        ...prev,
        condition: { ...prev.condition, [key]: checked },
      }))
    },
    [setFilters]
  )

  const cardsGrid = (
    <div
      className={
        splitDesktop
          ? "grid min-w-0 gap-2 md:grid-cols-3"
          : "grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {sortedBoats.map((boat) => (
        <BoatCard key={boat.id} boat={boat} />
      ))}
    </div>
  )

  const emptyState = sortedBoats.length === 0 && (
    <div className="rounded-2xl border border-border/60 bg-muted/20 px-6 py-12 text-center">
      <p className="text-lg font-semibold text-foreground">No boats found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your filters to see more results.
      </p>
      <Button variant="outline" className="mt-4" onClick={clearAll}>
        Clear all filters
      </Button>
    </div>
  )

  const listingToolbar = !splitDesktop ? (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="lg"
        onClick={() => setDrawerOpen(true)}
        className="relative gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeFilters.length > 0 && (
          <Badge className="flex h-5 w-5 items-center justify-center rounded-full bg-background p-0 text-xs text-primary">
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
  ) : null

  const sortRadios = (
    <FilterSection title="Sort by">
      <div className="space-y-2" role="radiogroup" aria-label="Sort listings">
        {SORT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <input
              type="radio"
              name="boats-sort"
              value={opt.value}
              checked={sortValue === opt.value}
              onChange={() => setSortValue(opt.value)}
              className="h-4 w-4 accent-primary"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  )

  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-2xl border border-border/60 bg-card px-6 py-6 sm:px-8 sm:py-8">
        <div className="mb-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Boats for sale
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Boats for sale</h1>
          {!splitDesktop && (
            <p className="mt-1 text-sm text-muted-foreground">
              {resultCount} {resultCount === 1 ? "listing" : "listings"}
            </p>
          )}
          <BoatsForSaleListingIntro
            className={splitDesktop ? "mt-1" : "mt-2"}
          />
        </div>
      </div>

      {!splitDesktop && (
        <ActiveFiltersChips activeFilters={activeFilters} onClearAll={clearAll} />
      )}

      {listingToolbar}

      {splitDesktop ? (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4 md:min-w-0">
          <aside className="hidden min-w-0 md:block md:col-span-1">
            <div className="rounded-2xl border border-border/60 bg-card px-4 pb-4 pt-3">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {resultCount} {resultCount === 1 ? "result" : "results"}
              </p>
              <ActiveFiltersChips
                activeFilters={activeFilters}
                onClearAll={clearAll}
              />
              {sortRadios}
              <FiltersFormBody
                draft={filters}
                boats={boats}
                updateDraft={updateDraftLive}
                updateCondition={updateConditionLive}
                scrollClassName="px-0"
              />
            </div>
          </aside>
          <div className="min-w-0 md:col-span-3">
            {cardsGrid}
            {emptyState}
          </div>
        </div>
      ) : (
        <>
          {cardsGrid}
          {emptyState}
        </>
      )}

      {showFiltersDrawer && (
        <FiltersDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onClearAll={clearAll}
          resultCount={resultCount}
          boats={boats}
        />
      )}
    </div>
  )
}
