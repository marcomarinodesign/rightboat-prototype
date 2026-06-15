// FIGMA NODE: Button component set — El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=24-2
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Button } from "./button"

figma.connect(
  Button,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=24-2",
  {
    imports: ['import { Button } from "@/components/ui/button"'],
    props: {
      variant: figma.enum("Style", {
        Primary: "default",
        Secondary: "secondary",
        Outline: "outline",
        Ghost: "ghost",
        Destructive: "destructive",
        Link: "link",
      }),
      size: figma.enum("Size", {
        SM: "sm",
        MD: "default",
        LG: "lg",
        Icon: "icon",
      }),
    },
    example: (props) => <Button {...props}>Label</Button>,
  }
)
