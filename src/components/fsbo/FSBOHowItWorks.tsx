"use client"

import Image from "next/image"
import { ClipboardList, ImagePlus, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    number: 1,
    title: "Enter your boat details",
    description:
      "Fill in key info about your vessel in under 2 minutes.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "Create your listing",
    description:
      "Add photos, set your price, and describe your boat.",
    icon: ImagePlus,
  },
  {
    number: 3,
    title: "Publish and reach buyers",
    description:
      "Go live and connect with thousands of interested buyers.",
    icon: Send,
  },
] as const

const BOAT_IMAGE = {
  src: "/how-it-works-boat.png",
  alt: "Modern motorboat on turquoise water with city skyline in the background",
}

export function FSBOHowItWorks({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-10",
        className
      )}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 lg:items-center">
          {/* Left: heading, intro, step cards (Figma: left-aligned) */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="space-y-4">
              <h2
                id="how-it-works-heading"
                className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                How It Works
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg leading-7">
                From listing to sale, you stay in control. Follow these simple
                steps to sell your boat privately.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="flex gap-4 items-center rounded-lg bg-muted p-5"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <h3 className="text-lg font-bold leading-7 text-foreground">
                        Step {step.number}: {step.title}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: image (Figma: rounded, border, bg tint) */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30 aspect-[4/3] w-full lg:aspect-auto lg:h-[583px]">
            <Image
              src={BOAT_IMAGE.src}
              alt={BOAT_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
