"use client"

import { useState, useMemo } from "react"
import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { BoatTypeSelector } from "@/components/fsbo/BoatTypeSelector"
import { LengthInput } from "@/components/fsbo/LengthInput"
import { PriceInput } from "@/components/fsbo/PriceInput"
import { PriceComparisonWidget } from "@/components/fsbo/PriceComparisonWidget"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SRP_HULL_MATERIALS, SRP_CATEGORIES_BY_CLASS } from "@/components/filters/srp-filter-data"

interface FSBOStep1YourBoatProps {
  form: UseFormReturn<FSBOFormData>
  aiFields: Set<string>
  onUserEditAIField: (field: string) => void
}

const CONDITION_OPTIONS = [
  { label: "Excellent", value: "Excellent" },
  { label: "Good", value: "Good" },
  { label: "Fair", value: "Fair" },
  { label: "Needs Work", value: "Needs Work" },
]

const ENGINE_MAKE_OPTIONS = ["Volvo Penta", "Yanmar", "Mercury", "Suzuki", "Honda", "Mercruiser", "Yamaha", "BMW", "Other"]
const NUMBER_OF_ENGINES_OPTIONS = ["1", "2", "3", "4"]
const ENGINE_HOURS_OPTIONS = ["Under 500h", "500–1,000h", "1,000–2,000h", "2,000–5,000h", "Over 5,000h"]
const BEAM_OPTIONS = ["Under 2m", "2–3m", "3–4m", "4–5m", "Over 5m"]
const DRAFT_OPTIONS = ["Under 0.5m", "0.5–1m", "1–1.5m", "1.5–2m", "Over 2m"]
const CABINS_BERTHS_OPTIONS = ["None", "1 cabin", "2 cabins", "3 cabins", "4+ cabins"]

function AIFilledTag() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#354CC8] text-white text-xs font-semibold whitespace-nowrap">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
      </svg>
      Rightboat AI
    </span>
  )
}

// Helper: render a field label row with optional AI badge
function FieldLabel({ children, hasAI }: { children: React.ReactNode; hasAI: boolean }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {children}
      {hasAI && <AIFilledTag />}
    </div>
  )
}

// Helper: a Select field
function SelectField({
  name,
  control,
  options,
  placeholder,
}: {
  name: string
  control: UseFormReturn<FSBOFormData>["control"]
  options: string[]
  placeholder?: string
}) {
  return (
    <Controller
      name={name as keyof FSBOFormData}
      control={control}
      render={({ field }) => (
        <Select value={(field.value as string) ?? ""} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder ?? "Select"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}

export function FSBOStep1YourBoat({
  form,
  aiFields,
  onUserEditAIField,
}: FSBOStep1YourBoatProps) {
  const { register, control, formState: { errors }, watch } = form
  const [detailsOpen, setDetailsOpen] = useState(false)

  const brand = watch("brand")
  const model = watch("model")
  const year = watch("year")
  const expectedPrice = watch("expectedPrice")
  const boatType = watch("boatType")

  const categoryOptions = useMemo(() => {
    const classKey = boatType === "Motorboat" ? "power" : boatType === "Sailboat" ? "sail" : null
    const cats = classKey
      ? [...SRP_CATEGORIES_BY_CLASS[classKey]]
      : [...SRP_CATEGORIES_BY_CLASS.power, ...SRP_CATEGORIES_BY_CLASS.sail, ...SRP_CATEGORIES_BY_CLASS.unpowered]
    return cats.sort()
  }, [boatType])

  const boatName = [brand, model, year].filter(Boolean).join(" ")

  // Matches BoatTypeSelector selected style: 2px primary border + light blue tint
  // For AI-filled fields (tracked in aiFields Set)
  const aiCls = (field: string) => aiFields.has(field) ? "border-2 border-primary bg-[#f4f9ff]" : ""
  // For user-supplied seed fields (brand/model/year) — same visual, aligned with FieldLabel badge condition
  const AI_CLS = "border-2 border-primary bg-[#f4f9ff]"
  const seedCls = (val: unknown) => val ? AI_CLS : ""

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground leading-8">
        {boatName ? (
          <>Tell us about your {boatName}</>
        ) : (
          "Tell us about your boat"
        )}
      </h2>

      {/* Subtitle */}
      <p className="text-base text-foreground">
        We&apos;ll use this to create your listing and suggest a competitive price.
      </p>

      {/* ── Boat Type ── */}
      <div className="flex flex-col gap-1 pt-7">
        <FieldLabel hasAI={aiFields.has("boatType")}>
          <Label className="text-sm font-bold text-foreground leading-5">Boat Type</Label>
        </FieldLabel>
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
      <div className="flex flex-col gap-1 pt-7">
        <FieldLabel hasAI={aiFields.has("category")}>
          <Label className="text-sm font-bold text-foreground leading-5">
            Category{" "}
            <span className="font-bold text-muted-foreground">(optional)</span>
          </Label>
        </FieldLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={(v) => {
                field.onChange(v)
                if (aiFields.has("category")) onUserEditAIField("category")
              }}
            >
              <SelectTrigger className={aiCls("category")}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* ── Hull Material + Length (2-col) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 pt-7">
          <FieldLabel hasAI={aiFields.has("hullMaterial")}>
            <Label className="text-sm font-bold text-foreground leading-5">
              Hull Material{" "}
              <span className="font-bold text-muted-foreground">(optional)</span>
            </Label>
          </FieldLabel>
          <Controller
            name="hullMaterial"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={(v) => {
                  field.onChange(v)
                  if (aiFields.has("hullMaterial")) onUserEditAIField("hullMaterial")
                }}
              >
                <SelectTrigger className={aiCls("hullMaterial")}>
                  <SelectValue placeholder="Select hull material" />
                </SelectTrigger>
                <SelectContent>
                  {SRP_HULL_MATERIALS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1 pt-7">
          <FieldLabel hasAI={aiFields.has("length")}>
            <Label className="text-sm font-bold text-foreground leading-5">Length</Label>
          </FieldLabel>
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
                inputClassName={aiCls("length")}
              />
            )}
          />
        </div>
      </div>

      {/* ── Description ── */}
      <div className="flex flex-col gap-1 pt-7">
        <FieldLabel hasAI={aiFields.has("description")}>
          <Label className="text-sm font-bold text-foreground leading-5">Description</Label>
        </FieldLabel>
        <textarea
          className={`flex w-full h-[160px] rounded-lg px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none ${aiFields.has("description") ? "border-2 border-primary bg-[#f4f9ff]" : "border border-input bg-background"}`}
          placeholder="Describe your boat — condition, upgrades, history..."
          {...register("description")}
          onChange={(e) => {
            register("description").onChange(e)
            if (aiFields.has("description")) onUserEditAIField("description")
          }}
        />
        <p className="text-xs text-muted-foreground">Min. 100 characters</p>
      </div>

      {/* ── Section divider: Add your information ── */}
      <div className="h-px bg-border w-full" />
      <h3 className="text-2xl font-bold tracking-tight text-foreground leading-8">
        Add your information
      </h3>

      {/* ── Asking Price ── */}
      <div className="flex flex-col gap-1 pt-4">
        <Label className="text-sm font-bold text-foreground leading-5">Asking Price</Label>
        <Controller
          name="expectedPrice"
          control={control}
          render={({ field }) => (
            <PriceInput
              value={field.value ? String(field.value) : ""}
              onChange={field.onChange}
              error={errors.expectedPrice?.message}
              currencySymbol="$"
            />
          )}
        />
      </div>

      {/* ── Price comparison widget (shows when price entered) ── */}
      {Number(expectedPrice) >= 1000 && (
        <PriceComparisonWidget askingPrice={Number(expectedPrice)} />
      )}

      {/* ── Location ── */}
      <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center gap-2 py-0.5">
          <Label htmlFor="location" className="text-sm font-bold text-foreground leading-5">
            Location <span className="text-destructive">*</span>
          </Label>
        </div>
        <Input
          id="location"
          placeholder="e.g. Brighton Marina, UK"
          {...register("location")}
        />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      {/* ── Section divider + collapsible Details ── */}
      <div className="h-px bg-border w-full" />

      {/* Details accordion header */}
      <button
        type="button"
        onClick={() => setDetailsOpen((v) => !v)}
        className="flex items-center gap-4 py-5 w-full text-left"
      >
        <h3 className="flex-1 text-2xl font-bold tracking-tight text-foreground leading-8">Details</h3>
        {(aiFields.size > 0 || !!brand || !!model) && <AIFilledTag />}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-foreground transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Details fields — divider always shown, but moves below fields when expanded */}
      {detailsOpen ? (
        <>
          {/* ── Manufacturer / Make + Model (2-col) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 pt-7">
              <FieldLabel hasAI={!!brand}>
                <Label className="text-sm font-bold text-foreground leading-5">Manufacturer / Make</Label>
              </FieldLabel>
              <Input id="brand" placeholder="e.g. Jeanneau" className={seedCls(brand)} {...register("brand")} />
              {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
            </div>

            <div className="flex flex-col gap-1 pt-7">
              <FieldLabel hasAI={!!model}>
                <Label className="text-sm font-bold text-foreground leading-5">Model</Label>
              </FieldLabel>
              <Input id="model" placeholder="e.g. Sun Odyssey 36i" className={seedCls(model)} {...register("model")} />
              {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
            </div>
          </div>

          {/* ── Year + Condition (2-col) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 pt-7">
              <FieldLabel hasAI={!!year}>
                <Label className="text-sm font-bold text-foreground leading-5">Year</Label>
              </FieldLabel>
              <Input id="year" type="number" inputMode="numeric" placeholder="e.g. 2010" className={seedCls(year)} {...register("year")} />
              {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
            </div>

            <div className="flex flex-col gap-1 pt-7">
              <FieldLabel hasAI={aiFields.has("condition")}>
                <Label className="text-sm font-bold text-foreground leading-5">Condition</Label>
              </FieldLabel>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger className={aiCls("condition")}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITION_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.condition && <p className="text-sm text-destructive">{errors.condition.message}</p>}
            </div>
          </div>

          {/* ── Engine make + Number of Engines (2-col) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Engine make</Label>
              <SelectField name="engineMake" control={control} options={ENGINE_MAKE_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Number of Engines</Label>
              <SelectField name="numberOfEngines" control={control} options={NUMBER_OF_ENGINES_OPTIONS} />
            </div>
          </div>

          {/* ── Engine Hours + Beam (2-col) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Engine Hours</Label>
              <SelectField name="engineHours" control={control} options={ENGINE_HOURS_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Beam</Label>
              <SelectField name="beam" control={control} options={BEAM_OPTIONS} />
            </div>
          </div>

          {/* ── Draft + Cabins/Berths (2-col) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Draft</Label>
              <SelectField name="draft" control={control} options={DRAFT_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1 pt-7">
              <Label className="text-sm font-bold text-foreground leading-5">Cabins/Berths</Label>
              <SelectField name="cabinsBerths" control={control} options={CABINS_BERTHS_OPTIONS} />
            </div>
          </div>
          <div className="h-px bg-border w-full" />
        </>
      ) : (
        <div className="h-px bg-border w-full" />
      )}
    </div>
  )
}
