// FIGMA NODE: Icon Container — 🧱 Primitives
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=33-8
// LAST SYNC: 2026-08-30
//
// Figma Size variants (SM 14 · MD 18 · LG 22) map to the svg size utility on the
// child icon; the code component sizes via className, not a prop.

import figma from "@figma/code-connect/react"
import { Anchor } from "lucide-react"

import { IconContainer } from "./icon-container"

figma.connect(
  IconContainer,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=33-8",
  {
    imports: [
      'import { IconContainer } from "@/components/ui/icon-container"',
      'import { Anchor } from "lucide-react"',
    ],
    example: () => (
      <IconContainer>
        <Anchor />
      </IconContainer>
    ),
  }
)
