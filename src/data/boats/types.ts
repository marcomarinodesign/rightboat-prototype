export type Boat = {
  id: string
  make: string
  model: string
  makeSlug: string
  modelSlug: string
  year: number
  condition: "New" | "Used"
  length: string
  price: string
  location: string
  image: string
  broker: string
  featured?: boolean
  galleryImages?: string[]
  description?: string
  boatType?: string
  beam?: string
  loa?: string
}
