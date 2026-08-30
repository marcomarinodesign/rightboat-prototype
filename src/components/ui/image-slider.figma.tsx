// FIGMA NODE: Carousel Dots — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=579-5
// LAST SYNC: 2026-08-30
//
// The dots pattern ships inside ImageSlider (showDots) — there is no standalone
// dots component in code.

import figma from "@figma/code-connect/react"

import { ImageSlider } from "./image-slider"

figma.connect(
  ImageSlider,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=579-5",
  {
    imports: ['import { ImageSlider } from "@/components/ui/image-slider"'],
    example: () => (
      <ImageSlider
        images={["/boats/boat-1.jpg", "/boats/boat-2.jpg"]}
        alt="Boat photos"
        showDots
        dotsPlacement="overlay"
      />
    ),
  }
)
