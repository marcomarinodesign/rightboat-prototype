import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

type PriceHistoryItem = {
  label: string
  value: string
  emphasis?: boolean
}

type BdpPriceHistoryProps = {
  summary: string
  items: PriceHistoryItem[]
  chartSrc?: string
}

export function BdpPriceHistory({
  summary,
  items,
  chartSrc,
}: BdpPriceHistoryProps) {
  return (
    <Card className="rounded-[12px]">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-bold leading-6">Price History</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{summary}</p>

        <div className="grid gap-3 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[12px] bg-muted px-3 py-3">
            <div className="relative h-[150px] w-full overflow-hidden rounded-[12px] bg-background/50">
              {chartSrc ? (
                <Image
                  src={chartSrc}
                  alt="Price history chart"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Image
                  src="https://ui.shadcn.com/placeholder.svg"
                  alt="Price history chart placeholder"
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          </div>

          <div className="rounded-[12px] border border-border/60 bg-background p-3">
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

