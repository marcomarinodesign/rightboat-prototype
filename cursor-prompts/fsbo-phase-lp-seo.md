# FSBO Landing Page — SEO Updates (Druce Digital Specs)

## Context

Source: `FSBO - Sell Your Boat Page SEO Strategy & Funnel Review.pdf` by Druce Digital.

Goal: Expand organic keyword coverage for `sell your boat online` cluster (590–210 monthly searches) while keeping the form and conversion elements **completely unchanged above the fold**.

**Rule from Druce Digital:** Do NOT move the form, reduce CTA visibility, or push SEO content above the fold. All new SEO sections go **below the fold**.

Two files to update:
- `src/app/fsbo/page.tsx` — metadata only
- `src/app/fsbo/FSBOLandingClient.tsx` — hero copy tweaks + How It Works rewrite + 3 new sections + FAQ section

---

## Task 1 — Update metadata in `page.tsx`

Replace the current `metadata` export:

```ts
// src/app/fsbo/page.tsx
export const metadata: Metadata = {
  title: "Sell Your Boat Online | List Your Boat for Sale | Rightboat",
  description:
    "Sell your boat online with ease. List your boat, connect with serious buyers, and complete your sale quickly with Rightboat.",
}
```

**Why:** Current title has "Sell My Boat" (low volume) and over-focuses on "Free 2 Week" which no longer matches pricing. New title targets `sell your boat`, `sell your boat online`, `list your boat for sale`.

---

## Task 2 — Update hero copy in `FSBOLandingClient.tsx`

### 2a — Update H1

```tsx
// Current:
<h1 ...>
  Sell your boat{" "}
  <span className="text-[#0257fc]">privately</span>
</h1>

// Replace with:
<h1 ...>
  Sell your boat online{" "}
  <span className="text-[#0257fc]">privately</span>
</h1>
```

### 2b — Update `HERO_DESCRIPTION` constant

```ts
// Current:
const HERO_DESCRIPTION =
  "Sell your used boat privately, easily, and commission-free on Rightboat. Find out how you can advertise your boat to 2.5 million buyers on Rightboat."

// Replace with:
const HERO_DESCRIPTION =
  "Sell your boat online quickly, easily, and commission-free on Rightboat. Reach serious buyers worldwide and keep 100% of your sale price."
```

### 2c — Add intro paragraph constant (new)

Add this constant near the top of the file alongside the other constants:

```ts
const HERO_INTRO =
  "If you're looking to sell your boat online, Rightboat's For Sale By Owner (FSBO) service gives you the platform to reach thousands of serious buyers worldwide. Whether you're selling a sailing boat, RIB, fishing boat, or day cruiser, Rightboat makes selling your boat privately simple, affordable, and fully in your control."
```

Then in the JSX, add the intro paragraph below the `<p>` that renders `HERO_DESCRIPTION`, inside the `lg:items-start` div (web surface only):

```tsx
<p className="mt-4 max-w-[700px] text-base leading-relaxed text-[#2b2140] sm:text-sm lg:mt-5">
  {HERO_INTRO}
</p>
```

---

## Task 3 — Update "How It Works" section

### 3a — Update `HOW_IT_WORKS_STEPS` constant

Replace the existing 3-step array with 5 keyword-enriched steps:

```ts
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
```

### 3b — Update How It Works section JSX

Update the H2 and the grid to render the `step` number and the expanded layout:

```tsx
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
        From listing to sale, you stay in control. Follow these simple steps to sell your boat privately.
      </p>
    </div>
    {/* 5-step grid: 1 col mobile, 2 col sm, 3 col lg (with last 2 centred) */}
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
    {/* Internal links line */}
    <p className="mt-8 text-center text-sm text-white/80">
      Need help getting started?{" "}
      <a href="/blog/how-to-sell-your-boat" className="underline text-white hover:text-white/70">
        How to sell your boat
      </a>
      {", "}
      <a href="/blog/used-boat-values-a-guide-to-pricing-your-boat" className="underline text-white hover:text-white/70">
        pricing your boat
      </a>
      {", and "}
      <a href="/blog/preparing-your-boat-for-sale" className="underline text-white hover:text-white/70">
        preparing your boat for sale
      </a>
      .
    </p>
  </div>
</section>
```

---

## Task 4 — Add 3 new SEO sections

Add these **after** the "Why List With Us" section and **before** the closing `</div>` of the component.

Add the following constants near the top of the file:

```ts
const SELLING_METHODS = [
  { method: "Private Sale",         speed: "Medium", control: "High", cost: "Low"        },
  { method: "Broker",               speed: "Fast",   control: "Low",  cost: "Commission" },
  { method: "Online Marketplace",   speed: "Fast",   control: "High", cost: "Low"        },
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
```

Then add this JSX block (3 sections in one):

```tsx
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
        There are several ways to sell your boat, depending on your experience level, budget, and how involved you want to be in the process.
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
          <div key={title} className="rounded-lg bg-muted p-5 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-semibold text-foreground">Why Rightboat?</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Rightboat gives private sellers the best balance between visibility, control, affordability, and speed. Sell your boat online, connect directly with buyers worldwide, and keep 100% of your final sale price.
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
        If you want to sell your boat fast, the key is creating a listing that stands out and reaches the right buyers quickly.
      </p>
      <div className="mt-6 space-y-4">
        {SELL_FAST_TIPS.map(({ heading, body }) => (
          <div key={heading} className="flex gap-4">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
              <svg width="8" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{heading}</p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        List your boat on Rightboat and reach buyers worldwide.{" "}
        <Link href={sellCtaHref} className="font-medium text-primary underline hover:opacity-80">
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
        There are several ways to sell your boat, depending on your priorities:
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Method</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Speed</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Control</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Cost</th>
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
                <td className="px-4 py-3 font-medium text-foreground">{row.method}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.speed}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.control}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

  </div>
</div>
```

---

## Task 5 — Add FAQ section

Add an FAQ section **after** the SEO sections block and **before** the closing `</div>` of the component.

Add this constant near the top of the file:

```ts
const FAQS = [
  // Updated existing FAQs
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
  // New FAQs
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
```

Then add the FAQ section JSX:

```tsx
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
    <div className="mt-6 divide-y divide-border rounded-lg border border-border overflow-hidden">
      {FAQS.map(({ q, a }) => (
        <details key={q} className="group bg-card">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-foreground hover:bg-muted transition-colors duration-[var(--transition-duration-fast)] list-none">
            {q}
            {/* Chevron — rotates when open */}
            <svg
              className="shrink-0 transition-transform duration-[var(--transition-duration-fast)] group-open:rotate-180"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="px-5 pb-4 pt-1">
            <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
```

---

## Task 6 — Add FAQ JSON-LD schema to `page.tsx`

Helps Google show FAQs in rich results. Add to `page.tsx`:

```tsx
// src/app/fsbo/page.tsx
import type { Metadata } from "next"
import { FSBOLandingClient } from "./FSBOLandingClient"

export const metadata: Metadata = {
  title: "Sell Your Boat Online | List Your Boat for Sale | Rightboat",
  description:
    "Sell your boat online with ease. List your boat, connect with serious buyers, and complete your sale quickly with Rightboat.",
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I sell my boat fast?",              "acceptedAnswer": { "@type": "Answer", "text": "To sell your boat fast, use clear photos, write a detailed description, price it competitively, and list it on a high-traffic platform like Rightboat." } },
    { "@type": "Question", "name": "Can I sell my boat online for free?",       "acceptedAnswer": { "@type": "Answer", "text": "Rightboat's FSBO package offers paid plans from $49/mo (Basic) or $99/mo (Premium) to connect you with thousands of serious buyers worldwide." } },
    { "@type": "Question", "name": "What is the best way to sell your boat?",   "acceptedAnswer": { "@type": "Answer", "text": "Many sellers choose online marketplaces like Rightboat because they combine global exposure, speed, and direct buyer communication." } },
    { "@type": "Question", "name": "Where is the best place to sell your boat?","acceptedAnswer": { "@type": "Answer", "text": "Rightboat helps private sellers reach serious buyers globally while keeping full control over the sale." } },
  ],
}

export default function FSBOPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FSBOLandingClient />
    </>
  )
}
```

---

## Verification checklist

- [ ] `<title>` in browser tab: "Sell Your Boat Online | List Your Boat for Sale | Rightboat"
- [ ] Meta description updated (check in DevTools → Elements → head)
- [ ] H1 reads: "Sell your boat online privately" (with "privately" in primary blue)
- [ ] Hero tagline: "Sell your boat online quickly, easily, and commission-free on Rightboat."
- [ ] Intro paragraph renders below tagline (web surface only, not app)
- [ ] "How It Works" section has 5 steps (not 3) with step numbers 01–05
- [ ] H2 of How It Works: "Sell Your Boat Online: How It Works"
- [ ] Internal links row renders below steps: "how to sell your boat", "pricing your boat", "preparing your boat for sale"
- [ ] 3 new SEO sections render below "Why List With Us"
- [ ] "What Is the Best Way to Sell Your Boat?" section has 3 method cards + Rightboat CTA
- [ ] "How to Sell Your Boat Fast" has 4 tips with check bullets
- [ ] "Ways to Sell Your Boat" shows a responsive table (3 rows × 4 cols)
- [ ] FAQ section "For Sale By Owner — Frequently Asked Questions" has 8 accordion items
- [ ] Clicking a FAQ accordion opens/closes it smoothly (CSS group-open rotation)
- [ ] JSON-LD script tag present in page source (`<script type="application/ld+json">`)
- [ ] Form, primary CTA, and hero layout unchanged
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT changed

- Hero form (StepOneLP) — unchanged
- Hero layout and visual design — unchanged
- Testimonials section — unchanged
- Why List With Us feature grid — unchanged
- App surface (`surface="app"`) behaviour — new sections hidden on app via `surface !== "app"` if desired, or shown — use judgement
- Broker section — not in prototype scope
- Boost package copy tweak — minor, defer to production
