"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SearchableSelect } from "@/components/filters/searchable-select"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { popularModels } from "@/data/models"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import { useIsMobile } from "@/lib/use-media-query"

const manufacturerOptions = popularBrands.map((brand) => ({
  label: brand,
  value: brand,
}))
const countryOptions = popularLocations.map((l) => ({ label: l, value: l }))
const boatTypeOptions = popularTypes.map((t) => ({ label: t, value: t }))
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
}

type FormBodyProps = {
  draft: FiltersState
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
        <Input
          type="number"
          inputMode="numeric"
          placeholder={minPlaceholder ?? "Min"}
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
        />
      </div>
      <span className="mt-5 text-center text-muted-foreground">—</span>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Max</p>
        <Input
          type="number"
          inputMode="numeric"
          placeholder={maxPlaceholder ?? "Max"}
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
        />
      </div>
    </div>
  )
}

function FiltersFormBody({ draft, updateDraft, updateCondition }: FormBodyProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6">
      <FilterSection title="Condition">
        <div className="flex items-center gap-6 text-sm">
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox
              checked={draft.condition.new}
              onCheckedChange={(c) => updateCondition("new", Boolean(c))}
            />
            <span>New</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox
              checked={draft.condition.used}
              onCheckedChange={(c) => updateCondition("used", Boolean(c))}
            />
            <span>Used</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Country">
        <SearchableSelect
          value={draft.location}
          onValueChange={(v) => updateDraft("location", v)}
          options={countryOptions}
          placeholder="Select country"
          searchPlaceholder="Search countries"
        />
      </FilterSection>

      <FilterSection title="Boat type">
        <Select
          value={draft.boatType || undefined}
          onValueChange={(v) => updateDraft("boatType", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {boatTypeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection title="Price (€)">
        <RangeInputs
          minValue={draft.priceMin}
          maxValue={draft.priceMax}
          onMinChange={(v) => updateDraft("priceMin", v)}
          onMaxChange={(v) => updateDraft("priceMax", v)}
          minPlaceholder="e.g. 10 000"
          maxPlaceholder="e.g. 500 000"
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
        <Select
          value={draft.hullMaterial || undefined}
          onValueChange={(v) => updateDraft("hullMaterial", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            {hullMaterials.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection title="Fuel type">
        <Select
          value={draft.fuelType || undefined}
          onValueChange={(v) => updateDraft("fuelType", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select fuel" />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        className={
          isMobile
            ? "flex h-[100dvh] max-h-[100dvh] flex-col rounded-none p-0"
            : "flex w-full flex-col p-0 sm:max-w-[440px]"
        }
      >
        {/* Header */}
        <SheetHeader className="shrink-0 border-b border-border/60 px-6 py-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
            <button
              onClick={handleClearAll}
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          </div>
        </SheetHeader>

        {/* Scrollable filter body */}
        <FiltersFormBody
          draft={draft}
          updateDraft={updateDraft}
          updateCondition={updateCondition}
        />

        {/* Footer */}
        <div className="shrink-0 border-t border-border/60 px-6 py-4">
          <Button className="w-full" size="lg" onClick={handleApply}>
            Show {resultCount} results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
