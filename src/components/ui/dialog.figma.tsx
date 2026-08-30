// FIGMA NODE: Dialog — 🧩 Patterns
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=43-2
// LAST SYNC: 2026-08-30

import figma from "@figma/code-connect/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"

figma.connect(
  Dialog,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=43-2",
  {
    imports: [
      'import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"',
    ],
    example: () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Supporting copy.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  }
)
