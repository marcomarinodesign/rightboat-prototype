import Image from "next/image"

import { cn } from "@/lib/utils"

type RBImageVariant = "hero" | "card" | "thumbnail"

const variantConfig: Record<RBImageVariant, { width: number; height: number; sizes: string }> = {
  hero: {
    width: 1600,
    height: 900,
    sizes: "100vw",
  },
  card: {
    width: 800,
    height: 600,
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  thumbnail: {
    width: 400,
    height: 300,
    sizes: "(max-width: 768px) 50vw, 200px",
  },
}

type RBImageProps = {
  src: string
  alt: string
  variant: RBImageVariant
  priority?: boolean
  className?: string
}

export function RBImage({ src, alt, variant, priority = false, className }: RBImageProps) {
  const { width, height, sizes } = variantConfig[variant]

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={cn("object-cover w-full h-auto", className)}
      loading={priority ? undefined : "lazy"}
      priority={priority || undefined}
    />
  )
}
