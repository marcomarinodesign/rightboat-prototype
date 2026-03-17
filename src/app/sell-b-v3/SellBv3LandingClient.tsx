"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ClipboardList,
  ImagePlus,
  Send,
  TrendingUp,
  CircleDollarSign,
  Zap,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Testimonials } from "@/components/home/testimonials"
import { FeatureSection9 } from "@/components/blocks/feature-section-9"
import { IconContainer } from "@/components/ui/icon-container"
import { step1LPSchema, type Step1LPData, type Step1LPFormInput } from "@/features/sell-boat/types-v3"
import { StepOneLP } from "@/components/sell-b-v3/StepOneLP"
import { SignupModal } from "@/components/sell-b-v3/SignupModal"

const HERO_DESCRIPTION =
  "Sell your used boat privately, easily, and commission-free on Rightboat. Find out how you can advertise your boat to 2.5 million buyers on Rightboat."

const HOW_IT_WORKS_STEPS = [
  {
    title: "Step 1: Enter your boat details",
    description: "Fill in key info about your vessel in under 2 minutes.",
    icon: ClipboardList,
  },
  {
    title: "Step 2: Create your listing",
    description: "Add photos, set your price, and describe your boat.",
    icon: ImagePlus,
  },
  {
    title: "Step 3: Publish and reach buyers",
    description: "Go live and connect with thousands of interested buyers.",
    icon: Send,
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
  src: "/ian-keefe-nGOK_EqQpY4-unsplash.png",
  alt: "Close-up of sailboat deck and sail on open water",
}


export function SellBv3LandingClient() {
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [step1DataForModal, setStep1DataForModal] = useState<Step1LPData | null>(
    null
  )

  const form = useForm<Step1LPFormInput>({
    resolver: zodResolver(step1LPSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
    },
    mode: "onChange",
  })

  const handleStep1Submit = (data: Step1LPFormInput) => {
    const year = data.year ? parseInt(data.year, 10) : 0
    if (Number.isNaN(year) || year < 1900) return
    setStep1DataForModal({
      ...data,
      year,
    })
    setSignupModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {/* Hero — matches Figma FSBO hero layout */}
      <section
        className="px-4 pt-10 pb-6 sm:px-6 sm:pt-14 sm:pb-8 lg:px-0 lg:pt-10 lg:pb-0"
        aria-labelledby="sell-b-v3-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#33c1fd] px-[14px] py-[6px] lg:mb-6">
              <span className="text-xs font-normal leading-4 text-white">
                For brokers & dealers
              </span>
            </div>
            <h1
              id="sell-b-v3-hero-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl sm:tracking-tight lg:text-5xl lg:leading-tight"
            >
              Sell your boat{" "}
              <span className="text-primary">privately</span>
            </h1>
            <p className="mt-4 max-w-[672px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-7">
              {HERO_DESCRIPTION}
            </p>
          </div>
          <div className="relative z-10 w-full max-w-md rounded-[12px] border-4 border-[#13022c] bg-background p-[36px] shadow-[10px_10px_0px_0px_#0257fc,0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-[4px]">
            <div className="mb-0 text-center text-[18px] font-bold leading-[26px] text-[#13022c]">
              Takes less than 2 minutes.
            </div>
            <StepOneLP
              form={form}
              onSubmit={handleStep1Submit}
            />
          </div>
        </div>
      </section>

      {/* Hero image separator — full-bleed visual break */}
      <section aria-hidden="true" className="w-full">
        <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px] lg:h-[560px]">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-4 sm:px-6 lg:px-0"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto w-full max-w-7xl rounded-2xl bg-[#0B6CFF] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              How It Works
            </h2>
            <p className="mt-3 text-base leading-7 text-white/90">
              From listing to sale, you stay in control. Follow these simple
              steps to sell your boat privately.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B6CFF] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <SignupModal
        open={signupModalOpen}
        onOpenChange={setSignupModalOpen}
        step1Data={step1DataForModal ?? { brand: "", model: "", year: 0 }}
      />

      {/* Testimonials (reuse homepage module) */}
      <section className="px-4 sm:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-7xl">
          <Testimonials align="center" />
        </div>
      </section>

      {/* Why List With Us – matches Propel layout */}
      <section className="px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <FeatureSection9
            title="Why List With Us"
            description="Get more visibility and longer listing life with an optional Boost package."
            features={[
              {
                title: "Thousands of buyers",
                description:
                  "Showcase your boat with extra media so buyers get a full picture.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <TrendingUp />
                  </IconContainer>
                ),
              },
              {
                title: "No broker fees",
                description:
                  "Sell without paying broker commission. You set the price and keep 100% of the sale.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <CircleDollarSign />
                  </IconContainer>
                ),
              },
              {
                title: "Fast and simple",
                description:
                  "Create your listing in minutes and keep it live until you sell.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <Zap />
                  </IconContainer>
                ),
              },
              {
                title: "Full control",
                description:
                  "Receive and manage buyer enquiries directly in your inbox.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <Users />
                  </IconContainer>
                ),
              },
            ]}
            headingId="why-list-heading"
          />
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link href="/sell-b-v3">Sell your boat</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
