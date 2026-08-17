"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { conversationalSearchHref } from "@/components/search/conversational-search-field"
import {
  CLASSIC_SEARCH_MANUFACTURERS,
  buildClassicSearchQuery,
  type ClassicBoatType,
  type ClassicCondition,
} from "@/lib/conversational-search/classic-query"
import { cn } from "@/lib/utils"

const BOAT_TYPES: { label: string; value: ClassicBoatType }[] = [
  { label: "All types", value: "all" },
  { label: "Power", value: "power" },
  { label: "Sail", value: "sail" },
]

const BOAT_CONDITIONS: { label: string; value: ClassicCondition }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Used", value: "used" },
]

function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { label: string; value: T }[]
  onChange: (value: T) => void
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2 md:w-auto">
      <p className="text-sm leading-5 text-foreground">{label}</p>
      <div className="flex w-full items-center gap-2">
        {options.map((option) => {
          const selected = option.value === value
          return (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={selected ? "default" : "outline"}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "h-10 flex-1 md:h-11 md:flex-none md:px-5",
                !selected && "border-neutral-300 bg-background text-foreground"
              )}
            >
              {option.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function PanelDivider() {
  return (
    <>
      <div className="h-px w-full bg-neutral-300 md:hidden" />
      <div className="hidden w-px self-stretch bg-neutral-300 md:block" />
    </>
  )
}

export function ClassicSearcher() {
  const surface = useHomeSurface()
  const router = useRouter()
  const searchHref = listingsHref("/boats-for-sale", surface)
  const [boatType, setBoatType] = React.useState<ClassicBoatType>("all")
  const [condition, setCondition] = React.useState<ClassicCondition>("all")
  const [manufacturer, setManufacturer] = React.useState("")

  const submitClassic = (event: React.FormEvent) => {
    event.preventDefault()
    const query = buildClassicSearchQuery({
      boatType,
      condition,
      manufacturer,
    })
    router.push(
      query ? conversationalSearchHref(query, searchHref) : searchHref
    )
  }

  return (
    <form
      onSubmit={submitClassic}
      className="flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-6"
    >
      <ChoiceGroup
        label="Boat type"
        value={boatType}
        options={BOAT_TYPES}
        onChange={setBoatType}
      />
      <PanelDivider />
      <ChoiceGroup
        label="Boat condition"
        value={condition}
        options={BOAT_CONDITIONS}
        onChange={setCondition}
      />
      <PanelDivider />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <p className="text-sm leading-5 text-foreground">Manufacturer</p>
        <Select
          value={manufacturer || "all"}
          onValueChange={(value) =>
            setManufacturer(value === "all" ? "" : value)
          }
        >
          <SelectTrigger
            aria-label="Manufacturer"
            className="border-neutral-300"
          >
            <SelectValue placeholder="All boat manufacturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All boat manufacturer</SelectItem>
            {CLASSIC_SEARCH_MANUFACTURERS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <PanelDivider />
      <div className="flex w-full flex-col items-stretch justify-center md:w-auto">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Start Search
        </Button>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-10 w-full text-[13px] font-medium"
          asChild
        >
          <Link href={searchHref}>Advanced Search</Link>
        </Button>
      </div>
    </form>
  )
}
