"use client"

interface PriceComparisonWidgetProps {
  askingPrice: number
}

function formatPrice(p: number) {
  return "$" + p.toLocaleString("en-US")
}

/**
 * Price comparison widget — placeholder/mock data.
 * Replace market average with real comps when API is available.
 */
export function PriceComparisonWidget({ askingPrice }: PriceComparisonWidgetProps) {
  const marketAverage = askingPrice
    ? Math.round((askingPrice * 1.112) / 500) * 500
    : 54500

  const maxPrice = Math.max(askingPrice || 0, marketAverage)
  const yourPct = maxPrice > 0 ? Math.round(((askingPrice || 0) / maxPrice) * 100) : 0

  return (
    <div className="rounded-xl bg-tag-bg p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <p className="text-base font-bold text-foreground">Price comparison</p>
        <div className="flex items-center gap-1.5 bg-status-success-100 px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-status-success-300 shrink-0" />
          <span className="text-[11px] font-bold text-status-success-300 whitespace-nowrap">Good price</span>
        </div>
      </div>

      {/* Two rows side by side */}
      <div className="flex gap-4">
        {/* Your asking price */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-xs font-bold text-primary whitespace-nowrap overflow-hidden">
            <span>Your asking price</span>
            <span>{askingPrice ? formatPrice(askingPrice) : "—"}</span>
          </div>
          <div className="bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-[width] duration-300"
              style={{ width: `${yourPct}%` }}
            />
          </div>
        </div>

        {/* Market average (mock) */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-xs font-normal text-foreground whitespace-nowrap overflow-hidden">
            <span>Market average</span>
            <span>{formatPrice(marketAverage)}</span>
          </div>
          <div className="bg-neutral-200 h-2 rounded-full overflow-hidden">
            <div className="bg-neutral-500 h-2 rounded-full w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
