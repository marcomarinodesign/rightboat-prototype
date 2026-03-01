"use client"

import { cn } from "@/lib/utils"

const HERO_SUBTEXT =
  "Sell your used boat privately, easily, and commission-free on Rightboat. Find out how you can advertise your boat to 2.5 million buyers on Rightboat."

export interface FSBOHeroProps {
  /** Wizard form (e.g. BoatForm) to render inside the card */
  children: React.ReactNode
  className?: string
}

export function FSBOHero({ children, className }: FSBOHeroProps) {
  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
        className
      )}
      aria-labelledby="fsbo-hero-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Mobile: form first (order-1), then text (order-2) */}
          {/* Desktop: text left, form right — use order only on mobile */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <h1
              id="fsbo-hero-heading"
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-foreground"
            >
              Sell your boat{" "}
              <span className="text-primary">privately</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-xl">
              {HERO_SUBTEXT}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-xl bg-white p-6 shadow-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
