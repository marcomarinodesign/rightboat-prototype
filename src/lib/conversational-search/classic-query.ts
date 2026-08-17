const TYPE_PHRASES: Record<string, string> = {
  sail: "sailboats",
  power: "powerboats",
  yacht: "yachts",
  cat: "catamaran",
}

const LOCATION_PHRASES: Record<string, string> = {
  fl: "Florida",
  ca: "California",
  tx: "Texas",
  uk: "United Kingdom",
}

const PRICE_PHRASES: Record<string, string> = {
  "0-50": "under $50,000",
  "50-150": "from $50,000 under $150,000",
  "150-500": "from $150,000 under $500,000",
  "500+": "over $500,000",
}

export type ClassicSearchFields = {
  makeModel?: string
  boatType?: string
  location?: string
  priceRange?: string
}

/** Turns the homepage structured fields into a query the Smart Filter can parse. */
export function buildClassicSearchQuery(fields: ClassicSearchFields): string {
  const parts: string[] = []
  const makeModel = fields.makeModel?.trim()
  if (makeModel) parts.push(makeModel)
  const typePhrase = fields.boatType ? TYPE_PHRASES[fields.boatType] : undefined
  if (typePhrase) parts.push(typePhrase)
  const locationPhrase = fields.location
    ? LOCATION_PHRASES[fields.location]
    : undefined
  if (locationPhrase) parts.push(`in ${locationPhrase}`)
  const pricePhrase = fields.priceRange
    ? PRICE_PHRASES[fields.priceRange]
    : undefined
  if (pricePhrase) parts.push(pricePhrase)
  return parts.join(" ").trim()
}
