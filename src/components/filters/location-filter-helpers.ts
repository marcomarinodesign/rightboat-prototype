import {
  getCityLabel,
  getCityStateSearchQuery,
  getCountryLabel,
  getStateLabel,
  isUnitedStatesCountry,
} from "@/components/filters/location-geo-data"
import {
  getRegionEffectiveLocations,
  getRegionLabel,
} from "@/components/filters/region-data"
import type { FiltersState, LocationTab } from "@/components/filters/types"

export const LOCATION_RADIUS_OPTIONS_ZIP_CITY = [
  { label: "10 miles", value: "10" },
  { label: "25 miles", value: "25" },
  { label: "50 miles", value: "50" },
  { label: "100 miles", value: "100" },
] as const

export const LOCATION_RADIUS_OPTIONS_BY_RADIUS = [
  { label: "25 miles", value: "25" },
  { label: "50 miles", value: "50" },
  { label: "100 miles", value: "100" },
  { label: "200 miles", value: "200" },
  { label: "National", value: "national" },
] as const

/** Text used to match listings for zip / city-state tabs. */
export function getLocationSearchQuery(filters: FiltersState): string {
  if (filters.locationTab === "zip") return filters.locationZip.trim()
  if (filters.locationTab === "city-state") {
    return getCityStateSearchQuery(
      filters.locationCountry,
      filters.locationState,
      filters.locationCity
    )
  }
  return ""
}

/** Locations searched by the region tab (region minus excluded, plus added). */
export function getRegionSearchLocations(filters: FiltersState) {
  if (filters.locationTab !== "region" || !filters.locationRegion) return []
  return getRegionEffectiveLocations(
    filters.locationRegion,
    filters.locationRegionExcluded,
    filters.locationRegionAdded
  )
}

/**
 * All texts a listing may match for the active location tab. A listing passes
 * when it matches any of them (a region covers several states / countries).
 */
export function getLocationSearchQueries(filters: FiltersState): string[] {
  if (filters.locationTab === "region") {
    return getRegionSearchLocations(filters).map((location) => location.match)
  }
  const query = getLocationSearchQuery(filters)
  return query ? [query] : []
}

export function hasActiveLocationFilter(filters: FiltersState): boolean {
  if (filters.locationTab === "radius") {
    return filters.locationRadius !== "" && filters.locationRadius !== "25"
  }
  if (filters.locationTab === "region") {
    return Boolean(filters.locationRegion)
  }
  if (filters.locationTab === "city-state") {
    if (!filters.locationCountry) return false
    if (isUnitedStatesCountry(filters.locationCountry)) {
      return Boolean(filters.locationState && filters.locationCity)
    }
    return Boolean(filters.locationCity)
  }
  return getLocationSearchQuery(filters).length > 0
}

export function formatLocationActiveFilterLabel(filters: FiltersState): string {
  const radiusLabel = getLocationRadiusLabel(filters.locationRadius)
  if (filters.locationTab === "region") {
    return getRegionLabel(filters.locationRegion)
  }
  if (filters.locationTab === "zip") {
    const zip = filters.locationZip.trim()
    return zip ? `${zip} · ${radiusLabel}` : radiusLabel
  }
  if (filters.locationTab === "city-state") {
    const parts: string[] = []
    if (filters.locationCountry) {
      parts.push(getCountryLabel(filters.locationCountry))
    }
    if (
      isUnitedStatesCountry(filters.locationCountry) &&
      filters.locationState
    ) {
      parts.push(getStateLabel(filters.locationState))
    }
    if (filters.locationCity) {
      parts.push(getCityLabel(filters.locationCity))
    }
    const place = parts.join(", ")
    return place ? `${place} · ${radiusLabel}` : radiusLabel
  }
  return radiusLabel
}

export function clearLocationFields(): Pick<
  FiltersState,
  | "location"
  | "locationTab"
  | "locationRadius"
  | "locationZip"
  | "locationCountry"
  | "locationState"
  | "locationCity"
  | "locationRegion"
  | "locationRegionExcluded"
  | "locationRegionAdded"
> {
  return {
    location: "",
    locationTab: "zip",
    locationRadius: "25",
    locationZip: "",
    locationCountry: "",
    locationState: "",
    locationCity: "",
    locationRegion: "",
    locationRegionExcluded: [],
    locationRegionAdded: [],
  }
}

export const LOCATION_TABS: { id: LocationTab; label: string }[] = [
  { id: "zip", label: "Zip Code" },
  { id: "city-state", label: "City / State" },
  { id: "radius", label: "By Radius" },
]

/** Tab order when the Region filter is enabled (Region sits before country/state). */
export const LOCATION_TABS_WITH_REGION: { id: LocationTab; label: string }[] = [
  { id: "zip", label: "Zip Code" },
  { id: "region", label: "Region" },
  { id: "city-state", label: "City / State" },
  { id: "radius", label: "By Radius" },
]

function getLocationRadiusLabel(value: string): string {
  const all = [
    ...LOCATION_RADIUS_OPTIONS_ZIP_CITY,
    ...LOCATION_RADIUS_OPTIONS_BY_RADIUS,
  ]
  return all.find((o) => o.value === value)?.label ?? `${value} miles`
}
