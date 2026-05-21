"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type DualRangeSliderProps = {
  min: number
  max: number
  step?: number
  value: readonly [number, number]
  onChange: (next: [number, number]) => void
  formatValue?: (n: number) => string
  /** When false, hides value labels above the track. */
  showValueLabels?: boolean
  /** Track outside the selected range (default: muted). */
  inactiveTrackClassName?: string
  /** Track between thumbs (default: primary). */
  activeTrackClassName?: string
  /** Classes for the visible thumb disc. */
  thumbClassName?: string
  className?: string
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

export function DualRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (n) => String(n),
  showValueLabels = true,
  inactiveTrackClassName = "bg-muted",
  activeTrackClassName = "bg-primary",
  thumbClassName = "size-7 rounded-full border-2 border-primary bg-white shadow-md ring-2 ring-white",
  className,
}: DualRangeSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [a, b] = value
  const safeLow = Math.min(a, b)
  const safeHigh = Math.max(a, b)

  const span = max - min || 1

  const toPct = (n: number) => ((n - min) / span) * 100

  const readX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return min
    const r = el.getBoundingClientRect()
    const t = clamp((clientX - r.left) / r.width, 0, 1)
    const raw = min + t * span
    const stepped = Math.round(raw / step) * step
    return clamp(stepped, min, max)
  }

  const emit = (lo: number, hi: number) => {
    onChange([Math.min(lo, hi), Math.max(lo, hi)])
  }

  const bindThumbDrag = (which: "low" | "high") => (e: React.PointerEvent) => {
    e.stopPropagation()
    const target = e.currentTarget
    const pid = e.pointerId
    target.setPointerCapture(pid)

    const onMove = (ev: PointerEvent) => {
      const x = readX(ev.clientX)
      if (which === "low") {
        emit(x, safeHigh)
      } else {
        emit(safeLow, x)
      }
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      try {
        target.releasePointerCapture(pid)
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  const onTrackPointerDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return
    const x = readX(e.clientX)
    const distLow = Math.abs(x - safeLow)
    const distHigh = Math.abs(x - safeHigh)
    const which = distLow <= distHigh ? "low" : "high"
    if (which === "low") emit(x, safeHigh)
    else emit(safeLow, x)
  }

  const loPct = toPct(safeLow)
  const hiPct = toPct(safeHigh)

  return (
    <div className={cn("w-full select-none touch-none", className)}>
      {showValueLabels ? (
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatValue(safeLow)}</span>
          <span>{formatValue(safeHigh)}</span>
        </div>
      ) : null}
      <div
        ref={trackRef}
        role="presentation"
        className="relative h-8 py-2"
        onPointerDown={onTrackPointerDown}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full",
            inactiveTrackClassName
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full",
            activeTrackClassName
          )}
          style={{
            left: `${loPct}%`,
            width: `${Math.max(0, hiPct - loPct)}%`,
          }}
        />
        <button
          type="button"
          aria-label="Minimum value"
          className="absolute top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${loPct}%` }}
          onPointerDown={bindThumbDrag("low")}
        >
          <span className={thumbClassName} />
        </button>
        <button
          type="button"
          aria-label="Maximum value"
          className="absolute top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${hiPct}%` }}
          onPointerDown={bindThumbDrag("high")}
        >
          <span className={thumbClassName} />
        </button>
      </div>
    </div>
  )
}
