"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export type InteractiveCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Slight lift on hover */
  lift?: boolean
}

export const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, lift = true, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        "overflow-hidden border-border/60 transition-all duration-200",
        lift ? "hover:-translate-y-0.5 hover:shadow-lg" : "hover:shadow-lg",
        className
      )}
      {...props}
    />
  )
)
InteractiveCard.displayName = "InteractiveCard"
