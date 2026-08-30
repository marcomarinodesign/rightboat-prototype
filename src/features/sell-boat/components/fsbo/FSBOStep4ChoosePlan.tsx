"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData, PLANS } from "../../types-fsbo"
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
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground leading-8">Choose your plan</h2>

      {/* Subtitle */}
      <p className="text-base text-foreground">
        Both plans include a live listing on Rightboat. Upgrade for more visibility.
      </p>

      {/* Plan cards */}
      <Controller
        name="selectedPlan"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <div className="flex-1">
              <PackageCard
                plan="premium"
                name="Premium"
                price={PLANS.premium.price}
                billing={PLANS.premium.billing}
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
                price={PLANS.basic.price}
                billing={PLANS.basic.billing}
                features={BASIC_FEATURES}
                selected={field.value === "basic"}
                onSelect={() => field.onChange("basic")}
              />
            </div>
          </div>
        )}
      />

      {/* Social proof */}
      <div className="rounded-xl bg-tag-bg px-4 py-3">
        <p className="text-sm text-foreground">
          <span className="font-bold">78% of sellers</span> choose Premium — featured listings sell{" "}
          <span className="font-bold">2.4× faster</span> on average.
        </p>
      </div>
    </div>
  )
}
