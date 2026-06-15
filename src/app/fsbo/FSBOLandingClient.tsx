"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ClipboardList,
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
import { StepOneLP } from "@/components/fsbo/StepOneLP"
import { STORAGE_KEY } from "@/components/fsbo/SignupModal"
import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import type { FsboPreviewMode } from "@/lib/fsbo/figma-preview"
import { cn } from "@/lib/utils"

const HERO_DESCRIPTION =
  "Sell your boat online quickly, easily, and commission-free on Rightboat. Reach serious buyers worldwide and keep 100% of your sale price."

const HERO_INTRO =
  "If you're looking to sell your boat online, Rightboat's For Sale By Owner (FSBO) service gives you the platform to reach thousands of serious buyers worldwide. Whether you're selling a sailing boat, RIB, fishing boat, or day cruiser, Rightboat makes selling your boat privately simple, affordable, and fully in your control."

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Create your boat listing",
    description:
      "Add high-quality photos, detailed boat specifications, and your asking price. Clear visuals and accurate information help you sell your boat online successfully by attracting more serious buyers.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Choose your plan",
    description:
      "Select Basic ($49/mo) or Premium ($99/mo) to go live. Premium gives your listing featured placement and priority buyer matching to help sell your boat faster.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Connect with buyers",
    description:
      "Buyer enquiries come directly to you. Fast communication is one of the best ways to sell your boat online more efficiently.",
    icon: Send,
  },
  {
    step: "04",
    title: "Negotiate directly",
    description:
      "Manage offers and negotiate directly with buyers. Selling your boat privately gives you full flexibility without paying broker commission fees.",
    icon: Users,
  },
  {
    step: "05",
    title: "Complete the sale",
    description:
      "Finalise paperwork and complete payment securely. Rightboat makes selling your boat online simple from listing to completed sale.",
    icon: CircleDollarSign,
  },
] as const

const SELLING_METHODS = [
  { method: "Private Sale", speed: "Medium", control: "High", cost: "Low" },
  { method: "Broker", speed: "Fast", control: "Low", cost: "Commission" },
  {
    method: "Online Marketplace",
    speed: "Fast",
    control: "High",
    cost: "Low",
  },
] as const

const SELL_FAST_TIPS = [
  {
    heading: "Price it correctly",
    body: "Research similar boats currently listed online and set a realistic asking price. Competitive pricing attracts more enquiries and reduces time on market.",
  },
  {
    heading: "Use high-quality photos",
    body: "Clear, high-resolution photos inside and outside the boat help buyers trust your listing and understand the condition before making contact.",
  },
  {
    heading: "Write a detailed listing",
    body: "Include specifications, maintenance history, upgrades, and equipment. Detailed listings answer buyer questions early and improve performance.",
  },
  {
    heading: "Use a high-traffic platform",
    body: "The best way to sell your boat online is to list it on a trusted marketplace with strong buyer traffic and targeted visibility tools.",
  },
] as const

const FAQS = [
  {
    q: "How do I sell my boat fast?",
    a: "To sell your boat fast, use clear photos, write a detailed description, price it competitively, and list it on a high-traffic platform like Rightboat. Selling your boat online with strong visuals and accurate information can significantly improve enquiries. Our guide on preparing your boat for sale shares tips.",
  },
  {
    q: "Can I sell my boat online for free?",
    a: "Rightboat's FSBO package lets you sell your boat online with paid plans starting from $49/mo (Basic) or $99/mo (Premium), connecting you with thousands of serious buyers worldwide.",
  },
  {
    q: "How do I price my boat for sale?",
    a: "Research similar boats currently listed online and compare specifications, condition, and age. Our pricing guide can help you determine a fair market value before selling your boat online.",
  },
  {
    q: "Is selling a boat privately safe?",
    a: "Yes, selling your boat privately can be safe if you use secure payment methods, verify paperwork, and meet buyers carefully. Selling your boat online through trusted marketplaces like Rightboat also helps reduce risk.",
  },
  {
    q: "What is the best way to sell your boat?",
    a: "The best way to sell your boat depends on your priorities. Private sales offer more control and lower costs, while brokers provide support for more complex sales. Many sellers choose online marketplaces like Rightboat because they combine global exposure, speed, and direct buyer communication.",
  },
  {
    q: "How do you sell your boat online?",
    a: "To sell your boat online, create a detailed listing with quality photos, accurate specifications, and a competitive price. Using a trusted marketplace like Rightboat helps connect your listing with serious buyers worldwide.",
  },
  {
    q: "How do you sell your boat privately?",
    a: "Selling your boat privately allows you to control pricing, negotiations, and buyer communication yourself without paying broker commissions. Rightboat's FSBO service makes selling your boat privately simple and affordable.",
  },
  {
    q: "Where is the best place to sell your boat?",
    a: "The best place to sell your boat is on a trusted online marketplace with strong buyer traffic and visibility tools. Rightboat helps private sellers reach serious buyers globally while keeping full control over the sale.",
  },
] as const

const HERO_IMAGE = {
  src: "/ian-keefe-nGOK_EqQpY4-unsplash.png",
  alt: "Close-up of sailboat deck and sail on open water",
}

export type FSBOSurface = "web" | "app"

type FSBOLandingClientProps = {
  /** `app`: links and post-signup navigation stay under `/app/sell/*` (no site chrome). */
  surface?: FSBOSurface
  /** Force mobile/desktop layout for Figma Code Connect capture. */
  figmaPreview?: FsboPreviewMode
}

export function FSBOLandingClient({
  surface = "web",
  figmaPreview,
}: FSBOLandingClientProps) {
  const router = useRouter()

  const form = useForm<Step1LPFormInput>({
    resolver: zodResolver(step1LPSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      email: "",
    },
    mode: "onChange",
  })

  const handleStep1Submit = (data: Step1LPFormInput) => {
    const year = data.year ? parseInt(data.year, 10) : 0
    if (Number.isNaN(year) || year < 1900) return
    const step1Data: Step1LPData = {
      brand: data.brand,
      model: data.model,
      year,
      email: data.email,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(step1Data))
    router.push(wizardHref)
  }

  const wizardHref =
    surface === "app" ? "/app/sell/wizard" : "/fsbo/wizard"
  const sellCtaHref = surface === "app" ? "/app/sell/wizard" : "/fsbo"

  const page = (
    <div
      className={cn(
        "flex flex-col lg:gap-14",
        surface === "app" ? "gap-6" : "gap-10"
      )}
    >
      {/* Hero — matches Figma FSBO hero layout */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)] pb-6"
            : "px-4 pt-10 pb-6 sm:px-6 sm:pt-14 sm:pb-8 lg:px-0 lg:pt-12 lg:pb-0"
        )}
        aria-labelledby="fsbo-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {surface === "app" ? (
            <div className="w-full">
              <MobileNativePageHeader
                className="px-0"
                title="Sell your boat"
                description={HERO_DESCRIPTION}
                titleClassName="text-[40px] font-bold leading-[1.05] tracking-[-0.8px] text-foreground"
              />
            </div>
          ) : (
            <div className="flex max-w-[760px] flex-col items-center pt-2 text-center lg:items-start lg:pt-16 lg:text-left">
              <div className="mb-5 inline-flex items-center justify-center rounded-full bg-[#33c1fd] px-[14px] py-[6px] lg:mb-8">
                <span className="text-xs font-normal leading-4 text-white">
                  For brokers & dealers
                </span>
              </div>
              <h1
                id="fsbo-hero-heading"
                className="max-w-[760px] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#13022c] sm:text-5xl lg:text-[48px]"
              >
                Sell your boat online{" "}
                <span className="text-[#0257fc]">privately</span>
              </h1>
              <p className="mt-5 max-w-[720px] text-lg leading-[1.45] text-[#2b2140] sm:text-[1.05rem] lg:mt-6 lg:text-[1.05rem]">
                {HERO_DESCRIPTION}
              </p>
              <p className="mt-4 max-w-[700px] text-base leading-relaxed text-[#2b2140] sm:text-sm lg:mt-5">
                {HERO_INTRO}
              </p>
            </div>
          )}
          <div className="relative z-10 mx-auto w-full min-w-0 max-w-[414px] overflow-visible rounded-lg border border-border bg-malibu-300 p-5 shadow-sm sm:p-6 lg:mx-0 lg:p-9">
            <div className="mb-5 text-center text-lg font-bold leading-snug text-[#13022c] sm:mb-6 sm:text-xl">
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
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)]"
            : "px-4 sm:px-6 lg:px-0"
        )}
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto w-full max-w-7xl rounded-2xl bg-[#0B6CFF] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Sell Your Boat Online: How It Works
            </h2>
            <p className="mt-3 text-base leading-7 text-white/90">
              From listing to sale, you stay in control. Follow these simple
              steps to sell your boat privately.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center rounded-2xl bg-white px-6 py-8 text-center shadow-sm"
                >
                  <div className="mb-1 text-xs font-bold tracking-widest text-[#0B6CFF] uppercase">
                    {step.step}
                  </div>
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
          <p className="mt-8 text-center text-sm text-white/80">
            Need help getting started?{" "}
            <a
              href="/blog/how-to-sell-your-boat"
              className="text-white underline hover:text-white/70"
            >
              How to sell your boat
            </a>
            {", "}
            <a
              href="/blog/used-boat-values-a-guide-to-pricing-your-boat"
              className="text-white underline hover:text-white/70"
            >
              pricing your boat
            </a>
            {", and "}
            <a
              href="/blog/preparing-your-boat-for-sale"
              className="text-white underline hover:text-white/70"
            >
              preparing your boat for sale
            </a>
            .
          </p>
        </div>
      </section>

      {/* Testimonials (reuse homepage module) */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)]"
            : "px-4 sm:px-6 lg:px-0"
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          <Testimonials align="center" />
        </div>
      </section>

      {/* Why List With Us – matches Propel layout */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)] py-10"
            : "px-4 py-12 sm:px-6 lg:px-0 lg:py-16"
        )}
      >
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
              <Link href={sellCtaHref}>Sell your boat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── SEO Sections (below fold) ── */}
      <div
        className={cn(
          "space-y-16",
          surface === "app"
            ? "px-[var(--mobile-margin)]"
            : "px-4 sm:px-6 lg:px-0"
        )}
      >
        <div className="mx-auto w-full max-w-7xl space-y-16">
          {/* Section: Best Way to Sell Your Boat */}
          <section aria-labelledby="best-way-heading">
            <h2
              id="best-way-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              What Is the Best Way to Sell Your Boat?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              There are several ways to sell your boat, depending on your
              experience level, budget, and how involved you want to be in the
              process.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Private sale",
                  body: "Selling your boat privately gives you full control over pricing, negotiations, and buyer communication. It's one of the most affordable ways to sell your boat with no broker commission fees.",
                },
                {
                  title: "Using a broker",
                  body: "A broker handles the sale process for you, including marketing, enquiries, paperwork, and negotiations. This can save time, but broker commissions can reduce your final sale amount.",
                },
                {
                  title: "Online marketplaces",
                  body: "Listing your boat on a high-traffic online marketplace helps you reach a much larger audience of serious buyers while staying in control of the sale.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="space-y-2 rounded-lg bg-muted p-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">
                Why Rightboat?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Rightboat gives private sellers the best balance between
                visibility, control, affordability, and speed. Sell your boat
                online, connect directly with buyers worldwide, and keep 100% of
                your final sale price.
              </p>
              <div className="mt-4">
                <Button size="lg" asChild>
                  <Link href={sellCtaHref}>
                    Ready to sell your boat online? Start here →
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Section: How to Sell Your Boat Fast */}
          <section aria-labelledby="sell-fast-heading">
            <h2
              id="sell-fast-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              How to Sell Your Boat Fast
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              If you want to sell your boat fast, the key is creating a listing
              that stands out and reaches the right buyers quickly.
            </p>
            <div className="mt-6 space-y-4">
              {SELL_FAST_TIPS.map(({ heading, body }) => (
                <div key={heading} className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {heading}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              List your boat on Rightboat and reach buyers worldwide.{" "}
              <Link
                href={sellCtaHref}
                className="font-medium text-primary underline hover:opacity-80"
              >
                Start your listing →
              </Link>
            </p>
          </section>

          {/* Section: Ways to Sell Your Boat (comparison table) */}
          <section aria-labelledby="ways-heading">
            <h2
              id="ways-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Ways to Sell Your Boat
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              There are several ways to sell your boat, depending on your
              priorities:
            </p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Speed
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Control
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SELLING_METHODS.map((row, i) => (
                    <tr
                      key={row.method}
                      className={cn(
                        "border-b border-border last:border-0",
                        i % 2 === 1 && "bg-muted/40"
                      )}
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {row.method}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.speed}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.control}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)]"
            : "px-4 sm:px-6 lg:px-0"
        )}
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            For Sale By Owner — Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-foreground transition-colors duration-[var(--transition-duration-fast)] hover:bg-muted">
                  {q}
                  <svg
                    className="shrink-0 transition-transform duration-[var(--transition-duration-fast)] group-open:rotate-180"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 6L8 11L13 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="px-5 pt-1 pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  if (figmaPreview === "mobile") {
    return (
      <div className="mx-auto w-full max-w-[402px] min-h-[874px] border-x border-border bg-background">
        {page}
      </div>
    )
  }

  if (figmaPreview === "desktop") {
    return <div className="w-full min-h-[900px] bg-background">{page}</div>
  }

  return page
}
