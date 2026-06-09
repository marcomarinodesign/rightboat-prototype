"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PriceInputProps {
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export function PriceInput({
  value,
  onChange,
  placeholder = "e.g. 24,500",
  error,
  className,
}: PriceInputProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        {/* £ prefix */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-muted-foreground pointer-events-none select-none">
          £
        </span>
        <Input
          type="number"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8"
          min={1000}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
