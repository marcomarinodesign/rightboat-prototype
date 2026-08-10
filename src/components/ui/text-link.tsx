import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * CTA de texto (link de acción): "See all", "Discover more", "Advanced Search".
 *
 * Unifica lo que antes eran dos implementaciones sueltas:
 * - la clase CSS `.primary-text-link` de globals.css (13px/500), y
 * - la variante `link` de Button.
 *
 * Spec triangulado con rightboat.com, donde los links de acción son Blue/400, peso 500,
 * sin subrayado, a 14px o 16px. El 13px del prototipo era el único valor sin respaldo.
 * `link_web` existe en la librería Buttons & Links pero no es accesible por MCP
 * (el índice devuelve el componente, el archivo no expone su página) — ver docs/DS_AUDIT.md §8.
 *
 * El subrayado en hover se añade como afordancia: producción no lo tiene, pero no altera
 * el aspecto en reposo y ayuda a distinguir el link por algo más que el color.
 */
export const textLinkVariants = cva(
  "inline-flex items-center gap-1 font-medium text-blue-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-control aria-disabled:pointer-events-none aria-disabled:text-neutral-300 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "text-sm leading-5",
        md: "text-base leading-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textLinkVariants> {
  asChild?: boolean
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return (
      <Comp
        className={cn(textLinkVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
TextLink.displayName = "TextLink"

export { TextLink }
