// FIGMA NODE: Button — El-Captain-DS (wizard sticky footer CTA)
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=24-2
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { WizardFooter } from "./WizardFooter"

figma.connect(
  WizardFooter,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=24-2",
  {
    imports: ['import { WizardFooter } from "@/components/fsbo/WizardFooter"'],
    example: () => (
      <WizardFooter label="Continue →" onClick={() => {}} />
    ),
  }
)
