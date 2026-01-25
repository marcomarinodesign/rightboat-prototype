import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { premiumBrands } from "@/data/brands"

export default function PropelPage() {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. Hero — Educational intro */}
      <section
        className="mx-auto max-w-3xl space-y-6 text-center"
        aria-labelledby="propel-hero-heading"
      >
        <div className="space-y-4">
          <h1
            id="propel-hero-heading"
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            Rightboat Propel: visibility and reach for marine professionals
          </h1>
          <p className="text-lg text-muted-foreground">
            Propel helps brokers, dealers, and sellers get their listings in
            front of more buyers on Rightboat—with clearer positioning and less
            friction.
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="#how-propel-works">Learn how Propel works</Link>
          </Button>
        </div>
      </section>

      {/* 2. What is Rightboat Propel? */}
      <section
        className="space-y-8"
        aria-labelledby="what-is-propel-heading"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          <h2
            id="what-is-propel-heading"
            className="text-2xl font-bold"
          >
            What is Rightboat Propel?
          </h2>
          <p className="text-muted-foreground">
            Propel is a program for marine professionals who list boats on
            Rightboat. It gives you better visibility, helps you reach more
            relevant buyers, and makes it easier for them to find and contact
            you.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Enhanced visibility</CardTitle>
              <CardDescription>
                Your listings stand out more to buyers browsing on Rightboat.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Targeted audience</CardTitle>
              <CardDescription>
                Reach people actively looking for boats in your segment.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Rightboat integration</CardTitle>
              <CardDescription>
                Propel works within the Rightboat marketplace—no separate
                platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 3. Who is Propel for? */}
      <section
        className="space-y-8"
        aria-labelledby="who-is-propel-for-heading"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          <h2
            id="who-is-propel-for-heading"
            className="text-2xl font-bold"
          >
            Who is Propel for?
          </h2>
          <p className="text-muted-foreground">
            Propel is designed for anyone who lists boats on Rightboat and wants
            more visibility and better connections with buyers.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Brokers</CardTitle>
              <CardDescription>
                Independent or boutique brokers listing client boats. Benefit:
                your inventory reaches more serious buyers without extra
                legwork.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Dealers</CardTitle>
              <CardDescription>
                Dealerships and multi-listing businesses. Benefit: clearer
                presence on Rightboat and more qualified leads.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Private sellers</CardTitle>
              <CardDescription>
                Individuals selling their own boat. Benefit: your listing gets
                in front of more buyers than a standard listing.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Marine professionals</CardTitle>
              <CardDescription>
                Surveyors, insurers, or others supporting boat sales. Benefit:
                understand how Propel helps your clients and partners.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 4. How Propel works */}
      <section
        id="how-propel-works"
        className="space-y-8"
        aria-labelledby="how-propel-works-heading"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          <h2
            id="how-propel-works-heading"
            className="text-2xl font-bold"
          >
            How Propel works
          </h2>
          <p className="text-muted-foreground">
            Propel is straightforward: you list on Rightboat, qualify for the
            program, and your listings get improved visibility and positioning.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/60">
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
                aria-hidden
              >
                1
              </div>
              <CardTitle className="text-lg">List on Rightboat</CardTitle>
              <CardDescription>
                Add your boats to the Rightboat marketplace as you normally
                would.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
                aria-hidden
              >
                2
              </div>
              <CardTitle className="text-lg">Qualify for Propel</CardTitle>
              <CardDescription>
                Meet the program criteria—listing quality and completeness
                matter.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
                aria-hidden
              >
                3
              </div>
              <CardTitle className="text-lg">Get enhanced visibility</CardTitle>
              <CardDescription>
                Your listings receive improved placement and clearer
                positioning.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="space-y-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary"
                aria-hidden
              >
                4
              </div>
              <CardTitle className="text-lg">Connect with more buyers</CardTitle>
              <CardDescription>
                Buyers find you more easily and can reach out with less
                friction.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 5. Why use Propel (Benefits) */}
      <section
        className="space-y-8"
        aria-labelledby="why-use-propel-heading"
      >
        <div className="mx-auto max-w-2xl space-y-3">
          <h2
            id="why-use-propel-heading"
            className="text-2xl font-bold"
          >
            Why use Propel?
          </h2>
          <p className="text-muted-foreground">
            Propel focuses on outcomes: more visibility, better traffic, and
            smoother connections between you and buyers.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Increased visibility</CardTitle>
              <CardDescription>
                Your listings appear more prominently to buyers browsing
                Rightboat.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">More relevant traffic</CardTitle>
              <CardDescription>
                Reach people who are actively searching for boats like yours.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Clearer positioning</CardTitle>
              <CardDescription>
                Buyers can better understand who you are and what you offer.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Less friction</CardTitle>
              <CardDescription>
                Makes it easier for buyers to find you and start a
                conversation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 6. Trust & Credibility */}
      <section
        className="space-y-8 rounded-2xl border border-border/60 bg-muted/20 px-6 py-10 sm:px-8 sm:py-12"
        aria-labelledby="trust-heading"
      >
        <div className="space-y-4 text-center">
          <h2
            id="trust-heading"
            className="text-2xl font-bold"
          >
            Trust & credibility
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Propel is part of the Rightboat marketplace, which connects buyers
            and sellers worldwide. Many leading brands and dealers list on
            Rightboat.
          </p>
        </div>
        <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {premiumBrands.slice(0, 6).map((brand) => (
            <div
              key={brand.id}
              className="relative h-12 w-full max-w-[140px] grayscale opacity-70"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Trusted brands on the Rightboat marketplace. Propel helps professionals
          who list these and other boats reach more buyers.
        </p>
      </section>

      {/* 7. Soft CTA — Next step */}
      <section
        className="mx-auto max-w-2xl space-y-6 text-center"
        aria-labelledby="propel-cta-heading"
      >
        <h2
          id="propel-cta-heading"
          className="text-2xl font-bold"
        >
          See if Propel is right for your business
        </h2>
        <p className="text-muted-foreground">
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
