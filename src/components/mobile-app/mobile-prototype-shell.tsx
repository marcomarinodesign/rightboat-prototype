"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { MobileFrameScrollProvider } from "@/components/mobile-app/mobile-frame-scroll-context"
import { MobileMenuSheet } from "@/components/mobile-app/mobile-menu-sheet"
import { MobileNavBar } from "@/components/mobile-app/mobile-nav-bar"
import { MobileTabBar } from "@/components/mobile-app/mobile-tab-bar"
import { mobileTopBarConfig } from "@/components/mobile-app/mobile-top-bar-config"
import { cn } from "@/lib/utils"

/**
 * Full-viewport app shell: scroll locked to one column (`flex-1 min-h-0 overflow-y-auto`),
 * tab bar `fixed` to the viewport so it stays visible and tappable (not at document bottom).
 */
export function MobilePrototypeShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const topBar = mobileTopBarConfig(pathname)
  const showTabBar = !(pathname && pathname.startsWith("/app/boat/"))
  const isBdp = Boolean(pathname && pathname.startsWith("/app/boat/"))
  const showTopBar = !isBdp

  return (
    <MobileFrameScrollProvider scrollTop={scrollTop}>
      <div className="flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
        <div
          id="rightboat-mobile-capture-root"
          className={cn(
            "scrollbar-hide min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain pt-0",
            // Space for fixed bottom chrome: tabbar OR BDP contact strip
            isBdp
              ? "pb-[calc(84px+env(safe-area-inset-bottom,0px))]"
              : "pb-[calc(6.75rem+env(safe-area-inset-bottom,0px))]"
          )}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          {showTopBar ? (
            <MobileNavBar
              ariaTitle={topBar.ariaTitle}
              showBack={topBar.showBack}
              backHref={topBar.backHref}
              backLabel={topBar.backLabel}
              onMenuClick={() => setMenuOpen(true)}
            />
          ) : null}
          {children}
        </div>
        {showTabBar ? <MobileTabBar /> : null}
      </div>

      <MobileMenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </MobileFrameScrollProvider>
  )
}
