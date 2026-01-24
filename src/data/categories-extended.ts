export type Category = {
  id: string
  name: string
  slug: string
  image: string
  description: string
}

export const boatCategories: Category[] = [
  {
    id: "motorboats",
    name: "Motorboats",
    slug: "motorboats",
    image:
      "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
    description: "Powerful and versatile boats for cruising and watersports",
  },
  {
    id: "sailboats",
    name: "Sailboats",
    slug: "sailboats",
    image:
      "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
    description: "Classic sailing vessels for the traditional boating enthusiast",
  },
  {
    id: "ribs",
    name: "RIBs",
    slug: "ribs",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
    description: "Rigid inflatable boats perfect for adventure and safety",
  },
  {
    id: "yachts",
    name: "Yachts",
    slug: "yachts",
    image:
      "https://www.rightboat.com/boat_images/image_22772985/thumb_8a238693cc4a44599841019d3902ec653d78cab154af4d989db48ba448495701.webp",
    description: "Luxury vessels for the ultimate boating experience",
  },
  {
    id: "catamarans",
    name: "Catamarans",
    slug: "catamarans",
    image:
      "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
    description: "Stable multi-hull boats ideal for comfort and space",
  },
  {
    id: "fishing-boats",
    name: "Fishing Boats",
    slug: "fishing-boats",
    image:
      "https://www.rightboat.com/boat_images/image_24894677/1b9ee4fce58c439aa2dfc4de16dc838a783ecad71a0b4c0fb6a30576d4ffd949.webp",
    description: "Specialized vessels designed for angling and fishing",
  },
]
