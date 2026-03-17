"use client"

import { useMemo } from "react"
import { UseFormReturn, Controller } from "react-hook-form"
import { type Step1LPFormInput } from "@/features/sell-boat/types-v3"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { Button } from "@/components/ui/button"
import { popularBrands } from "@/data/categories"
import { popularModels } from "@/data/models"

interface StepOneLPProps {
  form: UseFormReturn<Step1LPFormInput>
  /** Receives validated form data. Year is string from select; parent should convert for storage. */
  onSubmit: (data: Step1LPFormInput) => void
  isSubmitting?: boolean
}

const manufacturerOptions = popularBrands.map((brand) => ({
  label: brand,
  value: brand,
}))

const modelOptions = popularModels.map((m) => ({
  label: `${m.brand} ${m.name}`,
  value: m.slug,
}))

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: currentYear - 1900 + 2 }, (_, i) => {
  const y = currentYear + 1 - i
  return { label: String(y), value: String(y) }
})

export function StepOneLP({
  form,
  onSubmit,
  isSubmitting = false,
}: StepOneLPProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form

  const brand = watch("brand")

  const filteredModelOptions = useMemo(() => {
    if (!brand) return modelOptions
    const filtered = modelOptions.filter((opt) =>
      opt.label.toLowerCase().startsWith(brand.toLowerCase())
    )
    return filtered.length > 0 ? filtered : modelOptions
  }, [brand])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex min-w-0 flex-col gap-1">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onValueChange={field.onChange}
                options={manufacturerOptions}
                placeholder="Brand"
                searchPlaceholder="Search brands"
                invalid={!!errors.brand}
                triggerClassName="rounded-[12px] border-[#e4e5e9] px-[15px] py-px"
              />
            )}
          />
          {errors.brand && (
            <p className="text-sm text-destructive" role="alert">
              {errors.brand.message}
            </p>
          )}
          <div className="min-h-5" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onValueChange={field.onChange}
                options={filteredModelOptions}
                placeholder="Model"
                searchPlaceholder="Search models"
                invalid={!!errors.model}
                triggerClassName="rounded-[12px] border-[#e4e5e9] px-[15px] py-px"
              />
            )}
          />
          {errors.model && (
            <p className="text-sm text-destructive" role="alert">
              {errors.model.message}
            </p>
          )}
          <div className="min-h-5" aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onValueChange={field.onChange}
                options={yearOptions}
                placeholder="Year"
                searchPlaceholder="Search year"
                invalid={!!errors.year}
                triggerClassName="rounded-[12px] border-[#e4e5e9] px-[15px] py-px"
              />
            )}
          />
          {errors.year && (
            <p className="text-sm text-destructive" role="alert">
              {errors.year.message}
            </p>
          )}
          <div className="min-h-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full shrink-0 rounded-[12px] px-6 font-medium"
            disabled={isSubmitting}
          >
            Sell your boat
          </Button>
        </div>
      </div>
    </form>
  )
}
