// FIGMA NODE: Breadcrumb — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=681-27
// LAST SYNC: 2026-08-30
//
// Figma Depth (Short / Medium / Deep) is content-driven in code — BdpBreadcrumb
// always renders Home / listing / make / model plus the back control.

import figma from "@figma/code-connect/react"

import { BdpBreadcrumb } from "./bdp-breadcrumb"

figma.connect(
  BdpBreadcrumb,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=681-27",
  {
    imports: [
      'import { BdpBreadcrumb } from "@/components/boats/bdp/bdp-breadcrumb"',
    ],
    example: () => <BdpBreadcrumb make="Bayliner" model="245 Cruiser" />,
  }
)
