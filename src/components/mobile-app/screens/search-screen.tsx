"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { BoatCard } from "@/components/boats/boat-card"
import { ActiveFiltersChips } from "@/components/filters/active-filters-chips"
import { filterBoats } from "@/components/filters/filter-boats"
import type { FiltersState } from "@/components/filters/types"
import { useFiltersState } from "@/components/filters/use-filters-state"
import { useRegionFilterUrlSync } from "@/components/filters/use-region-filter-url-sync"
import { ConversationalSearchField } from "@/components/search/conversational-search-field"
import { InterpretedSearchBanner } from "@/components/search/interpreted-search-banner"
import {
  clearConversationalChip,
  clearFilterGroup,
  parseConversationalQuery,
} from "@/lib/conversational-search"
import {
  mobileAppGutterXClass,
  mobileAppStickyUnderTopbarClass,
} from "@/components/mobile-app/mobile-app-layout"
import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import { MobileFiltersSheet } from "@/components/mobile-app/mobile-filters-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { listingBoats } from "@/data/boats"
import type { Boat } from "@/data/boats"

function sortBoats(
  boats: Boat[],
  sort: "featured" | "price-low" | "price-high" | "newest"
): Boat[] {
  const copy = [...boats]
  if (sort === "price-low") {
    return copy.sort((a, b) => {
      const pa = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0
      const pb = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0
      return pa - pb
    })
  }
  if (sort === "price-high") {
    return copy.sort((a, b) => {
      const pa = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0
      const pb = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0
      return pb - pa
    })
  }
  if (sort === "newest") {
    return copy.sort((a, b) => b.year - a.year)
  }
  return copy
}

function appBoatHref(id: string) {
  return `/app/boat/${id}`
}

type MobileSearchScreenProps = {
  initialFilters?: FiltersState
  locationVariant?: "region-test"
  conversationalQuery?: string
}

/** SRP: same filters and logic as web `BoatsForSaleListing`; app differs in hero + modal sheet. */
export function MobileSearchScreen({
  initialFilters,
  locationVariant,
  conversationalQuery,
}: MobileSearchScreenProps) {
  const parsedQuery = conversationalQuery?.trim()
    ? parseConversationalQuery(conversationalQuery)
    : null
  const { filters, setFilters, clearAll, activeFilters } = useFiltersState(
    parsedQuery?.filters ?? initialFilters
  )
  useRegionFilterUrlSync({
    enabled: locationVariant === "region-test",
    filters,
  })
  const router = useRouter()
  const [filtersOpen, setFiltersOpen] = React.useState(false)
  React.useEffect(() => {
    if (!conversationalQuery?.trim()) return
    setFilters(parseConversationalQuery(conversationalQuery).filters)
  }, [conversationalQuery, setFilters])
  const [sort, setSort] = React.useState<
    "featured" | "price-low" | "price-high" | "newest"
  >("featured")

  const filteredBoats = React.useMemo(
    () => filterBoats(listingBoats, filters),
    [filters]
  )
  const sortedBoats = React.useMemo(
    () => sortBoats(filteredBoats, sort),
    [filteredBoats, sort]
  )
  const resultCount = filteredBoats.length

  return (
    <div className="space-y-4 pb-4">
      <MobileNativePageHeader
        title="Boats for sale"
        description="Discover a wide range of new and used boats for sale on Rightboat, with listings from trusted brokers, dealers, and manufacturers worldwide. Search by boat type, brand, price, or location and use our advanced filters to compare options and find the right boat for your needs."
      />

      <div className={cn(mobileAppGutterXClass, "mt-4 space-y-3")}>
        <ConversationalSearchField
          variant="srp"
          defaultQuery={conversationalQuery ?? ""}
          showSuggestions={!parsedQuery}
          listingsBasePath="/app/boats-for-sale"
        />
        {parsedQuery ? (
          <InterpretedSearchBanner
            result={parsedQuery}
            filters={filters}
            resultCount={resultCount}
            onRemoveChip={(chip) =>
              setFilters((prev) => clearConversationalChip(chip, prev))
            }
            onEditChip={() => setFiltersOpen(true)}
            onBroaden={(action) =>
              setFilters((prev) => clearFilterGroup(action.filterGroup, prev))
            }
            onSuggestedSearch={(nextQuery) =>
              router.push(
                `/app/boats-for-sale?q=${encodeURIComponent(nextQuery)}`
              )
            }
          />
        ) : null}
      </div>

      {/* Web parity: Filters + Sort below description, full width 50/50 */}
      <div
        className={cn(
          mobileAppGutterXClass,
          "sticky z-40 mt-4 grid w-full grid-cols-2 gap-2 [-webkit-tap-highlight-color:transparent]",
          mobileAppStickyUnderTopbarClass,
          "bg-background/80 py-2 backdrop-blur-md"
        )}
      >
        <Button
          type="button"
          size="lg"
          className="relative min-h-11 w-full min-w-0 gap-2 px-3"
          onClick={() => setFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">Filters</span>
          {activeFilters.length > 0 ? (
            <Badge className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background p-0 text-xs text-primary">
              {activeFilters.length}
            </Badge>
          ) : null}
        </Button>
        <Select
          value={sort}
          onValueChange={(v) =>
            setSort(v as "featured" | "price-low" | "price-high" | "newest")
          }
        >
          <SelectTrigger
            aria-label="Sort by"
            className="h-11 w-full min-w-0 px-3"
          >
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

      <div className={cn(mobileAppGutterXClass, "mt-3")}>
        <ActiveFiltersChips activeFilters={activeFilters} onClearAll={clearAll} />
      </div>

      <div className="grid grid-cols-1 gap-3 px-[var(--mobile-margin)]">
        {sortedBoats.slice(0, 24).map((boat) => (
          <div
            key={boat.id}
            className="w-full min-w-0 [-webkit-tap-highlight-color:transparent]"
          >
            <BoatCard boat={boat} href={appBoatHref(boat.id)} className="w-full" />
          </div>
        ))}
      </div>

      {sortedBoats.length === 0 && !parsedQuery ? (
        <div className="mx-[var(--mobile-margin)] rounded-2xl border border-border/60 bg-muted/20 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-foreground">No boats found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearAll}>
            Clear all filters
          </Button>
        </div>
      ) : null}

      <MobileFiltersSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAll}
        resultCount={resultCount}
        boats={listingBoats}
        locationVariant={locationVariant}
      />
    </div>
  )
}
