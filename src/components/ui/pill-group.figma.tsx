// FIGMA NODE: pendiente — crear Pill Group en El-Captain-DS (gap documentado)
// CODE: src/components/ui/pill-group.tsx
// LAST SYNC: 2026-06-15
//
// Mapeo provisional al Filters / Select Field compact hasta exista componente Pill Group.

import figma from "@figma/code-connect/react"

import { PillGroup } from "./pill-group"

const CONDITION_OPTIONS = [
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
]

figma.connect(
  PillGroup,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-93",
  {
    imports: ['import { PillGroup } from "@/components/ui/pill-group"'],
    example: () => (
      <PillGroup
        options={CONDITION_OPTIONS}
        value="Used"
        onChange={() => {}}
      />
    ),
  }
)
