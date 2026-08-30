// FIGMA NODE: Sheet — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT SET: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=45-18
// LAST SYNC: 2026-08-30

import figma from "@figma/code-connect/react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Button } from "./button"

figma.connect(
  Sheet,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=45-18",
  {
    imports: [
      'import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"',
    ],
    props: {
      side: figma.enum("Sheet/Side", {
        right: "right",
        left: "left",
      }),
    },
    example: ({ side }) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Sheet title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    ),
  }
)
