// FIGMA: BDP Inactive Variant 3 frames — product name Variant C (one route: half + full sheet)
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// Demo: src/app/boats-for-sale/seacamper/24/rb226195-alt/page.tsx
import figma from "@figma/code-connect/react"

import { BdpInactiveOverlay } from "./bdp-inactive-overlay"

function BdpInactiveVariantCSheetHalf({ boatType = "Powerboats" }: { boatType?: string }) {
  return (
    <div className="relative h-[480px] w-full max-w-[1440px] bg-muted">
      <BdpInactiveOverlay
        boatType={boatType}
        stage="half"
        onPromoteToFull={() => undefined}
        onBackToHalf={() => undefined}
      />
    </div>
  )
}

function BdpInactiveVariantCSheetOpened({ boatType = "Powerboats" }: { boatType?: string }) {
  return (
    <div className="relative h-[900px] w-full max-w-[1440px] bg-muted">
      <BdpInactiveOverlay
        boatType={boatType}
        stage="full"
        onPromoteToFull={() => undefined}
        onBackToHalf={() => undefined}
      />
    </div>
  )
}

figma.connect(
  BdpInactiveVariantCSheetHalf,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-5703",
  {
    imports: [
      '// Variant C — page: src/app/boats-for-sale/seacamper/24/rb226195-alt/page.tsx',
      'import { BdpInactiveOverlay } from "@/components/boats/bdp/bdp-inactive-overlay"',
    ],
    props: {
      boatType: figma.string("Boat Type"),
    },
    example: ({ boatType }) => <BdpInactiveVariantCSheetHalf boatType={boatType} />,
  }
)

figma.connect(
  BdpInactiveVariantCSheetOpened,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-5630",
  {
    imports: [
      '// Variant C — opened: same route ?overlay=full',
      'import { BdpInactiveOverlay } from "@/components/boats/bdp/bdp-inactive-overlay"',
    ],
    props: {
      boatType: figma.string("Boat Type"),
    },
    example: ({ boatType }) => <BdpInactiveVariantCSheetOpened boatType={boatType} />,
  }
)
