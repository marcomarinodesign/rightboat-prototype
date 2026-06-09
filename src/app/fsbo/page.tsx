import type { Metadata } from "next"
import { FSBOLandingClient } from "./FSBOLandingClient"

export const metadata: Metadata = {
  title: "Sell Your Boat Online | List Your Boat for Sale | Rightboat",
  description:
    "Sell your boat online with ease. List your boat, connect with serious buyers, and complete your sale quickly with Rightboat.",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I sell my boat fast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To sell your boat fast, use clear photos, write a detailed description, price it competitively, and list it on a high-traffic platform like Rightboat.",
      },
    },
    {
      "@type": "Question",
      name: "Can I sell my boat online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rightboat's FSBO package offers paid plans from $49/mo (Basic) or $99/mo (Premium) to connect you with thousands of serious buyers worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to sell your boat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many sellers choose online marketplaces like Rightboat because they combine global exposure, speed, and direct buyer communication.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the best place to sell your boat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rightboat helps private sellers reach serious buyers globally while keeping full control over the sale.",
      },
    },
  ],
}

export default function FSBOPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FSBOLandingClient />
    </>
  )
}
