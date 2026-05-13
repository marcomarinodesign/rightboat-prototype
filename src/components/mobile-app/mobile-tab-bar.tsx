"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Newspaper, Sailboat, Search, SquarePlus } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Floating tab dock — matches Figma “Tab Bar - iPhone” (node 1:630):
 * https://www.figma.com/design/fAf17Mq0Bc3Eq3pjkFimFQ/Untitled?node-id=1-630&m=dev
 * Pill glass + 4 tabs (oval selection + blue accent) + separate circular Search.
 * Behaviour still aligned with Apple tab bar HIG:
 * https://developer.apple.com/design/human-interface-guidelines/tab-bars
 */
const tabs = [
  {
    href: "/app/home",
    label: "Homepage",
    Icon: Home,
    match: (p: string) => p === "/app" || p === "/app/home",
  },
  {
    href: "/app/boats-for-sale",
    label: "Boats",
    Icon: Sailboat,
    match: (p: string) =>
      p === "/app/boats-for-sale" || p.startsWith("/app/boat/"),
  },
  {
    href: "/app/research",
    label: "Research",
    Icon: Newspaper,
    match: (p: string) =>
      p === "/app/research" || p.startsWith("/app/research/"),
  },
  {
    href: "/app/sell",
    label: "Sell",
    Icon: SquarePlus,
    match: (p: string) => p === "/app/sell" || p.startsWith("/app/sell/"),
  },
] as const

function glassChrome() {
  return cn(
    "rounded-full border border-white/55 bg-white/65 shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
    "backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/55",
    "ring-1 ring-black/[0.04]"
  )
}

export function MobileTabBar() {
  const pathname = usePathname()

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-4 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] [padding-left:max(1rem,env(safe-area-inset-left,0px))] [padding-right:max(1rem,env(safe-area-inset-right,0px))]"
    >
      <div className="flex w-full max-w-2xl items-end gap-4">
        <nav
          aria-label="Tab bar"
          className={cn(
            "flex min-h-[52px] flex-1 items-stretch px-1 py-1",
            glassChrome()
          )}
        >
          {tabs.map(({ href, label, Icon, match }) => {
            const selected = match(pathname)
            return (
              <Link
                key={href}
                href={href}
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "relative flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1.5 [-webkit-tap-highlight-color:transparent]",
                  "transition-[color,transform] duration-150 active:scale-[0.97]"
                )}
              >
                {selected ? (
                  <span
                    className="absolute inset-x-[-2px] inset-y-0 z-0 rounded-full bg-[#EDEDED]"
                    aria-hidden
                  />
                ) : null}
                <Icon
                  className={cn(
                    "relative z-[1] size-[18px] shrink-0",
                    selected ? "text-primary" : "text-[#1a1a1a]"
                  )}
                  strokeWidth={selected ? 2.35 : 2}
                  aria-hidden
                />
                <span
                  className={cn(
                    "relative z-[1] w-full min-w-0 truncate text-center text-[10px] font-semibold leading-3 tracking-[-0.01em]",
                    selected ? "text-primary" : "text-[#1a1a1a]"
                  )}
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </nav>

        <Link
          href="/app/boats-for-sale"
          aria-label="Search boats"
          className={cn(
            "flex size-[54px] shrink-0 items-center justify-center [-webkit-tap-highlight-color:transparent]",
            "transition-transform duration-150 active:scale-[0.96]",
            glassChrome()
          )}
        >
          <Search
            className="size-[17px] text-[#1a1a1a]"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </div>
  )
}
