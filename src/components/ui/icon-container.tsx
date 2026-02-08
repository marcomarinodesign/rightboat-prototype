import { cn } from "@/lib/utils"

export interface IconContainerProps {
  children: React.ReactNode
  className?: string
}

export function IconContainer({ children, className }: IconContainerProps) {
  return (
    <div
      className={cn(
        "mb-2 flex size-8 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary",
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
    >
      {children}
    </div>
  )
}
