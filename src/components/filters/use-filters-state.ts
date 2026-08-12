"use client"

import * as React from "react"

import type { ActiveFilter } from "@/components/filters/active-filters-chips"
import {
  clearLocationFields,
  formatLocationActiveFilterLabel,
  hasActiveLocationFilter,
} from "@/components/filters/location-filter-helpers"
import { getRegionLocation } from "@/components/filters/region-data"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import { modelLabelFromValue } from "@/components/filters/srp-filter-data"

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

export function useFiltersState(initialFilters?: FiltersState) {
  const [filters, setFilters] = React.useState<FiltersState>(
    initialFilters ?? defaultFilters
  )

  const clearAll = React.useCallback(() => {
    setFilters({
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
      locationRegionExcluded: [],
      locationRegionAdded: [],
    })
  }, [])

  const activeFilters = React.useMemo<ActiveFilter[]>(() => {
    const items: ActiveFilter[] = []

    if (hasActiveLocationFilter(filters)) {
      const isRegion = filters.locationTab === "region"
      const excludedCount = isRegion ? filters.locationRegionExcluded.length : 0
      // The SRP shows the region name, not every state or country under it.
      const regionLabel = `${formatLocationActiveFilterLabel(filters)}${
        excludedCount > 0 ? ` (−${excludedCount})` : ""
      }`
      items.push({
        key: "location",
        label: isRegion
          ? regionLabel
          : `Location: ${formatLocationActiveFilterLabel(filters)}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            ...clearLocationFields(),
          })),
      })
    }

    // Locations added on top of a region get their own removable chip.
    if (filters.locationTab === "region" && filters.locationRegion) {
      for (const value of filters.locationRegionAdded) {
        const location = getRegionLocation(value)
        if (!location) continue
        items.push({
          key: `region-added-${value}`,
          label: location.label,
          onRemove: () =>
            setFilters((prev) => ({
              ...prev,
              locationRegionAdded: prev.locationRegionAdded.filter(
                (item) => item !== value
              ),
            })),
        })
      }
    }

    if (filters.boatClass) {
      const classLabel =
        filters.boatClass === "power"
          ? "Power"
          : filters.boatClass === "sail"
            ? "Sail"
            : "Unpowered"
      items.push({
        key: "boatClass",
        label: filters.boatType
          ? `${classLabel}: ${filters.boatType}`
          : `Boat class: ${classLabel}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            boatClass: "",
            boatType: "",
          })),
      })
    } else if (filters.boatType) {
      items.push({
        key: "boatType",
        label: `Category: ${filters.boatType}`,
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
            model: "",
          })),
      })
    }

    if (filters.model) {
      const modelLabel = modelLabelFromValue(filters.model)
      items.push({
        key: "model",
        label: `Model: ${modelLabel}`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            model: "",
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

  return {
    filters,
    setFilters,
    clearAll,
    activeFilters,
  }
}
