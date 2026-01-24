"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import { useReducedMotion } from "@/components/motion/utils"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  once?: boolean
  duration?: number
  className?: string
}

/**
 * FadeIn - A subtle fade-in animation wrapper
 * 
 * Usage:
 * <FadeIn>
 *   <Card>...</Card>
 * </FadeIn>
 * 
 * With options:
 * <FadeIn delay={0.1} once={true}>
 *   <Card>...</Card>
 * </FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  once = true,
  duration = 0.25,
  className,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
