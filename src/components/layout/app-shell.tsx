"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

const navigation = [
  { name: "Boats for sale", href: "/boats-for-sale" },
  { name: "New boats", href: "/boats-for-sale" },
  { name: "Used boats", href: "/boats-for-sale" },
  { name: "Reviews", href: "/boats-for-sale" },
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
            <span className="text-xl font-semibold text-brand-midnight">
              Rightboat
            </span>
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
                  className="text-xl font-semibold text-brand-midnight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rightboat
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            Boat types
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Popular types</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Sailboats</DropdownMenuItem>
                          <DropdownMenuItem>Center console</DropdownMenuItem>
                          <DropdownMenuItem>Yachts</DropdownMenuItem>
                          <DropdownMenuItem>Catamaran</DropdownMenuItem>
                          <DropdownMenuItem>Fishing</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Boat types
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Popular types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sailboats</DropdownMenuItem>
                <DropdownMenuItem>Center console</DropdownMenuItem>
                <DropdownMenuItem>Yachts</DropdownMenuItem>
                <DropdownMenuItem>Catamaran</DropdownMenuItem>
                <DropdownMenuItem>Fishing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">Sell your boat</Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Rightboat</h3>
          <p className="text-sm text-muted-foreground">
            The right place to find the right boat. Browse listings, compare
            models, and contact sellers directly.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Explore</p>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <Link href="/boats-for-sale">Boats for sale</Link>
            <Link href="/boats-for-sale">Boat brands</Link>
            <Link href="/boats-for-sale">Boat types</Link>
            <Link href="/boats-for-sale">Locations</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Sell</p>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <Link href="/boats-for-sale">List your boat</Link>
            <Link href="/boats-for-sale">Dealer solutions</Link>
            <Link href="/boats-for-sale">Advertising</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">Company</p>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <Link href="/boats-for-sale">About</Link>
            <Link href="/boats-for-sale">Careers</Link>
            <Link href="/boats-for-sale">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 Rightboat. All rights reserved.
      </div>
    </footer>
  )
}
