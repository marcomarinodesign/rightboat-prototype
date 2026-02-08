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
  return boats.filter((boat) => {
    if (filters.location && !boat.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.boatType && boat.boatType && boat.boatType !== filters.boatType) {
      return false
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
    return true
  })
}
