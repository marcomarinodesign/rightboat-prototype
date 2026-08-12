/**
 * Prototype region taxonomy for the SRP Location → Region filter.
 *
 * A region groups the underlying locations (US states or countries) a boater
 * would recognise as one cruising area. Selecting a region includes every
 * location below it; the SRP shows the region name, not each location.
 *
 * These definitions are examples for design/prototype purposes — the complete
 * taxonomy is finalized separately.
 */

export type RegionLocationKind = "state" | "country"

export type RegionLocation = {
  /** Stable slug — reuses the state/country slugs from location-geo-data. */
  value: string
  label: string
  kind: RegionLocationKind
  /** Text matched against `boat.location` in the prototype dataset. */
  match: string
}

export type Region = {
  /** Stable, readable slug used in URLs (/boats-for-sale/regions/[region]). */
  value: string
  label: string
  /** Broad geography the region is listed under. */
  group: string
  /** Short helper shown under the region name in the picker. */
  summary: string
  locations: RegionLocation[]
}

export type RegionGroup = {
  label: string
  regions: Region[]
}

const state = (label: string, value: string): RegionLocation => ({
  value,
  label,
  kind: "state",
  match: label,
})

const country = (
  label: string,
  value: string,
  match: string = label
): RegionLocation => ({
  value,
  label,
  kind: "country",
  match,
})

export const REGION_GROUPS: RegionGroup[] = [
  {
    label: "United States",
    regions: [
      {
        value: "pacific-northwest",
        label: "Pacific Northwest",
        group: "United States",
        summary: "Washington and Oregon",
        locations: [
          state("Washington", "washington"),
          state("Oregon", "oregon"),
        ],
      },
      {
        value: "southeast",
        label: "Southeast",
        group: "United States",
        summary: "Florida up to North Carolina",
        locations: [
          state("Florida", "florida"),
          state("Georgia", "georgia"),
          state("South Carolina", "south-carolina"),
          state("North Carolina", "north-carolina"),
        ],
      },
      {
        value: "northeast",
        label: "Northeast",
        group: "United States",
        summary: "Maine through New Jersey",
        locations: [
          state("Maine", "maine"),
          state("New Hampshire", "new-hampshire"),
          state("Massachusetts", "massachusetts"),
          state("Rhode Island", "rhode-island"),
          state("Connecticut", "connecticut"),
          state("New York", "new-york"),
          state("New Jersey", "new-jersey"),
        ],
      },
      {
        value: "great-lakes",
        label: "Great Lakes",
        group: "United States",
        summary: "States bordering the Great Lakes",
        locations: [
          state("Illinois", "illinois"),
          state("Indiana", "indiana"),
          state("Michigan", "michigan"),
          state("Minnesota", "minnesota"),
          state("New York", "new-york"),
          state("Ohio", "ohio"),
          state("Pennsylvania", "pennsylvania"),
          state("Wisconsin", "wisconsin"),
        ],
      },
    ],
  },
  {
    label: "Europe",
    regions: [
      {
        value: "mediterranean",
        label: "Mediterranean",
        group: "Europe",
        summary: "Spain through Turkey, plus Malta and Cyprus",
        locations: [
          country("Spain", "spain"),
          country("France", "france"),
          country("Monaco", "monaco"),
          country("Italy", "italy"),
          country("Croatia", "croatia"),
          country("Montenegro", "montenegro"),
          country("Greece", "greece"),
          country("Turkey", "turkey"),
          country("Malta", "malta"),
          country("Cyprus", "cyprus"),
        ],
      },
      {
        value: "northern-europe",
        label: "Northern Europe",
        group: "Europe",
        summary: "UK, Ireland, the Low Countries and the Baltic",
        locations: [
          country("United Kingdom", "united-kingdom"),
          country("Ireland", "ireland"),
          country("Netherlands", "netherlands"),
          country("Belgium", "belgium"),
          country("Germany", "germany"),
          country("Denmark", "denmark"),
          country("Sweden", "sweden"),
          country("Norway", "norway"),
          country("Finland", "finland"),
          country("Poland", "poland"),
        ],
      },
    ],
  },
  {
    label: "Caribbean",
    regions: [
      {
        value: "eastern-caribbean",
        label: "Eastern Caribbean",
        group: "Caribbean",
        summary: "Leeward and Windward islands",
        locations: [
          country("St. Martin", "saint-martin", "St. Martin"),
          country("British Virgin Islands", "british-virgin-islands"),
          country(
            "US Virgin Islands",
            "virgin-islands-of-the-united-states",
            "Virgin Islands"
          ),
          country("Antigua and Barbuda", "antigua-and-barbuda", "Antigua"),
          country("Saint Lucia", "saint-lucia"),
          country("Grenada", "grenada"),
          country(
            "St. Vincent and the Grenadines",
            "saint-vincent-and-the-grenadines",
            "Grenadines"
          ),
          country("Martinique", "martinique"),
          country("Guadeloupe", "guadeloupe"),
          country("Trinidad and Tobago", "trinidad-and-tobago", "Trinidad"),
        ],
      },
      {
        value: "bahamas-greater-antilles",
        label: "Bahamas & Greater Antilles",
        group: "Caribbean",
        summary: "Bahamas, Puerto Rico and Hispaniola",
        locations: [
          country("Bahamas", "bahamas"),
          country("Puerto Rico", "puerto-rico"),
          country("Dominican Republic", "dominican-republic"),
          country("Curaçao", "curacao"),
        ],
      },
    ],
  },
]

export const ALL_REGIONS: Region[] = REGION_GROUPS.flatMap(
  (group) => group.regions
)

export function getRegion(value: string): Region | undefined {
  return ALL_REGIONS.find((region) => region.value === value)
}

export function getRegionLabel(value: string): string {
  return getRegion(value)?.label ?? value
}

/** Locations from other regions, offered when adding to a selection. */
export function getRegionAddableLocations(regionValue: string): RegionLocation[] {
  const region = getRegion(regionValue)
  if (!region) return []
  const inRegion = new Set(region.locations.map((l) => l.value))
  const seen = new Set<string>()
  return ALL_REGIONS.flatMap((r) => r.locations)
    .filter((location) => {
      if (inRegion.has(location.value) || seen.has(location.value)) return false
      seen.add(location.value)
      return true
    })
    .sort((a, b) => a.label.localeCompare(b.label))
}

export function getRegionLocation(
  value: string
): RegionLocation | undefined {
  return ALL_REGIONS.flatMap((region) => region.locations).find(
    (location) => location.value === value
  )
}

/**
 * Locations actually searched: the region's own locations minus the ones the
 * user excluded, plus any individual locations they added on top.
 */
export function getRegionEffectiveLocations(
  regionValue: string,
  excluded: string[],
  added: string[]
): RegionLocation[] {
  const region = getRegion(regionValue)
  const excludedSet = new Set(excluded)
  const base = region
    ? region.locations.filter((location) => !excludedSet.has(location.value))
    : []
  const seen = new Set(base.map((location) => location.value))
  const extras = added
    .filter((value) => !seen.has(value))
    .map((value) => getRegionLocation(value))
    .filter((location): location is RegionLocation => Boolean(location))
  return [...base, ...extras]
}
