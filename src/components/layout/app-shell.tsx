"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { RIGHTBOAT_LOGO, RIGHTBOAT_LOGO_WHITE } from "@/lib/brand"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isDesignSystem = pathname === "/design-system"
  const isEmailPreview = pathname === "/email-preview" || pathname === "/fsbo-retargeting-email"
  const isBoatDetailPage =
    typeof pathname === "string" &&
    pathname.startsWith("/boats-for-sale/") &&
    pathname.split("/").filter(Boolean).length >= 4
  const isFsbo = pathname === "/fsbo"
  const isFsboWizard =
    typeof pathname === "string" && pathname === "/fsbo/wizard"
  const isMobileAppPrototype =
    typeof pathname === "string" && pathname.startsWith("/app")

  if (isDesignSystem || isEmailPreview) {
    return <>{children}</>
  }

  if (isMobileAppPrototype) {
    return <>{children}</>
  }

  if (isFsboWizard) {
    return <>{children}</>
  }

  const mainFullWidth = isBoatDetailPage || isFsbo

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparent={isFsbo} />
      <main
        className={cn(
          "mx-auto w-full pb-24",
          isFsbo ? "pt-0" : "pt-4",
          mainFullWidth ? "max-w-none px-0" : "max-w-7xl px-4 sm:px-6 lg:px-0"
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

const leftNav = [
  { name: "Boats for sale", href: "/boats-for-sale" },
  { name: "Research & Advice", href: "/research-advice" },
  { name: "Loan Calculator", href: "#" },
] as const

function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logo = transparent ? RIGHTBOAT_LOGO_WHITE : RIGHTBOAT_LOGO
  const navLinkClass = cn(
    "rounded-lg px-3 py-2 text-[14px] font-normal leading-5 transition-colors",
    transparent
      ? "text-white hover:text-white/80"
      : "text-foreground hover:text-foreground/80"
  )

  return (
    <header className={cn(
      "z-50",
      transparent
        ? "absolute inset-x-0 top-0"
        : "sticky top-0 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    )}>
      <nav
        aria-label="Global"
        className="relative mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 md:h-[72px] lg:h-[88px] lg:px-16 lg:py-0"
      >
        {/* ── Desktop left nav ── */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          {leftNav.map((item) => (
            <Link key={item.name} href={item.href} className={navLinkClass}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* ── Logo — mobile: normal flow; desktop: absolute center ── */}
        <div className="flex shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rightboat</span>
            <Image
              src={logo.src}
              alt="Rightboat"
              width={logo.width}
              height={logo.height}
              className="h-[26px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* ── Right side: mobile hamburger + desktop right nav ── */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Image
                      src={RIGHTBOAT_LOGO.src}
                      alt="Rightboat"
                      width={RIGHTBOAT_LOGO.width}
                      height={RIGHTBOAT_LOGO.height}
                      className="h-[26px] w-auto"
                      priority={false}
                    />
                  </Link>
                </SheetHeader>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-border">
                    <div className="space-y-1 py-6">
                      {leftNav.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-3 py-6">
                      <Button
                        variant="ghost"
                        className="w-full text-[13px] font-medium text-primary"
                        asChild
                      >
                        <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                          Log In/Sign In
                        </Link>
                      </Button>
                      <Button className="w-full text-[13px] font-medium" asChild>
                        <Link href="/fsbo" onClick={() => setMobileMenuOpen(false)}>
                          Sell your boat
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop right nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-[8px] text-[13px] font-medium hover:bg-transparent",
                transparent
                  ? "text-white hover:text-white/80"
                  : "text-primary hover:text-primary/80"
              )}
              asChild
            >
              <Link href="#">Log In/Sign In</Link>
            </Button>
            <Button size="sm" className="rounded-[8px] text-[13px] font-medium" asChild>
              <Link href="/fsbo">Sell your boat</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-midnight text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Rightboat</h3>
          <p className="text-sm text-white/70">
            The right place to find the right boat. Browse listings, compare
            models, and contact sellers directly.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Explore</p>
          <div className="flex flex-col gap-2 text-white/70">
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Boats for sale</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Boat brands</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Boat types</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Locations</Link>
            <Link href="/app/home" className="hover:text-white transition-colors">App prototype</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Sell</p>
          <div className="flex flex-col gap-2 text-white/70">
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">List your boat</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Dealer solutions</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Advertising</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Company</p>
          <div className="flex flex-col gap-2 text-white/70">
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">About</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/boats-for-sale" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>© 2026 Rightboat. All rights reserved.</span>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <Link href="/sitemap" className="transition-colors hover:text-white/90">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  )
}
