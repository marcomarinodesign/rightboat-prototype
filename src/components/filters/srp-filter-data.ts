/** Prototype SRP filter options aligned with rightboat.com production filters. */

export type BoatClass = "power" | "sail" | "unpowered"

export const SRP_BOAT_CLASS_OPTIONS: { label: string; value: BoatClass }[] = [
  { label: "Power", value: "power" },
  { label: "Sail", value: "sail" },
  { label: "Unpowered", value: "unpowered" },
]

/** Production-style categories grouped by boat class (rightboat.com SRP). */
export const SRP_CATEGORIES_BY_CLASS: Record<BoatClass, readonly string[]> = {
  power: [
    "Aft Cabin",
    "Antique and Classic Powerboats",
    "Bay Boats",
    "Bowrider",
    "Cabin cruisers",
    "Center console",
    "Classic boats",
    "Commercial Boats",
    "Convertible Boats",
    "Cruisers",
    "Cuddy Cabin",
    "Deck Boats",
    "Dinghy/Tender",
    "Electric Boats",
    "Fishing boats",
    "Flats Boats",
    "Flybridge",
    "High Performance",
    "House Boats",
    "Inflatables",
    "Jet boats",
    "Motor Yachts",
    "Narrowboats",
    "Passenger",
    "Pilothouse",
    "Pontoon boats",
    "Power Catamarans",
    "Powerboats",
    "RIB boats",
    "Runabout",
    "Ski and Wakeboard",
    "Sports cruiser",
    "Sports Fishing",
    "Trawlers",
    "Tug",
    "Walkaround",
    "Yachts",
  ],
  sail: [
    "Antique and Classic Sailboats",
    "Catamaran",
    "Classic Boats",
    "Cruising Sailboats",
    "Daysailers",
    "Dinghies",
    "Gulets",
    "Ketches",
    "Llaut",
    "Motorsailer",
    "Multi-Hull Sailboats",
    "Racing Sailboats",
    "Sailboats",
    "Sloop",
    "Yawl",
  ],
  unpowered: [
    "Canoes",
    "Dinghies",
    "Inflatable",
    "Kayaks",
    "Paddle Boats",
    "Rowing Boats",
    "Tender",
    "Unpowered",
  ],
}

/** Production hull materials (rightboat.com). */
export const SRP_HULL_MATERIALS = [
  "Aluminium",
  "Carbon Fibre",
  "Composite",
  "Ferro Cement",
  "GRP",
  "Hypalon",
  "PVC",
  "Roplene",
  "Steel",
  "Wood",
  "Other",
] as const

/** Production fuel types (rightboat.com). */
export const SRP_FUEL_TYPES = [
  "Diesel",
  "Electric",
  "Petrol",
  "Hydrogen",
  "Biofuel",
  "Hybrid",
  "Other",
] as const

const HULL_VALUE_ALIASES: Record<string, readonly string[]> = {
  Aluminium: ["Aluminium", "Aluminum"],
  GRP: ["GRP", "Fiberglass", "Fibreglass"],
  Composite: ["Composite"],
  Steel: ["Steel"],
  Wood: ["Wood"],
  "Carbon Fibre": ["Carbon Fibre", "Carbon Fiber"],
}

const FUEL_VALUE_ALIASES: Record<string, readonly string[]> = {
  Petrol: ["Petrol", "Gas", "Gasoline"],
  Diesel: ["Diesel"],
  Electric: ["Electric"],
  Hybrid: ["Hybrid"],
}

export const SRP_MANUFACTURERS = [
  "Bayliner",
  "Jeanneau",
  "Bavaria",
  "Sunseeker",
] as const

export const SRP_MODELS_BY_MANUFACTURER: Record<
  (typeof SRP_MANUFACTURERS)[number],
  readonly string[]
> = {
  Bayliner: ["245 Cruiser", "160 Bowrider", "Element E18", "Trophy 2052"],
  Jeanneau: ["Sun Odyssey 349", "Leader 9", "Cap Camarat 7.5", "Merry Fisher 895"],
  Bavaria: ["Cruiser 34", "C45", "Vision 42", "Sport 29"],
  Sunseeker: ["Predator 57", "Manhattan 52", "Portofino 48", "Sport 28"],
}

export function modelValueFromLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-")
}

export function modelLabelFromValue(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export const srpBoatClassOptions = SRP_BOAT_CLASS_OPTIONS.map((o) => ({
  label: o.label,
  value: o.value,
}))

export const srpHullMaterialOptions = SRP_HULL_MATERIALS.map((material) => ({
  label: material,
  value: material,
}))

export const srpFuelTypeOptions = SRP_FUEL_TYPES.map((fuel) => ({
  label: fuel,
  value: fuel,
}))

export const srpManufacturerOptions = SRP_MANUFACTURERS.map((brand) => ({
  label: brand,
  value: brand,
}))

export function srpCategoriesForClass(boatClass: string): readonly string[] {
  if (boatClass === "power" || boatClass === "sail" || boatClass === "unpowered") {
    return SRP_CATEGORIES_BY_CLASS[boatClass]
  }
  return []
}

export function srpCategoryOptionsForClass(boatClass: string) {
  return srpCategoriesForClass(boatClass).map((category) => ({
    label: category,
    value: category,
  }))
}

export function boatClassForCategory(category: string): BoatClass | null {
  for (const boatClass of ["power", "sail", "unpowered"] as const) {
    if (SRP_CATEGORIES_BY_CLASS[boatClass].includes(category)) {
      return boatClass
    }
  }
  return null
}

export function hullMaterialMatches(
  filterValue: string,
  boatValue: string | undefined
): boolean {
  if (!filterValue) return true
  if (!boatValue) return true
  const aliases = HULL_VALUE_ALIASES[filterValue] ?? [filterValue]
  const normalized = boatValue.toLowerCase()
  return aliases.some((a) => a.toLowerCase() === normalized)
}

export function fuelTypeMatches(
  filterValue: string,
  boatValue: string | undefined
): boolean {
  if (!filterValue) return true
  if (!boatValue) return true
  const aliases = FUEL_VALUE_ALIASES[filterValue] ?? [filterValue]
  const normalized = boatValue.toLowerCase()
  return aliases.some((a) => a.toLowerCase() === normalized)
}

export function srpModelOptionsForManufacturer(manufacturer: string) {
  const models =
    SRP_MODELS_BY_MANUFACTURER[
      manufacturer as (typeof SRP_MANUFACTURERS)[number]
    ] ?? []
  return models.map((name) => ({
    label: name,
    value: modelValueFromLabel(name),
  }))
}
