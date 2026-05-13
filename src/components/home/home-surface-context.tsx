"use client"

import * as React from "react"

export type HomeSurface = "web" | "app"

const HomeSurfaceContext = React.createContext<HomeSurface>("web")

export function HomeSurfaceProvider({
  value,
  children,
}: {
  value: HomeSurface
  children: React.ReactNode
}) {
  return (
    <HomeSurfaceContext.Provider value={value}>
      {children}
    </HomeSurfaceContext.Provider>
  )
}

export function useHomeSurface(): HomeSurface {
  return React.useContext(HomeSurfaceContext)
}

/** Map web listing URLs into the `/app` prototype (no deep SRP paths in app). */
export function listingsHref(path: string, surface: HomeSurface): string {
  if (surface !== "app") return path
  if (path.startsWith("http")) return path
  if (!path.startsWith("/boats-for-sale")) return path
  const rest = path.slice("/boats-for-sale".length)
  if (rest === "" || rest.startsWith("?")) {
    return `/app/boats-for-sale${rest}`
  }
  return "/app/boats-for-sale"
}
