"use client"

import { useMemo } from "react"
import { UseFormReturn, Controller } from "react-hook-form"
import { type Step1LPFormInput } from "@/features/sell-boat/types-v3"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

const LP_SELECT_TRIGGER =
  "h-12 w-full rounded-[14px] border-white bg-white px-4 text-left text-base font-normal text-foreground shadow-sm hover:border-white sm:text-lg"

const LP_INPUT =
  "h-12 w-full rounded-[14px] border-white bg-white px-4 text-base font-normal text-foreground shadow-sm sm:text-lg"

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
    register,
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full flex-col">
        <div className="flex min-w-0 flex-col gap-1">
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                options={manufacturerOptions}
                placeholder="Brand"
                searchPlaceholder="Search brands"
                invalid={!!errors.brand}
                clearable={false}
                triggerClassName={LP_SELECT_TRIGGER}
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
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                options={filteredModelOptions}
                placeholder="Model"
                searchPlaceholder="Search models"
                invalid={!!errors.model}
                clearable={false}
                triggerClassName={LP_SELECT_TRIGGER}
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
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                options={yearOptions}
                placeholder="Year"
                searchPlaceholder="Search year"
                invalid={!!errors.year}
                clearable={false}
                triggerClassName={LP_SELECT_TRIGGER}
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
        <div className="flex min-w-0 flex-col gap-1">
          <div className="space-y-1.5">
            <Label htmlFor="lp-email">Email</Label>
            <Input
              id="lp-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className={LP_INPUT}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              We&apos;ll save your progress so you can pick up where you left off.
            </p>
          </div>
          <div className="min-h-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full shrink-0 rounded-[12px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:text-lg"
            disabled={isSubmitting}
          >
            Sell your boat
          </Button>
        </div>
      </div>
    </form>
  )
}
