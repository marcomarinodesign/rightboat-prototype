"use client"

import { cn } from "@/lib/utils"

export interface PillOption {
  label: string
  value: string
}

interface PillGroupProps {
  options: PillOption[]
  value: string | string[]
  onChange: (value: string) => void
  multiSelect?: boolean
  className?: string
  "aria-label"?: string
}

export function PillGroup({
  options,
  value,
  onChange,
  multiSelect = false,
  className,
  "aria-label": ariaLabel,
}: PillGroupProps) {
  const isSelected = (optValue: string) =>
    Array.isArray(value) ? value.includes(optValue) : value === optValue

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 min-w-[80px] px-4 py-3 rounded-lg border-2 text-sm font-semibold",
            "h-11",
            "transition-colors duration-[var(--transition-duration-fast)]",
            // Unselected
            "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
            // Selected
            isSelected(opt.value) &&
              "border-primary bg-primary text-primary-foreground"
          )}
          aria-pressed={isSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
