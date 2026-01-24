"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import { useReducedMotion } from "@/components/motion/utils"

interface SlideInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  once?: boolean
  duration?: number
  distance?: number
  className?: string
}

/**
 * SlideIn - A subtle slide-in animation wrapper
 * 
 * Usage:
 * <SlideIn direction="up">
 *   <Card>...</Card>
 * </SlideIn>
 * 
 * With options:
 * <SlideIn direction="up" delay={0.1} distance={20} once={true}>
 *   <Card>...</Card>
 * </SlideIn>
 */
export function SlideIn({
  children,
  direction = "up",
  delay = 0,
  once = true,
  duration = 0.3,
  distance = 24,
  className,
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{
          opacity: 0,
          ...variants[direction],
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
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
