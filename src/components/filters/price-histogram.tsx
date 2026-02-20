"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import type { Boat } from "@/data/boats"

// ─── Colors ──────────────────────────────────────────────────────────────────
const COLOR_ACTIVE = "#0257fc"   // --brand-blue-400 / primary
const COLOR_INACTIVE = "#e2e8f0" // light gray for out-of-range bars

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parsePrice(boat: Boat): number {
  const n = parseInt(boat.price.replace(/[^0-9]/g, ""), 10)
  return Number.isNaN(n) ? 0 : n
}

function formatLabel(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`
  return `$${Math.round(value)}`
}

function computeBuckets(prices: number[], numBuckets = 8) {
  if (prices.length === 0) return []
  const lo = Math.min(...prices)
  const hi = Math.max(...prices)
  if (lo === hi) return [{ start: lo, end: hi, count: prices.length, label: formatLabel(lo) }]
  const width = (hi - lo) / numBuckets
  return Array.from({ length: numBuckets }, (_, i) => {
    const start = lo + i * width
    const end = start + width
    const count = prices.filter((p) =>
      i === numBuckets - 1 ? p >= start && p <= end : p >= start && p < end
    ).length
    return { start, end, count, label: formatLabel(start) }
  })
}

function bucketIsActive(
  start: number,
  end: number,
  minStr: string,
  maxStr: string
): boolean {
  if (!minStr && !maxStr) return true
  const lo = minStr ? parseInt(minStr, 10) : -Infinity
  const hi = maxStr ? parseInt(maxStr, 10) : Infinity
  return start <= hi && end >= lo
}

// ─── Custom tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { value: number }[]
}) {
  if (!active || !payload?.[0]) return null
  const count = payload[0].value
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-md">
      <span className="font-semibold">{count}</span>{" "}
      <span className="text-muted-foreground">{count === 1 ? "boat" : "boats"}</span>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
interface PriceHistogramProps {
  /** Boats to build the distribution from (should already exclude the price filter). */
  boats: Boat[]
  priceMin: string
  priceMax: string
  onPriceMinChange: (v: string) => void
  onPriceMaxChange: (v: string) => void
}

export function PriceHistogram({
  boats,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: PriceHistogramProps) {
  const prices = React.useMemo(
    () => boats.map(parsePrice).filter((p) => p > 0),
    [boats]
  )

  const buckets = React.useMemo(() => computeBuckets(prices), [prices])

  const maxCount = Math.max(...buckets.map((b) => b.count), 1)

  // Show only first and last tick on X-axis to keep it clean
  const xTicks = buckets.length > 0
    ? [buckets[0].label, buckets[buckets.length - 1].label]
    : []

  return (
    <div className="space-y-3">
      {/* Subtitle */}
      <p className="text-xs text-muted-foreground">
        Distribution based on listing data. Updates with other filters.
      </p>

      {/* Min / Max inputs */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
          />
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">to</span>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
          />
        </div>
      </div>

      {/* Histogram */}
      {buckets.length > 0 ? (
        <div aria-hidden>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart
              data={buckets}
              barCategoryGap="15%"
              margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
            >
              <XAxis
                dataKey="label"
                ticks={xTicks}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, maxCount]}
                ticks={[0, maxCount]}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {buckets.map((bucket, i) => (
                  <Cell
                    key={i}
                    fill={
                      bucketIsActive(bucket.start, bucket.end, priceMin, priceMax)
                        ? COLOR_ACTIVE
                        : COLOR_INACTIVE
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-4 text-center text-xs text-muted-foreground">
          No pricing data available
        </p>
      )}
    </div>
  )
}
