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

/** Pill segmented control — active tab uses Malibu/200, matching the Figma Tab (Segmented). */
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
      className={cn(
        "inline-flex items-center gap-4 overflow-hidden rounded-full bg-muted p-2",
        className
      )}
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
              "rounded-full px-2 py-2 text-center text-[13px] font-normal leading-[1.45] whitespace-nowrap transition-colors duration-[var(--transition-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "bg-malibu-200 text-foreground shadow-sm"
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
