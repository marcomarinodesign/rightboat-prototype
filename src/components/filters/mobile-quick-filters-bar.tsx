"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SearchableSelect } from "@/components/filters/searchable-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { popularLocations, popularTypes } from "@/data/categories"
import type { FiltersState } from "@/components/filters/types"
import { cn } from "@/lib/utils"
import { MapPin, Ruler, SlidersHorizontal, Tag, Wallet } from "lucide-react"

const locationOptions = popularLocations.map((location) => ({
  label: location,
  value: location,
}))

const boatTypeOptions = popularTypes.map((type) => ({
  label: type,
  value: type,
}))

export type QuickFilterKey = "price" | "length" | "type" | "location" | null

type MobileQuickFiltersBarProps = {
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onOpenMoreFilters: () => void
}

const quickFilterConfig: {
  key: QuickFilterKey
  label: string
  icon: React.ElementType
}[] = [
  { key: "price", label: "Price", icon: Wallet },
  { key: "length", label: "Length", icon: Ruler },
  { key: "type", label: "Type", icon: Tag },
  { key: "location", label: "Location", icon: MapPin },
]

export function MobileQuickFiltersBar({
  filters,
  onFiltersChange,
  onOpenMoreFilters,
}: MobileQuickFiltersBarProps) {
  const [openKey, setOpenKey] = React.useState<QuickFilterKey>(null)

  const updateField = (field: keyof FiltersState, value: string) => {
    onFiltersChange((prev) => ({ ...prev, [field]: value }))
  }

  const openSheet = (key: QuickFilterKey) => {
    if (key === "price" || key === "length" || key === "type" || key === "location") {
      setOpenKey(key)
    } else {
      onOpenMoreFilters()
    }
  }

  return (
    <>
      <div
        className="sticky top-0 z-40 -mx-4 flex gap-2 overflow-x-auto border-b border-border/60 bg-background px-4 py-3 scrollbar-none md:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="tablist"
        aria-label="Quick filters"
      >
        {quickFilterConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key ?? "more"}
            type="button"
            onClick={() => openSheet(key)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/50",
              (key === "price" && (filters.priceMin || filters.priceMax)) ||
                (key === "length" && (filters.lengthMin || filters.lengthMax)) ||
                (key === "type" && filters.boatType) ||
                (key === "location" && filters.location)
                ? "border-primary/50 bg-primary/5 text-primary"
                : ""
            )}
            role="tab"
            aria-selected={openKey === key}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setOpenKey(null)
            onOpenMoreFilters()
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/50"
          aria-label="More filters"
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0" />
          <span>More filters</span>
        </button>
      </div>

      <Sheet open={openKey !== null} onOpenChange={(open) => !open && setOpenKey(null)}>
        <SheetContent
          side="bottom"
          className="mx-0 max-h-[45vh] rounded-t-2xl border-t px-6 pb-8 pt-4"
          aria-describedby={undefined}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>
              {openKey === "price"
                ? "Price range"
                : openKey === "length"
                  ? "Length"
                  : openKey === "type"
                    ? "Boat type"
                    : "Location"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            {openKey === "price" && (
              <>
                <p className="text-sm font-medium text-foreground">Price range</p>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Min ($)"
                    value={filters.priceMin}
                    onChange={(e) => updateField("priceMin", e.target.value)}
                  />
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Max ($)"
                    value={filters.priceMax}
                    onChange={(e) => updateField("priceMax", e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => setOpenKey(null)}>
                  Done
                </Button>
              </>
            )}
            {openKey === "length" && (
              <>
                <p className="text-sm font-medium text-foreground">Length (m)</p>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Min"
                    value={filters.lengthMin}
                    onChange={(e) => updateField("lengthMin", e.target.value)}
                  />
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Max"
                    value={filters.lengthMax}
                    onChange={(e) => updateField("lengthMax", e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => setOpenKey(null)}>
                  Done
                </Button>
              </>
            )}
            {openKey === "type" && (
              <>
                <p className="text-sm font-medium text-foreground">Boat type</p>
                <Select
                  value={filters.boatType || undefined}
                  onValueChange={(value) => {
                    updateField("boatType", value)
                    setOpenKey(null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {boatTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            {openKey === "location" && (
              <>
                <p className="text-sm font-medium text-foreground">Location</p>
                <SearchableSelect
                  value={filters.location}
                  onValueChange={(value) => {
                    updateField("location", value)
                    setOpenKey(null)
                  }}
                  options={locationOptions}
                  placeholder="Select location"
                  searchPlaceholder="Search locations"
                />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
