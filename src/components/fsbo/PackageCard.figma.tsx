// FIGMA FILE: https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page
// FRAME: FSBO / Step 4 — Choose Plan / Desktop (74-38)
// LAST SYNC: 2026-06-15
//
// Pendiente: crear component set Package Card en El-Captain-DS (Basic / Premium).

import figma from "@figma/code-connect/react"

import { PackageCard } from "./PackageCard"

const PREMIUM_FEATURES = [
  "Everything in Basic",
  "Featured placement in search",
  "Priority buyer matching",
  "Social media boost",
]

figma.connect(
  PackageCard,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=32-2",
  {
    imports: ['import { PackageCard } from "@/components/fsbo/PackageCard"'],
    example: () => (
      <PackageCard
        plan="premium"
        name="Premium"
        price={99}
        billing="month"
        badge="Recommended"
        features={PREMIUM_FEATURES}
        selected
        onSelect={() => {}}
      />
    ),
  }
)
