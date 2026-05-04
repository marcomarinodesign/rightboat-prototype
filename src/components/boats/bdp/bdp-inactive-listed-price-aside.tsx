"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type BdpInactiveListedPriceAsideProps = {
  listedPrice: string
  findSimilarHref: string
  findSimilarLabel: string
  /** Variant A / Alt: primary scroll + outline find. Variant B: single primary “Find similar …”. */
  ctaLayout: "two-step" | "find-primary-only"
  onSeeSimilarClick?: () => void
  className?: string
}

export function BdpInactiveListedPriceAside({
  listedPrice,
  findSimilarHref,
  findSimilarLabel,
  ctaLayout,
  onSeeSimilarClick,
  className,
}: BdpInactiveListedPriceAsideProps) {
  function defaultScrollToSimilar() {
    document.getElementById("similar-boats")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSeeSimilar = onSeeSimilarClick ?? defaultScrollToSimilar

  return (
    <Card className={cn(className)}>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.5px] text-muted-foreground">
            Listed price
          </p>
          <p className="text-[22px] font-bold leading-none text-muted-foreground line-through decoration-solid">
            {listedPrice}
          </p>
          <p className="text-[13px] text-muted-foreground">
            This listing is no longer available.
          </p>
        </div>

        <div className="h-px w-full bg-border" aria-hidden />

        {ctaLayout === "two-step" ? (
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="h-11 w-full rounded-lg text-sm font-medium"
              onClick={handleSeeSimilar}
            >
              See similar boats
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-lg text-sm font-medium" asChild>
              <Link href={findSimilarHref}>{findSimilarLabel}</Link>
            </Button>
          </div>
        ) : (
          <Button className="h-11 w-full rounded-lg text-sm font-medium" asChild>
            <Link href={findSimilarHref}>{findSimilarLabel}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
