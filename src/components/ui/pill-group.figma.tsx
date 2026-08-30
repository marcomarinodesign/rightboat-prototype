// FIGMA NODE: Tab (Style=Segmented) — 🧱 Primitives
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=710-27
// LAST SYNC: 2026-08-30
//
// Retargeted 2026-08-30: previously pointed at the orphaned Filters / Select
// Field (compact) master (294-93). The segmented Tab primitive is the real
// counterpart of PillGroup; Style=Underline has no code component yet.

import figma from "@figma/code-connect/react"

import { PillGroup } from "./pill-group"

const CONDITION_OPTIONS = [
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
]

figma.connect(
  PillGroup,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=710-27",
  {
    variant: { Style: "Segmented" },
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
