"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ImageSlider } from "@/components/ui/image-slider"

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
    <Card
      className={cn(
        "overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.02]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
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
      <CardFooter className="flex items-center justify-between pt-0">
        <span className="text-lg font-semibold text-primary">{price}</span>
      </CardFooter>
    </Card>
  )
}
