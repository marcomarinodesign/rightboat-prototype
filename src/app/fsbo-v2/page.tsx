import type { Metadata } from "next"
import Link from "next/link"
import {
  Tag,
  CircleDollarSign,
  Image as ImageIcon,
  Users,
  FileEdit,
  Package,
  Megaphone,
  Handshake,
} from "lucide-react"

import { FSBOHeroWithModal } from "@/components/FSBOHeroWithModal"
import { ComparisonSection3 } from "@/components/blocks/comparison-section-3"
import { FeatureSection5 } from "@/components/blocks/feature-section-5"
import { FeatureSection9 } from "@/components/blocks/feature-section-9"
import { TestimonialsCarousel } from "@/components/blocks/testimonials-carousel"
import { CtaSection5 } from "@/components/blocks/cta-section-5"
import { IconContainer } from "@/components/ui/icon-container"

export const metadata: Metadata = {
  title: "Sell Your Boat – Start Your Listing | Rightboat",
  description:
    "List your boat yourself and reach thousands of buyers.",
}

export default function FSBOv2Page() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* 1. Hero – layout hero-section-17: left copy + CTA (opens modal), right boat carousel */}
      <section id="fsbo-hero">
        <FSBOHeroWithModal />
      </section>

      {/* 2. Why sell your boat privately with Rightboat? – full-width light grey band, 60px padding */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-none bg-muted py-[60px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeatureSection9
            title="Why sell your boat privately with Rightboat?"
            description="List your boat yourself and keep control of the sale. No broker fees, no hassles."
            features={[
              {
                title: "Free to list",
                description:
                  "Create your listing and receive real-time updates from thousands of buyers.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <Tag />
                  </IconContainer>
                ),
              },
              {
                title: "No commission fees",
                description:
                  "Sell without paying broker commission. You set the price and keep 100% of the sale.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <CircleDollarSign />
                  </IconContainer>
                ),
              },
              {
                title: "Showcase your boat",
                description:
                  "Your photos and details visible to millions of potential buyers. (up to 2 million).",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <ImageIcon />
                  </IconContainer>
                ),
              },
              {
                title: "Reach more buyers",
                description:
                  "Your listing is visible to millions of potential buyers on Rightboat.",
                icon: (
                  <IconContainer className="size-12 mb-0">
                    <Users />
                  </IconContainer>
                ),
              },
            ]}
            headingId="why-sell-fsbo-heading"
          />
        </div>
      </div>

      {/* 3. How Rightboat private selling works – 4 steps + image right (Figma) */}
      <FeatureSection5
        title="How Rightboat private selling works"
        description="From listing to sale, you stay in control. Follow these simple steps to sell your boat privately."
        features={[
          {
            title: "Create your boat listing",
            description:
              "Add your boat's make, model, price and location in minutes.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <FileEdit />
              </IconContainer>
            ),
          },
          {
            title: "Choose an appropriate package",
            description:
              "Select a free listing or upgrade for more visibility and faster sales.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Package />
              </IconContainer>
            ),
          },
          {
            title: "Drive interested buyers",
            description:
              "Promote your boat to qualified buyers and manage enquiries via messages.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Megaphone />
              </IconContainer>
            ),
          },
          {
            title: "Negotiate directly",
            description:
              "No commission, no agents, no extra price and save more in the buyer's pocket.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Handshake />
              </IconContainer>
            ),
          },
        ]}
        headingId="how-fsbo-works-heading"
        sectionId="how-fsbo-works"
      />
      <div className="text-center">
        <Link
          href="/research-advice"
          className="text-sm font-medium text-primary hover:underline"
        >
          Read more about selling your boat with Rightboat
        </Link>
      </div>

      {/* 4. Upgrade your boat listing – 4 stat cards (Figma) */}
      <section
        className="space-y-10"
        aria-labelledby="boost-package-heading"
      >
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2
            id="boost-package-heading"
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            Upgrade your boat listing with a Rightboat Boost package
          </h2>
          <p className="text-lg text-muted-foreground">
            Get more visibility and a longer listing life with an optional Boost package.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "1 in 3", text: "More ad photos and videos. Your listing will get a full picture." },
            { value: "120,000", text: "Featured placement. Your listing will be at the top of search results." },
            { value: "120,000", text: "Longer listing life. Your listing will be visible for a longer time." },
            { value: "4500+", text: "More overall conversion. We send you the data to help you sell faster." },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{stat.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/fsbo-v2#fsbo-hero"
            className="text-sm font-medium text-primary hover:underline"
          >
            Explore our Boost packages
          </Link>
        </div>
      </section>

      {/* 5. First-time seller? Consider options – comparison section (comparison-section-3) */}
      <ComparisonSection3
        title="First-time seller? Consider your options"
        description="Choose to list your boat yourself or work with a professional broker. Both ways get you in front of millions of buyers on Rightboat."
        headingId="broker-heading"
        variant="muted"
        cards={[
          {
            title: "Sell your boat yourself",
            description:
              "List on Rightboat as a private seller. No commission, full control, and you keep 100% of the sale.",
            features: [
              "Create your listing in minutes with the form above.",
              "Manage enquiries and viewings directly.",
              "No broker fees – you set the price and keep the proceeds.",
            ],
            cta: { text: "Start your listing", href: "/fsbo-v2#fsbo-hero" },
            badge: "FSBO",
          },
          {
            title: "Use a professional broker",
            description:
              "If you prefer not to handle the sale yourself, a broker can manage listings, viewings, and paperwork for you.",
            features: [
              "Avoid paperwork and legal details – brokers handle contracts and compliance.",
              "Leverage their network – they bring qualified buyers and negotiate on your behalf.",
            ],
            cta: { text: "Find out more", href: "/broker-dealer" },
          },
        ]}
      />

      {/* 6. Testimonials for selling with Rightboat */}
      <TestimonialsCarousel
        title="Testimonials for selling with Rightboat"
        testimonials={[
          {
            quote:
              "Friendly, quick and painless. Listed my boat in the morning and had serious enquiries within a few days. Sold within a month.",
            name: "James M.",
            role: "Private seller",
          },
          {
            quote:
              "No commission was a big plus. I'd recommend Rightboat to anyone selling their own boat.",
            name: "Sarah R.",
            role: "Private seller",
          },
          {
            quote:
              "Easy to use and my listing looked professional. Got more views than I expected.",
            name: "David L.",
            role: "Private seller",
          },
        ]}
        headingId="fsbo-testimonials-heading"
      />

      {/* 7. For Sale By Owner – FAQs (unchanged) */}
      <section
        className="border-t border-border/60 bg-muted/30 py-16"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-center text-2xl font-bold mb-10 sm:text-3xl"
          >
            For Sale By Owner – FAQs
          </h2>
          <dl className="space-y-4">
            {[
              {
                q: "How do I list my boat?",
                a: "Use the form above to start your listing. Enter your boat's make and model, then add price, year, length, and location. Finally add your contact details. No signup is required to begin.",
              },
              {
                q: "Can I sell my boat online for free?",
                a: "Yes. You can create a basic listing for free on Rightboat. Optional Boost packages offer extra visibility for a fee.",
              },
              {
                q: "How do I price my boat for sale?",
                a: "Research similar boats for sale on Rightboat and other sites. Consider year, condition, length, and equipment. You can always adjust your price later.",
              },
              {
                q: "Do I need a broker to sell my boat?",
                a: "No. FSBO means you sell privately without a broker. You can still choose to use a broker if you prefer – see the section above.",
              },
              {
                q: "Is selling privately safe?",
                a: "Rightboat helps you reach buyers; you control who you meet and how you complete the sale. Always meet in safe places and follow normal precautions for high-value sales.",
              },
              {
                q: "What is an FSBO private sale?",
                a: "FSBO (For Sale By Owner) means you sell your boat yourself, without a broker. You list the boat, handle enquiries, and negotiate directly with the buyer.",
              },
              {
                q: "What is an FSBO listing?",
                a: "An FSBO listing is an advertisement you create to sell your own boat. It appears on Rightboat alongside broker and dealer listings, but you are the seller.",
              },
              {
                q: "What if I need help at a later stage?",
                a: "You can upgrade to a Boost package for more support, or get in touch with our team. We can also help you connect with brokers if you decide to list with one.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-lg bg-background p-4 shadow-sm border border-border/60"
              >
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 8. Final CTA */}
      <CtaSection5
        title="Ready to list your boat?"
        description="Start your free FSBO listing above. Reach millions of buyers on Rightboat with no commission fees. Get in touch if you have any questions."
        primaryButton={{ text: "Start your listing", href: "/fsbo-v2#fsbo-hero" }}
        secondaryButton={{ text: "Browse boats for sale", href: "/boats-for-sale" }}
        headingId="fsbo-cta-heading"
      />
    </div>
  )
}
