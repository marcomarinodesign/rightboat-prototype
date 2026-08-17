const TYPE_PHRASES: Record<string, string> = {
  power: "powerboats",
  sail: "sailboats",
}

const CONDITION_PHRASES: Record<string, string> = {
  new: "new",
  used: "used",
}

export type ClassicBoatType = "all" | "power" | "sail"
export type ClassicCondition = "all" | "new" | "used"

export const CLASSIC_SEARCH_MANUFACTURERS = [
  "Boston Whaler",
  "Jeanneau",
  "Beneteau",
  "Bayliner",
  "Sunseeker",
  "Princess",
  "Lagoon",
  "Grady-White",
  "Sea Ray",
  "Formula",
] as const

export type ClassicSearchFields = {
  boatType?: ClassicBoatType | ""
  condition?: ClassicCondition | ""
  manufacturer?: string
}

/** Turns the homepage structured fields into a query the Smart Filter can parse. */
export function buildClassicSearchQuery(fields: ClassicSearchFields): string {
  const parts: string[] = []
  const condition =
    fields.condition && fields.condition !== "all"
      ? CONDITION_PHRASES[fields.condition]
      : undefined
  if (condition) parts.push(condition)
  const manufacturer = fields.manufacturer?.trim()
  if (manufacturer) parts.push(manufacturer)
  const typePhrase =
    fields.boatType && fields.boatType !== "all"
      ? TYPE_PHRASES[fields.boatType]
      : undefined
  if (typePhrase) parts.push(typePhrase)
  return parts.join(" ").trim()
}
