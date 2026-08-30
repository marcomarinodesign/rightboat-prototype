export type PremiumBrand = {
  id: string
  name: string
  slug: string
  logo: string // Path to logo image in /public/brands/ folder
}

export const premiumBrands: PremiumBrand[] = [
  {
    id: "fairline",
    name: "Fairline",
    slug: "fairline",
    logo: "/figma/brands/brand1.png",
  },
  {
    id: "beneteau",
    name: "Beneteau",
    slug: "beneteau",
    logo: "/figma/brands/brand2.png",
  },
  {
    id: "jeanneau",
    name: "Jeanneau",
    slug: "jeanneau",
    logo: "/figma/brands/brand3.png",
  },
  {
    id: "sea-ray",
    name: "Sea Ray",
    slug: "sea-ray",
    logo: "/figma/brands/brand4.png",
  },
  {
    id: "aquila",
    name: "Aquila",
    slug: "aquila",
    logo: "/figma/brands/brand5.png",
  },
]

const PROPEL_SLUGS = ["sea-ray", "beneteau", "fairline", "sunseeker", "aquila", "jeanneau"] as const

/** Brands shown on Propel landing (design order: Sea Ray, Beneteau, Fairline, Sunseeker, Aquila, Jeanneau) */
export const propelBrands: PremiumBrand[] = PROPEL_SLUGS.map(
  (slug) => premiumBrands.find((b) => b.slug === slug)
).filter((b): b is PremiumBrand => b != null)
