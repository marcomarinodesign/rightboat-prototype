export type FiltersState = {
  location: string
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
  hullMaterial: string
  fuelType: string
}

export const defaultFilters: FiltersState = {
  location: "",
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
  hullMaterial: "",
  fuelType: "",
}
