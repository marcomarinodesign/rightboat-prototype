// FIGMA NODE: Carousel — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=691-56
// LAST SYNC: 2026-08-30
//
// Figma Breakpoint (Desktop / Mobile) is layout-only; the code component is
// responsive by container, so both variants share one snippet.

import figma from "@figma/code-connect/react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

figma.connect(
  Carousel,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=691-56",
  {
    imports: [
      'import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"',
    ],
    example: () => (
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  }
)
