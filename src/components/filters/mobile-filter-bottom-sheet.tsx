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
  SheetDescription,
} from "@/components/ui/sheet"
import { SearchableSelect } from "@/components/filters/searchable-select"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { popularModels } from "@/data/models"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import { cn } from "@/lib/utils"

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

type MobileFilterBottomSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onClearAll: () => void
  resultCount: number
}

export function MobileFilterBottomSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
  resultCount,
}: MobileFilterBottomSheetProps) {
  const [draft, setDraft] = React.useState<FiltersState>(filters)

  React.useEffect(() => {
    if (open) {
      setDraft(filters)
    }
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
    setDraft({
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
    })
    onFiltersChange({
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
    })
    onClearAll()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "mx-0 flex max-h-[85vh] flex-col rounded-t-2xl border-t px-6 pb-safe",
          "data-[state=open]:duration-300 data-[state=closed]:duration-200"
        )}
        aria-describedby="mobile-filter-sheet-description"
      >
        <SheetHeader className="shrink-0 border-b border-border/60 pb-4 pt-2">
          <SheetTitle className="text-left">Filters</SheetTitle>
          <SheetDescription id="mobile-filter-sheet-description">
            Refine results. Changes apply when you tap Apply.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto py-4 pr-1">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Condition
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={draft.condition.new}
                  onCheckedChange={(c) => updateCondition("new", Boolean(c))}
                />
                New
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={draft.condition.used}
                  onCheckedChange={(c) => updateCondition("used", Boolean(c))}
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
              value={draft.location}
              onValueChange={(v) => updateDraft("location", v)}
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
                value={draft.priceMin}
                onChange={(e) => updateDraft("priceMin", e.target.value)}
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={draft.priceMax}
                onChange={(e) => updateDraft("priceMax", e.target.value)}
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
                value={draft.lengthMin}
                onChange={(e) => updateDraft("lengthMin", e.target.value)}
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={draft.lengthMax}
                onChange={(e) => updateDraft("lengthMax", e.target.value)}
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
                value={draft.yearMin}
                onChange={(e) => updateDraft("yearMin", e.target.value)}
              />
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={draft.yearMax}
                onChange={(e) => updateDraft("yearMax", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Manufacturer & model
            </p>
            <div className="space-y-3">
              <SearchableSelect
                value={draft.manufacturer}
                onValueChange={(v) => updateDraft("manufacturer", v)}
                options={manufacturerOptions}
                placeholder="Select manufacturer"
                searchPlaceholder="Search brands"
              />
              <SearchableSelect
                value={draft.model}
                onValueChange={(v) => updateDraft("model", v)}
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
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Fuel type
            </p>
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
          </div>
        </div>

        <div className="shrink-0 space-y-2 border-t border-border/60 pt-4">
          <Button className="w-full" size="lg" onClick={handleApply}>
            Apply ({resultCount} results)
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={handleClearAll}
          >
            Clear all
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
