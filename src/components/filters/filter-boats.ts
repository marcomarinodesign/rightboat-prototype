import { getLocationSearchQueries } from "@/components/filters/location-filter-helpers"
import {
  boatClassForCategory,
  fuelTypeMatches,
  hullMaterialMatches,
  srpCategoriesForClass,
} from "@/components/filters/srp-filter-data"
import type { Boat } from "@/data/boats"
import type { FiltersState } from "@/components/filters/types"

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9]/g, "")
  return parseInt(cleaned, 10) || 0
}

function parseLengthFt(lengthStr: string): number {
  const match = lengthStr.match(/(\d+(?:\.\d+)?)\s*ft/i)
  return match ? parseFloat(match[1]) : 0
}

function lengthFtToM(ft: number): number {
  return ft / 3.28084
}

export function filterBoats(boats: Boat[], filters: FiltersState): Boat[] {
  const locationQueries = getLocationSearchQueries(filters).map((query) =>
    query.toLowerCase()
  )
  // A region with every location excluded matches nothing, not everything.
  if (
    filters.locationTab === "region" &&
    filters.locationRegion &&
    locationQueries.length === 0
  ) {
    return []
  }
  return boats.filter((boat) => {
    if (locationQueries.length > 0) {
      const location = boat.location.toLowerCase()
      if (!locationQueries.some((query) => location.includes(query))) {
        return false
      }
    }
    if (filters.boatType && boat.boatType && boat.boatType !== filters.boatType) {
      return false
    }
    if (filters.boatClass && !filters.boatType) {
      const categories = srpCategoriesForClass(filters.boatClass)
      if (boat.boatType && !categories.includes(boat.boatType)) {
        return false
      }
    }
    if (filters.boatClass && filters.boatType) {
      const expectedClass = boatClassForCategory(filters.boatType)
      if (expectedClass && expectedClass !== filters.boatClass) {
        return false
      }
    }
    const boatPrice = parsePrice(boat.price)
    if (filters.priceMin) {
      const min = parseInt(filters.priceMin, 10)
      if (!Number.isNaN(min) && boatPrice < min) return false
    }
    if (filters.priceMax) {
      const max = parseInt(filters.priceMax, 10)
      if (!Number.isNaN(max) && boatPrice > max) return false
    }
    const boatLengthFt = parseLengthFt(boat.length)
    const boatLengthM = lengthFtToM(boatLengthFt)
    if (filters.lengthMin) {
      const min = parseFloat(filters.lengthMin)
      if (!Number.isNaN(min) && boatLengthM < min) return false
    }
    if (filters.lengthMax) {
      const max = parseFloat(filters.lengthMax)
      if (!Number.isNaN(max) && boatLengthM > max) return false
    }
    if (filters.condition.new && !filters.condition.used && boat.condition !== "New") {
      return false
    }
    if (filters.condition.used && !filters.condition.new && boat.condition !== "Used") {
      return false
    }
    if (filters.yearMin) {
      const min = parseInt(filters.yearMin, 10)
      if (!Number.isNaN(min) && boat.year < min) return false
    }
    if (filters.yearMax) {
      const max = parseInt(filters.yearMax, 10)
      if (!Number.isNaN(max) && boat.year > max) return false
    }
    if (filters.manufacturer && boat.make.toLowerCase() !== filters.manufacturer.toLowerCase()) {
      return false
    }
    if (filters.model && boat.modelSlug !== filters.model) {
      return false
    }
    if (
      filters.hullMaterial &&
      !hullMaterialMatches(filters.hullMaterial, boat.hullMaterial)
    ) {
      return false
    }
    if (filters.fuelType && !fuelTypeMatches(filters.fuelType, boat.fuelType)) {
      return false
    }
    return true
  })
}
