"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { PriceHistogram } from "@/components/filters/price-histogram"
import { filterBoats } from "@/components/filters/filter-boats"
import {
  srpBoatTypeOptions,
  srpManufacturerOptions,
  srpModelOptionsForManufacturer,
} from "@/components/filters/srp-filter-data"
import { popularLocations } from "@/data/categories"
import type { FiltersState } from "@/components/filters/types"
import type { Boat } from "@/data/boats"

export const countryOptions = popularLocations.map((l) => ({ label: l, value: l }))

export type FiltersFormBodyProps = {
  draft: FiltersState
  boats: Boat[]
  updateDraft: (field: keyof FiltersState, value: string) => void
  updateCondition: (key: "new" | "used", checked: boolean) => void
  /** Rendered above filters, e.g. Save search in split sidebar. */
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
    <div className="border-b border-border px-0 py-3.5 last:border-b">
      <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
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
      <input
        type="number"
        inputMode="numeric"
        placeholder={minPlaceholder ?? "Min"}
        value={minValue}
        onChange={(e) => onMinChange(e.target.value)}
        aria-label="Minimum"
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
      <span className="text-center text-muted-foreground">—</span>
      <input
        type="number"
        inputMode="numeric"
        placeholder={maxPlaceholder ?? "Max"}
        value={maxValue}
        onChange={(e) => onMaxChange(e.target.value)}
        aria-label="Maximum"
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
    </div>
  )
}

/** Shared filter fields: web drawer, split sidebar, and app modal. */
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

  const modelOptions = React.useMemo(
    () => srpModelOptionsForManufacturer(draft.manufacturer),
    [draft.manufacturer]
  )

  const modelDisabled = !draft.manufacturer

  const handleManufacturerChange = (value: string) => {
    if (value !== draft.manufacturer) {
      updateDraft("manufacturer", value)
      updateDraft("model", "")
      return
    }
    updateDraft("manufacturer", value)
  }

  return (
    <div className={scrollClassName}>
      {leadingContent ? (
        <div className="border-b border-border py-3">{leadingContent}</div>
      ) : null}

      <FilterSection title="Location">
        <SearchableSelect
          value={draft.location}
          onValueChange={(v) => updateDraft("location", v)}
          options={countryOptions}
          placeholder="Select location"
          searchPlaceholder="Search locations"
        />
      </FilterSection>

      <FilterSection title="Condition">
        <div className="flex items-center gap-4 text-sm">
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

      <FilterSection title="Length">
        <RangeInputs
          minValue={draft.lengthMin}
          maxValue={draft.lengthMax}
          onMinChange={(v) => updateDraft("lengthMin", v)}
          onMaxChange={(v) => updateDraft("lengthMax", v)}
          minPlaceholder="e.g. 5"
          maxPlaceholder="e.g. 30"
        />
      </FilterSection>

      <FilterSection title="Price">
        <PriceHistogram
          boats={boatsForHistogram}
          priceMin={draft.priceMin}
          priceMax={draft.priceMax}
          onPriceMinChange={(v) => updateDraft("priceMin", v)}
          onPriceMaxChange={(v) => updateDraft("priceMax", v)}
        />
      </FilterSection>

      <FilterSection title="Boat Type">
        <SearchableSelect
          value={draft.boatType}
          onValueChange={(v) => updateDraft("boatType", v)}
          options={srpBoatTypeOptions}
          placeholder="Select boat type"
          searchPlaceholder="Search boat types"
        />
      </FilterSection>

      <FilterSection title="Manufacturer">
        <SearchableSelect
          value={draft.manufacturer}
          onValueChange={handleManufacturerChange}
          options={srpManufacturerOptions}
          placeholder="Select manufacturer"
          searchPlaceholder="Search manufacturers"
        />
      </FilterSection>

      <FilterSection title="Model">
        <SearchableSelect
          value={draft.model}
          onValueChange={(v) => updateDraft("model", v)}
          options={modelOptions}
          placeholder="Select model"
          searchPlaceholder="Search models"
          disabled={modelDisabled}
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
    </div>
  )
}
