// FIGMA NODE: Select component set — El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=29-14
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

function SelectPreview({ disabled = false }: { disabled?: boolean }) {
  return (
    <Select disabled={disabled}>
      <SelectTrigger aria-label="Select">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-a">Option A</SelectItem>
        <SelectItem value="option-b">Option B</SelectItem>
      </SelectContent>
    </Select>
  )
}

figma.connect(
  SelectPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=29-14",
  {
    imports: [
      'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
    ],
    props: {
      disabled: figma.enum("State", {
        Default: false,
        Selected: false,
        Disabled: true,
      }),
    },
    example: (props) => <SelectPreview disabled={props.disabled} />,
  }
)
