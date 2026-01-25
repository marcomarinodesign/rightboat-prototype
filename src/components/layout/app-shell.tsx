"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

const navigation = [
  { name: "Boat for sale", href: "/boats-for-sale" },
  { name: "Research & Advice", href: "/research-advice" },
  { name: "Broker/Dealer?", href: "/broker-dealer" },
  { name: "Propel", href: "/propel" },
]

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav
        aria-label="Global"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rightboat</span>
            <Image
              src="https://www.rightboat.com/assets/home/logo-black-fc82de4067beb3c49bb316c4fdc9336333bb7f90375ba5d3b2b3021da2ccf1a6.png"
              alt="Rightboat"
              width={120}
              height={40}
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
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
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
                  {/* Mobile Actions */}
                  <div className="py-6">
                    <div className="mb-4 space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Signup
                      </Button>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sell your boat
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Signup
            </Button>
            <Button size="sm">Sell your boat</Button>
          </div>
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
        © 2026 Rightboat. All rights reserved.
      </div>
    </footer>
  )
}
