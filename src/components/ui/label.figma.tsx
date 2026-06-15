// FIGMA NODE: Label component set — El-Captain-DS / Complex Components
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=39-9
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Label } from "./label"

figma.connect(
  Label,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=39-9",
  {
    imports: ['import { Label } from "@/components/ui/label"'],
    example: () => <Label htmlFor="field">Label</Label>,
  }
)
