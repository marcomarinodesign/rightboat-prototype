// FIGMA NODE: Email / Ad Slots / Footer Sponsor
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { FooterSponsor } from "./saved-search-email"

figma.connect(
  FooterSponsor,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: ['import { FooterSponsor } from "@/components/email/saved-search-email"'],
    example: () => (
      <FooterSponsor
        slotIndex={1}
        creative={{
          imageUrl: "/brands/broker-placeholder.svg",
          altText: "Footer sponsor resource",
          clickUrl: "#",
          sponsorName: "BoatShield Insurance",
          tagline: "Compare policies for boat owners",
        }}
      />
    ),
  }
)
