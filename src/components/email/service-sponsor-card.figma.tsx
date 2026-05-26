// FIGMA NODE: Email / Ad Slots / Service Sponsor
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"

import { ServiceSponsorCard } from "./saved-search-email"

figma.connect(
  ServiceSponsorCard,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: ['import { ServiceSponsorCard } from "@/components/email/saved-search-email"'],
    example: () => (
      <ServiceSponsorCard
        slotIndex={1}
        creative={{
          imageUrl: "/brands/broker-placeholder.svg",
          altText: "Service sponsor ad",
          clickUrl: "#",
          sponsorName: "TrailMaster Trailers",
          tagline: "Galvanized trailers sized for your boat",
        }}
      />
    ),
  }
)
