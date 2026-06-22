"use client"

import * as React from "react"
import Image from "next/image"

import { BdpGalleryModal, type BdpGalleryVideo } from "@/components/boats/bdp/bdp-gallery-modal"
import { BdpGreyPlaceholder } from "@/components/boats/bdp/bdp-grey-placeholder"
import { cn } from "@/lib/utils"

const PLACEHOLDER = ""
const MIN_TILES = 4
const LEGACY_PLACEHOLDER_SOURCES = new Set([
  "https://ui.shadcn.com/placeholder.svg",
])

function isEmptyOrPlaceholder(src: string) {
  const trimmed = src?.trim?.() ?? ""
  if (!trimmed) return true
  if (LEGACY_PLACEHOLDER_SOURCES.has(trimmed)) return true
  return false
}

export type BdpImageGridProps = {
  images: string[]
  videos?: BdpGalleryVideo[]
  alt: string
  /** Shown in the gallery modal header */
  galleryTitle?: string
  state?: "active" | "inactive"
  /** If false, render only placeholders (no remote images). */
  showImages?: boolean
}

/** First four slots for the static grid (padded with empty placeholders). */
function gridSlotsFrom(images: string[]): string[] {
  const real = images.filter((src) => !isEmptyOrPlaceholder(src))
  const base = real.length ? real.slice(0, MIN_TILES) : [""]
  if (base.length >= MIN_TILES) return base.slice(0, MIN_TILES)
  return [...base, ...Array(MIN_TILES - base.length).fill("")]
}

function TileImage({
  src,
  alt,
  sizes,
  priority,
  showImages,
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  showImages: boolean
}) {
  const [loaded, setLoaded] = React.useState(false)

  if (!showImages) return <BdpGreyPlaceholder />
  if (isEmptyOrPlaceholder(src)) return <BdpGreyPlaceholder />

  return (
    <div className="relative h-full w-full">
      <BdpGreyPlaceholder className="absolute inset-0" />
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes={sizes}
        priority={priority}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  )
}

export function BdpImageGrid({
  images,
  videos = [],
  alt,
  galleryTitle,
  state = "active",
  showImages = true,
}: BdpImageGridProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [initialIndex, setInitialIndex] = React.useState(0)
  const [initialTab, setInitialTab] = React.useState<"photos" | "videos">("photos")

  const realImages = React.useMemo(
    () => images.filter((src) => Boolean(src && src.trim())),
    [images]
  )
  const displaySlots = React.useMemo(() => gridSlotsFrom(images), [images])
  const photoCount = realImages.length || displaySlots.filter(Boolean).length

  function openModal(opts: { index?: number; tab?: "photos" | "videos" }) {
    const list =
      realImages.length > 0 ? realImages : displaySlots.filter((s) => Boolean(s && s.trim()))
    const maxIdx = Math.max(0, list.length - 1)
    setInitialIndex(Math.min(opts.index ?? 0, maxIdx))
    setInitialTab(opts.tab ?? "photos")
    setModalOpen(true)
  }

  const [primary, ...rest] = displaySlots
  const thumb1 = rest[0] ?? PLACEHOLDER
  const thumb2 = rest[1] ?? PLACEHOLDER
  const thumb3 = rest[2] ?? PLACEHOLDER

  const modalImages = realImages.length
    ? realImages
    : displaySlots.filter((s) => !isEmptyOrPlaceholder(s))

  return (
    <>
      <section aria-label="Listing gallery" className="w-full">
        {/* Mobile: single hero + Photos CTA */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => openModal({ index: 0, tab: "photos" })}
            className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-muted text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open gallery, ${photoCount} photos`}
          >
            <TileImage
              src={primary}
              alt={alt}
              sizes="100vw"
              priority
              showImages={showImages}
            />
            {state === "inactive" ? (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-midnight px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.55px] text-white">
                Sold
              </span>
            ) : null}
          </button>
        </div>

        {/* Desktop: Figma 1 + 3 grid */}
        <div
          className={cn(
            "relative hidden aspect-[854/437] w-full md:grid",
            "gap-5",
            "grid-cols-[minmax(0,1fr)_200px] grid-rows-3"
          )}
        >
          <button
            type="button"
            onClick={() => openModal({ index: 0, tab: "photos" })}
            className="relative col-start-1 row-span-3 row-start-1 min-h-0 overflow-hidden rounded-lg bg-muted text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open photo 1 in gallery"
          >
            <TileImage
              src={primary}
              alt={alt}
              sizes="(max-width: 1280px) 58vw, 640px"
              priority
              showImages={showImages}
            />
            {state === "inactive" ? (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-midnight px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.55px] text-white">
                Sold
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => openModal({ index: 1, tab: "photos" })}
            className="relative col-start-2 row-start-1 min-h-0 overflow-hidden rounded-lg bg-muted text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open photo 2 in gallery"
          >
            <TileImage
              src={thumb1}
              alt=""
              sizes="200px"
              showImages={showImages}
            />
          </button>

          <button
            type="button"
            onClick={() => openModal({ index: 2, tab: "photos" })}
            className="relative col-start-2 row-start-2 min-h-0 overflow-hidden rounded-lg bg-muted text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open photo 3 in gallery"
          >
            <TileImage
              src={thumb2}
              alt=""
              sizes="200px"
              showImages={showImages}
            />
          </button>

          <div className="relative col-start-2 row-start-3 min-h-0 overflow-hidden rounded-lg bg-muted">
            <button
              type="button"
              onClick={() => openModal({ index: 3, tab: "photos" })}
              className="absolute inset-0 z-0 text-left outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open photo 4 in gallery"
            >
              <TileImage
                src={thumb3}
                alt=""
                sizes="200px"
                showImages={showImages}
              />
            </button>
          </div>
        </div>
      </section>

      <BdpGalleryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        images={modalImages.length ? modalImages : displaySlots}
        videos={videos}
        alt={alt}
        title={galleryTitle}
        initialIndex={initialIndex}
        initialTab={initialTab}
        showImages={showImages}
      />
    </>
  )
}
