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
}

export const featuredBoats: Boat[] = [
  {
    id: "rb558443",
    make: "Shearwater",
    model: "25LTZ",
    makeSlug: "shearwater",
    modelSlug: "25ltz",
    year: 2017,
    condition: "Used",
    length: "25 ft",
    price: "$99,250",
    location: "United States of America",
    broker: "United Yacht Sales",
    image:
      "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
    featured: true,
  },
  {
    id: "rb539044",
    make: "Fjord",
    model: "39XP",
    makeSlug: "fjord",
    modelSlug: "39xp",
    year: 2024,
    condition: "New",
    length: "39 ft",
    price: "$1,024,000",
    location: "United States of America",
    broker: "Yacht Sales International",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
    featured: true,
  },
  {
    id: "rb558103",
    make: "Bavaria",
    model: "Vision 46",
    makeSlug: "bavaria-yachts",
    modelSlug: "bavaria-vision-46",
    year: 2015,
    condition: "Used",
    length: "46 ft",
    price: "$299,500",
    location: "United States of America",
    broker: "Worth Avenue Yachts",
    image:
      "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
    featured: true,
  },
  {
    id: "rb559072",
    make: "Princess",
    model: "V65",
    makeSlug: "princess",
    modelSlug: "v65",
    year: 2002,
    condition: "Used",
    length: "65 ft",
    price: "$450,000",
    location: "United States of America",
    broker: "Rick Obey Yacht Sales",
    image:
      "https://www.rightboat.com/boat_images/image_22772985/thumb_8a238693cc4a44599841019d3902ec653d78cab154af4d989db48ba448495701.webp",
    featured: true,
  },
]

export const latestBoats: Boat[] = [
  {
    id: "rb564697",
    make: "Tiara",
    model: "35'",
    makeSlug: "tiara",
    modelSlug: "35-64f6e23f-70fc-42c6-881d-c6957fe6215e",
    year: 2002,
    condition: "Used",
    length: "35 ft",
    price: "$175,000",
    location: "United States of America",
    broker: "Denison Yacht Sales",
    image:
      "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
  },
  {
    id: "rb564696",
    make: "Parker Boats",
    model: "28'",
    makeSlug: "parker",
    modelSlug: "28-614d9f87-d0a5-49a8-89c9-369f31556888",
    year: 2024,
    condition: "New",
    length: "28 ft",
    price: "$230,000",
    location: "United States of America",
    broker: "Denison Yacht Sales",
    image:
      "https://www.rightboat.com/boat_images/image_24894677/1b9ee4fce58c439aa2dfc4de16dc838a783ecad71a0b4c0fb6a30576d4ffd949.webp",
  },
  {
    id: "rb564695",
    make: "Heesen",
    model: "144",
    makeSlug: "heesen",
    modelSlug: "144-model",
    year: 1990,
    condition: "Used",
    length: "144 ft",
    price: "$4,499,999",
    location: "United States of America",
    broker: "Denison Yacht Sales",
    image:
      "https://www.rightboat.com/boat_images/image_26952275/9cf7a9d25233460d95f14f6e1cf506b3b99fe89a7b304c4898be4e64cd876e10.webp",
  },
  {
    id: "rb564694",
    make: "Bayliner",
    model: "Avanti 3258",
    makeSlug: "bayliner",
    modelSlug: "avanti-3258",
    year: 1995,
    condition: "Used",
    length: "32 ft",
    price: "$55,000",
    location: "United States of America",
    broker: "Delta Marine",
    image:
      "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
  },
  {
    id: "rb564693",
    make: "Ranger Tugs",
    model: "R27",
    makeSlug: "ranger-tugs",
    modelSlug: "r27",
    year: 2011,
    condition: "Used",
    length: "27 ft",
    price: "$119,900",
    location: "United States of America",
    broker: "Delta Marine",
    image:
      "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
  },
  {
    id: "rb564692",
    make: "Sea Ray",
    model: "340",
    makeSlug: "sea-ray",
    modelSlug: "340",
    year: 2000,
    condition: "Used",
    length: "34 ft",
    price: "$79,000",
    location: "United States of America",
    broker: "Delta Marine",
    image:
      "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
  },
]

export const listingBoats: Boat[] = [
  {
    id: "rb590959",
    make: "Scout",
    model: "305 Lxf",
    makeSlug: "scout",
    modelSlug: "305-lxf",
    year: 2021,
    condition: "Used",
    length: "29.99 ft",
    price: "$284,900",
    location: "Ft Lauderdale, FL",
    broker: "Featured Broker",
    image:
      "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
  },
  {
    id: "rb596537",
    make: "Performance Cruising",
    model: "Gemini 105Mc",
    makeSlug: "performance-cruising",
    modelSlug: "gemini-105mc",
    year: 2006,
    condition: "Used",
    length: "33.5 ft",
    price: "$97,000",
    location: "Moore Haven, FL",
    broker: "The Catamaran Company",
    image:
      "https://www.rightboat.com/boat_images/image_24894677/1b9ee4fce58c439aa2dfc4de16dc838a783ecad71a0b4c0fb6a30576d4ffd949.webp",
  },
  {
    id: "rb609094",
    make: "Regulator",
    model: "28",
    makeSlug: "regulator",
    modelSlug: "28",
    year: 2023,
    condition: "Used",
    length: "32.51 ft",
    price: "$319,000",
    location: "Osterville, MA",
    broker: "Oyster Harbors Marine",
    image:
      "https://www.rightboat.com/boat_images/image_26952275/9cf7a9d25233460d95f14f6e1cf506b3b99fe89a7b304c4898be4e64cd876e10.webp",
  },
  {
    id: "rb591164",
    make: "Jeanneau",
    model: "Sun Odyssey 410",
    makeSlug: "jeanneau",
    modelSlug: "sun-odyssey-410",
    year: 2021,
    condition: "Used",
    length: "40.49 ft",
    price: "$329,000",
    location: "Noank, CT",
    broker: "Featured Broker",
    image:
      "https://www.rightboat.com/boat_images/image_24409432/097f028a7bc24851a5ef0cdda048d6bd7afffa9733b74d0d91b14d2265880802.webp",
  },
  {
    id: "rb597871",
    make: "Aquasport",
    model: "2200 CC",
    makeSlug: "aquasport",
    modelSlug: "2200-cc",
    year: 2024,
    condition: "New",
    length: "22 ft",
    price: "$64,569",
    location: "Old Salt Marine, FL",
    broker: "Suzuki Marine",
    image:
      "https://www.rightboat.com/boat_images/image_25862466/fbf1a2c2e9134e67b7b26a684a31824c18eaba91bb0f43feb2dc09f1ec23ac8f.webp",
  },
  {
    id: "rb599427",
    make: "Formula",
    model: "310 Sun Sport",
    makeSlug: "formula",
    modelSlug: "310-sun-sport",
    year: 2008,
    condition: "Used",
    length: "31 ft",
    price: "$99,800",
    location: "Stockton, CA",
    broker: "Delta Marine",
    image:
      "https://www.rightboat.com/boat_images/image_25295516/8df73503854541399d20db81bbb9cc21b20b9ea45237491dbc57d2e78b8de765.webp",
  },
]

export const detailGallery = [
  "https://www.rightboat.com/boat_images/image_28779386/thumb_794a913a10094b8b84d8765b347fea7e434c84dde4254a869eeb41bd9db3027c.webp",
  "https://www.rightboat.com/boat_images/image_28779491/thumb_0ceadf91593e43ae84a8bfba6fe0329215a567e1cb364ef984acb1c34001701d.webp",
  "https://www.rightboat.com/boat_images/image_28779611/thumb_ad1cabbdf1ff4a1f84eb5715a0f05067732d20e568e24ff08aab8649e140363d.webp",
  "https://www.rightboat.com/boat_images/image_28779698/thumb_81761463de4547b18c3fedbd3d30e6c424867b919f294af3805f0f9facbb6283.webp",
]
