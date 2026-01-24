export type PopularModel = {
  id: string
  name: string
  brand: string
  image: string
  length: string
  type: string
  priceRange: string
  slug: string
  brandSlug: string
}

export const popularModels: PopularModel[] = [
  {
    id: "model-1",
    name: "V65",
    brand: "Princess",
    brandSlug: "princess",
    slug: "v65",
    image:
      "https://www.rightboat.com/boat_images/image_22772985/thumb_8a238693cc4a44599841019d3902ec653d78cab154af4d989db48ba448495701.webp",
    length: "65 ft",
    type: "Yacht",
    priceRange: "$450,000 - $600,000",
  },
  {
    id: "model-2",
    name: "Vision 46",
    brand: "Bavaria",
    brandSlug: "bavaria-yachts",
    slug: "vision-46",
    image:
      "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
    length: "46 ft",
    type: "Sailboat",
    priceRange: "$250,000 - $350,000",
  },
  {
    id: "model-3",
    name: "39XP",
    brand: "Fjord",
    brandSlug: "fjord",
    slug: "39xp",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
    length: "39 ft",
    type: "Motorboat",
    priceRange: "$900,000 - $1,100,000",
  },
  {
    id: "model-4",
    name: "25LTZ",
    brand: "Shearwater",
    brandSlug: "shearwater",
    slug: "25ltz",
    image:
      "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
    length: "25 ft",
    type: "RIB",
    priceRange: "$80,000 - $120,000",
  },
  {
    id: "model-5",
    name: "R27",
    brand: "Ranger Tugs",
    brandSlug: "ranger-tugs",
    slug: "r27",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
    length: "27 ft",
    type: "Trawler",
    priceRange: "$100,000 - $140,000",
  },
  {
    id: "model-6",
    name: "Sun Odyssey 410",
    brand: "Jeanneau",
    brandSlug: "jeanneau",
    slug: "sun-odyssey-410",
    image:
      "https://www.rightboat.com/boat_images/image_24409432/097f028a7bc24851a5ef0cdda048d6bd7afffa9733b74d0d91b14d2265880802.webp",
    length: "40 ft",
    type: "Sailboat",
    priceRange: "$300,000 - $350,000",
  },
]
