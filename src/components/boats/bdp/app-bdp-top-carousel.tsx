"use client"

import Link from "next/link"
import * as React from "react"
import { ChevronLeft, Heart } from "lucide-react"

import { BdpImageGrid } from "@/components/boats/bdp/bdp-image-grid"
import { cn } from "@/lib/utils"

type AppBdpTopCarouselProps = {
  boatTitle: string
  images: string[]
}

export function AppBdpTopCarousel({ boatTitle, images }: AppBdpTopCarouselProps) {
  const [fav, setFav] = React.useState(false)
  const photoCount = images.filter((s) => Boolean(s && s.trim())).length || images.length

  return (
    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
      <BdpImageGrid
        galleryLayout="mobile"
        images={images}
        alt={boatTitle}
        galleryTitle={boatTitle}
        mobileHeroClassName="rounded-none aspect-auto h-[300px] max-h-[300px] border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10",
          "pt-[max(0.75rem,env(safe-area-inset-top,0px))] px-[var(--mobile-margin)]"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/app/boats-for-sale"
            aria-label="Back"
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur-md shadow-sm active:scale-[0.98] [-webkit-tap-highlight-color:transparent]"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </Link>

          <button
            type="button"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setFav((v) => !v)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-background/70 backdrop-blur-md shadow-sm active:scale-[0.98] [-webkit-tap-highlight-color:transparent]"
          >
            <Heart
              className={cn("size-5", fav ? "fill-primary text-primary" : "text-foreground")}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-10">
        <span className="rounded-md bg-black/65 px-2.5 py-1 text-xs font-semibold text-white">
          1 / {photoCount}
        </span>
      </div>
    </div>
  )
}

