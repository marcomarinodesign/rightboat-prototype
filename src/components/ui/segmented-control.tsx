"use client"

import { cn } from "@/lib/utils"

export type SegmentedOption = {
  label: string
  value: string
}

type SegmentedControlProps = {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  "aria-label"?: string
  className?: string
}

/** Pill segmented control — same pattern as Location tabs, selected uses Blue/400. */
export function SegmentedControl({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("inline-flex gap-0.5 rounded-full bg-muted/80 p-1", className)}
    >
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-center text-sm font-medium whitespace-nowrap transition-colors duration-[var(--transition-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-5",
              active
                ? "bg-blue-400 text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
