// FIGMA NODE: Badge component set — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=26-8
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Badge } from "./badge"

figma.connect(
  Badge,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=26-8",
  {
    imports: ['import { Badge } from "@/components/ui/badge"'],
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Secondary: "secondary",
        Outline: "outline",
      }),
    },
    example: (props) => <Badge {...props}>Badge</Badge>,
  }
)
