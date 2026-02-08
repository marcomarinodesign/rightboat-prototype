"use client"

import { useState } from "react"
import Image from "next/image"

import { HeroSection10 } from "@/components/blocks/hero-section-10"
import { StatsSection4 } from "@/components/blocks/stats-section-4"
import { FeatureCardsImage } from "@/components/blocks/feature-cards-image"
import { FeatureSectionImage } from "@/components/blocks/feature-section-image"
import { CtaSection5 } from "@/components/blocks/cta-section-5"
import { TestimonialsCarousel } from "@/components/blocks/testimonials-carousel"
import { BrokerContactDialog } from "@/components/broker-dealer/broker-contact-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BrokerDealerPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  return (
    <div className="min-h-screen">
      <BrokerContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      
      <div className="space-y-20 sm:space-y-24">

      {/* Hero Section */}
      <HeroSection10
        badge="Membership"
        heading={
          <>
            Calling All{" "}
            <span className="text-primary">Yacht Brokers and Dealers</span>
          </>
        }
        description="Ask Us How to Switch and Save"
        primaryButton={{ text: "Join Today", onClick: openContact }}
        // NOTE: Pixabay page links aren't direct video files. Download the MP4 from:
        // https://pixabay.com/es/videos/barco-de-motor-barcos-chapoteo-23011/
        // then place it at: /public/videos/boat-splash-23011.mp4
        video={{ src: "/videos/boat-splash-23011.mp4", ariaLabel: "Motorboat splash video" }}
      />

      {/* Description Section */}
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Delivering Cost-effective Digital Solutions to Industry Professionals
        </h2>
        <p className="text-lg text-muted-foreground sm:text-xl">
          The number of boat buyers using Rightboat doubled in the last year to over half a million
          visits monthly. Together, they viewed over 16 million pages of boat specifications from
          professional brokers & dealers, then linked to their websites or made an immediate enquiry.
        </p>
      </section>

      {/* Stats Section */}
      <StatsSection4
        title="Join today"
        description="We can connect our growing audience to you"
        stats={[
          { value: "35,000", label: "listings from 450 brokerages and dealerships worldwide" },
          { value: "110,000", label: "registered buyers, notified when a listing matches their saved search" },
          { value: "47,000", label: "engaged email subscribers you can target with custom messaging" },
        ]}
      />

      {/* Who is Rightboat Section */}
      <FeatureCardsImage
        title="Who is Rightboat?"
        description="Started by a group of brokers who wanted more control over their listings, Rightboat is now..."
        features={[
          {
            title: "Over 35,000 listings",
            description:
              "Covering all the major boating categories and brands, we take feeds to make your listing upload easy. We use AI to support listing enhancement and optimize search performance.",
          },
          {
            title: "A Team of Industry Experts",
            description:
              "The Rightboat team are industry experts with years of experience in yacht sales and boat marketplaces. We understand your priorities and how to drive leads to listings.",
          },
          {
            title: "Millions of Qualified Visits",
            description:
              "Attracting over half a million qualified buyer sessions monthly, we use Search Engine Marketing, social media, traditional media and email to promote your listings.",
          },
        ]}
      />

      {/* Benefits Section */}
      <section className="space-y-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
            <Image
              alt="Section visual placeholder"
              src="https://ui.shadcn.com/placeholder.svg"
              fill
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Rightboat is a modern challenger brand giving you the opportunity to:
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>Promote new stock & brokerage inventory in a cost-effective manner</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>Drive traffic to your own website through digital targeting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>Measure success clearly and simply</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>Auto-export boats, images & video to your own website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">•</span>
                <span>Feed data to other platforms</span>
              </li>
            </ul>
            <Button size="lg" onClick={openContact}>
              Join Today
            </Button>
          </div>
        </div>
      </section>

      {/* Rightboat:HUB Section */}
      <FeatureSectionImage
        title="What is the Rightboat:HUB?"
        description="We can take a feed of your listings, or the marine industry's newest management tool - the Rightboat:HUB - allows you to easily upload boats via mobile or desktop."
        features={[
          {
            title: "Easy Upload & Management",
            description:
              "The HUB will score the quality of each listing to improve your chances of being matched to a buyer, then export them to your website or any other platform FOR FREE.",
          },
          {
            title: "All-in-One Platform",
            description:
              "Manage your listings, check your lead interactions, follow your metrics reporting, all in one place. We can also feed your leads to your CRM, ask us for details.",
          },
        ]}
        imagePosition="right"
      />

      {/* Membership Packages Section */}
      <section className="space-y-12" id="membership-packages">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Membership Packages
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Accelerate Package */}
          <Card className="border-border/60">
            <CardHeader>
              <Badge variant="secondary" className="mb-4 w-fit">
                Easy option
              </Badge>
              <CardTitle className="text-2xl">Accelerate</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Get noticed with branded listings
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold">Including:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Your boats online</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Data feed (import or export)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>The HUB listing management system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Branded enhanced listings (all boats)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>See More Boats From (link to your company profile page)</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6" onClick={openContact}>
                More Information
              </Button>
            </CardContent>
          </Card>

          {/* Illuminate Package */}
          <Card className="border-border/60">
            <CardHeader>
              <Badge variant="secondary" className="mb-4 w-fit">
                Easy option
              </Badge>
              <CardTitle className="text-2xl">Illuminate</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Move full speed ahead!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold">Including:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Your boats online</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Data feed (import or export)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>The HUB listing management system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Branded enhanced listings (all boats)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>See More Boats From (link to your company profile page)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Premium Listings (all boats)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Your top 10% boats Sponsored</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6" onClick={openContact}>
                More Information
              </Button>
            </CardContent>
          </Card>

          {/* Enhancements Package */}
          <Card className="border-border/60">
            <CardHeader>
              <Badge variant="secondary" className="mb-4 w-fit">
                Easy option
              </Badge>
              <CardTitle className="text-2xl">Enhancements</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Optional Features
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold">Including:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Home Page Hero ad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Home Featured boat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Email Marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Targeted Display Advertising</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Custom Pay Per Click Plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Category or Brand Takeover</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6" onClick={openContact}>
                Ask Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel
        testimonials={[
          {
            quote:
              "Our experience with Rightboat has been incredibly positive. The platform is easy to use and the price point is excellent. We've already seen great results, including the successful sale of a million-dollar 38' Formula at near full ask. The team has been fantastic to work with: responsive, knowledgeable, and truly supportive.",
            name: "Kevin Morgan",
            role: "Nautical Yacht Group",
          },
          {
            quote:
              "We appreciate all you and Rightboat are doing…you folks may be our only hope for us small yacht brokerages to be able to stay in business. Keep up the good work.",
            name: "Joe Zammataro",
            role: "Preferred Yachts",
          },
          {
            quote:
              "Our business relies on strong partners that we can trust, so we switched our primary upload of boats to the Rightboat:HUB in 2024. The support they have given us has been superb, with visits to our office and instant access to their customer service team.",
            name: "Gerry Salmon",
            role: "MGM Boats",
          },
        ]}
      />

      {/* Contact Form CTA Section */}
      <section>
        <CtaSection5
          title="Ask Us How to Switch and Save"
          description="Rightboat Ltd is committed to protecting your privacy. We process and store your information to administer your account and provide the services you requested. We would also like to contact you about other services and content of interest."
          primaryButton={{ text: "Get In Touch", onClick: openContact }}
        />
      </section>
      </div>
    </div>
  )
}
