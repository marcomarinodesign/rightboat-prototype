"use client"

import { Waves, Sailboat, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BoatType {
  value: string
  label: string
  icon: LucideIcon
}

const BOAT_TYPES: BoatType[] = [
  { value: "Motorboat", label: "Motorboat", icon: Waves },
  { value: "Sailboat", label: "Sailboat", icon: Sailboat },
]

interface BoatTypeSelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function BoatTypeSelector({ value, onChange, error }: BoatTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4">
        {BOAT_TYPES.map((type) => {
          const isSelected = value === type.value
          const Icon = type.icon
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5",
                "rounded-xl border-2 p-3.5 transition-colors duration-[var(--transition-duration-fast)]",
                "min-h-16",
                "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
                isSelected && "border-primary bg-[#f4f9ff] text-primary hover:border-primary hover:bg-[#f4f9ff]"
              )}
              aria-pressed={isSelected}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs font-semibold leading-tight text-center">
                {type.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
}
