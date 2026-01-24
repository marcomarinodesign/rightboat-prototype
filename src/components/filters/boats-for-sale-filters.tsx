"use client"

import * as React from "react"

import { ActiveFiltersChips, type ActiveFilter } from "@/components/filters/active-filters-chips"
import { FiltersBar } from "@/components/filters/filters-bar"
import { MoreFiltersSheet } from "@/components/filters/more-filters-sheet"
import { defaultFilters, type FiltersState } from "@/components/filters/types"

const formatCurrency = (value: string) => {
  const number = Number(value)
  if (Number.isNaN(number)) return value
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number)
}

const formatLength = (value: string) => {
  const number = Number(value)
  if (Number.isNaN(number)) return value
  return `${number} m`
}

const formatRange = (
  minValue: string,
  maxValue: string,
  formatter: (value: string) => string
) => {
  if (minValue && maxValue) {
    return `${formatter(minValue)} - ${formatter(maxValue)}`
  }
  if (minValue) {
    return `From ${formatter(minValue)}`
  }
  if (maxValue) {
    return `Up to ${formatter(maxValue)}`
  }
  return ""
}

export function BoatsForSaleFilters() {
  const [filters, setFilters] = React.useState<FiltersState>(defaultFilters)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const clearAll = React.useCallback(() => {
    setFilters({
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
    })
  }, [])

  const activeFilters = React.useMemo<ActiveFilter[]>(() => {
    const items: ActiveFilter[] = []

    if (filters.location) {
      items.push({
        key: "location",
        label: `Location: ${filters.location}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            location: "",
          })),
      })
    }

    if (filters.boatType) {
      items.push({
        key: "boatType",
        label: `Boat type: ${filters.boatType}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            boatType: "",
          })),
      })
    }

    if (filters.priceMin || filters.priceMax) {
      items.push({
        key: "price",
        label: `Price: ${formatRange(
          filters.priceMin,
          filters.priceMax,
          formatCurrency
        )}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            priceMin: "",
            priceMax: "",
          })),
      })
    }

    if (filters.lengthMin || filters.lengthMax) {
      items.push({
        key: "length",
        label: `Length: ${formatRange(
          filters.lengthMin,
          filters.lengthMax,
          formatLength
        )}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            lengthMin: "",
            lengthMax: "",
          })),
      })
    }

    if (filters.condition.new) {
      items.push({
        key: "condition-new",
        label: "Condition: New",
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            condition: {
              ...prev.condition,
              new: false,
            },
          })),
      })
    }

    if (filters.condition.used) {
      items.push({
        key: "condition-used",
        label: "Condition: Used",
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            condition: {
              ...prev.condition,
              used: false,
            },
          })),
      })
    }

    if (filters.yearMin || filters.yearMax) {
      items.push({
        key: "year",
        label: `Year: ${formatRange(
          filters.yearMin,
          filters.yearMax,
          (value) => value
        )}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            yearMin: "",
            yearMax: "",
          })),
      })
    }

    if (filters.manufacturer) {
      items.push({
        key: "manufacturer",
        label: `Manufacturer: ${filters.manufacturer}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            manufacturer: "",
          })),
      })
    }

    if (filters.hullMaterial) {
      items.push({
        key: "hullMaterial",
        label: `Hull: ${filters.hullMaterial}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            hullMaterial: "",
          })),
      })
    }

    if (filters.fuelType) {
      items.push({
        key: "fuelType",
        label: `Fuel: ${filters.fuelType}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            fuelType: "",
          })),
      })
    }

    return items
  }, [filters])

  return (
    <div className="space-y-4">
      <FiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        onOpenMoreFilters={() => setSheetOpen(true)}
      />
      <ActiveFiltersChips
        activeFilters={activeFilters}
        onClearAll={clearAll}
      />
      <MoreFiltersSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={clearAll}
      />
    </div>
  )
}
