import type {
  AdCreative,
  SavedSearchEmailProps,
  SearchListing,
} from "@/components/email/saved-search-email"
import { pickAdsForContext } from "@/lib/email-targeting"

// ── Contextual image catalog — every URL verified HTTP 200 ─────────────────

const RB = {
  gradyWhite:
    "https://www.rightboat.com/article_images/418/thumb_Power_Boat_Grady_White.jpg",
  docking:
    "https://www.rightboat.com/article_images/420/thumb_docking.jpg",
  binoculars:
    "https://www.rightboat.com/article_images/417/thumb_binoculars.jpg",
  shearwater:
    "https://www.rightboat.com/boat_images/image_22741276/thumb_592ccc096be94ae688f2f798eb95baefec6e9108b5f34c6181cba1e676823e6e.webp",
  fjord39:
    "https://www.rightboat.com/boat_images/image_22499848/thumb_736c623ab056424a8ee8ab9f08b213278be2f1bff5584325a8494422a6bcffb0.webp",
  bavaria46:
    "https://www.rightboat.com/boat_images/image_22714358/thumb_a9c8f4fc612c494eadc9f29abc36093613be58406b80496088c4976067dbe181.webp",
  princess65:
    "https://www.rightboat.com/boat_images/image_22772985/thumb_8a238693cc4a44599841019d3902ec653d78cab154af4d989db48ba448495701.webp",
  galleryA:
    "https://www.rightboat.com/boat_images/image_28779386/thumb_794a913a10094b8b84d8765b347fea7e434c84dde4254a869eeb41bd9db3027c.webp",
  galleryB:
    "https://www.rightboat.com/boat_images/image_28779491/thumb_0ceadf91593e43ae84a8bfba6fe0329215a567e1cb364ef984acb1c34001701d.webp",
  galleryC:
    "https://www.rightboat.com/boat_images/image_28779611/thumb_ad1cabbdf1ff4a1f84eb5715a0f05067732d20e568e24ff08aab8649e140363d.webp",
  galleryD:
    "https://www.rightboat.com/boat_images/image_28779698/thumb_81761463de4547b18c3fedbd3d30e6c424867b919f294af3805f0f9facbb6283.webp",
  sailProfile:
    "https://www.rightboat.com/boat_images/image_24409432/097f028a7bc24851a5ef0cdda048d6bd7afffa9733b74d0d91b14d2265880802.webp",
  powerA:
    "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
  powerB:
    "https://www.rightboat.com/boat_images/image_24894677/1b9ee4fce58c439aa2dfc4de16dc838a783ecad71a0b4c0fb6a30576d4ffd949.webp",
  powerC:
    "https://www.rightboat.com/boat_images/image_26952275/9cf7a9d25233460d95f14f6e1cf506b3b99fe89a7b304c4898be4e64cd876e10.webp",
  powerD:
    "https://www.rightboat.com/boat_images/image_25862466/fbf1a2c2e9134e67b7b26a684a31824c18eaba91bb0f43feb2dc09f1ec23ac8f.webp",
  powerE:
    "https://www.rightboat.com/boat_images/image_25295516/8df73503854541399d20db81bbb9cc21b20b9ea45237491dbc57d2e78b8de765.webp",
} as const

/** Unsplash IDs verified with HTTP 200 — maritime only. */
const us = (photoId: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&q=80`

const US = {
  motorboat: us("1507003211169-0a1dd7228f2d", 640, 480),
  yachtAtSea: us("1544551763-46a013bb70d5", 640, 480),
  yachtLuxury: us("1580273916550-e323be2ae537", 640, 480),
  yachtAerial: us("1567899378494-47b22a2ae96a", 640, 480),
  sailboatUnderway: us("1567894340315-735d7c361db0", 640, 480),
  sailboatDeck: us("1545569341-9eb8b30979d9", 640, 480),
  sailboatSunset: us("1543140313-318677635120", 640, 480),
  sailboatWhite: us("1540946485063-a40da27545f8", 640, 480),
  sailboatFleet: us("1501771924607-209f42a6e7e4", 640, 480),
  navigationChart: us("1559827260-dc66d52bef19", 640, 480),
  catamaranTurquoise: us("1769610352818-cf8fa29ccf9a", 640, 480),
  catamaranBeach: us("1763402084814-e6a988900ba2", 640, 480),
  catamaranSunset: us("1773593893090-27d17a880a07", 640, 480),
  // Banner crops
  bannerYacht: us("1544551763-46a013bb70d5", 600, 150),
  bannerSail: us("1567894340315-735d7c361db0", 600, 150),
  bannerLuxury: us("1580273916550-e323be2ae537", 600, 150),
  bannerCatamaran: us("1769610352818-cf8fa29ccf9a", 600, 150),
  heroTrustedYacht: us("1567899378494-47b22a2ae96a", 600, 200),
  heroTrustedSail: us("1545569341-9eb8b30979d9", 600, 200),
  heroTrustedCat: us("1773593893090-27d17a880a07", 600, 200),
} as const

function listing(
  id: string,
  data: Omit<SearchListing, "id">
): SearchListing {
  return { id, ...data }
}

function creative(
  key: string,
  sponsorName: string,
  tagline: string,
  imageUrl: string,
  altText: string
): [string, AdCreative] {
  return [
    key,
    {
      imageUrl,
      altText,
      clickUrl: "#",
      sponsorName,
      tagline,
    },
  ]
}

/** All ad creatives keyed for `pickAdsForContext` resolution. */
export const allEmailCreatives: Record<string, AdCreative> = Object.fromEntries([
  // ── Center Console — Insurance + Trailer (7 slots + aliases) ──
  creative(
    "center-console-premium",
    "BoatShield Insurance",
    "Coverage built for offshore anglers",
    RB.gradyWhite,
    "Grady-White center console offshore — marine insurance"
  ),
  creative(
    "center-console-service-1",
    "BoatShield Insurance",
    "Get a quote in 2 minutes — no survey required",
    RB.binoculars,
    "Binoculars on deck — pre-purchase survey and insurance"
  ),
  creative(
    "insurance-service",
    "BoatShield Insurance",
    "Get a quote in 2 minutes — no survey required",
    RB.binoculars,
    "Binoculars on deck — pre-purchase survey and insurance"
  ),
  creative(
    "center-console-service-2",
    "TrailMaster Trailers",
    "Galvanized trailers sized for 18–28 ft center consoles",
    RB.docking,
    "Powerboat at marina ramp — trailer launch and retrieval"
  ),
  creative(
    "trailer-service",
    "TrailMaster Trailers",
    "Galvanized trailers sized for 18–28 ft center consoles",
    RB.docking,
    "Powerboat at marina ramp — trailer launch and retrieval"
  ),
  creative(
    "center-console-trusted",
    "BoatShield Insurance",
    "Protect your investment before the next offshore run",
    RB.powerA,
    "Center console powerboat underway — offshore cover"
  ),
  creative(
    "center-console-footer-1",
    "BoatShield Insurance",
    "Compare policies for center console owners",
    RB.docking,
    "Boats docked at marina — hull and liability coverage"
  ),
  creative(
    "insurance-footer",
    "BoatShield Insurance",
    "Compare policies for center console owners",
    RB.docking,
    "Boats docked at marina — hull and liability coverage"
  ),
  creative(
    "center-console-footer-2",
    "TrailMaster Trailers",
    "Free fit guide for Boston Whaler & Grady White",
    RB.shearwater,
    "Shearwater center console — trailer sizing guide"
  ),
  creative(
    "trailer-footer",
    "TrailMaster Trailers",
    "Free fit guide for Boston Whaler & Grady White",
    RB.shearwater,
    "Shearwater center console — trailer sizing guide"
  ),
  creative(
    "center-console-footer-3",
    "SeaTow Membership",
    "24/7 on-water assistance from $179/yr",
    US.bannerYacht,
    "Powerboat at sea — on-water towing assistance"
  ),

  // ── Sailboat — Insurance + Electronics ──
  creative(
    "sailboat-premium",
    "SailGuard Insurance",
    "Agreed hull value for bluewater sailboats",
    US.bannerSail,
    "Sailboat underway with full canvas — bluewater insurance"
  ),
  creative(
    "sailboat-service-1",
    "SailGuard Insurance",
    "Specialist cover for liveaboard & coastal cruisers",
    RB.bavaria46,
    "Bavaria cruising sailboat at anchor — liveaboard cover"
  ),
  creative(
    "sailboat-service-2",
    "NavPro Electronics",
    "B&G, Raymarine & Garmin installs at your marina",
    US.navigationChart,
    "Marine chartplotter and navigation instruments"
  ),
  creative(
    "electronics-service",
    "NavPro Electronics",
    "B&G, Raymarine & Garmin installs at your marina",
    US.navigationChart,
    "Marine chartplotter and navigation instruments"
  ),
  creative(
    "sailboat-trusted",
    "NavPro Electronics",
    "Upgrade your autopilot before spring commissioning",
    US.heroTrustedSail,
    "Sailor at helm with electronics and autopilot display"
  ),
  creative(
    "sailboat-footer-1",
    "SailGuard Insurance",
    "Offshore passage cover from £8/day",
    US.sailboatSunset,
    "Sailboat on open water at sunset — passage insurance"
  ),
  creative(
    "sailboat-footer-2",
    "NavPro Electronics",
    "Free radar tuning with any MFD install",
    US.navigationChart,
    "Radar and multifunction display at sailboat helm"
  ),
  creative(
    "sailboat-footer-3",
    "SailRigging Co.",
    "Standing rigging inspections & replacements",
    RB.sailProfile,
    "Sailboat mast and standing rigging profile view"
  ),

  // ── Yacht — Financing + Crew services ──
  creative(
    "yacht-premium",
    "MarineCapital Finance",
    "Competitive rates on yachts up to £5M",
    US.bannerLuxury,
    "Luxury motor yacht at marina — yacht financing"
  ),
  creative(
    "yacht-service-1",
    "MarineCapital Finance",
    "Pre-approval in 24 hours — no hard credit pull",
    RB.princess65,
    "Princess motor yacht — pre-approved marine finance"
  ),
  creative(
    "financing-service",
    "MarineCapital Finance",
    "Pre-approval in 24 hours — no hard credit pull",
    RB.princess65,
    "Princess motor yacht — pre-approved marine finance"
  ),
  creative(
    "yacht-service-2",
    "Elite Yacht Crew",
    "Captains, stewards & engineers on demand",
    US.yachtLuxury,
    "Crew preparing a motor yacht for charter season"
  ),
  creative(
    "crew-services-service",
    "Elite Yacht Crew",
    "Captains, stewards & engineers on demand",
    US.yachtLuxury,
    "Crew preparing a motor yacht for charter season"
  ),
  creative(
    "yacht-trusted",
    "MarineCapital Finance",
    "Refinance your yacht and lower monthly payments",
    US.heroTrustedYacht,
    "Aerial view of motor yacht — refinance your asset"
  ),
  creative(
    "yacht-footer-1",
    "MarineCapital Finance",
    "Tax-efficient ownership structures explained",
    US.yachtAerial,
    "Superyachts moored in Mediterranean marina"
  ),
  creative(
    "yacht-footer-2",
    "Elite Yacht Crew",
    "Day-rate crew for charter season prep",
    US.yachtAtSea,
    "Motor yacht underway — professional crew on board"
  ),
  creative(
    "yacht-footer-3",
    "YachtCare Management",
    "Full-service management for absentee owners",
    RB.fjord39,
    "Fjord sport yacht — full-service yacht management"
  ),

  // ── Catamaran — Transport ──
  creative(
    "catamaran-premium",
    "OceanHaul Transport",
    "Worldwide catamaran delivery & shipping",
    US.bannerCatamaran,
    "Catamaran on turquoise water — long-haul transport"
  ),
  creative(
    "catamaran-service-1",
    "OceanHaul Transport",
    "Atlantic crossings with insured lift-on/lift-off",
    US.catamaranTurquoise,
    "Catamaran under sail — Atlantic reposition route"
  ),
  creative(
    "transport-service",
    "OceanHaul Transport",
    "Atlantic crossings with insured lift-on/lift-off",
    US.catamaranTurquoise,
    "Catamaran under sail — Atlantic reposition route"
  ),
  creative(
    "catamaran-service-2",
    "Catamaran Logistics",
    "Crane & marina coordination in 40+ ports",
    US.catamaranBeach,
    "Catamaran near Caribbean beach — marina logistics"
  ),
  creative(
    "catamaran-trusted",
    "OceanHaul Transport",
    "Get a fixed quote for your next reposition",
    US.heroTrustedCat,
    "Catamaran at sunset — seasonal reposition quote"
  ),
  creative(
    "catamaran-footer-1",
    "OceanHaul Transport",
    "Seasonal reposition routes — Med to Caribbean",
    US.catamaranSunset,
    "Catamaran sailing at sunset — Med to Caribbean route"
  ),
  creative(
    "transport-footer",
    "OceanHaul Transport",
    "Seasonal reposition routes — Med to Caribbean",
    US.catamaranSunset,
    "Catamaran sailing at sunset — Med to Caribbean route"
  ),
  creative(
    "catamaran-footer-2",
    "Catamaran Logistics",
    "Custom cradles for Lagoon & Fountaine Pajot",
    US.catamaranBeach,
    "Catamaran anchored near shore — custom transport cradle"
  ),
  creative(
    "catamaran-footer-3",
    "BlueWater Surveyors",
    "Pre-delivery surveys for long-haul moves",
    RB.binoculars,
    "Marine surveyor inspecting hull before transport"
  ),
])

const centerConsoleListings: SearchListing[] = [
  listing("cc-1", {
    title: "Boston Whaler 270 Dauntless",
    price: "$142,500",
    year: 2022,
    location: "Fort Lauderdale, FL",
    images: [RB.gradyWhite, RB.powerA],
    href: "#",
  }),
  listing("cc-2", {
    title: "Grady-White Freedom 275",
    price: "$138,900",
    year: 2021,
    location: "Miami, FL",
    images: [RB.shearwater, RB.powerB],
    href: "#",
  }),
  listing("cc-3", {
    title: "Contender 28T",
    price: "$149,000",
    year: 2023,
    location: "Key Largo, FL",
    images: [RB.powerC, RB.powerD],
    href: "#",
  }),
  listing("cc-4", {
    title: "Everglades 243cc",
    price: "$119,500",
    year: 2020,
    location: "Tampa, FL",
    images: [RB.powerE, US.motorboat],
    href: "#",
  }),
  listing("cc-5", {
    title: "Pursuit S 268",
    price: "$134,000",
    year: 2022,
    location: "Naples, FL",
    images: [RB.galleryB, RB.galleryA],
    href: "#",
  }),
  listing("cc-6", {
    title: "Robalo R272",
    price: "$127,800",
    year: 2021,
    location: "Charleston, SC",
    images: [RB.galleryC, RB.powerA],
    href: "#",
  }),
]

const sailboatListings: SearchListing[] = [
  listing("sail-1", {
    title: "Beneteau Oceanis 38.1",
    price: "$185,000",
    year: 2019,
    location: "Annapolis, MD",
    images: [RB.bavaria46, US.sailboatUnderway],
    href: "#",
  }),
  listing("sail-2", {
    title: "Jeanneau Sun Odyssey 349",
    price: "$162,500",
    year: 2018,
    location: "Newport, RI",
    images: [US.sailboatDeck, RB.sailProfile],
    href: "#",
  }),
  listing("sail-3", {
    title: "Catalina 385",
    price: "$198,000",
    year: 2020,
    location: "Norfolk, VA",
    images: [US.sailboatWhite, US.sailboatSunset],
    href: "#",
  }),
  listing("sail-4", {
    title: "Dufour 390 Grand Large",
    price: "$175,000",
    year: 2019,
    location: "Baltimore, MD",
    images: [RB.sailProfile, US.sailboatFleet],
    href: "#",
  }),
  listing("sail-5", {
    title: "Hanse 388",
    price: "$189,500",
    year: 2021,
    location: "Solomons, MD",
    images: [US.sailboatSunset, RB.bavaria46],
    href: "#",
  }),
  listing("sail-6", {
    title: "X-Yachts X4.0",
    price: "$210,000",
    year: 2020,
    location: "St. Michaels, MD",
    images: [US.sailboatUnderway, US.sailboatDeck],
    href: "#",
  }),
]

const yachtListings: SearchListing[] = [
  listing("yacht-1", {
    title: "Princess V55",
    price: "$1,850,000",
    year: 2021,
    location: "Monaco",
    images: [RB.princess65, US.yachtLuxury],
    href: "#",
  }),
  listing("yacht-2", {
    title: "Sunseeker Manhattan 68",
    price: "$2,100,000",
    year: 2020,
    location: "Palma de Mallorca, Spain",
    images: [US.yachtLuxury, US.yachtAerial],
    href: "#",
  }),
  listing("yacht-3", {
    title: "Azimut 60 Flybridge",
    price: "$1,650,000",
    year: 2019,
    location: "Antibes, France",
    images: [RB.fjord39, US.yachtAtSea],
    href: "#",
  }),
  listing("yacht-4", {
    title: "Fairline T65",
    price: "$1,920,000",
    year: 2022,
    location: "Porto Cervo, Italy",
    images: [US.yachtAerial, RB.galleryD],
    href: "#",
  }),
  listing("yacht-5", {
    title: "Princess F55",
    price: "$1,750,000",
    year: 2021,
    location: "Cannes, France",
    images: [RB.princess65, US.yachtAtSea],
    href: "#",
  }),
  listing("yacht-6", {
    title: "Sunseeker 76 Yacht",
    price: "$2,450,000",
    year: 2020,
    location: "Nice, France",
    images: [US.yachtLuxury, RB.galleryD],
    href: "#",
  }),
]

const catamaranListings: SearchListing[] = [
  listing("cat-1", {
    title: "Lagoon 42",
    price: "$485,000",
    year: 2020,
    location: "St. Martin",
    images: [US.catamaranTurquoise, US.catamaranBeach],
    href: "#",
  }),
  listing("cat-2", {
    title: "Fountaine Pajot Isla 40",
    price: "$420,000",
    year: 2019,
    location: "Grenada",
    images: [US.catamaranBeach, US.catamaranSunset],
    href: "#",
  }),
  listing("cat-3", {
    title: "Leopard 45",
    price: "$510,000",
    year: 2021,
    location: "Martinique",
    images: [US.catamaranTurquoise, US.catamaranSunset],
    href: "#",
  }),
  listing("cat-4", {
    title: "Bali 4.2",
    price: "$395,000",
    year: 2018,
    location: "Guadeloupe",
    images: [US.catamaranBeach, US.catamaranTurquoise],
    href: "#",
  }),
  listing("cat-5", {
    title: "Lagoon 46",
    price: "$620,000",
    year: 2022,
    location: "Antigua",
    images: [US.catamaranSunset, US.catamaranBeach],
    href: "#",
  }),
  listing("cat-6", {
    title: "Nautitech 46 Open",
    price: "$550,000",
    year: 2021,
    location: "St. Lucia",
    images: [US.catamaranTurquoise, US.catamaranSunset],
    href: "#",
  }),
]

export const centerConsoleProps: SavedSearchEmailProps = {
  context: {
    boatType: "center-console",
    searchLabel: "Center console boats under $150k",
    location: "Florida",
    userFirstName: "Alex",
    priceRange: { max: 150000 },
  },
  listings: centerConsoleListings,
  ads: pickAdsForContext("center-console", allEmailCreatives),
}

export const sailboatProps: SavedSearchEmailProps = {
  context: {
    boatType: "sailboat",
    searchLabel: "Sailboats 30–40 ft",
    location: "Chesapeake Bay",
    userFirstName: "Jordan",
    priceRange: { min: 150000, max: 250000 },
  },
  listings: sailboatListings,
  ads: pickAdsForContext("sailboat", allEmailCreatives),
}

export const yachtProps: SavedSearchEmailProps = {
  context: {
    boatType: "yacht",
    searchLabel: "Motor yachts over $1M",
    location: "Mediterranean",
    userFirstName: "Morgan",
    priceRange: { min: 1000000 },
  },
  listings: yachtListings,
  ads: pickAdsForContext("yacht", allEmailCreatives),
}

export const catamaranProps: SavedSearchEmailProps = {
  context: {
    boatType: "catamaran",
    searchLabel: "Catamarans for charter",
    location: "Caribbean",
    userFirstName: "Taylor",
    priceRange: { min: 350000, max: 650000 },
  },
  listings: catamaranListings,
  ads: pickAdsForContext("catamaran", allEmailCreatives),
}

export type EmailSegmentId = "center-console" | "sailboat" | "yacht" | "catamaran"

export const emailSegmentOptions: Array<{
  id: EmailSegmentId
  label: string
  props: SavedSearchEmailProps
}> = [
  { id: "center-console", label: "Center Console", props: centerConsoleProps },
  { id: "sailboat", label: "Sailboat", props: sailboatProps },
  { id: "yacht", label: "Yacht", props: yachtProps },
  { id: "catamaran", label: "Catamaran", props: catamaranProps },
]

/** Collect every image URL used in mock data — useful for QA / prefetch. */
export function getAllEmailMockImageUrls(): string[] {
  const urls = new Set<string>()
  for (const creative of Object.values(allEmailCreatives)) {
    urls.add(creative.imageUrl)
  }
  for (const segment of emailSegmentOptions) {
    for (const boat of segment.props.listings) {
      for (const image of boat.images) urls.add(image)
    }
  }
  return [...urls]
}
