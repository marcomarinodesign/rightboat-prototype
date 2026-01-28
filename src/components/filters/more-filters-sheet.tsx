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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { SearchableSelect } from "@/components/filters/searchable-select"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { popularModels } from "@/data/models"
import type { FiltersState } from "@/components/filters/types"

type MoreFiltersSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onClearAll: () => void
}

const manufacturerOptions = popularBrands.map((brand) => ({
  label: brand,
  value: brand,
}))

const countryOptions = popularLocations.map((location) => ({
  label: location,
  value: location,
}))

const boatTypeOptions = popularTypes.map((type) => ({
  label: type,
  value: type,
}))

const modelOptions = popularModels.map((m) => ({
  label: `${m.brand} ${m.name}`,
  value: m.slug,
}))

const hullMaterials = ["Fiberglass", "Aluminum", "Steel", "Wood", "Composite"]
const fuelTypes = ["Gas", "Diesel", "Electric", "Hybrid"]

export function MoreFiltersSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
}: MoreFiltersSheetProps) {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-full flex-col gap-6">
        <SheetHeader>
          <SheetTitle>More filters</SheetTitle>
          <SheetDescription>
            Fine-tune results with additional attributes.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
          <div className="space-y-2">
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

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Country
            </p>
            <SearchableSelect
              value={filters.location}
              onValueChange={(value) => updateField("location", value)}
              options={countryOptions}
              placeholder="Select country"
              searchPlaceholder="Search countries"
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
              Price
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(event) =>
                  updateField("priceMin", event.target.value)
                }
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(event) =>
                  updateField("priceMax", event.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Length (m)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Min"
                value={filters.lengthMin}
                onChange={(event) =>
                  updateField("lengthMin", event.target.value)
                }
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={filters.lengthMax}
                onChange={(event) =>
                  updateField("lengthMax", event.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Year
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Min"
                value={filters.yearMin}
                onChange={(event) => updateField("yearMin", event.target.value)}
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={filters.yearMax}
                onChange={(event) => updateField("yearMax", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Manufacturer & model
            </p>
            <div className="space-y-3">
              <SearchableSelect
                value={filters.manufacturer}
                onValueChange={(value) => updateField("manufacturer", value)}
                options={manufacturerOptions}
                placeholder="Select manufacturer"
                searchPlaceholder="Search brands"
              />
              <SearchableSelect
                value={filters.model}
                onValueChange={(value) => updateField("model", value)}
                options={modelOptions}
                placeholder="Select model"
                searchPlaceholder="Search models"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Hull material
            </p>
            <Select
              value={filters.hullMaterial || undefined}
              onValueChange={(value) => updateField("hullMaterial", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {hullMaterials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Fuel type
            </p>
            <Select
              value={filters.fuelType || undefined}
              onValueChange={(value) => updateField("fuelType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fuel" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={onClearAll}>
            Clear all
          </Button>
          <SheetClose asChild>
            <Button>Apply filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
