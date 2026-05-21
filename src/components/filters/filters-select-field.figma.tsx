// COMPONENT: Filters / Select Field — El-Captain-DS → Complex Components
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-87
// LAST SYNC: 2026-05-21

/**
 * Code Connect — filter panel select trigger (boat type, make, model, etc.)
 */
import figma from "@figma/code-connect/react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function FiltersSelectFieldPreview({
  placeholder = "Boat type",
  disabled = false,
}: {
  placeholder?: string
  disabled?: boolean
}) {
  return (
    <Select disabled={disabled}>
      <SelectTrigger aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sample">Sample option</SelectItem>
      </SelectContent>
    </Select>
  )
}

figma.connect(
  FiltersSelectFieldPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-87",
  {
    example: () => (
      <FiltersSelectFieldPreview placeholder="Boat type" />
    ),
  }
)
