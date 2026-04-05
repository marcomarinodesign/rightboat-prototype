import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-transparent px-3 py-1.5 text-xs font-medium transition-colors duration-[var(--transition-duration-normal)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-muted text-muted-foreground",
        outline: "border-border/60 text-foreground",
        success:
          "border border-status-success-200/50 bg-status-success-100 text-status-success-300",
        warning:
          "border border-status-warning-200/50 bg-status-warning-100 text-status-warning-300",
        info: "border border-status-info-200/40 bg-status-info-100 text-status-info-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
