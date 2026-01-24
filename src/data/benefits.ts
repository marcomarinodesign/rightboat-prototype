export type Benefit = {
  id: string
  icon: string
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    id: "global-marketplace",
    icon: "Globe",
    title: "Global Boat Marketplace",
    description:
      "Access thousands of boats from trusted brokers worldwide in one convenient platform.",
  },
  {
    id: "verified-listings",
    icon: "ShieldCheck",
    title: "Verified Listings",
    description:
      "Every listing is verified by our team to ensure accuracy and authenticity.",
  },
  {
    id: "easy-comparison",
    icon: "Compare",
    title: "Easy Comparison",
    description:
      "Compare models, prices, and specifications side-by-side to find your perfect match.",
  },
  {
    id: "trusted-brands",
    icon: "Award",
    title: "Trusted Brands",
    description:
      "Browse premium brands and reputable dealers with proven track records.",
  },
  {
    id: "expert-content",
    icon: "BookOpen",
    title: "Expert Content",
    description:
      "Access comprehensive reviews, guides, and expert insights to make informed decisions.",
  },
]
