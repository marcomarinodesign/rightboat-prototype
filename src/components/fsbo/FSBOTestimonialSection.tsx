"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    quote:
      "Finally a platform that lets me sell directly without a broker taking a cut.",
    name: "James P.",
    role: "Yacht owner",
    rating: 5,
  },
  {
    quote:
      "No hidden fees, no hassle. I listed my motorboat and had offers within days.",
    name: "Sarah L.",
    role: "Motorboat owner",
    rating: 5,
  },
] as const

const SECTION_IMAGE = {
  src: "/see-how-easy-it-is.png",
  alt: "Two people on a sailboat looking at the horizon on a sunny day",
}

export function FSBOTestimonialSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "w-full bg-primary rounded-xl px-4 py-12 sm:px-6 lg:px-10 lg:py-[60px]",
        className
      )}
      aria-labelledby="testimonial-section-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-6">
          {/* Left: heading, subtext, then two cards in a row; bottom-aligned with photo */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="space-y-2">
              <h2
                id="testimonial-section-heading"
                className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl"
              >
                See How Easy It Is
              </h2>
              <p className="text-base leading-7 text-primary-foreground/95 sm:text-lg">
                Your listing goes from draft to live in minutes.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col gap-6 rounded-lg border border-border bg-muted p-4 shadow-sm"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-5 w-5 fill-primary text-primary"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="text-base leading-relaxed text-foreground sm:text-[17px]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="text-sm font-bold leading-6 text-foreground sm:text-base">
                    {t.name} — {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image (Figma: 328h × 492w, rounded) */}
          <div className="relative h-[328px] w-full shrink-0 overflow-hidden rounded-lg sm:w-[492px]">
            <Image
              src={SECTION_IMAGE.src}
              alt={SECTION_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 492px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
