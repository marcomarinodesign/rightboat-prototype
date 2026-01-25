import Image from "next/image"
import Link from "next/link"
import { List, CheckCircle2, Eye, Users, TrendingUp, Target, Shield, Zap, Briefcase, Store, User } from "lucide-react"

import { HeroSection10 } from "@/components/blocks/hero-section-10"
import { FeatureSection5 } from "@/components/blocks/feature-section-5"
import { FeatureSection9 } from "@/components/blocks/feature-section-9"
import { FeatureSection16 } from "@/components/blocks/feature-section-16"
import { TestimonialsCarousel } from "@/components/blocks/testimonials-carousel"
import { StatsSection } from "@/components/blocks/stats-section"
import { BrandLogo } from "@/components/blocks/brand-logo"
import { Button } from "@/components/ui/button"
import { premiumBrands } from "@/data/brands"

export default function PropelPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* 1. Hero */}
      <HeroSection10
        badge="For brokers & dealers"
        heading="Visibility and reach for marine professionals"
        description="Propel helps brokers, dealers, and sellers get their listings in front of more buyers on Rightboat—with clearer positioning and less friction."
        primaryButton={{ text: "Learn how Propel works", href: "#how-propel-works" }}
        headingId="propel-hero-heading"
      />

      {/* 2. Trust logos */}
      <section className="space-y-6" aria-labelledby="trust-heading">
        <p
          id="trust-heading"
          className="text-center text-sm font-medium text-muted-foreground"
        >
          Trusted by the best companies
        </p>
        <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {premiumBrands.slice(0, 6).map((brand) => (
            <BrandLogo key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* 3. What is Propel - Feature section 5 */}
      <FeatureSection5
        title="What is Rightboat Propel?"
        description="Propel is a program for marine professionals who list boats on Rightboat. It gives you better visibility, helps you reach more relevant buyers, and makes it easier for them to find and contact you."
        features={[
          {
            title: "Enhanced visibility",
            description:
              "Your listings stand out more to buyers browsing on Rightboat.",
            icon: <Eye className="h-5 w-5" />,
          },
          {
            title: "Targeted audience",
            description:
              "Reach people actively looking for boats in your segment.",
            icon: <Target className="h-5 w-5" />,
          },
          {
            title: "Rightboat integration",
            description:
              "Propel works within the Rightboat marketplace—no separate platform.",
            icon: <CheckCircle2 className="h-5 w-5" />,
          },
        ]}
        headingId="what-is-propel-heading"
      />

      {/* 4. Who is Propel for - Feature section 16 */}
      <FeatureSection16
        title="Who is Propel for?"
        description="Propel is designed for anyone who lists boats on Rightboat and wants more visibility and better connections with buyers."
        featureSets={[
          {
            label: "Brokers",
            title: "Brokers",
            description:
              "Independent or boutique brokers listing client boats. Benefit: your inventory reaches more serious buyers without extra legwork.",
            icon: <Briefcase className="h-5 w-5 text-primary" />,
            link: { text: "Learn more", href: "#" },
          },
          {
            label: "Dealers",
            title: "Dealers",
            description:
              "Dealerships and multi-listing businesses. Benefit: clearer presence on Rightboat and more qualified leads.",
            icon: <Store className="h-5 w-5 text-primary" />,
            link: { text: "Learn more", href: "#" },
          },
          {
            label: "Private sellers",
            title: "Private sellers",
            description:
              "Individuals selling their own boat. Benefit: your listing gets in front of more buyers than a standard listing.",
            icon: <User className="h-5 w-5 text-primary" />,
            link: { text: "Learn more", href: "#" },
          },
        ]}
        headingId="who-is-propel-for-heading"
      />

      {/* 5. How Propel works - Feature section 5 */}
      <FeatureSection5
        title="How Propel works"
        description="Propel is straightforward: you list on Rightboat, qualify for the program, and your listings get improved visibility and positioning."
        features={[
          {
            title: "List on Rightboat",
            description:
              "Add your boats to the Rightboat marketplace as you normally would.",
            icon: <List className="h-5 w-5" />,
          },
          {
            title: "Qualify for Propel",
            description:
              "Meet the program criteria—listing quality and completeness matter.",
            icon: <CheckCircle2 className="h-5 w-5" />,
          },
          {
            title: "Get enhanced visibility",
            description:
              "Your listings receive improved placement and clearer positioning.",
            icon: <Eye className="h-5 w-5" />,
          },
          {
            title: "Connect with more buyers",
            description:
              "Buyers find you more easily and can reach out with less friction.",
            icon: <Users className="h-5 w-5" />,
          },
        ]}
        headingId="how-propel-works-heading"
        sectionId="how-propel-works"
        className="scroll-mt-20"
      />

      {/* 6. Why use Propel - Feature section 9 */}
      <FeatureSection9
        title="Why use Propel?"
        description="Propel focuses on outcomes: more visibility, better traffic, and smoother connections between you and buyers."
        features={[
          {
            title: "Increased visibility",
            description:
              "Your listings appear more prominently to buyers browsing Rightboat.",
            icon: <TrendingUp className="h-6 w-6" />,
          },
          {
            title: "More relevant traffic",
            description:
              "Reach people who are actively searching for boats like yours.",
            icon: <Target className="h-6 w-6" />,
          },
          {
            title: "Clearer positioning",
            description:
              "Buyers can better understand who you are and what you offer.",
            icon: <Shield className="h-6 w-6" />,
          },
          {
            title: "Less friction",
            description:
              "Makes it easier for buyers to find you and start a conversation.",
            icon: <Zap className="h-6 w-6" />,
          },
        ]}
        headingId="why-use-propel-heading"
      />

      {/* 7. Testimonials carousel */}
      <TestimonialsCarousel
        testimonials={[
          {
            quote:
              "Propel helped us reach more serious buyers. Our listings got better visibility and we saw a significant increase in qualified inquiries.",
            name: "Sarah Mitchell",
            role: "Broker at Coastal Yachts",
            location: "Miami, FL",
          },
          {
            quote:
              "As a dealer, Propel made it easier for buyers to find us. The clearer positioning on Rightboat has been a game-changer.",
            name: "James Thompson",
            role: "Dealership Owner",
            location: "San Diego, CA",
          },
          {
            quote:
              "Selling our boat through Propel was straightforward. We received multiple serious inquiries within the first week.",
            name: "Michael Chen",
            role: "Private Seller",
            location: "Seattle, WA",
          },
        ]}
        headingId="testimonials-heading"
      />

      {/* 8. Stats section */}
      <StatsSection
        title="Proof in the numbers"
        description="Keep a close eye on the visibility, reach, and connections. Monitor these metrics to see how Propel helps marine professionals."
        stats={[
          {
            value: "10K+",
            label: "Listings enhanced with Propel",
          },
          {
            value: "2.5x",
            label: "Average increase in visibility",
          },
          {
            value: "85%",
            label: "More qualified leads reported",
          },
        ]}
        headingId="stats-heading"
      />

      {/* 9. Final CTA */}
      <section
        className="mx-auto max-w-2xl space-y-6 text-center"
        aria-labelledby="propel-cta-heading"
      >
        <h2
          id="propel-cta-heading"
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          See if Propel is right for your business
        </h2>
        <p className="text-lg text-muted-foreground">
          If you list boats on Rightboat and want better visibility, Propel may
          be a fit. Talk to the Rightboat team to explore your options.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="default" size="lg">
            <Link href="/">Talk to the Rightboat team</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#how-propel-works">Explore Propel in more detail</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
