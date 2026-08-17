"use client"

import * as React from "react"
import Link from "next/link"
import { Bookmark, SlidersHorizontal } from "lucide-react"
import { toast } from "sonner"

import { BoatCard } from "@/components/boats/boat-card"
import { srpGridCardVariantAt } from "@/components/boats/srp-grid-card-variant"
import { ActiveFiltersChips } from "@/components/filters/active-filters-chips"
import { BoatsForSaleListingIntro } from "@/components/filters/boats-for-sale-listing-intro"
import { FiltersDrawer } from "@/components/filters/filters-drawer"
import { FiltersFormBody } from "@/components/filters/filters-form-body"
import { filterBoats } from "@/components/filters/filter-boats"
import type { FigmaPreviewState } from "@/components/filters/figma-preview"
import {
  figmaPreviewInitialDrawerOpen,
  figmaPreviewInitialFilters,
  figmaPreviewInitialSortOpen,
  figmaPreviewScrollDrawer,
} from "@/components/filters/figma-preview"
import type { FiltersState } from "@/components/filters/types"
import { useFiltersState } from "@/components/filters/use-filters-state"
import { useRegionFilterUrlSync } from "@/components/filters/use-region-filter-url-sync"
import type { Boat } from "@/data/boats"
import { useIsMobile } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"
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

function ListingSortSelect({
  value,
  onValueChange,
  defaultOpen = false,
}: {
  value: string
  onValueChange: (value: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  React.useEffect(() => {
    if (defaultOpen) setOpen(true)
  }, [defaultOpen])

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-44" aria-label="Sort by">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SaveSearchButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={cn("gap-2", className)}
      onClick={() =>
        toast.success(
          "Search saved. We'll notify you when new listings match."
        )
      }
    >
      <Bookmark className="h-4 w-4" aria-hidden />
      Save search
    </Button>
  )
}

/** Q2 winner is split. `archived-grid` is the 4-col + drawer A/B loser. */
type LayoutVariant = "split" | "archived-grid"

type BoatsForSaleListingProps = {
  boats: Boat[]
  layoutVariant?: LayoutVariant
  /** Force mobile/desktop layout (Figma Code Connect / capture). */
  previewMode?: "mobile" | "desktop"
  /** Dev/capture-only UI state preset. */
  figmaPreview?: FigmaPreviewState
  initialFilters?: FiltersState
  /** Opt-in Location → Region filter (prototype: /boats-for-sale/regions). */
  enableRegions?: boolean
  locationVariant?: "region-test"
}

export function BoatsForSaleListing({
  boats,
  layoutVariant = "split",
  previewMode,
  figmaPreview,
  initialFilters: initialFiltersProp,
  enableRegions = false,
  locationVariant,
}: BoatsForSaleListingProps) {
  const isMobileQuery = useIsMobile()
  const isMobile =
    previewMode === "mobile"
      ? true
      : previewMode === "desktop"
        ? false
        : isMobileQuery

  const resolvedInitialFilters =
    initialFiltersProp ?? figmaPreviewInitialFilters(figmaPreview)

  const { filters, setFilters, clearAll, activeFilters } = useFiltersState(
    resolvedInitialFilters
  )
  useRegionFilterUrlSync({
    enabled: locationVariant === "region-test",
    filters,
  })
  const [drawerOpen, setDrawerOpen] = React.useState(() =>
    figmaPreviewInitialDrawerOpen(figmaPreview)
  )
  const [sortValue, setSortValue] = React.useState("featured")
  const sortOpen = figmaPreviewInitialSortOpen(figmaPreview)

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
  const listingCountLabel = `${resultCount} ${resultCount === 1 ? "listing" : "listings"}`

  const updateDraftLive = React.useCallback(
    (field: keyof FiltersState, value: string | string[]) => {
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
      {sortedBoats.map((boat, index) => (
        <BoatCard
          key={boat.id}
          boat={boat}
          gridLayout="srp"
          srpVariant={srpGridCardVariantAt(index, sortedBoats.length)}
        />
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

  const defaultResultsActions = (
    <div className="flex flex-wrap items-center gap-2">
      <SaveSearchButton />
      <ListingSortSelect
        value={sortValue}
        onValueChange={setSortValue}
        defaultOpen={sortOpen}
      />
    </div>
  )

  const splitResultsToolbar = (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground">
        {listingCountLabel}
      </p>
      <ListingSortSelect
        value={sortValue}
        onValueChange={setSortValue}
        defaultOpen={sortOpen}
      />
    </div>
  )

  const listingToolbar = !splitDesktop ? (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground">
        {listingCountLabel}
      </p>
      <div className="flex flex-wrap items-center gap-2">
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
        {defaultResultsActions}
      </div>
    </div>
  ) : null

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
          <BoatsForSaleListingIntro
            className={splitDesktop ? "mt-1" : "mt-2"}
          />
        </div>
      </div>

      {!splitDesktop && (
        <ActiveFiltersChips
          activeFilters={activeFilters}
          onClearAll={clearAll}
          compact
        />
      )}

      {listingToolbar}

      {splitDesktop ? (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4 md:min-w-0">
          <aside className="hidden min-w-0 md:block md:col-span-1">
            <div className="rounded-2xl border border-border/60 bg-card px-4 pb-4 pt-3">
              <ActiveFiltersChips
                activeFilters={activeFilters}
                onClearAll={clearAll}
                compact
              />
              <FiltersFormBody
                draft={filters}
                boats={boats}
                updateDraft={updateDraftLive}
                updateCondition={updateConditionLive}
                scrollClassName="px-0"
                enableRegions={enableRegions}
                locationVariant={locationVariant}
              />
            </div>
          </aside>
          <div className="min-w-0 md:col-span-3">
            {splitResultsToolbar}
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
          previewMode={previewMode}
          scrollOnOpen={figmaPreviewScrollDrawer(figmaPreview)}
          enableRegions={enableRegions}
          locationVariant={locationVariant}
        />
      )}
    </div>
  )
}
