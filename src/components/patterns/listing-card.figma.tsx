/**
 * Code Connect — sustituye la URL por el enlace al componente de listado / tarjeta en Figma.
 * Extiende con `props: { ... }` cuando las propiedades del component set estén alineadas con el código.
 * Guía: docs/CODE_CONNECT.md
 */
import figma from "@figma/code-connect/react"

import { ListingCard } from "./listing-card"

figma.connect(
  ListingCard,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/rightboat-prototype?node-id=1-1",
  {
    imports: ['import { ListingCard } from "@/components/patterns/listing-card"'],
    example: () => (
      <ListingCard
        title="Example listing"
        description="Optional description"
        images={["/brands/broker-placeholder.svg"]}
        price="$175,000"
        showDots
      />
    ),
  }
)
