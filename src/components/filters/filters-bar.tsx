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
import { SearchableSelect } from "@/components/filters/searchable-select"
import { popularLocations, popularTypes } from "@/data/categories"
import type { FiltersState } from "@/components/filters/types"

type FiltersBarProps = {
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onOpenMoreFilters: () => void
}

const locationOptions = popularLocations.map((location) => ({
  label: location,
  value: location,
}))

const boatTypeOptions = popularTypes.map((type) => ({
  label: type,
  value: type,
}))

export function FiltersBar({
  filters,
  onFiltersChange,
  onOpenMoreFilters,
}: FiltersBarProps) {
  const updateField = (field: keyof FiltersState, value: string) => {
    onFiltersChange((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCondition = (key: "new" | "used", checked: boolean) => {
    onFiltersChange((prev) => ({
      ...prev,
      condition: {
        ...prev.condition,
        [key]: checked,
      },
    }))
  }

  return (
    <section className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Filters
          </p>
          <p className="text-sm text-muted-foreground">
            Refine results instantly with key preferences.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            onClick={onOpenMoreFilters}
          >
            More filters
          </Button>
          <Button
            className="w-full sm:hidden"
            onClick={onOpenMoreFilters}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_0.8fr]">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Location
          </p>
          <SearchableSelect
            value={filters.location}
            onValueChange={(value) => updateField("location", value)}
            options={locationOptions}
            placeholder="Select location"
            searchPlaceholder="Search locations"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Boat type
          </p>
          <Select
            value={filters.boatType || undefined}
            onValueChange={(value) => updateField("boatType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {boatTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Price range
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(event) => updateField("priceMin", event.target.value)}
            />
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(event) => updateField("priceMax", event.target.value)}
            />
          </div>
        </div>

        <div className="hidden space-y-2 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Length (m)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={filters.lengthMin}
              onChange={(event) => updateField("lengthMin", event.target.value)}
            />
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={filters.lengthMax}
              onChange={(event) => updateField("lengthMax", event.target.value)}
            />
          </div>
        </div>

        <div className="hidden space-y-2 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Condition
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.condition.new}
                onCheckedChange={(checked) =>
                  updateCondition("new", Boolean(checked))
                }
              />
              New
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={filters.condition.used}
                onCheckedChange={(checked) =>
                  updateCondition("used", Boolean(checked))
                }
              />
              Used
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
