"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

const EMPTY_PLACEHOLDER_ICON_SRC = "/brands/broker-placeholder.svg"

export function BdpGreyPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-muted",
        className
      )}
      aria-hidden
    >
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-35"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-foreground/30"
        />
        <circle
          cx="50"
          cy="50"
          r="12"
          stroke="currentColor"
          strokeWidth="0.8"
          className="text-foreground/30"
        />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = 50 + Math.cos(angle) * 12
          const y1 = 50 + Math.sin(angle) * 12
          const x2 = 50 + Math.cos(angle) * 46
          const y2 = 50 + Math.sin(angle) * 46
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-foreground/30"
            />
          )
        })}
      </svg>

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background/80 shadow-sm">
        <Image
          src={EMPTY_PLACEHOLDER_ICON_SRC}
          alt=""
          width={22}
          height={22}
          className="opacity-70"
          priority={false}
        />
      </div>
    </div>
  )
}

