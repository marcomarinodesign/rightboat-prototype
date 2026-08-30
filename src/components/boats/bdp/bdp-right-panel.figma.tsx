// FIGMA NODE: BDP / Section Header — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=877-50
// LAST SYNC: 2026-08-30
//
// The Figma pattern (title + circular arrow Button) is the trigger row of
// BdpRightPanel, which opens the section content in a Sheet.

import figma from "@figma/code-connect/react"

import { BdpRightPanel } from "./bdp-right-panel"

figma.connect(
  BdpRightPanel,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=877-50",
  {
    imports: [
      'import { BdpRightPanel } from "@/components/boats/bdp/bdp-right-panel"',
    ],
    props: {
      title: figma.string("Title"),
    },
    example: ({ title }) => (
      <BdpRightPanel title={title} summary="Engine, hull and equipment details" />
    ),
  }
)
