"use client"

import { cn } from "@/lib/utils"

const BOAT_TYPE_OPTIONS = [
  { value: "Motorboat",   label: "Motorboat",   emoji: "🚤" },
  { value: "Sailboat",    label: "Sailboat",    emoji: "⛵" },
  { value: "RIB",         label: "RIB",         emoji: "🛥️" },
  { value: "Catamaran",   label: "Catamaran",   emoji: "⛵" },
  { value: "Fishing Boat",label: "Fishing",     emoji: "🎣" },
  { value: "Canal Boat",  label: "Canal Boat",  emoji: "🚢" },
  { value: "Yacht",       label: "Yacht",       emoji: "⚓" },
  { value: "Other",       label: "Other",       emoji: "🔵" },
] as const

interface BoatTypeSelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function BoatTypeSelector({ value, onChange, error }: BoatTypeSelectorProps) {
  return (
    <div className="space-y-2">
      {/* 2-column grid → 4 columns on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BOAT_TYPE_OPTIONS.map((type) => {
          const isSelected = value === type.value
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={cn(
                // Base
                "flex flex-col items-center justify-center gap-1.5",
                "rounded-lg border-2 p-3 transition-colors duration-[var(--transition-duration-fast)]",
                "min-h-16", // tap target
                // Unselected
                "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
                // Selected
                isSelected &&
                  "border-primary bg-tag-bg text-primary hover:border-primary hover:bg-tag-bg"
              )}
              aria-pressed={isSelected}
            >
              <span className="text-2xl leading-none" role="img" aria-label={type.label}>
                {type.emoji}
              </span>
              <span className="text-xs font-semibold leading-tight text-center">
                {type.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
