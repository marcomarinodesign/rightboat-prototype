"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { Anchor } from "lucide-react"
import { FSBOFormData } from "../../types-fsbo"
import { FSBOAIBanner } from "@/components/fsbo/FSBOAIBanner"
import { BoatTypeSelector } from "@/components/fsbo/BoatTypeSelector"
import { PillGroup } from "@/components/ui/pill-group"
import { LengthInput } from "@/components/fsbo/LengthInput"
import { PriceInput } from "@/components/fsbo/PriceInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FSBOStep1YourBoatProps {
  form: UseFormReturn<FSBOFormData>
  aiFields: Set<string>
  showAIBanner: boolean
  onDismissAIBanner: () => void
  onUserEditAIField: (field: string) => void
}

const CONDITION_OPTIONS = [
  { label: "Excellent", value: "Excellent" },
  { label: "Good", value: "Good" },
  { label: "Needs Work", value: "Needs Work" },
]

const CATEGORY_OPTIONS = [
  "Day Cruiser",
  "Cabin Cruiser",
  "Express Cruiser",
  "Sportsboat",
  "Walkaround",
  "Narrowboat",
  "Wide Beam",
  "RIB",
  "Pontoon",
  "Sailing Cruiser",
  "Racing Yacht",
  "Dinghy",
  "Catamaran",
  "Other",
]

const HULL_MATERIAL_OPTIONS = [
  "GRP / Fiberglass",
  "Aluminium",
  "Steel",
  "Timber",
  "Carbon Fibre",
  "Inflatable / Hypalon",
  "Other",
]

function AIFilledTag() {
  return (
    <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded bg-tag-bg text-primary text-[10px] font-semibold leading-none align-middle">
      <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1L9.5 6H14.5L10.5 9L12 14L8 11L4 14L5.5 9L1.5 6H6.5L8 1Z" />
      </svg>
      AI
    </span>
  )
}

export function FSBOStep1YourBoat({
  form,
  aiFields,
  showAIBanner,
  onDismissAIBanner,
  onUserEditAIField,
}: FSBOStep1YourBoatProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form

  const listedElsewhere = watch("listedElsewhere")
  const brand = watch("brand")
  const model = watch("model")
  const year = watch("year")

  return (
    <div className="space-y-7">
      {/* Pre-filled boat summary chip */}
      {(brand || model || year) && (
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
          <Anchor className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{[brand, model, year].filter(Boolean).join(" · ")}</span>
        </div>
      )}

      {/* AI pre-fill banner */}
      {showAIBanner && (
        <FSBOAIBanner filledFields={aiFields} onDismiss={onDismissAIBanner} />
      )}

      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Tell us about your boat</h2>
        <p className="text-sm text-muted-foreground">
          The more detail you add, the more enquiries you&apos;ll get.
        </p>
      </div>

      {/* ── Boat Type ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Boat Type <span className="text-destructive">*</span>
          {aiFields.has("boatType") && <AIFilledTag />}
        </Label>
        <Controller
          name="boatType"
          control={control}
          render={({ field }) => (
            <BoatTypeSelector
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                if (aiFields.has("boatType")) onUserEditAIField("boatType")
              }}
              error={errors.boatType?.message}
            />
          )}
        />
      </div>

      {/* ── Category (optional) ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Category{" "}
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* ── Hull Material (optional) ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Hull Material{" "}
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        <Controller
          name="hullMaterial"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hull material" />
              </SelectTrigger>
              <SelectContent>
                {HULL_MATERIAL_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* ── Condition ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Condition <span className="text-destructive">*</span>
          {aiFields.has("condition") && <AIFilledTag />}
        </Label>
        <Controller
          name="condition"
          control={control}
          render={({ field }) => (
            <PillGroup
              options={CONDITION_OPTIONS}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                if (aiFields.has("condition")) onUserEditAIField("condition")
              }}
            />
          )}
        />
        {errors.condition && (
          <p className="text-sm text-destructive mt-1">{errors.condition.message}</p>
        )}
      </div>

      {/* ── Length ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Length <span className="text-destructive">*</span>
          {aiFields.has("length") && <AIFilledTag />}
        </Label>
        <Controller
          name="length"
          control={control}
          render={({ field }) => (
            <LengthInput
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                if (aiFields.has("length")) onUserEditAIField("length")
              }}
              error={errors.length?.message}
            />
          )}
        />
      </div>

      {/* ── Location ── */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-semibold">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          placeholder="e.g. Brighton Marina, UK"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* ── Asking Price ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Asking Price <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="expectedPrice"
          control={control}
          render={({ field }) => (
            <PriceInput
              value={field.value ? String(field.value) : ""}
              onChange={field.onChange}
              error={errors.expectedPrice?.message}
            />
          )}
        />
        <p className="text-xs text-muted-foreground">
          Not sure what to charge?{" "}
          <a
            href="/boats-for-sale"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary/80"
          >
            See similar listings →
          </a>
        </p>
      </div>

      {/* ── Engine Hours (optional) ── */}
      <div className="space-y-2">
        <Label htmlFor="engineHours" className="text-sm font-semibold">
          Engine Hours{" "}
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        <Input
          id="engineHours"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 450"
          {...register("engineHours")}
        />
        <p className="text-xs text-muted-foreground">
          Engine hours help buyers assess wear.
        </p>
      </div>

      {/* ── Listed Elsewhere (optional) ── */}
      <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-4">
        <div>
          <Label htmlFor="listedElsewhere" className="text-sm font-semibold cursor-pointer">
            Listed on another platform?
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Optional — no penalty, just useful data.
          </p>
        </div>
        <Switch
          id="listedElsewhere"
          checked={listedElsewhere}
          onCheckedChange={(v) => setValue("listedElsewhere", v)}
        />
      </div>
    </div>
  )
}
