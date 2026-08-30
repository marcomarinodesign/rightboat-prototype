// FIGMA NODE: BDP Inactive Variant B (carousel + callout above listing)
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// Demo: src/app/boats-for-sale/seacamper/24/rb226195-b/page.tsx
import figma from "@figma/code-connect/react"

import { BdpInactiveVariantBTop } from "./bdp-inactive-variant-b-top"

function BdpInactiveVariantBCalloutPreview({
  boatType = "Powerboats",
  viewAllLabel = "View all Powerboats →",
}: {
  boatType?: string
  viewAllLabel?: string
}) {
  return (
    <BdpInactiveVariantBTop
      boatType={boatType}
      viewAllHref="/boats-for-sale?type=power"
      viewAllLabel={viewAllLabel}
    />
  )
}

figma.connect(
  BdpInactiveVariantBCalloutPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-5486",
  {
    imports: [
      '// Full page: src/app/boats-for-sale/seacamper/24/rb226195-b/page.tsx',
      'import { BdpInactiveVariantBTop } from "@/components/boats/bdp/bdp-inactive-variant-b-top"',
    ],
    props: {
      boatType: figma.string("Boat Type"),
      viewAllLabel: figma.string("View all link label"),
    },
    example: ({ boatType, viewAllLabel }) => (
      <BdpInactiveVariantBCalloutPreview boatType={boatType} viewAllLabel={viewAllLabel} />
    ),
  }
)
