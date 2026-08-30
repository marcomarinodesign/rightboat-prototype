// FIGMA NODE: Price filter section — SRP / Split view → Filters panel
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=530-182
// STATUS: conectado al frame de sección (refinar a componente publicado si hace falta)
// LAST SYNC: 2026-05-21

/**
 * Code Connect — PriceHistogram (mock distribution + dual range slider + min/max)
 *
 * Usado dentro de FiltersFormBody. Prop `boats` se mantiene en la API del panel;
 * el histograma del prototipo usa datos mock.
 */
import figma from "@figma/code-connect/react"

import { PriceHistogram } from "./price-histogram"
import { listingBoats } from "@/data/boats"

const noop = () => undefined

function PriceHistogramPreview() {
  return (
    <PriceHistogram
      boats={listingBoats}
      priceMin=""
      priceMax=""
      onPriceMinChange={noop}
      onPriceMaxChange={noop}
    />
  )
}

figma.connect(
  PriceHistogramPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=530-182",
  {
    imports: [
      'import { PriceHistogram } from "@/components/filters/price-histogram"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <PriceHistogramPreview />,
  }
)
