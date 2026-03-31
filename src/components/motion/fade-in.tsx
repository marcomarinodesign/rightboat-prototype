"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/motion-variants"

type FadeInProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
  y?: number
}

/**
 * Scroll-revealed fade + slight rise. Uses whileInView once.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px -24px 0px" }}
      transition={{ duration: 0.45, ease: easeOutExpo, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
