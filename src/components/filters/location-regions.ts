import type { Boat } from "@/data/boats"
import { defaultFilters, type FiltersState } from "@/components/filters/types"

export type RegionLocation = {
  id: string
  label: string
}

export type LocationRegion = {
  id: string
  label: string
  locations: RegionLocation[]
}

export type LocationRegionGroup = {
  id: string
  label: string
  regions: LocationRegion[]
}

/**
 * Provisional regional taxonomy for the SRP experiment. IDs are stable API-facing
 * values; labels remain independent so editorial naming can evolve safely.
 */
export const LOCATION_REGION_GROUPS: LocationRegionGroup[] = [
  {
    id: "united-states",
    label: "United States",
    regions: [
      {
        id: "pacific-northwest",
        label: "Pacific Northwest",
        locations: [
          { id: "washington", label: "Washington" },
          { id: "oregon", label: "Oregon" },
        ],
      },
      {
        id: "southeast",
        label: "Southeast",
        locations: [
          { id: "florida", label: "Florida" },
          { id: "georgia", label: "Georgia" },
          { id: "south-carolina", label: "South Carolina" },
          { id: "north-carolina", label: "North Carolina" },
        ],
      },
      {
        id: "northeast",
        label: "Northeast",
        locations: [
          { id: "maine", label: "Maine" },
          { id: "new-hampshire", label: "New Hampshire" },
          { id: "vermont", label: "Vermont" },
          { id: "massachusetts", label: "Massachusetts" },
          { id: "rhode-island", label: "Rhode Island" },
          { id: "connecticut", label: "Connecticut" },
          { id: "new-york", label: "New York" },
          { id: "new-jersey", label: "New Jersey" },
        ],
      },
      {
        id: "great-lakes",
        label: "Great Lakes",
        locations: [
          { id: "illinois", label: "Illinois" },
          { id: "indiana", label: "Indiana" },
          { id: "michigan", label: "Michigan" },
          { id: "minnesota", label: "Minnesota" },
          { id: "new-york", label: "New York" },
          { id: "ohio", label: "Ohio" },
          { id: "pennsylvania", label: "Pennsylvania" },
          { id: "wisconsin", label: "Wisconsin" },
        ],
      },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    regions: [
      {
        id: "mediterranean",
        label: "Mediterranean",
        locations: [
          { id: "spain", label: "Spain" },
          { id: "southern-france", label: "Southern France" },
          { id: "monaco", label: "Monaco" },
          { id: "italy", label: "Italy" },
          { id: "croatia", label: "Croatia" },
          { id: "montenegro", label: "Montenegro" },
          { id: "greece", label: "Greece" },
          { id: "turkey", label: "Turkey" },
          { id: "malta", label: "Malta" },
          { id: "cyprus", label: "Cyprus" },
        ],
      },
    ],
  },
  {
    id: "caribbean",
    label: "Caribbean",
    regions: [
      {
        id: "caribbean",
        label: "Caribbean",
        // TODO: Confirm the final Caribbean taxonomy with product/data before expanding it.
        locations: [
          { id: "antigua-and-barbuda", label: "Antigua and Barbuda" },
          { id: "aruba", label: "Aruba" },
          { id: "bahamas", label: "Bahamas" },
          { id: "barbados", label: "Barbados" },
          { id: "belize", label: "Belize" },
          { id: "bonaire", label: "Bonaire" },
          { id: "british-virgin-islands", label: "British Virgin Islands" },
          { id: "cayman-islands", label: "Cayman Islands" },
          { id: "curacao", label: "Curaçao" },
          { id: "dominican-republic", label: "Dominican Republic" },
          { id: "grenada", label: "Grenada" },
          { id: "guadeloupe", label: "Guadeloupe" },
          { id: "martinique", label: "Martinique" },
          { id: "puerto-rico", label: "Puerto Rico" },
          { id: "saint-lucia", label: "Saint Lucia" },
          { id: "saint-martin", label: "St. Martin" },
          {
            id: "saint-vincent-and-the-grenadines",
            label: "Saint Vincent and the Grenadines",
          },
          { id: "trinidad-and-tobago", label: "Trinidad and Tobago" },
          { id: "turks-and-caicos-islands", label: "Turks and Caicos Islands" },
          {
            id: "virgin-islands-of-the-united-states",
            label: "Virgin Islands of the United States",
          },
        ],
      },
    ],
  },
]

export const LOCATION_REGIONS = LOCATION_REGION_GROUPS.flatMap(
  (group) => group.regions
)

export const REGION_BY_ID = new Map(
  LOCATION_REGIONS.map((region) => [region.id, region])
)

export const LOCATION_BY_ID = new Map(
  LOCATION_REGIONS.flatMap((region) => region.locations).map((location) => [
    location.id,
    location,
  ])
)

export function getRegionLabel(id: string): string {
  return REGION_BY_ID.get(id)?.label ?? id
}

export function getRegionLocationIds(regionId: string): string[] {
  return REGION_BY_ID.get(regionId)?.locations.map((location) => location.id) ?? []
}

export function getLocationLabel(id: string): string {
  return LOCATION_BY_ID.get(id)?.label ?? id
}

export function getSelectedRegionLocationIds(regionIds: string[]): string[] {
  return Array.from(new Set(regionIds.flatMap(getRegionLocationIds)))
}

export function isKnownRegionId(id: string): boolean {
  return REGION_BY_ID.has(id)
}

export function isKnownLocationId(id: string): boolean {
  return LOCATION_BY_ID.has(id)
}

export function uniqueKnownIds(
  values: string | string[] | undefined,
  isKnown: (id: string) => boolean
): string[] {
  const ids = Array.isArray(values) ? values : values ? [values] : []
  return Array.from(new Set(ids.filter(isKnown)))
}

export type RegionLocationSearchParams = {
  region?: string | string[]
  includeLocation?: string | string[]
  excludeLocation?: string | string[]
}

/** Sanitizes repeatable regional URL parameters before they enter filter state. */
export function parseRegionLocationSearchParams({
  region,
  includeLocation,
  excludeLocation,
}: RegionLocationSearchParams) {
  return {
    selectedRegionIds: uniqueKnownIds(region, isKnownRegionId),
    includedLocationIds: uniqueKnownIds(includeLocation, isKnownLocationId),
    excludedLocationIds: uniqueKnownIds(excludeLocation, isKnownLocationId),
  }
}

export function regionTestFiltersFromSearchParams(
  sp: RegionLocationSearchParams
): FiltersState {
  const regional = parseRegionLocationSearchParams(sp)
  const hasSelection =
    regional.selectedRegionIds.length > 0 ||
    regional.includedLocationIds.length > 0 ||
    regional.excludedLocationIds.length > 0
  return {
    ...defaultFilters,
    condition: { ...defaultFilters.condition },
    ...regional,
    locationTab: hasSelection ? "region" : defaultFilters.locationTab,
  }
}

/**
 * Resolves prototype listing strings to location taxonomy IDs. The explicit map
 * intentionally avoids making experimental region matching a substring search.
 */
const LOCATION_ID_BY_LISTING_LOCATION: Record<string, string> = {
  "fort lauderdale, florida": "florida",
  "miami, florida": "florida",
  "moore haven, florida": "florida",
  "orlando, florida": "florida",
  "sarasota, florida": "florida",
  "seattle, washington": "washington",
  "osterville, massachusetts": "massachusetts",
  "noank, connecticut": "connecticut",
  "charleston, south carolina": "south-carolina",
  "morehead city, north carolina": "north-carolina",
  "grand rapids, michigan": "michigan",
  monaco: "monaco",
  "cannes, france": "southern-france",
  "st. martin": "saint-martin",
  "saint martin": "saint-martin",
}

export function resolveBoatLocationId(boat: Boat): string | undefined {
  if (boat.locationId && isKnownLocationId(boat.locationId)) {
    return boat.locationId
  }
  return LOCATION_ID_BY_LISTING_LOCATION[boat.location.trim().toLowerCase()]
}
