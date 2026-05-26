// FIGMA NODE: Email / Ad Slots / Premium Partner Banner
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { PremiumPartnerBanner } from "./saved-search-email"

figma.connect(
  PremiumPartnerBanner,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: ['import { PremiumPartnerBanner } from "@/components/email/saved-search-email"'],
    example: () => (
      <PremiumPartnerBanner
        creative={{
          imageUrl: "/brands/broker-placeholder.svg",
          altText: "Premium partner ad",
          clickUrl: "#",
          sponsorName: "Acme Insurance",
          tagline: "Get covered before you sail",
        }}
      />
    ),
  }
)
