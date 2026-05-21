"use client"

import * as React from "react"

import { DualRangeSlider } from "@/components/mobile-app/dual-range-slider"
import type { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"

const PRICE_MIN = 0
const PRICE_MAX = 500_000
const PRICE_STEP = 1_000
const BUCKET_COUNT = 30
const BUCKET_WIDTH = PRICE_MAX / BUCKET_COUNT

/** 30 buckets from £0 to £500k (~£16,667 per bucket) — prototype mock distribution. */
const PRICE_HISTOGRAM = [
  2, 3, 4, 6, 8, 11, 14, 18, 22, 27, 32, 38, 44, 49, 53, 55, 52, 48, 43, 38, 33,
  28, 23, 19, 15, 11, 8, 6, 4, 3,
]

const HISTOGRAM_MAX = Math.max(...PRICE_HISTOGRAM)
const HISTOGRAM_HEIGHT_PX = 80

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

function snap(n: number) {
  return Math.round(n / PRICE_STEP) * PRICE_STEP
}

function formatGbp(value: number): string {
  return `£${value.toLocaleString("en-GB")}`
}

function parseGbpInput(raw: string): number | null {
  const digits = raw.replace(/[^0-9]/g, "")
  if (!digits) return null
  const n = parseInt(digits, 10)
  return Number.isNaN(n) ? null : n
}

function bucketInRange(index: number, rangeMin: number, rangeMax: number): boolean {
  const start = index * BUCKET_WIDTH
  const end = (index + 1) * BUCKET_WIDTH
  return start < rangeMax && end > rangeMin
}

function rangeFromFilters(priceMin: string, priceMax: string): [number, number] {
  const parsedMin = priceMin ? parseInt(priceMin, 10) : PRICE_MIN
  const parsedMax = priceMax ? parseInt(priceMax, 10) : PRICE_MAX
  const lo = clamp(Number.isNaN(parsedMin) ? PRICE_MIN : parsedMin, PRICE_MIN, PRICE_MAX)
  const hi = clamp(Number.isNaN(parsedMax) ? PRICE_MAX : parsedMax, PRICE_MIN, PRICE_MAX)
  return [Math.min(lo, hi), Math.max(lo, hi)]
}

interface PriceHistogramProps {
  /** Kept for panel API; histogram uses mock data for the prototype. */
  boats: Boat[]
  priceMin: string
  priceMax: string
  onPriceMinChange: (v: string) => void
  onPriceMaxChange: (v: string) => void
}

export function PriceHistogram({
  boats: _boats,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: PriceHistogramProps) {
  void _boats
  const [rangeMin, rangeMax] = rangeFromFilters(priceMin, priceMax)

  const [minInput, setMinInput] = React.useState(formatGbp(rangeMin))
  const [maxInput, setMaxInput] = React.useState(formatGbp(rangeMax))

  React.useEffect(() => {
    setMinInput(formatGbp(rangeMin))
    setMaxInput(formatGbp(rangeMax))
  }, [rangeMin, rangeMax])

  const emitRange = (lo: number, hi: number) => {
    const safeLo = snap(clamp(lo, PRICE_MIN, PRICE_MAX))
    const safeHi = snap(clamp(hi, PRICE_MIN, PRICE_MAX))
    const orderedLo = Math.min(safeLo, safeHi)
    const orderedHi = Math.max(safeLo, safeHi)
    onPriceMinChange(orderedLo <= PRICE_MIN ? "" : String(orderedLo))
    onPriceMaxChange(orderedHi >= PRICE_MAX ? "" : String(orderedHi))
  }

  const handleSliderChange = ([lo, hi]: [number, number]) => {
    emitRange(lo, hi)
  }

  const commitMinInput = () => {
    const parsed = parseGbpInput(minInput)
    if (parsed === null) {
      setMinInput(formatGbp(rangeMin))
      return
    }
    emitRange(parsed, rangeMax)
  }

  const commitMaxInput = () => {
    const parsed = parseGbpInput(maxInput)
    if (parsed === null) {
      setMaxInput(formatGbp(rangeMax))
      return
    }
    emitRange(rangeMin, parsed)
  }

  return (
    <div className="space-y-3">
      {/* A. Histogram — plain divs, no chart library */}
      <div
        className="flex h-20 items-end gap-0.5"
        aria-hidden
      >
        {PRICE_HISTOGRAM.map((count, i) => {
          const inRange = bucketInRange(i, rangeMin, rangeMax)
          const barHeightPx = Math.max(
            2,
            Math.round((count / HISTOGRAM_MAX) * HISTOGRAM_HEIGHT_PX)
          )
          return (
            <div
              key={i}
              className={cn(
                "min-w-0 flex-1 rounded-t-[2px]",
                inRange ? "bg-primary" : "bg-neutral-300"
              )}
              style={{ height: barHeightPx }}
            />
          )
        })}
      </div>

      {/* B. Dual-thumb range slider */}
      <DualRangeSlider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        value={[rangeMin, rangeMax]}
        onChange={handleSliderChange}
        showValueLabels={false}
        inactiveTrackClassName="bg-neutral-300"
        activeTrackClassName="bg-primary"
        thumbClassName="size-6 rounded-full border-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-0"
      />

      {/* C. Min / Max inputs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Min</label>
          <input
            type="text"
            inputMode="numeric"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            onBlur={commitMinInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur()
              }
            }}
            aria-label="Minimum price"
            className="h-10 w-full rounded-lg border border-neutral-300 bg-background px-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Max</label>
          <input
            type="text"
            inputMode="numeric"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            onBlur={commitMaxInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur()
              }
            }}
            aria-label="Maximum price"
            className="h-10 w-full rounded-lg border border-neutral-300 bg-background px-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>
    </div>
  )
}
