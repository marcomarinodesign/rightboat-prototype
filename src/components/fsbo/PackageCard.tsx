"use client"

import { cn } from "@/lib/utils"

export interface PackageCardProps {
  /** "basic" | "premium" */
  plan: "basic" | "premium"
  name: string
  price: number
  /** e.g. "per month" */
  billing: string
  /** Optional badge text — shown in top-right next to price (e.g. "Recommended") */
  badge?: string
  features: string[]
  /** Features only in this plan vs Basic — shown with a star marker instead of check */
  premiumFeatures?: string[]
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
        "relative block rounded-lg border-2 p-5 cursor-pointer",
        "transition-colors duration-[var(--transition-duration-fast)]",
        "border-border bg-card hover:border-primary",
        selected && "border-primary bg-card"
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

      <div
        className={cn(
          "absolute top-4 right-4",
          "flex items-center justify-center w-5 h-5 rounded-full border-2",
          "transition-colors duration-[var(--transition-duration-fast)]",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent"
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

      <div className="pr-8 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-foreground">{name}</span>
          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide leading-none">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tight text-foreground">
            ${price}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            /{billing}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-border" />

      <ul className="space-y-2.5">
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
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M4 7L6 9.5L10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
