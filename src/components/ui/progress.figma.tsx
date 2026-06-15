// FIGMA NODE: Progress component set — El-Captain-DS / Complex Components
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=40-8
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { Progress } from "./progress"

figma.connect(
  Progress,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=40-8",
  {
    imports: ['import { Progress } from "@/components/ui/progress"'],
    props: {
      value: figma.enum("Progress/Value", {
        "25%": 25,
        "50%": 50,
        "100%": 100,
      }),
    },
    example: (props) => <Progress value={props.value ?? 50} />,
  }
)
