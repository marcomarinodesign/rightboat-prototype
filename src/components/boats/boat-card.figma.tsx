// FIGMA NODE: Boat Card — listing card component in El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma (ver FIGMA_NODES_NEEDED.md)
// LAST SYNC: 2026-04-27

/**
 * Code Connect — BoatCard
 *
 * Pasos para conectar:
 * 1. En El-Captain-DS, localiza o crea el componente "Boat Card" (con variantes grid / list).
 * 2. Selecciona el componente → clic derecho → "Copy link to selection".
 * 3. Reemplaza la URL de abajo y ajusta los `figma.enum` / `figma.string` a las
 *    propiedades del component set en Figma.
 * 4. Ejecuta: npm run figma:connect:publish
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

figma.connect(
  BoatCard,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=1-1",
  {
    imports: [
      'import { BoatCard } from "@/components/boats/boat-card"',
    ],
    props: {
      variant: figma.enum("Variant", {
        Grid: "grid",
        List: "list",
      }),
    },
    example: ({ variant }) => <BoatCard boat={MOCK_BOAT} variant={variant} />,
  }
)
