// FIGMA NODE: Testimonial Card — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=564-4776
// LAST SYNC: 2026-08-30
//
// The Figma component is a single card; in code the card renders inside
// TestimonialsCarousel (3-up layout), so the snippet shows the carousel usage.

import figma from "@figma/code-connect/react"

import { TestimonialsCarousel } from "./testimonials-carousel"

const TESTIMONIALS = [
  {
    quote:
      "Rightboat made finding our dream yacht effortless. The platform is intuitive, and we found exactly what we were looking for within days.",
    name: "Sarah Mitchell",
    role: "Boat Owner",
    location: "Miami, FL",
  },
]

figma.connect(
  TestimonialsCarousel,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=564-4776",
  {
    imports: [
      'import { TestimonialsCarousel } from "@/components/blocks/testimonials-carousel"',
    ],
    example: () => <TestimonialsCarousel testimonials={TESTIMONIALS} />,
  }
)
