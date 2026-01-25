import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconVariants = cva("", {
  variants: {
    variant: {
      outlined: "material-symbols-outlined",
      rounded: "material-symbols-rounded",
      sharp: "material-symbols-sharp",
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
})

export interface IconWrapperProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconVariants> {
  name: string
  size?: number
  color?: string
  fill?: boolean | number
  wght?: number
  grad?: number
  optz?: number
}

const IconWrapper = React.forwardRef<HTMLSpanElement, IconWrapperProps>(
  (
    {
      className,
      name,
      variant = "outlined",
      size = 24,
      color,
      fill,
      wght,
      grad,
      optz,
      style,
      ...props
    },
    ref
  ) => {
    const variationSettings: string[] = []
    
    if (fill !== undefined) {
      variationSettings.push(`'FILL' ${fill === true ? 1 : fill}`)
    }
    if (wght !== undefined) {
      variationSettings.push(`'wght' ${wght}`)
    }
    if (grad !== undefined) {
      variationSettings.push(`'GRAD' ${grad}`)
    }
    if (optz !== undefined) {
      variationSettings.push(`'opsz' ${optz}`)
    }

    const fontVariationSettings = variationSettings.length > 0
      ? variationSettings.join(", ")
      : undefined

    const combinedStyle: React.CSSProperties = {
      fontSize: size,
      ...(color && { color }),
      ...(fontVariationSettings && { fontVariationSettings }),
      ...style,
    }

    return (
      <span
        ref={ref}
        className={cn(iconVariants({ variant }), className)}
        style={combinedStyle}
        {...props}
      >
        {name}
      </span>
    )
  }
)
IconWrapper.displayName = "IconWrapper"

export { IconWrapper, iconVariants }
