// FIGMA NODE: Boat Card — listing card component in El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=80-65
// LAST SYNC: 2026-05-21
//
// Variants Simple / Sponsored / Manufacture — homepage, carousels, BDP (gridLayout default)
// Variants Alt* — SRP grids only (gridLayout srp)

/**
 * Code Connect — BoatCard
 */
import figma from "@figma/code-connect/react"

import { BoatCard } from "./boat-card"

const MOCK_BOAT = {
  id: "example-001",
  make: "Bayliner",
  model: "245 Cruiser",
  makeSlug: "bayliner",
  modelSlug: "245-cruiser",
  year: 2020,
  condition: "Used" as const,
  length: "7.5m",
  price: "£22,000",
  location: "Southampton, UK",
  broker: "Rightboat",
  image:
    "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp",
  boatType: "Powerboats",
}

const MOCK_SPONSORED = { ...MOCK_BOAT, featured: true as const }
const MOCK_MANUFACTURE = {
  ...MOCK_BOAT,
  manufacturerListing: true as const,
}

figma.connect(
  BoatCard,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=80-65",
  {
    imports: [
      'import { BoatCard } from "@/components/boats/boat-card"',
    ],
    props: {
      figmaVariant: figma.enum("Property 1", {
        Simple: "default",
        Sponsored: "default-sponsored",
        Manufacture: "default-manufacture",
        AltSimple: "srp",
        AltSponsored: "srp-sponsored",
        AltManufacture: "srp-manufacture",
      }),
    },
    example: ({ figmaVariant }) => {
      const boat =
        figmaVariant === "srp-sponsored" || figmaVariant === "default-sponsored"
          ? MOCK_SPONSORED
          : figmaVariant === "srp-manufacture" ||
              figmaVariant === "default-manufacture"
            ? MOCK_MANUFACTURE
            : MOCK_BOAT
      const gridLayout =
        figmaVariant === "srp" ||
        figmaVariant === "srp-sponsored" ||
        figmaVariant === "srp-manufacture"
          ? "srp"
          : "default"
      return <BoatCard boat={boat} gridLayout={gridLayout} />
    },
  }
)
