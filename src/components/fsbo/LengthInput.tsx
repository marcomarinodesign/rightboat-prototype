"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface LengthInputProps {
  value: string | number
  onChange: (value: number) => void
  error?: string
  className?: string
}

type Unit = "ft" | "m"

const FT_TO_M = 0.3048

export function LengthInput({ value, onChange, error, className }: LengthInputProps) {
  const [unit, setUnit] = useState<Unit>("ft")
  // Display value in the currently selected unit
  const displayValue =
    value === "" || value === undefined || value === 0
      ? ""
      : unit === "ft"
      ? String(value)
      : String(Math.round(Number(value) * FT_TO_M * 10) / 10)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value)
    if (isNaN(raw)) {
      onChange(0)
      return
    }
    // Always store in feet internally
    const inFeet = unit === "ft" ? raw : Math.round((raw / FT_TO_M) * 10) / 10
    onChange(inFeet)
  }

  const handleUnitToggle = (newUnit: Unit) => {
    setUnit(newUnit)
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="number"
            inputMode="decimal"
            placeholder={unit === "ft" ? "e.g. 32" : "e.g. 9.8"}
            value={displayValue}
            onChange={handleChange}
            className="pr-2"
            min={unit === "ft" ? 5 : 1.5}
            max={unit === "ft" ? 200 : 61}
          />
        </div>
        {/* Unit toggle */}
        <div className="flex rounded-lg border border-input overflow-hidden shrink-0">
          {(["ft", "m"] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleUnitToggle(u)}
              className={cn(
                "px-4 h-11 text-sm font-semibold transition-colors duration-[var(--transition-duration-fast)]",
                unit === u
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
