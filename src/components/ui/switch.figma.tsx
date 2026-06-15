// FIGMA NODE: Switch component set — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=31-14
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Switch } from "./switch"

figma.connect(
  Switch,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=31-14",
  {
    imports: ['import { Switch } from "@/components/ui/switch"'],
    props: {
      checked: figma.enum("State", {
        Off: false,
        On: true,
        Disabled: false,
      }),
      disabled: figma.enum("State", {
        Off: false,
        On: false,
        Disabled: true,
      }),
    },
    example: (props) => <Switch {...props} aria-label="Switch" />,
  }
)
