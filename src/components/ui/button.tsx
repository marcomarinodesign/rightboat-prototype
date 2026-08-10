import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Figma: Buttons & Links → `button_web` (component set).
 * https://www.figma.com/design/gPdFmnx9X4CO10RX4fhE8C/Buttons---Links?node-id=1-4558
 *
 * Estilos: Primary · Secondary · Tertiary. Tamaños: Large 48 / Medium 40 / Small 36, radio 8px,
 * texto 16/22 Bold. `default` y `outline` se conservan como alias deprecados de `primary` y
 * `tertiary` para no romper consumidores externos.
 *
 * Desviaciones respecto a Figma, documentadas en docs/DS_AUDIT.md §7:
 * - Hover y disabled de Secondary/Tertiary son idénticos al default en Figma (hueco de diseño).
 *   El hover usa los tints que ya emplea rightboat.com y que son tokens del DS
 *   (Status/Info/100 y Neutral/100); el disabled reutiliza el patrón que Figma sí define
 *   para Tertiary (Neutral/300).
 * - El estado Pressed de Figma es un gráfico de feedback del prototipo, no un estilo CSS.
 *   Se traduce a `active:` con un paso más de intensidad sobre el hover.
 */

const PRIMARY =
  "bg-blue-400 text-neutral-white hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-300/50"

const TERTIARY =
  "border border-midnight bg-transparent text-midnight hover:bg-neutral-100 active:bg-neutral-200 disabled:border-neutral-300 disabled:text-neutral-300 disabled:bg-transparent"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-base font-bold leading-[22px] ring-offset-background transition-colors duration-[var(--transition-duration-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: PRIMARY,
        secondary:
          "border border-blue-400 bg-neutral-white text-blue-400 hover:bg-status-info-100 active:bg-blue-400/10 disabled:border-neutral-300 disabled:text-neutral-300 disabled:bg-neutral-white",
        tertiary: TERTIARY,
        /** Fuera del set de Figma — extensiones del prototipo. */
        ghost:
          "text-midnight hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-300",
        /**
         * Mismo aspecto que TextLink, pero conservando la geometría de botón
         * (área táctil, `block`, `onClick`). Para links de navegación en línea usa TextLink.
         */
        link: "font-medium text-blue-400 underline-offset-4 hover:underline disabled:text-neutral-300",
        destructive:
          "bg-status-error-200 text-neutral-white hover:bg-status-error-300 disabled:bg-status-error-200/50",
        /** @deprecated alias de `primary` */
        default: PRIMARY,
        /** @deprecated alias de `tertiary` */
        outline: TERTIARY,
      },
      size: {
        lg: "h-12 px-8",
        md: "h-10 px-6",
        sm: "h-9 px-[18px]",
        icon: "size-10 px-0",
        /** @deprecated alias de `md` */
        default: "h-10 px-6",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Estado Loading de Figma: muestra spinner y desactiva el botón. */
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, block }), className)

    // Slot exige exactamente un hijo: con asChild no inyectamos el spinner ni un
    // hermano `null`, que ya contaría como segundo hijo.
    if (asChild) {
      return (
        <Slot
          className={classes}
          ref={ref}
          aria-busy={loading || undefined}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
