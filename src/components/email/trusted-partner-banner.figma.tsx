// FIGMA NODE: Email / Ad Slots / Trusted Partner
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { TrustedPartnerBanner } from "./saved-search-email"

figma.connect(
  TrustedPartnerBanner,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: ['import { TrustedPartnerBanner } from "@/components/email/saved-search-email"'],
    example: () => (
      <TrustedPartnerBanner
        creative={{
          imageUrl: "/brands/broker-placeholder.svg",
          altText: "Trusted partner ad",
          clickUrl: "#",
          sponsorName: "MarineCapital Finance",
          tagline: "Pre-approval in 24 hours",
        }}
      />
    ),
  }
)
