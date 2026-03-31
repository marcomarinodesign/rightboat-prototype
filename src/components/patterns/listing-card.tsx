"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ImageSlider } from "@/components/ui/image-slider"

const MotionCard = motion(Card)

export type ListingCardProps = {
  title: string
  description?: string
  images: string[]
  price: string
  onClick?: () => void
  showDots?: boolean
  imageAlt?: string
  className?: string
}

export function ListingCard({
  title,
  description,
  images,
  price,
  onClick,
  showDots = true,
  imageAlt,
  className,
}: ListingCardProps) {
  return (
    <MotionCard
      className={cn("overflow-hidden", onClick && "cursor-pointer", className)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <div className="overflow-hidden rounded-t-lg">
        <ImageSlider
          images={images}
          alt={imageAlt ?? title}
          showDots={showDots}
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        {description != null && (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        )}
      </CardHeader>
      <div className="mx-6 h-px bg-border" />
      <CardFooter className="flex items-center justify-between pt-3">
        <span className="text-lg font-bold text-foreground">{price}</span>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          onClick={onClick}
        >
          View listing
        </button>
      </CardFooter>
    </MotionCard>
  )
}
