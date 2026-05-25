// COMPONENT: SRP / Sort Select — El-Captain-DS → Complex Components
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=296-81
// LAST SYNC: 2026-05-21

/**
 * Code Connect — Listing sort trigger (Featured, price, newest)
 * Variant property: Label
 */
import figma from "@figma/code-connect/react"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price (low to high)" },
  { value: "price-high", label: "Price (high to low)" },
  { value: "newest", label: "Newest listings" },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]["value"]

function ListingSortSelectPreview({
  value = "featured",
}: {
  value?: SortValue
}) {
  const [sortValue, setSortValue] = React.useState<SortValue>(value)
  return (
    <Select
      value={sortValue}
      onValueChange={(next) => setSortValue(next as SortValue)}
    >
      <SelectTrigger className="w-44" aria-label="Sort by">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

figma.connect(
  ListingSortSelectPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=296-81",
  {
    props: {
      label: figma.enum("Label", {
        Featured: "featured",
        "Price (low to high)": "price-low",
        "Price (high to low)": "price-high",
        "Newest listings": "newest",
      }),
    },
    example: ({ label }) => (
      <ListingSortSelectPreview value={label} />
    ),
  }
)
