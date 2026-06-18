// FIGMA NODE: Progress — El-Captain-DS (wizard header bar)
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=40-8
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { WizardProgress } from "./WizardProgress"

figma.connect(
  WizardProgress,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=40-8",
  {
    imports: ['import { WizardProgress } from "@/components/fsbo/WizardProgress"'],
    example: () => (
      <WizardProgress
        step={1}
        totalSteps={5}
        stepName="Your Boat"
        onClose={() => {}}
      />
    ),
  }
)
