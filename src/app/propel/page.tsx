"use client"

import { useState } from "react"
import { CheckCircle2, Eye, Users, TrendingUp, Target, Zap, Briefcase, Store, Factory, BarChart2, Settings, Megaphone, Search, HandHelping } from "lucide-react"

import { HeroSection10 } from "@/components/blocks/hero-section-10"
import { FeatureSection5 } from "@/components/blocks/feature-section-5"
import { FeatureSection9 } from "@/components/blocks/feature-section-9"
import { FeatureSection16 } from "@/components/blocks/feature-section-16"
import { TestimonialsCarousel } from "@/components/blocks/testimonials-carousel"
import { StatsSection } from "@/components/blocks/stats-section"
import { BrandLogo } from "@/components/blocks/brand-logo"
import { CtaSection5 } from "@/components/blocks/cta-section-5"
import { PropelExpertDialog } from "@/components/propel/propel-expert-dialog"
import { IconContainer } from "@/components/ui/icon-container"
import { propelBrands } from "@/data/brands"

export default function PropelPage() {
  const [expertOpen, setExpertOpen] = useState(false)
  const openExpert = () => setExpertOpen(true)

  return (
    <div className="space-y-20 sm:space-y-24">
      <PropelExpertDialog open={expertOpen} onOpenChange={setExpertOpen} />

      {/* 1. Hero */}
      <HeroSection10
        badge="For partners"
        heading={
          <>
            Visibility and reach for{" "}
            <span style={{ color: "#0257fc" }}>marine professionals</span>
          </>
        }
        description="Propel is the B2B solution for expanding your reach to a global audience through smart insights, exclusive ad placements and more in one place."
        primaryButton={{ text: "Talk to a Propel expert", onClick: openExpert }}
        image={{ src: "/propel/hero-sailboat.png", alt: "Sailboat in turquoise waters" }}
        headingId="propel-hero-heading"
      />

      {/* 2. Trust logos */}
      <section className="space-y-6" aria-labelledby="trust-heading">
        <p
          id="trust-heading"
          className="text-center text-sm font-medium text-muted-foreground"
        >
          Used by leading marine brands
        </p>
        <div className="logo-marquee bg-card py-8">
          <div className="logo-marquee-track gap-14 px-8">
            {[...propelBrands, ...propelBrands].map((brand, index) => (
              <BrandLogo key={`${brand.id}-${index}`} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Precision Meets Propulsion - Feature section 5 */}
      <FeatureSection5
        title="Precision Meets Propulsion"
        description="Find your next and final boat sales solution for your dealership. Propel offers a full suite of cutting-edge tools to streamline your sales and marketing efforts."
        features={[
          {
            title: "Increased Visibility",
            description:
              "Your listings are seen by more qualified buyers, boosting your sales pipeline.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Eye />
              </IconContainer>
            ),
          },
          {
            title: "Targeted Audience",
            description:
              "Reach buyers specifically interested in your boat types and locations.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Target />
              </IconContainer>
            ),
          },
          {
            title: "Rightboat Integration",
            description:
              "Seamlessly connect with Rightboat's platform for efficient management.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <CheckCircle2 />
              </IconContainer>
            ),
          },
        ]}
        image={{ src: "/propel/motorboat.png", alt: "Motorboat on the water" }}
        headingId="precision-meets-propulsion-heading"
      />

      {/* 4. Who is Propel for - Feature section 16 */}
      <FeatureSection16
        title="Who is Propel for?"
        description="Propel is designed for all professionals in the marine industry, from dealerships to brokers and service providers."
        featureSets={[
          {
            label: "Brokers",
            title: "Brokers",
            description:
              "Connect with a wider network of buyers and sellers. Showcase your listings and grow your client base with Propel's integrated tools.",
            icon: (
              <IconContainer className="size-10 mb-0 bg-card border shadow-xs rounded-[20px]">
                <Briefcase />
              </IconContainer>
            ),
            link: { text: "Talk to a Propel expert", onClick: openExpert },
            image: { src: "/propel/who-broker.png", alt: "Brokerage and yacht details" },
          },
          {
            label: "Dealers",
            title: "Dealers",
            description:
              "Strengthen your dealership's presence on Rightboat. Get more qualified leads and showcase your inventory to a global audience with Propel's tools.",
            icon: (
              <IconContainer className="size-10 mb-0 bg-card border shadow-xs rounded-[20px]">
                <Store />
              </IconContainer>
            ),
            link: { text: "Talk to a Propel expert", onClick: openExpert },
            image: { src: "/propel/who-dealer.png", alt: "Dealership motor yacht" },
          },
          {
            label: "Manufacturers",
            title: "Manufacturers",
            description:
              "Reach dealers and buyers at scale. Propel gives OEMs data-driven insights and premium placement to grow market share.",
            icon: (
              <IconContainer className="size-10 mb-0 bg-card border shadow-xs rounded-[20px]">
                <Factory />
              </IconContainer>
            ),
            link: { text: "Talk to a Propel expert", onClick: openExpert },
            image: { src: "/propel/who-manufacturer.png", alt: "Luxury motor yacht" },
          },
        ]}
        headingId="who-is-propel-for-heading"
      />

      {/* 5. Propel Program Offers - Feature section 5 */}
      <FeatureSection5
        title="Propel Program Offers"
        description="Propel offers a suite of comprehensive features designed to enhance your business operations and drive growth."
        features={[
          {
            title: "Lead Generation",
            description:
              "Attract high-quality leads directly to your listings and services.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Zap />
              </IconContainer>
            ),
          },
          {
            title: "Brand Marketing",
            description:
              "Elevate your brand's presence with premium ad placements and promotional tools.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Megaphone />
              </IconContainer>
            ),
          },
          {
            title: "Smart Search Tools",
            description:
              "Utilize advanced search functionalities to help buyers find your inventory faster.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <Search />
              </IconContainer>
            ),
          },
          {
            title: "Sales Support",
            description:
              "Access resources and tools to help close deals more efficiently and effectively.",
            icon: (
              <IconContainer className="size-10 mb-0">
                <HandHelping />
              </IconContainer>
            ),
          },
        ]}
        image={{ src: "/propel/program-offers.png", alt: "Propel dashboard preview" }}
        headingId="propel-program-offers-heading"
        sectionId="propel-program-offers"
        className="scroll-mt-20"
      />

      {/* 6. Why use Propel - Feature section 9 */}
      <FeatureSection9
        title="Why use Propel?"
        description="Propel empowers marine professionals to streamline their operations, enhance visibility, and drive sales growth."
        features={[
          {
            title: "Increased Engagement",
            description:
              "Connect with buyers and sellers on a deeper level through interactive features.",
            icon: (
              <IconContainer className="size-12 mb-0">
                <TrendingUp />
              </IconContainer>
            ),
          },
          {
            title: "Lead Retention & Growth",
            description:
              "Cultivate lasting relationships with clients and expand your market reach.",
            icon: (
              <IconContainer className="size-12 mb-0">
                <Users />
              </IconContainer>
            ),
          },
          {
            title: "Efficiency & Performance",
            description:
              "Optimize your workflow and achieve better results with powerful analytics.",
            icon: (
              <IconContainer className="size-12 mb-0">
                <Settings />
              </IconContainer>
            ),
          },
          {
            title: "Reporting",
            description:
              "Gain valuable insights into market trends and performance metrics.",
            icon: (
              <IconContainer className="size-12 mb-0">
                <BarChart2 />
              </IconContainer>
            ),
          },
        ]}
        headingId="why-use-propel-heading"
      />

      {/* 7. Testimonials - What professionals say */}
      <TestimonialsCarousel
        testimonials={[
          {
            quote:
              "Propel has transformed the way we connect with clients. Our listings get noticed, and the leads are consistently high quality. Highly recommended!",
            name: "John Smith",
            role: "Marine Broker",
          },
          {
            quote:
              "We've seen our Propel leads convert at a much higher rate. The platform is intuitive, and the support team is excellent.",
            name: "Sarah Jones",
            role: "Dealership Owner",
          },
          {
            quote:
              "Propel has given us an edge in a competitive market. Our visibility has increased significantly, leading to more sales.",
            name: "David Lee",
            role: "Manufacturer Rep.",
          },
        ]}
        headingId="testimonials-heading"
      />

      {/* 8. OEM Advantages */}
      <StatsSection
        title="OEM Advantages"
        description="Propel provides exclusive benefits for Original Equipment Manufacturers (OEMs), offering unparalleled reach and data-driven insights to boost sales and market share."
        stats={[
          {
            value: "1 in 3",
            label: "Increased market share",
          },
          {
            value: "120.000",
            label: "Qualified leads generated",
          },
          {
            value: "4500+",
            label: "Successful partnerships",
          },
        ]}
        headingId="oem-advantages-heading"
      />

      {/* 9. Final CTA */}
      <CtaSection5
        title="See If Propel is right for your business"
        description="We work with top players in the marine industry to help them grow and reach their business goals through technology."
        primaryButton={{ text: "Talk to a Propel expert", onClick: openExpert }}
        image={{ src: "/propel/cta-sailboat.png", alt: "Professionals on a sailboat" }}
        headingId="propel-cta-heading"
      />
    </div>
  )
}
