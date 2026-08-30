import Image from "next/image"

import { cn } from "@/lib/utils"

type PhotoTriptychProps = {
  images: string[]
  alt: string
  className?: string
}

/**
 * Figma Boat Card media anatomy for the Sponsored Alt and Manufacture variants:
 * one hero photo (125) over two equal thumbnails (71), 4px gap, 8px outer radius.
 * Total height matches the single-photo media so mixed grids stay aligned.
 */
export function PhotoTriptych({ images, alt, className }: PhotoTriptychProps) {
  const [hero, thumbOne, thumbTwo] = [
    images[0],
    images[1] ?? images[0],
    images[2] ?? images[1] ?? images[0],
  ]

  return (
    <div className={cn("flex w-full flex-col gap-1 overflow-hidden rounded-[8px]", className)}>
      <div className="relative h-[125px] w-full overflow-hidden rounded-t-[8px] bg-midnight/12">
        <Image src={hero} alt={alt} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
      </div>
      <div className="flex h-[71px] w-full gap-1">
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-bl-[8px] bg-midnight/12">
          <Image src={thumbOne} alt="" fill sizes="160px" className="object-cover" />
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-br-[8px] bg-midnight/12">
          <Image src={thumbTwo} alt="" fill sizes="160px" className="object-cover" />
        </div>
      </div>
    </div>
  )
}
