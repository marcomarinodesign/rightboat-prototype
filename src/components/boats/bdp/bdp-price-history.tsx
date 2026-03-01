"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

const COLOR_BAR = "#0257fc" // primary / brand-blue-400

function parsePriceValue(valueStr: string): number {
  const n = parseInt(valueStr.replace(/[^0-9]/g, ""), 10)
  return Number.isNaN(n) ? 0 : n
}

function formatPriceLabel(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}k`
  return `$${Math.round(value)}`
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { label: string; value: number } }[]
}) {
  if (!active || !payload?.[0]) return null
  const { label, value } = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">{formatPriceLabel(value)}</p>
    </div>
  )
}

type PriceHistoryItem = {
  label: string
  value: string
  emphasis?: boolean
}

type BdpPriceHistoryProps = {
  summary: string
  items: PriceHistoryItem[]
}

export function BdpPriceHistory({ summary, items }: BdpPriceHistoryProps) {
  const chartData = React.useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        value: parsePriceValue(item.value),
      })),
    [items]
  )

  const maxPrice = Math.max(...chartData.map((d) => d.value), 1)
  const yTicks = React.useMemo(
    () => (chartData.length > 0 ? [0, maxPrice] : []),
    [chartData.length, maxPrice]
  )

  return (
    <Card className="rounded-lg">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-bold leading-6">Price History</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{summary}</p>

        <div className="grid gap-3 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="overflow-hidden rounded-lg bg-muted px-3 py-3">
            {chartData.length > 0 && chartData.some((d) => d.value > 0) ? (
              <div aria-hidden className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    barCategoryGap="15%"
                    margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, maxPrice]}
                      ticks={yTicks}
                      tickFormatter={formatPriceLabel}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "transparent" }}
                    />
                    <Bar
                      dataKey="value"
                      fill={COLOR_BAR}
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[150px] items-center justify-center rounded-lg bg-background/50 text-xs text-muted-foreground">
                No pricing data available
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border/60 bg-background p-3">
            <div className="space-y-3 text-sm">
              {items.map((item, idx) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p
                      className={
                        item.emphasis
                          ? "font-bold text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {item.value}
                    </p>
                  </div>
                  {idx !== items.length - 1 ? (
                    <div className="mt-3 border-t border-border/60" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Total price amount is based on price change information provided by the
          broker.
        </p>
      </CardContent>
    </Card>
  )
}
