"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { PriceHistogram } from "@/components/filters/price-histogram"
import { filterBoats } from "@/components/filters/filter-boats"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { popularModels } from "@/data/models"
import type { FiltersState } from "@/components/filters/types"
import type { Boat } from "@/data/boats"

export const manufacturerOptions = popularBrands.map((brand) => ({
  label: brand,
  value: brand,
}))
export const countryOptions = popularLocations.map((l) => ({ label: l, value: l }))
export const modelOptions = popularModels.map((m) => ({
  label: `${m.brand} ${m.name}`,
  value: m.slug,
}))
export const hullMaterials = ["Fiberglass", "Aluminum", "Steel", "Wood", "Composite"]
export const fuelTypes = ["Gas", "Diesel", "Electric", "Hybrid"]

export type FiltersFormBodyProps = {
  draft: FiltersState
  boats: Boat[]
  updateDraft: (field: keyof FiltersState, value: string) => void
  updateCondition: (key: "new" | "used", checked: boolean) => void
  /** Rendered above Price ($), e.g. Save search in split sidebar. */
  leadingContent?: React.ReactNode
  /** Extra class on the scroll wrapper (e.g. app sheet padding). */
  scrollClassName?: string
}

export function FilterSection({
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

export function RangeInputs({
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

export function ChipToggleGroup({
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

/** Shared filter fields: web drawer and app modal use the same markup and behaviour. */
export function FiltersFormBody({
  draft,
  boats,
  updateDraft,
  updateCondition,
  leadingContent,
  scrollClassName = "min-h-0 flex-1 overflow-y-auto px-6",
}: FiltersFormBodyProps) {
  const boatsForHistogram = React.useMemo(
    () => filterBoats(boats, { ...draft, priceMin: "", priceMax: "" }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      boats,
      draft.location,
      draft.boatType,
      draft.condition,
      draft.lengthMin,
      draft.lengthMax,
      draft.yearMin,
      draft.yearMax,
      draft.manufacturer,
      draft.model,
      draft.hullMaterial,
      draft.fuelType,
    ]
  )

  return (
    <div className={scrollClassName}>
      {leadingContent ? (
        <div className="border-b border-border/50 py-4">{leadingContent}</div>
      ) : null}
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
