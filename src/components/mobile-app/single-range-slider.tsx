"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SingleRangeSliderProps = {
  min: number
  max: number
  step?: number
  value: number
  onChange: (next: number) => void
  formatValue?: (n: number) => string
  className?: string
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

export function SingleRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (n) => String(n),
  className,
}: SingleRangeSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const span = max - min || 1
  const pct = ((value - min) / span) * 100

  const readX = (clientX: number) => {
    const el = trackRef.current
    if (!el) return min
    const r = el.getBoundingClientRect()
    const t = clamp((clientX - r.left) / r.width, 0, 1)
    const raw = min + t * span
    const stepped = Math.round(raw / step) * step
    return clamp(stepped, min, max)
  }

  const bindThumb = (e: React.PointerEvent) => {
    const target = e.currentTarget
    const pid = e.pointerId
    target.setPointerCapture(pid)
    const onMove = (ev: PointerEvent) => onChange(readX(ev.clientX))
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

  const onTrackDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return
    onChange(readX(e.clientX))
  }

  return (
    <div className={cn("w-full select-none touch-none", className)}>
      <div className="mb-2 flex justify-end text-xs text-muted-foreground">
        <span>{formatValue(value)}</span>
      </div>
      <div
        ref={trackRef}
        role="presentation"
        className="relative h-8 py-2"
        onPointerDown={onTrackDown}
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
        <button
          type="button"
          aria-label="Value"
          className="absolute top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${pct}%` }}
          onPointerDown={bindThumb}
        >
          <span className="size-7 rounded-full border-2 border-primary bg-white shadow-md ring-2 ring-white" />
        </button>
      </div>
    </div>
  )
}
