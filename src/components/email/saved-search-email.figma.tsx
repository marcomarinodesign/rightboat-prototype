// FIGMA NODE: Email / Templates / Saved Search
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: mapeado al frame Saved Search Email — Template (383-9), 2026-08-30
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { SavedSearchEmail } from "./saved-search-email"
import { centerConsoleProps } from "@/data/email-monetization-mock"

figma.connect(
  SavedSearchEmail,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=383-9",
  {
    imports: [
      'import { SavedSearchEmail } from "@/components/email/saved-search-email"',
      'import { centerConsoleProps } from "@/data/email-monetization-mock"',
    ],
    example: () => <SavedSearchEmail {...centerConsoleProps} showDevLabels />,
  }
)
