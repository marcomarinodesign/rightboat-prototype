/** Prototype SRP filter options (Joe feedback — not global catalog data). */

export const SRP_BOAT_TYPES = [
  "Powerboat",
  "Sailboat",
  "Catamaran",
  "RIB",
  "Narrowboat",
  "Yacht",
  "Other",
] as const

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

export const srpManufacturerOptions = SRP_MANUFACTURERS.map((brand) => ({
  label: brand,
  value: brand,
}))

export const srpBoatTypeOptions = SRP_BOAT_TYPES.map((type) => ({
  label: type,
  value: type,
}))

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
