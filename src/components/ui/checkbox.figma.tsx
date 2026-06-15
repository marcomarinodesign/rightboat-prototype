// FIGMA NODE: Checkbox component set — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=30-16
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Checkbox } from "./checkbox"

figma.connect(
  Checkbox,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=30-16",
  {
    imports: ['import { Checkbox } from "@/components/ui/checkbox"'],
    props: {
      checked: figma.enum("State", {
        Unchecked: false,
        Checked: true,
        Indeterminate: "indeterminate",
        Disabled: false,
      }),
      disabled: figma.enum("State", {
        Unchecked: false,
        Checked: false,
        Indeterminate: false,
        Disabled: true,
      }),
    },
    example: (props) => <Checkbox {...props} aria-label="Checkbox" />,
  }
)
