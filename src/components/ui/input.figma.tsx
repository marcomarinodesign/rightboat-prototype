// FIGMA NODE: Input component set — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=28-8
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Input } from "./input"

figma.connect(
  Input,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=28-8",
  {
    imports: ['import { Input } from "@/components/ui/input"'],
    props: {
      disabled: figma.enum("State", {
        Default: false,
        Filled: false,
        Disabled: true,
      }),
      placeholder: figma.string("Placeholder"),
    },
    example: (props) => <Input {...props} placeholder={props.placeholder ?? "Placeholder"} />,
  }
)
