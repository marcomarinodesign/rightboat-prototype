"use client"

import { cn } from "@/lib/utils"

const BENEFITS = [
  {
    title: ["Reach thousands", "of buyers"],
    description:
      "Showcase your boat with extra media so buyers get a full picture.",
  },
  {
    title: ["No broker", "fees"],
    description:
      "Your listing appears in prominent positions so more buyers see it.",
  },
  {
    title: ["Fast and simple", "listing process"],
    description:
      "No expiry worries. Keep your listing live until you sell.",
  },
  {
    title: ["Full control", "over your listing"],
    description:
      "Receive and manage buyer enquiries directly to your inbox.",
  },
] as const

export function FSBOMetricsSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-center gap-12 px-4 py-12 sm:px-6 lg:px-[72px] lg:py-16",
        className
      )}
      aria-labelledby="metrics-heading"
    >
      <div className="mx-auto w-full max-w-[672px] space-y-3 text-center">
        <h2
          id="metrics-heading"
          className="text-3xl font-bold leading-[45px] tracking-[-0.9px] text-foreground sm:text-4xl"
        >
          Why List With Us
        </h2>
        <p className="text-[17.3px] leading-7 text-muted-foreground">
          Get more visibility and longer listing life with an optional Boost
          package.
        </p>
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {BENEFITS.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 text-center">
            <h4 className="text-lg font-bold leading-7 text-primary sm:text-xl">
              {item.title[0]}
              <br aria-hidden />
              {item.title[1]}
            </h4>
            <p className="text-[15.1px] leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
