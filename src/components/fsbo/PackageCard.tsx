"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface PackageCardProps {
  plan: "basic" | "premium"
  name: string
  price: number
  billing: string
  badge?: string
  features: string[]
  selected: boolean
  onSelect: () => void
}

export function PackageCard({
  plan,
  name,
  price,
  billing,
  badge,
  features,
  selected,
  onSelect,
}: PackageCardProps) {
  const inputId = `plan-${plan}`

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "relative block rounded-xl border-2 p-[22px] cursor-pointer transition-colors",
        selected
          ? "border-primary bg-white"
          : "border-[#e4e5e9] bg-white hover:border-primary/40"
      )}
    >
      <input
        id={inputId}
        type="radio"
        name="selectedPlan"
        value={plan}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />

      {/* Radio indicator — absolute top-right */}
      <div
        className={cn(
          "absolute top-4 right-4 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors",
          selected
            ? "border-primary bg-primary text-white"
            : "border-[#e4e5e9] bg-transparent"
        )}
        aria-hidden="true"
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Plan name + badge */}
      <div className="pr-8 flex items-center gap-2">
        <span className="text-base font-bold text-foreground">{name}</span>
        {badge && (
          <Badge variant="default" className="text-[10px] uppercase tracking-[0.25px]">
            {badge}
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 pt-2">
        <span className="text-[30px] font-extrabold tracking-[-0.75px] text-foreground leading-9">
          ${price}
        </span>
        <span className="text-sm text-[#9699a0] font-medium">/{billing}</span>
      </div>

      {/* Divider */}
      <div className="mt-4 border-t border-[#e4e5e9]" />

      {/* Features */}
      <ul className="pt-4 flex flex-col gap-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <CheckIcon className="shrink-0 mt-0.5 text-primary" />
            <span className="text-foreground leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </label>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
