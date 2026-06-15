// FIGMA FRAME: FSBO / Step 5 — Payment / Desktop (74-44)
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { MockCardForm } from "./MockCardForm"

figma.connect(
  MockCardForm,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=28-8",
  {
    imports: ['import { MockCardForm } from "@/components/fsbo/MockCardForm"'],
    example: () => <MockCardForm />,
  }
)
