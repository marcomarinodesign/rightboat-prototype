"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-semibold text-brand-midnight">
              Rightboat
            </Link>
            <span className="rounded-full border border-border/60 px-2 py-1 text-xs text-muted-foreground">
              Marketplace
            </span>
          </div>

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

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Input placeholder="Search by make, model or keyword" />
            <Button variant="secondary">Search</Button>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link href="/boats-for-sale" className="hover:text-foreground">
              Boats for sale
            </Link>
            <Link href="/boats-for-sale" className="hover:text-foreground">
              New boats
            </Link>
            <Link href="/boats-for-sale" className="hover:text-foreground">
              Used boats
            </Link>
            <Link href="/boats-for-sale" className="hover:text-foreground">
              Reviews
            </Link>
          </nav>
        </div>
      </div>
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
