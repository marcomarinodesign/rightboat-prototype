"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  ClipboardList,
  Send,
  TrendingUp,
  CircleDollarSign,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Testimonials } from "@/components/home/testimonials"
import { FadeIn } from "@/components/motion/fade-in"
import { easeOutExpo, staggerContainer, staggerItem } from "@/lib/motion-variants"
import { step1LPSchema, type Step1LPData, type Step1LPFormInput } from "@/features/sell-boat/types-v3"
import { StepOneLP } from "@/components/fsbo/StepOneLP"
import { STORAGE_KEY } from "@/components/fsbo/SignupModal"
import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import type { FsboPreviewMode } from "@/lib/fsbo/figma-preview"
import { cn } from "@/lib/utils"

const HERO_DESCRIPTION =
  "Sell your boat online quickly, easily, and commission-free on Rightboat.\nReach serious buyers worldwide and keep 100% of your sale price."

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

// ── Hero background toggle ─────────────────────────────────────────────────
// Change to "image" to revert to the static photo.
const HERO_BG: "video" | "image" = "video"

const HERO_IMAGE = {
  src: "/fsbo-hero-bg.jpg",
  alt: "Sailboat on open water",
}

const HERO_VIDEO = {
  src1080: "https://videos.pexels.com/video-files/33157253/14131176_2560_1440_60fps.mp4",
  src720:  "https://videos.pexels.com/video-files/33157253/14131176_2560_1440_60fps.mp4",
}
// ──────────────────────────────────────────────────────────────────────────

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
      {/* Hero — full-bleed background image (desktop), stacked image banner (mobile) */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)] pb-6"
            : "relative overflow-hidden"
        )}
        aria-labelledby="fsbo-hero-heading"
      >
        {/* Background media — web only. Toggle HERO_BG above to switch. */}
        {surface !== "app" && (
          <div className="absolute inset-0">
            {HERO_BG === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
                className="h-full w-full object-cover object-center"
              >
                <source src={HERO_VIDEO.src1080} type="video/mp4" />
                <source src={HERO_VIDEO.src720} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={HERO_IMAGE.src}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
                aria-hidden="true"
              />
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between",
            surface === "app"
              ? ""
              : "px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-[183px] lg:pb-20"
          )}
        >
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
            <motion.div
              className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left lg:py-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            >
              <div className="inline-flex items-center justify-center rounded-full bg-malibu-400 px-3 py-1.5">
                <span className="text-xs font-normal leading-4 text-white">
                  Commission-free
                </span>
              </div>
              <h1
                id="fsbo-hero-heading"
                className="font-bold tracking-[-0.48px] text-white text-[48px] leading-[48px] lg:text-[72px] lg:leading-none"
              >
                Sell your boat<br />online{" "}
                <span className="text-primary">privately</span>
              </h1>
              <p className="whitespace-pre-line text-base font-normal leading-6 text-white">
                {HERO_DESCRIPTION}
              </p>
            </motion.div>
          )}

          {/* Form card */}
          <motion.div
            className="w-full max-w-[414px] rounded-xl bg-tag-bg border border-neutral-100 shadow-sm p-5 sm:p-6 lg:shrink-0 lg:p-[37px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 }}
          >
            <div className="mb-6 text-center text-[20px] font-bold leading-[27.5px] text-midnight">
              Takes less than 2 minutes.
            </div>
            <StepOneLP
              form={form}
              onSubmit={handleStep1Submit}
            />
          </motion.div>
        </div>

      </section>

      {/* How It Works — bento grid */}
      <section
        className={cn(
          surface === "app"
            ? "px-[var(--mobile-margin)]"
            : "px-4 sm:px-6 lg:px-0"
        )}
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto w-full max-w-7xl">
          <FadeIn className="mx-auto max-w-[720px] text-center">
            <h2
              id="how-it-works-heading"
              className="heading-lg text-foreground"
            >
              Sell Your Boat Online: How It Works
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              From listing to sale, you stay in control. Follow these simple
              steps to sell your boat privately.
            </p>
          </FadeIn>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Col 1 — Step 01: image background */}
            <motion.div variants={staggerItem} className="relative min-h-[400px] overflow-hidden rounded-[20px] transition-all duration-[var(--transition-duration-normal)] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
              <Image
                src="/how-it-works-boat.png"
                alt="Boat listing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">01</p>
                <p className="mt-1 text-base font-bold text-foreground">Create your boat listing</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Add high-quality photos, detailed boat specifications, and your asking price. Clear visuals and accurate information help you sell your boat online successfully by attracting more serious buyers.
                </p>
              </div>
            </motion.div>

            {/* Col 2 — Step 02 */}
            <motion.div variants={staggerItem} className="flex min-h-[400px] flex-col justify-between rounded-[20px] bg-neutral-100 p-6 transition-all duration-[var(--transition-duration-normal)] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">02</p>
                <p className="mt-2 text-2xl font-bold text-foreground">Choose your plan</p>
              </div>
              <div className="flex gap-3">
                {[Send, ClipboardList, Users, CircleDollarSign, TrendingUp].map((Icon, i) => (
                  <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Icon className="h-4 w-4 text-white" aria-hidden />
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Select Basic ($49/mo) or Premium ($99/mo) to go live. Premium gives your listing featured placement and priority buyer matching to help sell your boat faster.
              </p>
            </motion.div>

            {/* Col 3 — Steps 03 + 04 stacked */}
            <motion.div variants={staggerItem} className="flex flex-col gap-4">
              {/* Step 03 */}
              <div className="flex min-h-[230px] flex-col justify-between rounded-[20px] bg-blue-300 p-6 transition-all duration-[var(--transition-duration-normal)] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">03</p>
                <div>
                  <p className="text-2xl font-bold text-white">Connect with buyers</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">
                    Buyer enquiries come directly to you. Fast communication is one of the best ways to sell your boat online more efficiently.
                  </p>
                </div>
              </div>
              {/* Step 04 */}
              <div className="flex min-h-[154px] flex-col justify-between rounded-[20px] bg-midnight p-6 transition-all duration-[var(--transition-duration-normal)] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">04</p>
                <p className="text-sm leading-relaxed text-white">
                  <span className="font-bold">Negotiate directly:</span>{" "}
                  Manage offers and negotiate directly with buyers. Selling your boat privately gives you full flexibility without paying broker commission fees.
                </p>
              </div>
            </motion.div>
          </motion.div>
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
            <FadeIn>
              <h2
                id="best-way-heading"
                className="heading-sm text-foreground sm:heading-md"
              >
                What Is the Best Way to Sell Your Boat?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                There are several ways to sell your boat, depending on your
                experience level, budget, and how involved you want to be in the
                process.
              </p>
            </FadeIn>
            <motion.div
              className="mt-6 grid gap-4 sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
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
                <motion.div key={title} variants={staggerItem} className="rounded-2xl bg-primary p-6 transition-opacity duration-[var(--transition-duration-normal)] hover:opacity-90 motion-reduce:transition-none">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">{body}</p>
                </motion.div>
              ))}
            </motion.div>
            {surface !== "app" && (
              <div className="relative mt-6 h-[300px] overflow-hidden rounded-2xl">
                <Image
                  src="/aerial-boat.jpg"
                  alt="Aerial view of sailboat on turquoise water"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            )}
          </section>

          {/* Section: How to Sell Your Boat Fast */}
          <section aria-labelledby="sell-fast-heading">
            <FadeIn className="text-center">
              <h2
                id="sell-fast-heading"
                className="heading-sm text-foreground sm:heading-md"
              >
                How to Sell Your Boat Fast
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                If you want to sell your boat fast, the key is creating a listing
                that stands out and reaches the right buyers quickly.
              </p>
            </FadeIn>
            <motion.div
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {SELL_FAST_TIPS.map(({ heading, body }) => (
                <motion.div key={heading} variants={staggerItem} className="flex gap-4">
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
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-6 text-sm text-muted-foreground">
              List your boat on Rightboat and reach buyers worldwide.{" "}
              <Link
                href={sellCtaHref}
                className="font-medium text-primary underline transition-opacity duration-[var(--transition-duration-fast)] hover:opacity-80"
              >
                Start your listing →
              </Link>
            </p>
          </section>

          {/* Section: Ways to Sell Your Boat (comparison table) */}
          <section aria-labelledby="ways-heading">
            <FadeIn className="text-center">
              <h2
                id="ways-heading"
                className="heading-sm text-foreground sm:heading-md"
              >
                Ways to Sell Your Boat
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                There are several ways to sell your boat, depending on your
                priorities:
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
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
                  {SELLING_METHODS.map((row) => {
                    const isHighlighted = row.method === "Online Marketplace"
                    return (
                      <tr
                        key={row.method}
                        className="border-b border-border last:border-0"
                      >
                        <td className={cn("px-4 py-3 font-medium", isHighlighted ? "text-primary font-medium" : "text-foreground")}>
                          {row.method}
                        </td>
                        <td className={cn("px-4 py-3", isHighlighted ? "text-primary font-medium" : "text-muted-foreground")}>
                          {row.speed}
                        </td>
                        <td className={cn("px-4 py-3", isHighlighted ? "text-primary font-medium" : "text-muted-foreground")}>
                          {row.control}
                        </td>
                        <td className={cn("px-4 py-3", isHighlighted ? "text-primary font-medium" : "text-muted-foreground")}>
                          {row.cost}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            </FadeIn>
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
          <FadeIn>
            <h2
              id="faq-heading"
              className="heading-sm text-foreground sm:heading-md"
            >
              For Sale By Owner FAQs
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
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
          </FadeIn>
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
