"use client"

import {
  Waves,
  Sailboat,
  FishingHook,
  Ship,
  ShipWheel,
  Anchor,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BoatType {
  value: string
  label: string
  icon: LucideIcon
}

const BOAT_TYPES: BoatType[] = [
  { value: "Motorboat", label: "Motorboat", icon: Waves },
  { value: "Sailboat", label: "Sailboat", icon: Sailboat },
  { value: "RIB", label: "RIB", icon: Waves },
  { value: "Catamaran", label: "Catamaran", icon: Sailboat },
  { value: "Fishing Boat", label: "Fishing", icon: FishingHook },
  { value: "Canal Boat", label: "Canal Boat", icon: Ship },
  { value: "Yacht", label: "Yacht", icon: ShipWheel },
  { value: "Other", label: "Other", icon: Anchor },
]

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
        {BOAT_TYPES.map((type) => {
          const isSelected = value === type.value
          const Icon = type.icon
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
              <Icon className="h-6 w-6" aria-hidden="true" />
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
