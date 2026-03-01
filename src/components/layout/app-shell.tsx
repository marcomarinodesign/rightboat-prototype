"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
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
  const isBoatDetailPage =
    typeof pathname === "string" &&
    pathname.startsWith("/boats-for-sale/") &&
    pathname.split("/").filter(Boolean).length >= 4

  if (isDesignSystem) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main
        className={cn(
          "mx-auto w-full pb-24 pt-4",
          isBoatDetailPage ? "max-w-none px-0" : "max-w-7xl px-4 sm:px-6 lg:px-8"
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

const mainNav = [
  { name: "Boats for sale", href: "/boats-for-sale" },
  { name: "Power for sale", href: "/boats-for-sale?type=power" },
  { name: "Sail boats", href: "/boats-for-sale?type=sail" },
  { name: "Research & advice", href: "/research-advice" },
] as const

const moreNav = [
  { name: "Membership", href: "/broker-dealer" },
  { name: "Propel", href: "/propel" },
  { name: "Sell", href: "/sell" },
] as const

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinkClass =
    "text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-[4px]">
      <nav
        aria-label="Global"
        className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex shrink-0">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rightboat</span>
            <Image
              src="https://www.rightboat.com/assets/home/logo-black-fc82de4067beb3c49bb316c4fdc9336333bb7f90375ba5d3b2b3021da2ccf1a6.png"
              alt="Rightboat"
              width={152}
              height={26}
              className="h-[26px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
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
                    src="https://www.rightboat.com/assets/home/logo-black-fc82de4067beb3c49bb316c4fdc9336333bb7f90375ba5d3b2b3021da2ccf1a6.png"
                    alt="Rightboat"
                    width={120}
                    height={40}
                    className="h-[26px] w-auto"
                  />
                </Link>
              </SheetHeader>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-1 py-6">
                    {mainNav.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <p className="-mx-3 px-3 py-2 text-sm font-medium text-muted-foreground">
                      More
                    </p>
                    {moreNav.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 ml-2 block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-3 py-6">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Signup
                    </Button>
                    <Button className="w-full rounded-xl" asChild>
                      <Link
                        href="/sell"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sell your boat
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: main nav + More dropdown */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={navLinkClass}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={cn("flex items-center gap-0.5", navLinkClass)}
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              More
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {moreOpen && (
              <div
                className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-background py-1 shadow-lg"
                role="menu"
              >
                {moreNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted hover:text-primary"
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl border-border px-4 font-medium"
          >
            Signup
          </Button>
          <Button size="sm" className="h-10 rounded-xl px-4 font-medium" asChild>
            <Link href="/sell">Sell your boat</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-brand-midnight text-white">
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
        <div className="flex items-center justify-center gap-3">
          <span>© 2026 Rightboat. All rights reserved.</span>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <Link href="/design-system" className="transition-colors hover:text-white/90">
            Design System
          </Link>
        </div>
      </div>
    </footer>
  )
}
