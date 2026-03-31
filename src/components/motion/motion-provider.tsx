"use client"

import { MotionConfig } from "framer-motion"

type MotionProviderProps = {
  children: React.ReactNode
}

/**
 * Global motion defaults: respects prefers-reduced-motion via `user`.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  )
}
