// COMPONENT: Filters / Form Body — El-Captain-DS → Complex Components
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-310
// LAST SYNC: 2026-05-21

/**
 * Code Connect — FiltersFormBody (SRP sidebar + drawer)
 */
import figma from "@figma/code-connect/react"

import { FiltersFormBody } from "./filters-form-body"
import { listingBoats } from "@/data/boats"
import { defaultFilters } from "./types"

const noop = () => undefined

function FiltersFormBodyPreview() {
  return (
    <FiltersFormBody
      draft={defaultFilters}
      boats={listingBoats}
      updateDraft={noop}
      updateCondition={noop}
      scrollClassName="px-0"
    />
  )
}

figma.connect(
  FiltersFormBodyPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-310",
  {
    imports: [
      'import { FiltersFormBody } from "@/components/filters/filters-form-body"',
      'import { listingBoats } from "@/data/boats"',
      'import { defaultFilters } from "@/components/filters/types"',
    ],
    example: () => <FiltersFormBodyPreview />,
  }
)
