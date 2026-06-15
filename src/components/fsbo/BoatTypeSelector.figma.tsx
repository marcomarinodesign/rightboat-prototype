// FIGMA FRAME: FSBO / Step 1 — Your Boat / Desktop (74-20)
// LAST SYNC: 2026-06-15
//
// Pendiente: crear Boat Type Selector en El-Captain-DS.

import figma from "@figma/code-connect/react"

import { BoatTypeSelector } from "./BoatTypeSelector"

figma.connect(
  BoatTypeSelector,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-87",
  {
    imports: ['import { BoatTypeSelector } from "@/components/fsbo/BoatTypeSelector"'],
    example: () => (
      <BoatTypeSelector value="Sailboat" onChange={() => {}} />
    ),
  }
)
