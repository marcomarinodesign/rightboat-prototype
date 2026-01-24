"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import { useReducedMotion } from "@/components/motion/utils"

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  once?: boolean
  duration?: number
  scale?: number
  className?: string
}

/**
 * ScaleIn - A subtle scale-in animation wrapper
 * 
 * Usage:
 * <ScaleIn>
 *   <Card>...</Card>
 * </ScaleIn>
 * 
 * With options:
 * <ScaleIn delay={0.1} scale={0.95} once={true}>
 *   <Card>...</Card>
 * </ScaleIn>
 */
export function ScaleIn({
  children,
  delay = 0,
  once = true,
  duration = 0.25,
  scale = 0.96,
  className,
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, scale }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // ease-out
        }}
        viewport={{ once }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
