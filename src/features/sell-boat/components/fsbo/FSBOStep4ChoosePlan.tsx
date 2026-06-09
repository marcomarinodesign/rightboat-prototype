"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { PackageCard } from "@/components/fsbo/PackageCard"

interface FSBOStep4ChoosePlanProps {
  form: UseFormReturn<FSBOFormData>
}

const BASIC_FEATURES = [
  "Listed on Rightboat.com",
  "Up to 20 photos",
  "Email enquiries from buyers",
  "30-day listing period",
  "Basic listing analytics",
  "Renew or remove any time",
]

const PREMIUM_FEATURES = [
  "Everything in Basic",
  "Featured placement in search results",
  "Priority buyer matching",
  "Video walkthrough upload",
  "Listing health score & tips",
  "Premium analytics dashboard",
  "Dedicated seller support",
]

export function FSBOStep4ChoosePlan({ form }: FSBOStep4ChoosePlanProps) {
  const { control } = form

  return (
    <div className="space-y-7">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Choose your plan</h2>
        <p className="text-sm text-muted-foreground">
          Both plans include a live listing on Rightboat. Upgrade for more visibility.
        </p>
      </div>

      <Controller
        name="selectedPlan"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <PackageCard
                plan="premium"
                name="Premium"
                price={99}
                billing="month"
                badge="Recommended"
                features={PREMIUM_FEATURES}
                selected={field.value === "premium"}
                onSelect={() => field.onChange("premium")}
              />
            </div>

            <div className="flex-1">
              <PackageCard
                plan="basic"
                name="Basic"
                price={49}
                billing="month"
                features={BASIC_FEATURES}
                selected={field.value === "basic"}
                onSelect={() => field.onChange("basic")}
              />
            </div>
          </div>
        )}
      />

      <div className="rounded-lg bg-muted px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">78% of sellers</span> choose Premium —
          featured listings sell{" "}
          <span className="font-semibold text-foreground">2.4× faster</span> on average.
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Cancel or change plan any time from your dashboard. No long-term commitment.
      </p>
    </div>
  )
}
