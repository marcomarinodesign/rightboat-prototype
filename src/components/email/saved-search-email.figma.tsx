// FIGMA NODE: Email / Templates / Saved Search
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { SavedSearchEmail } from "./saved-search-email"
import { centerConsoleProps } from "@/data/email-monetization-mock"

figma.connect(
  SavedSearchEmail,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: [
      'import { SavedSearchEmail } from "@/components/email/saved-search-email"',
      'import { centerConsoleProps } from "@/data/email-monetization-mock"',
    ],
    example: () => <SavedSearchEmail {...centerConsoleProps} showDevLabels />,
  }
)
