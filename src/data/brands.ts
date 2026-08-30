export type PremiumBrand = {
  id: string
  name: string
  slug: string
  logo: string // Path to logo image in /public/brands/ folder
}

export const premiumBrands: PremiumBrand[] = [
  {
    id: "sunseeker",
    name: "Sunseeker",
    slug: "sunseeker",
    logo: "/figma/brands/sunseeker.png",
  },
  {
    id: "fairline",
    name: "Fairline",
    slug: "fairline",
    logo: "/figma/brands/fairline.png",
  },
  {
    id: "beneteau",
    name: "Beneteau",
    slug: "beneteau",
    logo: "/figma/brands/beneteau.png",
  },
  {
    id: "jeanneau",
    name: "Jeanneau",
    slug: "jeanneau",
    logo: "/figma/brands/jeanneau.png",
  },
  {
    id: "sea-ray",
    name: "Sea Ray",
    slug: "sea-ray",
    logo: "/figma/brands/sea-ray.png",
  },
  {
    id: "aquila",
    name: "Aquila",
    slug: "aquila",
    logo: "/figma/brands/aquila.png",
  },
  {
    id: "princess",
    name: "Princess",
    slug: "princess",
    logo: "/brands/princess.png",
  },
  {
    id: "azimut",
    name: "Azimut",
    slug: "azimut",
    logo: "/brands/azimut.png",
  },
]

const PROPEL_SLUGS = ["sea-ray", "beneteau", "fairline", "sunseeker", "aquila", "jeanneau"] as const

/** Brands shown on Propel landing (design order: Sea Ray, Beneteau, Fairline, Sunseeker, Aquila, Jeanneau) */
export const propelBrands: PremiumBrand[] = PROPEL_SLUGS.map(
  (slug) => premiumBrands.find((b) => b.slug === slug)
).filter((b): b is PremiumBrand => b != null)
