"use client"

import * as React from "react"

type MobileFrameScrollContextValue = {
  scrollTop: number
}

const MobileFrameScrollContext = React.createContext<MobileFrameScrollContextValue>({
  scrollTop: 0,
})

export function MobileFrameScrollProvider({
  scrollTop,
  children,
}: {
  scrollTop: number
  children: React.ReactNode
}) {
  const value = React.useMemo(() => ({ scrollTop }), [scrollTop])
  return (
    <MobileFrameScrollContext.Provider value={value}>
      {children}
    </MobileFrameScrollContext.Provider>
  )
}

export function useMobileFrameScroll() {
  return React.useContext(MobileFrameScrollContext)
}
