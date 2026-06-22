"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { PriceHistogram } from "@/components/filters/price-histogram"
import { filterBoats } from "@/components/filters/filter-boats"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { popularModels } from "@/data/models"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import { useIsMobile } from "@/lib/use-media-query"
import type { Boat } from "@/data/boats"

const manufacturerOptions = popularBrands.map((brand) => ({
  label: brand,
  value: brand,
}))
const countryOptions = popularLocations.map((l) => ({ label: l, value: l }))
const modelOptions = popularModels.map((m) => ({
  label: `${m.brand} ${m.name}`,
  value: m.slug,
}))
const hullMaterials = ["Fiberglass", "Aluminum", "Steel", "Wood", "Composite"]
const fuelTypes = ["Gas", "Diesel", "Electric", "Hybrid"]

type FiltersDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onClearAll: () => void
  resultCount: number
  boats: Boat[]
}

type FormBodyProps = {
  draft: FiltersState
  boats: Boat[]
  updateDraft: (field: keyof FiltersState, value: string) => void
  updateCondition: (key: "new" | "used", checked: boolean) => void
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border/50 py-5 last:border-0">
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      {children}
    </div>
  )
}

function RangeInputs({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder,
  maxPlaceholder,
}: {
  minValue: string
  maxValue: string
  onMinChange: (v: string) => void
  onMaxChange: (v: string) => void
  minPlaceholder?: string
  maxPlaceholder?: string
}) {
  return (
    <div className="grid grid-cols-[1fr_16px_1fr] items-center gap-1">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Min</p>
        <input
          type="number"
          inputMode="numeric"
          placeholder={minPlaceholder ?? "Min"}
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
        />
      </div>
      <span className="mt-5 text-center text-muted-foreground">—</span>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Max</p>
        <input
          type="number"
          inputMode="numeric"
          placeholder={maxPlaceholder ?? "Max"}
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
        />
      </div>
    </div>
  )
}

function ChipToggleGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div role="group" className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? "" : opt)}
            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function FiltersFormBody({ draft, boats, updateDraft, updateCondition }: FormBodyProps) {
  // Compute boats filtered by everything EXCEPT price, so histogram always shows
  // the full price distribution for the current non-price filters.
  const boatsForHistogram = React.useMemo(
    () => filterBoats(boats, { ...draft, priceMin: "", priceMax: "" }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boats, draft.location, draft.boatType, draft.condition, draft.lengthMin,
     draft.lengthMax, draft.yearMin, draft.yearMax, draft.manufacturer,
     draft.model, draft.hullMaterial, draft.fuelType]
  )

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6">
      {/* ── Price (first, with histogram) ───────────────────── */}
      <FilterSection title="Price ($)">
        <PriceHistogram
          boats={boatsForHistogram}
          priceMin={draft.priceMin}
          priceMax={draft.priceMax}
          onPriceMinChange={(v) => updateDraft("priceMin", v)}
          onPriceMaxChange={(v) => updateDraft("priceMax", v)}
        />
      </FilterSection>

      <FilterSection title="Condition">
        <div className="flex items-center gap-4 text-sm">
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5">
            <Checkbox
              checked={draft.condition.new}
              onCheckedChange={(c) => updateCondition("new", Boolean(c))}
            />
            <span>New</span>
          </label>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5">
            <Checkbox
              checked={draft.condition.used}
              onCheckedChange={(c) => updateCondition("used", Boolean(c))}
            />
            <span>Used</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Boat type">
        <ChipToggleGroup
          options={popularTypes}
          value={draft.boatType}
          onChange={(v) => updateDraft("boatType", v)}
        />
      </FilterSection>

      <FilterSection title="Location">
        <SearchableSelect
          value={draft.location}
          onValueChange={(v) => updateDraft("location", v)}
          options={countryOptions}
          placeholder="Select location"
          searchPlaceholder="Search locations"
        />
      </FilterSection>

      <FilterSection title="Length (m)">
        <RangeInputs
          minValue={draft.lengthMin}
          maxValue={draft.lengthMax}
          onMinChange={(v) => updateDraft("lengthMin", v)}
          onMaxChange={(v) => updateDraft("lengthMax", v)}
          minPlaceholder="e.g. 5"
          maxPlaceholder="e.g. 30"
        />
      </FilterSection>

      <FilterSection title="Year">
        <RangeInputs
          minValue={draft.yearMin}
          maxValue={draft.yearMax}
          onMinChange={(v) => updateDraft("yearMin", v)}
          onMaxChange={(v) => updateDraft("yearMax", v)}
          minPlaceholder="e.g. 2000"
          maxPlaceholder="e.g. 2024"
        />
      </FilterSection>

      <FilterSection title="Manufacturer">
        <SearchableSelect
          value={draft.manufacturer}
          onValueChange={(v) => updateDraft("manufacturer", v)}
          options={manufacturerOptions}
          placeholder="Select manufacturer"
          searchPlaceholder="Search brands"
        />
      </FilterSection>

      <FilterSection title="Model">
        <SearchableSelect
          value={draft.model}
          onValueChange={(v) => updateDraft("model", v)}
          options={modelOptions}
          placeholder="Select model"
          searchPlaceholder="Search models"
        />
      </FilterSection>

      <FilterSection title="Hull material">
        <ChipToggleGroup
          options={hullMaterials}
          value={draft.hullMaterial}
          onChange={(v) => updateDraft("hullMaterial", v)}
        />
      </FilterSection>

      <FilterSection title="Fuel type">
        <ChipToggleGroup
          options={fuelTypes}
          value={draft.fuelType}
          onChange={(v) => updateDraft("fuelType", v)}
        />
      </FilterSection>
    </div>
  )
}

export function FiltersDrawer({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
  resultCount,
  boats,
}: FiltersDrawerProps) {
  const isMobile = useIsMobile()
  const [draft, setDraft] = React.useState<FiltersState>(filters)

  React.useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  const updateDraft = (field: keyof FiltersState, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  const updateCondition = (key: "new" | "used", checked: boolean) => {
    setDraft((prev) => ({
      ...prev,
      condition: { ...prev.condition, [key]: checked },
    }))
  }

  const handleApply = () => {
    onFiltersChange(draft)
    onOpenChange(false)
  }

  const handleClearAll = () => {
    const cleared = { ...defaultFilters, condition: { ...defaultFilters.condition } }
    setDraft(cleared)
    onFiltersChange(cleared)
    onClearAll()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        hideClose
        className={
          isMobile
            ? "flex h-[100dvh] max-h-[100dvh] flex-col rounded-none p-0"
            : "flex w-full flex-col p-0 sm:max-w-[440px]"
        }
      >
        {/* Header — 3-column grid: [close] [title] [clear all] */}
        <SheetHeader className="shrink-0 border-b border-border/60 px-2 py-1">
          <div className="grid grid-cols-[44px_1fr_auto] items-center">
            <SheetClose className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" aria-hidden />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SheetTitle className="text-center text-base font-semibold">
              Filters
            </SheetTitle>
            <button
              onClick={handleClearAll}
              className="flex h-11 items-center px-3 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          </div>
        </SheetHeader>

        {/* Scrollable filter body */}
        <FiltersFormBody
          draft={draft}
          boats={boats}
          updateDraft={updateDraft}
          updateCondition={updateCondition}
        />

        {/* Footer — padding-bottom respects iPhone home indicator */}
        <div
          className="shrink-0 border-t border-border/60 px-6 pt-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <Button className="w-full" size="lg" onClick={handleApply}>
            Show {resultCount} results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
