export type Category = {
  id: string
  name: string
  slug: string
  image: string
  description: string
  /** Approximate listing count shown on the home category card badge */
  listingCount: number
}

export const boatCategories: Category[] = [
  {
    id: "motorboats",
    name: "Motorboats",
    slug: "motorboats",
    image: "/figma/categories/motorboats.png",
    description: "Powerful and versatile boats for cruising and watersports",
    listingCount: 324,
  },
  {
    id: "sailboats",
    name: "Sailboats",
    slug: "sailboats",
    image: "/figma/categories/sailboats.png",
    description: "Classic wind-powered vessels for leisurely cruises and racing",
    listingCount: 187,
  },
  {
    id: "yachts",
    name: "Yachts",
    slug: "yachts",
    image: "/figma/categories/yachts.png",
    description: "Luxury crafts designed for comfort and long-distance voyages",
    listingCount: 95,
  },
  {
    id: "fishing-boats",
    name: "Fishing Boats",
    slug: "fishing-boats",
    image: "/figma/categories/fishing-boats.png",
    description: "Purpose-built boats equipped for freshwater and deep-sea fishing",
    listingCount: 142,
  },

  {
    id: "ribs",
    name: "RIBs",
    slug: "ribs",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
    description: "Rigid inflatable boats perfect for adventure and safety",
    listingCount: 92,
  },
  {
    id: "catamarans",
    name: "Catamarans",
    slug: "catamarans",
    image:
      "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
    description: "Stable multi-hull boats ideal for comfort and space",
    listingCount: 78,
  },
]
