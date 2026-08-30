export type Boat = {
  id: string
  make: string
  model: string
  makeSlug: string
  modelSlug: string
  year: number
  condition: "New" | "Used"
  /** Display condition shown in card specs (Figma: "Like New", "Excellent", "Good"). Falls back to `condition`. */
  conditionLabel?: string
  length: string
  price: string
  location: string
  /** Optional location taxonomy metadata used by experimental SRP filters. */
  locationId?: string
  image: string
  broker: string
  featured?: boolean
  /** Manufacturer-direct listing (SRP grid badge + Alt CTA). */
  manufacturerListing?: boolean
  /**
   * Figma Boat Card media anatomy. "triptych" = hero + two thumbs (Sponsored Alt,
   * Manufacture); "carousel" = single photo with dots and arrows (Sponsored).
   * Defaults from the listing flags when omitted.
   */
  cardMedia?: "triptych" | "carousel" | "single"
  galleryImages?: string[]
  description?: string
  boatType?: string
  beam?: string
  loa?: string
  hullMaterial?: string
  fuelType?: string
  /** Lifestyle / use-case tags used by conversational search. */
  lifestyleTags?: string[]
}
