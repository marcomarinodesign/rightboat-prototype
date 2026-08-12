export type LocationTab = "zip" | "city-state" | "radius" | "region"

export type FiltersState = {
  /** @deprecated Legacy field; effective query comes from tab-specific fields. */
  location: string
  locationTab: LocationTab
  locationRadius: string
  locationZip: string
  locationCountry: string
  locationState: string
  locationCity: string
  /** Region slug (see region-data.ts); only used by the `region` tab. */
  locationRegion: string
  /** Locations from the region the user removed from the search. */
  locationRegionExcluded: string[]
  /** Individual locations added on top of the region. */
  locationRegionAdded: string[]
  /** power | sail | unpowered — production boat class filter */
  boatClass: string
  /** Category within the selected class (e.g. Center console) */
  boatType: string
  priceMin: string
  priceMax: string
  lengthMin: string
  lengthMax: string
  condition: {
    new: boolean
    used: boolean
  }
  yearMin: string
  yearMax: string
  manufacturer: string
  model: string
  hullMaterial: string
  fuelType: string
}

export const defaultFilters: FiltersState = {
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
  boatClass: "",
  boatType: "",
  priceMin: "",
  priceMax: "",
  lengthMin: "",
  lengthMax: "",
  condition: {
    new: false,
    used: false,
  },
  yearMin: "",
  yearMax: "",
  manufacturer: "",
  model: "",
  hullMaterial: "",
  fuelType: "",
}
