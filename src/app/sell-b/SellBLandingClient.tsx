"use client"

import Link from "next/link"
import Image from "next/image"
import { ClipboardList, ImagePlus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const HERO_DESCRIPTION =
  "Sell your used boat privately, easily, and commission-free on Rightboat. Find out how you can advertise your boat to 2.5 million buyers on Rightboat."

const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Enter your boat details",
    description: "Fill in key info about your vessel in under 2 minutes.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "Create your listing",
    description: "Add photos, set your price, and describe your boat.",
    icon: ImagePlus,
  },
  {
    number: 3,
    title: "Publish and reach buyers",
    description: "Go live and connect with thousands of interested buyers.",
    icon: Send,
  },
] as const

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

const HERO_IMAGE = {
  src: "/sell-b-hero.png",
  alt: "White motorboat in clear turquoise water, aerial view",
}

const HOW_IT_WORKS_IMAGE = {
  src: "/how-it-works-boat.png",
  alt: "Modern motorboat on turquoise water",
}

const TESTIMONIAL_IMAGE = {
  src: "/see-how-easy-it-is.png",
  alt: "Two people on a sailboat",
}

export function SellBLandingClient() {
  return (
    <div className="flex flex-col gap-10 lg:gap-[40px]">
      {/* Hero — Figma: section gap 40px, px 72 py 50, badge + h1 + description + CTA + image */}
      <section
        className="flex flex-col items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:gap-10 lg:px-0 lg:py-[50px]"
        aria-labelledby="sell-b-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-transparent bg-primary/10 px-3.5 py-1.5 lg:mb-6">
            <span className="text-[11.4px] font-normal leading-4 text-muted-foreground sm:text-xs">
              For brokers & dealers
            </span>
          </div>
          <h1
            id="sell-b-hero-heading"
            className="text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl sm:tracking-[-1.2px] lg:text-[48px] lg:leading-[60px]"
          >
            Sell your boat{" "}
            <span className="text-primary">privately</span>
          </h1>
          <p className="mt-4 max-w-[672px] text-base leading-7 text-muted-foreground sm:text-[18.9px] sm:leading-[28px]">
            {HERO_DESCRIPTION}
          </p>
          <Button
            size="lg"
            className="mt-6 h-10 rounded-xl px-4 font-medium"
            asChild
          >
            <Link href="/sell-b/wizard">Sell your boat</Link>
          </Button>
        </div>
        <div className="relative h-[240px] w-full max-w-[1296px] overflow-hidden rounded-2xl sm:h-[300px] lg:h-[364px]">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1296px"
            priority
          />
        </div>
      </section>

      {/* How It Works — Figma: px 72 py 40, grid gap 20, h2 36px -0.9px, steps bg neutral/100 p-5, icon 40px rounded-[20px] */}
      <section
        className="px-4 py-10 sm:px-6 lg:px-0 lg:py-0"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 lg:items-center lg:gap-5">
          <div className="flex flex-1 flex-col gap-4">
            <div className="space-y-3">
              <h2
                id="how-it-works-heading"
                className="text-3xl font-bold leading-[1.25] tracking-[-0.9px] text-foreground lg:text-[36px] lg:leading-[45px]"
              >
                How It Works
              </h2>
              <p className="text-[17.2px] leading-7 text-muted-foreground">
                From listing to sale, you stay in control. Follow these simple
                steps to sell your boat privately.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {HOW_IT_WORKS_STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="flex gap-4 items-center rounded-lg bg-muted p-5"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-primary text-primary-foreground"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <h3 className="text-lg font-bold leading-7 text-foreground">
                        Step {step.number}: {step.title}
                      </h3>
                      <p className="text-[15.1px] leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[10px] border border-border bg-muted/30 aspect-[4/3] w-full lg:aspect-auto lg:h-[583px]">
            <Image
              src={HOW_IT_WORKS_IMAGE.src}
              alt={HOW_IT_WORKS_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Testimonials — Figma node 19:150: blue bg, image LEFT, title + cards RIGHT, justify-between */}
      <section
        className={cn(
          "w-full rounded-[10px] px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-center lg:gap-5 lg:px-10 lg:py-[60px]",
          "bg-primary"
        )}
        aria-labelledby="testimonial-section-heading"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-5">
          {/* Image left — Figma: 328h × 492w, rounded-[8px] */}
          <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-[8px] sm:h-[328px] lg:h-[328px] lg:w-[492px]">
            <Image
              src={TESTIMONIAL_IMAGE.src}
              alt={TESTIMONIAL_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 492px"
            />
          </div>
          {/* Right: title block top, testimonial cards bottom — Figma flex justify-between */}
          <div className="flex flex-1 flex-col justify-between gap-6 lg:min-h-[328px] lg:gap-0">
            <div className="flex flex-col gap-2">
              <h2
                id="testimonial-section-heading"
                className="text-3xl font-bold leading-tight tracking-[-0.9px] text-primary-foreground lg:text-[36px] lg:leading-[45px]"
              >
                See How Easy It Is
              </h2>
              <p className="max-w-[356px] text-[17px] leading-7 text-primary-foreground">
                Your listing goes from draft to live in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-6 lg:gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col gap-6 rounded-[10px] border border-border bg-muted p-[17px] shadow-sm"
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
                  <blockquote className="text-[17.3px] leading-[29.25px] text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="text-[15.5px] font-bold leading-6 text-foreground">
                    {t.name} — {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why List With Us — Figma: centered, h2 36px, subtitle 17.3px, 4 cols gap 32 */}
      <section
        className="flex flex-col items-center gap-12 px-4 py-12 sm:px-6 lg:px-[72px] lg:py-16"
        aria-labelledby="why-list-heading"
      >
        <div className="mx-auto w-full max-w-[672px] space-y-3 text-center">
          <h2
            id="why-list-heading"
            className="text-3xl font-bold leading-[45px] tracking-[-0.9px] text-foreground lg:text-[36px]"
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
            <div
              key={i}
              className="flex flex-col items-center gap-2 text-center"
            >
              <h4 className="text-lg font-bold leading-10 text-primary lg:text-[23px] lg:leading-[30px]">
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
        <Button size="lg" className="h-10 rounded-xl px-4 font-medium" asChild>
          <Link href="/sell-b/wizard">Sell your boat</Link>
        </Button>
      </section>
    </div>
  )
}
