export type PremiumBrand = {
  id: string
  name: string
  slug: string
  logo: string // Path to logo image in /public/brands/ folder
}

export const premiumBrands: PremiumBrand[] = [
  {
    id: "princess",
    name: "Princess",
    slug: "princess",
    logo: "/brands/princess.png", // Add image to /public/brands/princess.png
  },
  {
    id: "sunseeker",
    name: "Sunseeker",
    slug: "sunseeker",
    logo: "/brands/sunseeker.png", // Add image to /public/brands/sunseeker.png
  },
  {
    id: "azimut",
    name: "Azimut",
    slug: "azimut",
    logo: "/brands/azimut.png", // Add image to /public/brands/azimut.png
  },
  {
    id: "fairline",
    name: "Fairline",
    slug: "fairline",
    logo: "/brands/fairline.png", // Add image to /public/brands/fairline.png
  },
  {
    id: "beneteau",
    name: "Beneteau",
    slug: "beneteau",
    logo: "/brands/beneteau.png", // Add image to /public/brands/beneteau.png
  },
  {
    id: "jeanneau",
    name: "Jeanneau",
    slug: "jeanneau",
    logo: "/brands/jeanneau.png", // Add image to /public/brands/jeanneau.png
  },
  {
    id: "lagoon",
    name: "Lagoon",
    slug: "lagoon",
    logo: "/brands/lagoon.png", // Add image to /public/brands/lagoon.png
  },
  {
    id: "mastercraft",
    name: "Mastercraft",
    slug: "mastercraft",
    logo: "/brands/mastercraft.png", // Add image to /public/brands/mastercraft.png
  },
  {
    id: "boston-whaler",
    name: "Boston Whaler",
    slug: "boston-whaler",
    logo: "/brands/boston-whaler.png", // Add image to /public/brands/boston-whaler.png
  },
  {
    id: "grady-white",
    name: "Grady-White",
    slug: "grady-white",
    logo: "/brands/grady-white.png", // Add image to /public/brands/grady-white.png
  },
  {
    id: "cobalt",
    name: "Cobalt",
    slug: "cobalt",
    logo: "/brands/cobalt.png", // Add image to /public/brands/cobalt.png
  },
  {
    id: "tiara",
    name: "Tiara",
    slug: "tiara",
    logo: "/brands/tiara.png", // Add image to /public/brands/tiara.png
  },
  {
    id: "sea-ray",
    name: "Sea Ray",
    slug: "sea-ray",
    logo: "/brands/sea-ray.png",
  },
  {
    id: "aquila",
    name: "Aquila",
    slug: "aquila",
    logo: "/brands/aquila.png",
  },
]

/** Brands shown on Propel landing (design order: Sea Ray, Beneteau, Fairline, Sunseeker, Aquila, Jeanneau) */
export const propelBrands = [
  premiumBrands.find((b) => b.slug === "sea-ray"),
  premiumBrands.find((b) => b.slug === "beneteau"),
  premiumBrands.find((b) => b.slug === "fairline"),
  premiumBrands.find((b) => b.slug === "sunseeker"),
  premiumBrands.find((b) => b.slug === "aquila"),
  premiumBrands.find((b) => b.slug === "jeanneau"),
].filter(Boolean) as PremiumBrand[]
